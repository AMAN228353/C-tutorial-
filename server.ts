import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry header as required by skill
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY is not defined in environment variables.');
}

// Candidate models in order of priority (low latency first with seamless fallback)
const FAST_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
];

// Helper to generate content with fallback across fast models
async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    systemInstruction: string;
    temperature?: number;
  }
): Promise<string> {
  let lastError: any = null;

  for (const model of FAST_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? 0.5,
        },
      });

      const text = response.text;
      if (text) return text;
    } catch (err: any) {
      console.warn(`Model ${model} failed: ${err?.status || err?.message || err}. Attempting fallback...`);
      lastError = err;
    }
  }

  throw lastError || new Error('All candidate Gemini models failed to respond.');
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey,
    service: 'C Tutor AI Backend',
  });
});

// Chat endpoint for AI Teacher - optimized for rapid responses
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [], topicTitle = '', language = 'hinglish', level = 'beginner' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string' });
      return;
    }

    if (!aiClient) {
      res.status(503).json({
        error: 'Gemini AI API is not configured. Please ensure GEMINI_API_KEY is set in your environment.',
      });
      return;
    }

    // Language guidelines for teacher persona
    let languageGuideline = '';
    if (language === 'hi') {
      languageGuideline = `Explain in simple, clear Hindi (Devanagari script) while keeping programming terms in English (e.g., pointer, variable, memory, function).`;
    } else if (language === 'hinglish') {
      languageGuideline = `Explain in natural, friendly Hinglish (Hindi written in Roman alphabet). Keep C terms in English (e.g., pointer, variable, loop, memory, compiler).`;
    } else {
      languageGuideline = `Explain in clear, simple English suitable for beginning computer science students.`;
    }

    const systemInstruction = `You are "C Tutor AI", a friendly, fast, and patient C programming teacher.
Student learning level: ${level.toUpperCase()}.
Topic context: ${topicTitle || 'General C'}.
Language: ${language.toUpperCase()}.

Rules for fast, high-quality responses:
1. ${languageGuideline}
2. For simple/conceptual questions (e.g., "what is C", "what is a pointer", "C language kya hota hai"):
   - Give a direct, crystal-clear, beginner-friendly answer in 2 to 5 sentences.
   - Do NOT write lengthy essays, unnecessary history, or massive introductory filler.
3. Only provide a code snippet if the user explicitly asks for code or an example. When showing code, keep it short (under 8 lines) with clean comments.
4. If the user asks to explain a bug or why something failed, pinpoint the exact issue concisely.
5. Tone: Encouraging, supportive, and straight to the point.`;

    // Build contents array formatted for generateContent (keep last 4 messages for fast context)
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    const recentHistory = conversationHistory.slice(-4);
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'model') {
        formattedContents.push({
          role: msg.role === 'assistant' ? 'model' : (msg.role as 'user' | 'model'),
          parts: [{ text: msg.content || msg.text || '' }],
        });
      }
    }

    // Add current user prompt
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Execute with fallback
    const replyText = await generateWithFallback(aiClient, {
      contents: formattedContents,
      systemInstruction,
      temperature: 0.5,
    });

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    const message = error?.message || 'Failed to communicate with AI teacher. Please try again.';
    res.status(500).json({ error: message });
  }
});

// Trace / Explain code endpoint
app.post('/api/trace', async (req: Request, res: Response) => {
  try {
    const { code, language = 'hinglish' } = req.body;

    if (!code || typeof code !== 'string') {
      res.status(400).json({ error: 'C code is required' });
      return;
    }

    if (!aiClient) {
      res.status(503).json({ error: 'Gemini AI API is not configured.' });
      return;
    }

    const prompt = `Analyze this C code and provide:
1. Expected Output
2. Line-by-line execution trace with variable states
3. Step-by-step loop iteration table (if loops are present)
4. Potential edge cases or bugs (e.g. buffer overflow, memory leak, uninitialized variables)

Explain in ${language === 'hi' ? 'Hindi' : language === 'hinglish' ? 'friendly Hinglish' : 'English'}.
Keep technical terms in English.

Code:
\`\`\`c
${code}
\`\`\``;

    const replyText = await generateWithFallback(aiClient, {
      contents: prompt,
      systemInstruction: 'You are an expert C code visualizer and debugger for students. Format your output with clear markdown sections and tabular traces.',
      temperature: 0.3,
    });

    res.json({ analysis: replyText });
  } catch (error: any) {
    console.error('Code trace error:', error);
    res.status(500).json({ error: error?.message || 'Failed to trace code.' });
  }
});

// Setup Vite in development or serve static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`C Tutor AI server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
