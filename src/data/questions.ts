import { QuizQuestion } from '../types';

export const SEED_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-01',
    moduleId: 'module-01',
    topicTitle: 'Program Structure & Compilation',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which component of the C compilation system combines individual compiled object files (.o) and standard C library routines into the final executable?',
    options: ['The Preprocessor (cpp)', 'The Assembler (as)', 'The Linker (ld)', 'The C Compiler Core (cc1)'],
    correctIndex: 2,
    explanation: {
      en: 'The Linker (ld) resolves references between separate object files and system libraries (such as libc) to build the final executable binary.',
      hinglish: 'Linker (ld) alag-alag object files (.o) aur C standard library routines ko aapas mein jodkar final runnable executable (.exe ya a.out) banata hai.',
      hi: 'लिंकर (ld) विभिन्न ऑब्जेक्ट फाइलों और सी मानक पुस्तकालयों को अंतिम निष्पादन योग्य फ़ाइल में जोड़ता है।',
    },
    recommendationTopic: 'The 4 Stages of C Compilation',
  },
  {
    id: 'q-02',
    moduleId: 'module-02',
    topicTitle: 'Data Types & Memory',
    difficulty: 'beginner',
    type: 'output',
    question: 'What is the exact output of this program on a standard 64-bit architecture?',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 2;
    float result = a / b;
    printf("%.1f", result);
    return 0;
}`,
    options: ['2.5', '2.0', '3.0', 'Compilation Error'],
    correctIndex: 1,
    explanation: {
      en: 'Both `a` and `b` are integers. In C, integer division `5 / 2` truncates the decimal part yielding integer `2`. That integer is then converted to float `2.0`. To get `2.5`, use explicit type casting: `(float)a / b`.',
      hinglish: 'Kyunki `a` aur `b` dono integers hain, C integer division karta hai: `5 / 2 = 2` (decimal cut jata hai). Fir 2 float mein badal kar `2.0` banta hai. 2.5 pane ke liye `(float)a / b` likhna padta hai.',
      hi: 'पूर्णांक विभाजन 5 / 2 का परिणाम 2 आता है। इसे फ्लोट में बदलने पर 2.0 प्राप्त होता है।',
    },
    recommendationTopic: 'Variables, Primitive Types & Memory Sizes',
  },
  {
    id: 'q-03',
    moduleId: 'module-03',
    topicTitle: 'Operators & Precedence',
    difficulty: 'beginner',
    type: 'output',
    question: 'Predict the console output of this code snippet:',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int i = 5;
    int j = i++;
    printf("i=%d, j=%d", i, j);
    return 0;
}`,
    options: ['i=5, j=5', 'i=6, j=6', 'i=6, j=5', 'i=5, j=6'],
    correctIndex: 2,
    explanation: {
      en: 'In postfix increment `i++`, the current value of `i` (5) is assigned to `j` first. Afterward, `i` is incremented to 6. Hence i=6, j=5.',
      hinglish: 'Postfix `i++` mein pehle purani value (5) `j` ko milti hai, fir `i` badhkar 6 ho jata hai. Isliye `i=6, j=5`.',
      hi: 'पोस्टफ़िक्स i++ में पहले वर्तमान मान (5) j को सौंपा जाता है, फिर i का मान बढ़कर 6 हो जाता है।',
    },
    recommendationTopic: 'Prefix vs Postfix Increment & Precedence',
  },
  {
    id: 'q-04',
    moduleId: 'module-03',
    topicTitle: 'Logical Short-Circuit Evaluation',
    difficulty: 'intermediate',
    type: 'bug',
    question: 'What gets printed by this program demonstrating short-circuit evaluation?',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 0, b = 10;
    if (a && ++b) {
        printf("Branch 1 ");
    }
    printf("b = %d", b);
    return 0;
}`,
    options: ['Branch 1 b = 11', 'b = 10', 'b = 11', 'Compilation Error'],
    correctIndex: 1,
    explanation: {
      en: 'In C, logical AND (&&) uses short-circuit evaluation. Because `a` is 0 (false), the right-hand operand `++b` is never evaluated at all! Thus `b` remains 10.',
      hinglish: 'C mein `&&` operator short-circuit karta hai. Agar pehla operand `a` hi 0 (false) hai, toh CPU agla hissa `++b` execute hi nahi karta! Isliye `b` ki value 10 hi rehti hai.',
      hi: 'लॉजिकल AND (&&) शॉर्ट-सर्किट मूल्यांकन का उपयोग करता है। चूँकि a का मान 0 है, ++b कभी निष्पादित नहीं होता। b = 10 रहता है।',
    },
    recommendationTopic: 'Prefix vs Postfix Increment & Precedence',
  },
  {
    id: 'q-05',
    moduleId: 'module-04',
    topicTitle: 'Control Flow & Switch',
    difficulty: 'beginner',
    type: 'output',
    question: 'Notice there is no `break` statement. What will be the output?',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int score = 2;
    switch (score) {
        case 1: printf("One ");
        case 2: printf("Two ");
        case 3: printf("Three ");
        default: printf("Done");
    }
    return 0;
}`,
    options: ['Two ', 'Two Three ', 'Two Three Done', 'One Two Three Done'],
    correctIndex: 2,
    explanation: {
      en: 'Without `break`, C falls through to all subsequent cases and the default block once a match is found. Case 2 matches, so it prints "Two ", "Three ", and "Done".',
      hinglish: 'Agar `break` na ho, toh case 2 match hone ke baad execution ruka nahi aur neeche ke saare cases ("Three " aur "Done") bhi print ho gaye. Ise Fall-Through kehte hain.',
      hi: 'ब्रेक के बिना, केस 2 के मिलान के बाद नीचे के सभी ब्लॉक निष्पादित होते हैं: Two Three Done।',
    },
    recommendationTopic: 'Control Flow, Loops & Pattern Printing',
  },
  {
    id: 'q-06',
    moduleId: 'module-06',
    topicTitle: 'Strings & Null Terminator',
    difficulty: 'intermediate',
    type: 'output',
    question: 'What is the output of `sizeof` vs `strlen` for this string?',
    codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[20] = "Coding";
    printf("%zu %zu", sizeof(str), strlen(str));
    return 0;
}`,
    options: ['6 6', '20 6', '6 20', '20 7'],
    correctIndex: 1,
    explanation: {
      en: '`sizeof(str)` returns the total allocated byte size of the array (20 bytes). `strlen(str)` counts characters until the null terminator \'\\0\' (6 characters: C-o-d-i-n-g).',
      hinglish: '`sizeof(str)` array ka poora reserved size batata hai (20 bytes). Jabki `strlen(str)` sirf actual characters ginta hai jab tak `\\0` na mile (6 characters).',
      hi: 'sizeof ऐरे का कुल आकार (20) देता है जबकि strlen केवल वास्तविक वर्णों की संख्या (6) गिनता है।',
    },
    recommendationTopic: 'Arrays & The Null-Terminated String Protocol',
  },
  {
    id: 'q-07',
    moduleId: 'module-07',
    topicTitle: 'Pointers & Dereferencing',
    difficulty: 'intermediate',
    type: 'output',
    question: 'What does this pointer manipulation print?',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int x = 20;
    int *p = &x;
    int **pp = &p;

    **pp = **pp + 15;
    printf("%d", x);
    return 0;
}`,
    options: ['20', '35', 'Address of x', 'Segmentation fault'],
    correctIndex: 1,
    explanation: {
      en: '`pp` is a pointer-to-a-pointer (double pointer). Dereferencing twice `**pp` directly accesses variable `x`. Thus 20 + 15 = 35 is stored in `x`.',
      hinglish: '`pp` double pointer hai. `*pp` karne se `p` milta hai, aur `**pp` karne se seedhe `x` tak pahunchte hain. Isliye `x = 20 + 15 = 35` ho jata hai.',
      hi: '**pp सीधे वेरिएबल x के मान को संशोधित करता है। 20 + 15 = 35।',
    },
    recommendationTopic: 'Pointer Fundamentals: Addresses & Dereferencing',
  },
  {
    id: 'q-08',
    moduleId: 'module-07',
    topicTitle: 'Pointer Arithmetic',
    difficulty: 'intermediate',
    type: 'output',
    question: 'What is printed by this array pointer expression?',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40};
    int *ptr = arr;
    ptr++;
    printf("%d", *(ptr + 2));
    return 0;
}`,
    options: ['20', '30', '40', 'Garbage Value'],
    correctIndex: 2,
    explanation: {
      en: 'Initially, `ptr` points to `arr[0]` (10). `ptr++` advances it to `arr[1]` (20). Then `*(ptr + 2)` offsets two positions forward to `arr[3]` (40).',
      hinglish: 'Pehle `ptr` index 0 par tha. `ptr++` se index 1 par gaya. Fir `ptr + 2` se index 3 (40) par pahuncha. Isliye output 40 aayega.',
      hi: 'ptr++ के बाद वह arr[1] पर है। उसमें 2 जोड़ने पर वह arr[3] (40) पर पहुंच जाता है।',
    },
    recommendationTopic: 'Pointer Fundamentals: Addresses & Dereferencing',
  },
  {
    id: 'q-09',
    moduleId: 'module-08',
    topicTitle: 'Structs & Member Alignment',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'Why might `sizeof(struct Demo { char c; int i; })` evaluate to 8 bytes instead of 5 bytes on modern 32/64-bit systems?',
    options: [
      'The compiler adds a hidden 3-byte encryption hash',
      'The compiler inserts 3 padding bytes after char to align int on a 4-byte boundary for CPU efficiency',
      'The char type actually occupies 4 bytes in structs',
      'It is a bug in the GCC optimizer',
    ],
    correctIndex: 1,
    explanation: {
      en: 'CPUs fetch data from memory most efficiently when 4-byte integers are aligned at addresses that are multiples of 4. Compilers insert 3 padding bytes between char (1 byte) and int (4 bytes).',
      hinglish: 'CPU 4-byte boundary par data fast read karta hai. Compiler 1-byte char ke baad 3 padding bytes daal deta hai taaki 4-byte int sahi address par align ho sake. Total = 8 bytes.',
      hi: 'सीपीयू मेमोरी अलाइनमेंट के लिए कंपाइलर 3 पैडिंग बाइट्स जोड़ता है ताकि पूर्णांक 4-बाइट सीमा पर संरेखित हो।',
    },
    recommendationTopic: 'Structures & Memory Padding',
  },
  {
    id: 'q-10',
    moduleId: 'module-09',
    topicTitle: 'Dynamic Memory & Leaks',
    difficulty: 'advanced',
    type: 'bug',
    question: 'Identify the critical bug in this dynamic allocation function:',
    codeSnippet: `int *createNumbers(void) {
    int count = 10;
    int *arr = (int*)malloc(count * sizeof(int));
    for (int i = 0; i < count; i++) {
        arr[i] = i * 2;
    }
    free(arr);
    return arr;
}`,
    options: [
      'malloc syntax is invalid',
      'Returns a dangling pointer to freed memory that can no longer be legally accessed',
      'Memory leak because free was not called twice',
      'Integer overflow inside loop',
    ],
    correctIndex: 1,
    explanation: {
      en: 'The function frees `arr` before returning it! The returned pointer is a "Dangling Pointer". Any caller attempting to read `arr[0]` causes Undefined Behavior (Use-After-Free).',
      hinglish: 'Function ne memory ko return karne se pehle hi `free(arr)` kar diya! Caller ko jo pointer milega woh freed memory ki taraf ishara karega (Dangling Pointer). Use-After-Free bug!',
      hi: 'फ़ंक्शन मेमोरी को मुक्त करने के बाद उसका पता लौटा रहा है। यह एक डैंगलिंग पॉइंटर (Dangling Pointer) दोष है।',
    },
    recommendationTopic: 'malloc, free & Preventing Memory Leaks',
  },
  {
    id: 'q-11',
    moduleId: 'module-10',
    topicTitle: 'File Handling Modes',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'Which file mode in `fopen()` opens a file for writing, creates it if it does not exist, or preserves existing data by writing only at the end of the file?',
    options: ['"r"', '"w"', '"a"', '"w+"'],
    correctIndex: 2,
    explanation: {
      en: 'The "a" (append) mode creates the file if it does not exist, and writes all data strictly to the end of the existing file without truncating it.',
      hinglish: '"a" (append) mode purane data ko delete nahi karta balki nayi entries file ke end mein jodta hai.',
      hi: '"a" (अपेंड) मोड पुरानी सामग्री को हटाए बिना फ़ाइल के अंत में नया डेटा लिखता है।',
    },
    recommendationTopic: 'Working with Text & Binary Files',
  },
  {
    id: 'q-12',
    moduleId: 'module-12',
    topicTitle: 'Undefined Behavior (UB)',
    difficulty: 'advanced',
    type: 'concept',
    question: 'Which of the following operations in standard C invokes Undefined Behavior (UB)?',
    options: [
      'Dereferencing a NULL pointer: `int *p = NULL; *p = 5;`',
      'Modifying a string literal: `char *s = "hello"; s[0] = \'H\';`',
      'Signed integer overflow: `INT_MAX + 1`',
      'All of the above',
    ],
    correctIndex: 3,
    explanation: {
      en: 'All three operations invoke Undefined Behavior in C. Modern compilers may optimize them away or crash with segmentation faults.',
      hinglish: 'Yeh teeno C standard ke mutabiq Undefined Behavior (UB) hain. Compiler inke chalne par kuch bhi kar sakta hai ya program crash ho jayega.',
      hi: 'ये सभी संचालन सी भाषा में अपरिभाषित व्यवहार (Undefined Behavior) उत्पन्न करते हैं।',
    },
    recommendationTopic: 'Command Line Arguments & Undefined Behavior',
  },
];
