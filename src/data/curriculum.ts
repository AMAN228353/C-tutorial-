import { CurriculumModule } from '../types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'module-01',
    number: 1,
    title: 'C Fundamentals & Compilation Pipeline',
    subtitle: 'History, Architecture & How C Works Under The Hood',
    badge: 'Foundation',
    description: {
      en: 'Understand the origin of C by Dennis Ritchie at Bell Labs, memory efficiency, and the complete 4-stage compilation pipeline from source code to machine executable.',
      hinglish: 'C language ki history, Dennis Ritchie ka design philosophy, aur code likhne se lekar machine code (binary) banne tak ke 4 stages (Preprocessor, Compiler, Assembler, Linker) ko samjhein.',
      hi: 'सी भाषा का इतिहास, इसकी मेमोरी दक्षता और सोर्स कोड से लेकर मशीन कोड तक की पूरी 4-चरणीय संकलन (Compilation) प्रक्रिया को समझें।',
    },
    lessons: [
      {
        id: 'lesson-01-01',
        moduleId: 'module-01',
        moduleTitle: 'C Fundamentals & Compilation Pipeline',
        moduleNumber: 1,
        title: 'Anatomy of a C Program & "Hello, World!"',
        level: 'beginner',
        estimatedMinutes: 12,
        summary: {
          en: 'Every C program begins at main(). Learn header inclusion, function signature, return status, and standard output with printf.',
          hinglish: 'Har C program ka execution `main()` function se shuru hota hai. `#include <stdio.h>`, return 0 aur printf ka exact purpose samjhein.',
          hi: 'प्रत्येक सी प्रोग्राम का निष्पादन main() से शुरू होता है। हेडर फाइल, मुख्य फलन और printf के उपयोग को समझें।',
        },
        explanation: {
          en: 'C is a compiled, statically typed, procedural programming language created in 1972. When an operating system loads a C program, execution transfers directly to the entry point function named `main`. The `#include <stdio.h>` preprocessor directive instructs the compiler to paste the standard input/output header declarations before compilation.',
          hinglish: 'C ek powerful procedural compiled language hai jo direct computer memory aur hardware ke saath interact kar sakti hai. Jab aap apna code chalate hain, Operating System seedhe `main()` function ko call karta hai. `#include <stdio.h>` compiler ko batata hai ki `printf` aur `scanf` jaise functions ki definition standard library mein available hai.',
          hi: 'सी एक शक्तिशाली प्रक्रियात्मक संकलित भाषा है जो सीधे कंप्यूटर मेमोरी के साथ काम करती है। ऑपरेटिंग सिस्टम सबसे पहले main() फलन को निष्पादित करता है।',
        },
        syntax: `#include <stdio.h>\n\nint main(void) {\n    // Statements\n    return 0;\n}`,
        codeExample: `#include <stdio.h>

int main(void) {
    // printf prints formatted text to the terminal
    printf("Namaste, World of C!\\n");
    printf("Compilation successful.\\n");
    return 0; // 0 indicates successful exit to the OS
}`,
        expectedOutput: `Namaste, World of C!\nCompilation successful.`,
        lineByLine: [
          {
            line: '#include <stdio.h>',
            en: 'Preprocessor directive: inserts the Standard Input/Output header file declarations.',
            hinglish: 'Yeh preprocessor ko batata hai ki standard input/output functions (jaise printf) ki declarations include karo.',
            hi: 'यह प्रीप्रोसेसर निर्देश मानक इनपुट/आउटपुट हेडर फ़ाइल को सम्मिलित करता है।',
          },
          {
            line: 'int main(void)',
            en: 'Program entry point returning an integer exit status; void denotes it takes no arguments.',
            hinglish: 'Program ka starting gate. `int` batata hai ki yeh OS ko ek number lautayega (exit status).',
            hi: 'प्रोग्राम का मुख्य प्रवेश बिंदु जो पूर्णांक लौटाता है।',
          },
          {
            line: 'printf("Namaste, World of C!\\n");',
            en: 'Calls the printf library function to write bytes to stdout; \\n is a newline escape sequence.',
            hinglish: 'Screen par message print karta hai. `\\n` cursor ko agli line par le jata hai.',
            hi: 'टर्मिनल पर टेक्स्ट प्रिंट करता है। \\n नई पंक्ति जोड़ता है।',
          },
          {
            line: 'return 0;',
            en: 'Returns 0 to the Operating System signaling that execution completed with zero errors.',
            hinglish: 'Operating system ko batata hai ki program bina kisi error ke successfully finish ho gaya.',
            hi: 'ऑपरेटिंग सिस्टम को सूचित करता है कि प्रोग्राम बिना किसी त्रुटि के समाप्त हुआ।',
          },
        ],
        commonMistakes: [
          {
            mistake: 'Using void main() instead of int main()',
            incorrectSnippet: 'void main() { printf("Hello"); }',
            correctSnippet: 'int main(void) {\n    printf("Hello");\n    return 0;\n}',
            why: 'According to ANSI/ISO C standards (C99, C11, C17), main() must return int. Using void main() causes undefined behavior on modern compilers.',
          },
          {
            mistake: 'Forgetting semicolon ; at the end of statement',
            incorrectSnippet: 'printf("Hello")\nreturn 0;',
            correctSnippet: 'printf("Hello");\nreturn 0;',
            why: 'In C, every executable statement must be terminated with a semicolon, otherwise the compiler cannot identify statement boundaries.',
          },
        ],
        standardVsExtensionNote: 'Standard C requires int main(void) or int main(int argc, char *argv[]). Old 1980s DOS tutorials used `void main()` and `<conio.h>` with `getch()`, which are obsolete non-standard compiler extensions and rejected by modern GCC and Clang.',
        practiceQuestion: {
          question: 'What does returning 0 from the main() function signify in standard C?',
          options: [
            'The program encountered a fatal memory error',
            'The program executed successfully and exited with status 0',
            'The program outputted zero characters to the screen',
            'The CPU will reset the process registers',
          ],
          correctAnswerIndex: 1,
          explanation: 'By convention across POSIX and Windows operating systems, exit code 0 signifies successful termination, whereas non-zero values (like 1 or -1) indicate an error.',
        },
      },
      {
        id: 'lesson-01-02',
        moduleId: 'module-01',
        moduleTitle: 'C Fundamentals & Compilation Pipeline',
        moduleNumber: 1,
        title: 'The 4 Stages of C Compilation',
        level: 'beginner',
        estimatedMinutes: 15,
        summary: {
          en: 'Trace what gcc/clang does under the hood: Preprocessor (.i) -> Compiler (.s) -> Assembler (.o) -> Linker (a.out/executable).',
          hinglish: 'Samjho C code direct run nahi hota: pehle Preprocessor comment hatata hai aur macros expand karta hai, fir Compiler assembly code banata hai, Assembler machine code banata hai, aur Linker sab library jod kar final binary banata hai.',
          hi: 'सी संकलन के चार चरण: प्रीप्रोसेसिंग, संकलन (असेंबली कोड), असेंबलर (मशीन ऑब्जेक्ट कोड), और लिंकिंग।',
        },
        explanation: {
          en: 'Unlike interpreted languages like Python or JavaScript, C source code (.c) undergoes four distinct phases before running on silicon:\n1. Preprocessing (`cpp`): Expands `#include`, `#define`, strips comments, emits `.i` file.\n2. Compilation (`cc1`): Translates pure C into architecture-specific Assembly language (.s).\n3. Assembly (`as`): Translates assembly instructions into raw CPU machine code object file (.o / .obj).\n4. Linking (`ld`): Connects object files with C standard libraries (libc) to generate an executable binary.',
          hinglish: 'C language directly hardware speed par kyu chalti hai? Kyunki yeh seedhe CPU ke machine code mein compile hoti hai. \nStage 1 (Preprocessor): `#include` ki jagah asli file copy hoti hai aur comments delete hote hain.\nStage 2 (Compiler): C code Assembly code (.s) mein badalta hai.\nStage 3 (Assembler): Assembly instructions machine code bytes (.o) ban jaate hain.\nStage 4 (Linker): Library code (jaise printf ki implementation) jodkar final .exe ya binary banata hai.',
          hi: 'सी भाषा चार चरणों से गुजरती है: प्रीप्रोसेसर, कंपाइलर, असेंबलर और लिंकर, जिसके बाद मशीन निष्पादन योग्य बाइनरी फाइल बनती है।',
        },
        syntax: `gcc -E main.c -o main.i   # Stage 1: Preprocess\ngcc -S main.i -o main.s   # Stage 2: Compile to Assembly\ngcc -c main.s -o main.o   # Stage 3: Assemble to Object Code\ngcc main.o -o my_program  # Stage 4: Link to Executable`,
        codeExample: `#include <stdio.h>
#define PI 3.14159

int main(void) {
    // In stage 1, PI is replaced with 3.14159 literally
    double radius = 5.0;
    double area = PI * radius * radius;
    printf("Circle Area = %.2f\\n", area);
    return 0;
}`,
        expectedOutput: `Circle Area = 78.54`,
        commonMistakes: [
          {
            mistake: 'Confusing compiler errors with linker errors',
            incorrectSnippet: '// Calling function that does not exist:\nfoo();',
            correctSnippet: '// Declare or link the function implementation before calling',
            why: 'A compiler error occurs when syntax or types are invalid. A linker error (e.g., "undefined reference to foo") occurs when the declaration exists but the linker cannot find the compiled binary body of the function.',
          },
        ],
        practiceQuestion: {
          question: 'Which stage of the compilation pipeline replaces `#define` macro constants and strips code comments?',
          options: ['The Linker', 'The Assembler', 'The Preprocessor', 'The Code Optimizer'],
          correctAnswerIndex: 2,
          explanation: 'The Preprocessor handles all directives beginning with `#` (like `#include`, `#define`) and strips out all comments before syntax parsing begins.',
        },
      },
    ],
  },
  {
    id: 'module-02',
    number: 2,
    title: 'Tokens, Variables, Data Types & I/O',
    subtitle: 'Memory Representation, Format Specifiers & Safe User Input',
    badge: 'Core Syntax',
    description: {
      en: 'Master C data types (int, float, double, char), memory sizes, variable declarations, type casting, and standard I/O using printf and scanf.',
      hinglish: 'C ke data types (int, float, double, char), RAM mein unka size, type conversion, printf format specifiers (%d, %f, %c, %s) aur safe scanf user input lene ka tareeqa.',
      hi: 'वेरिएबल्स, डेटा प्रकार (int, float, double, char), आकार, टाइप कास्टिंग और printf व scanf के साथ सुरक्षित इनपुट/आउटपुट।',
    },
    lessons: [
      {
        id: 'lesson-02-01',
        moduleId: 'module-02',
        moduleTitle: 'Tokens, Variables, Data Types & I/O',
        moduleNumber: 2,
        title: 'Variables, Primitive Types & Memory Sizes',
        level: 'beginner',
        estimatedMinutes: 18,
        summary: {
          en: 'Learn how variables allocate memory slots, exact byte sizes (sizeof), signed vs unsigned modifiers, and floating point precision.',
          hinglish: 'Variable ek named memory box hai. `sizeof` operator se check karein ki aapke system par int, float, double aur char kitne bytes space lete hain.',
          hi: 'वेरिएबल्स मेमोरी में स्थान आरक्षित करते हैं। विभिन्न डेटा प्रकारों के आकार (बाइट्स) और उनकी सीमाओं को समझें।',
        },
        explanation: {
          en: 'In C, every variable is a named storage location in physical RAM with a fixed data type and byte size:\n- `char`: 1 byte (-128 to 127 or 0 to 255)\n- `int`: Typically 4 bytes on 32/64-bit architectures (-2,147,483,648 to 2,147,483,647)\n- `float`: 4 bytes single-precision IEEE 754 float (~6-7 decimal digits)\n- `double`: 8 bytes double-precision IEEE 754 float (~15-17 decimal digits)\nThe `sizeof` operator evaluates the byte footprint of any type or expression at compile time.',
          hinglish: 'Computer memory chote-chote 1-byte blocks se bani hoti hai. Jab aap `int age = 21;` likhte hain, compiler 4 contiguous bytes book karta hai aur unme 21 store karta hai. `sizeof(int)` batayega ki aapke system mein kitne bytes use huye.',
          hi: 'सी में हर वेरिएबल का एक निश्चित डेटा प्रकार और मेमोरी आकार होता है। sizeof ऑपरेटर किसी भी प्रकार के आकार को बाइट्स में मापता है।',
        },
        syntax: `data_type variable_name = initial_value;\nsize_t bytes = sizeof(variable_name);`,
        codeExample: `#include <stdio.h>

int main(void) {
    char grade = 'A';
    int rollNumber = 101;
    float marks = 92.5f;
    double exactPi = 3.141592653589793;

    printf("Grade: %c (size: %zu byte)\\n", grade, sizeof(grade));
    printf("Roll: %d (size: %zu bytes)\\n", rollNumber, sizeof(rollNumber));
    printf("Marks: %.2f (size: %zu bytes)\\n", marks, sizeof(marks));
    printf("Exact PI: %.15f (size: %zu bytes)\\n", exactPi, sizeof(exactPi));

    return 0;
}`,
        expectedOutput: `Grade: A (size: 1 byte)\nRoll: 101 (size: 4 bytes)\nMarks: 92.50 (size: 4 bytes)\nExact PI: 3.141592653589793 (size: 8 bytes)`,
        commonMistakes: [
          {
            mistake: 'Using single quotes for strings or double quotes for single chars',
            incorrectSnippet: "char ch = \"A\";\nchar *str = 'Hello';",
            correctSnippet: "char ch = 'A';\nchar *str = \"Hello\";",
            why: "Single quotes 'A' denote an integer character constant (1 byte). Double quotes \"Hello\" denote a null-terminated string literal array in read-only memory.",
          },
          {
            mistake: 'Integer overflow beyond type limits',
            incorrectSnippet: 'short val = 32767;\nval = val + 1; // wraps around to -32768 on 16-bit short',
            correctSnippet: 'int val = 32767;\nval = val + 1;',
            why: 'Signed integer overflow invokes Undefined Behavior in C. Choose appropriately sized data types like `long` or `uint32_t`.',
          },
        ],
        practiceQuestion: {
          question: 'What is the return type of the `sizeof` operator in standard C?',
          options: ['int', 'float', 'size_t', 'unsigned short'],
          correctAnswerIndex: 2,
          explanation: 'The sizeof operator returns size_t, an unsigned integer type defined in <stddef.h> that is guaranteed to be large enough to represent the size of the largest possible object.',
        },
      },
      {
        id: 'lesson-02-02',
        moduleId: 'module-02',
        moduleTitle: 'Tokens, Variables, Data Types & I/O',
        moduleNumber: 2,
        title: 'Mastering printf, scanf & Format Specifiers',
        level: 'beginner',
        estimatedMinutes: 20,
        summary: {
          en: 'Deep dive into format specifiers (%d, %f, %lf, %c, %s, %p), field width, precision flags, and why scanf requires the address-of operator (&).',
          hinglish: 'Format specifiers ka exact use: scanf mein `&` (address-of operator) kyu zaroori hota hai, user se multiple inputs kaise safely lete hain, aur output formatting kaise ki jaati hai.',
          hi: 'printf और scanf के फॉर्मेट विनिर्देशक (%d, %f, %c आदि)। scanf में & ऑपरेटर की अनिवार्यता और सुरक्षित इनपुट विधियां।',
        },
        explanation: {
          en: '`printf` and `scanf` are variadic functions from `<stdio.h>`. When reading data with `scanf("%d", &age)`, you MUST pass the memory address of the variable (`&age`) so that `scanf` can write the user input directly into that memory slot. Forgetting `&` causes the program to crash with a Segmentation Fault because `scanf` treats the variable value as an arbitrary memory address.',
          hinglish: '`scanf` function ko batana padta hai ki input user ne jo diya, use RAM ke kis address par rakhna hai. Isliye hum `&` (address-of operator) lagate hain. Agar aap `&` bhool gaye, toh `scanf` purani value ko address samajh kar illegal memory par write karne ki koshish karega aur Segmentation Fault (crash) ho jayega!',
          hi: 'scanf को वेरिएबल के मेमोरी पते की आवश्यकता होती है ताकि वह इनपुट मान को वहां लिख सके। & ऑपरेटर मेमोरी पता प्रदान करता है।',
        },
        syntax: `printf("format string with specifiers", val1, val2);\nscanf("format string", &var1, &var2);`,
        codeExample: `#include <stdio.h>

int main(void) {
    int age = 20;
    double gpa = 3.85;

    // Width and precision formatting:
    // %5d means pad with spaces to at least 5 characters wide
    // %.2f means round to exactly 2 decimal places
    printf("Student Info:\\n");
    printf("Age:  [%5d]\\n", age);
    printf("GPA:  [%5.2f]\\n", gpa);
    printf("Pointer Address of age: %p\\n", (void*)&age);

    return 0;
}`,
        expectedOutput: `Student Info:\nAge:  [   20]\nGPA:  [ 3.85]\nPointer Address of age: 0x7ffd5e2a4b8c`,
        commonMistakes: [
          {
            mistake: 'Forgetting the address-of & in scanf for numeric variables',
            incorrectSnippet: 'int score;\nscanf("%d", score); // CRASH! Segmentation fault',
            correctSnippet: 'int score;\nscanf("%d", &score); // Safe',
            why: 'scanf expects a pointer (memory address) destination where it can write the parsed integer. Passing score passes uninitialized garbage as an address.',
          },
          {
            mistake: 'Using %f for reading double with scanf instead of %lf',
            incorrectSnippet: 'double value;\nscanf("%f", &value); // Error: corrupts double memory',
            correctSnippet: 'double value;\nscanf("%lf", &value); // Correct: %lf for double in scanf',
            why: 'In printf, float is automatically promoted to double so %f works for both. But in scanf, %f writes 4 bytes while %lf writes 8 bytes. Using %f for double truncates memory.',
          },
        ],
        practiceQuestion: {
          question: 'Which format specifier must be used in `scanf` to read a `double` variable?',
          options: ['%d', '%f', '%lf', '%ld'],
          correctAnswerIndex: 2,
          explanation: 'In scanf, %f reads a 4-byte float, whereas %lf (long float) is required to write into an 8-byte double.',
        },
      },
    ],
  },
  {
    id: 'module-03',
    number: 3,
    title: 'Operators & Expression Evaluation',
    subtitle: 'Arithmetic, Relational, Bitwise & Precedence Rules',
    badge: 'Operations',
    description: {
      en: 'Understand operator precedence, associativity, prefix vs postfix increment (++i vs i++), short-circuit logic, and low-level bitwise operations (&, |, ^, ~, <<, >>).',
      hinglish: 'Operators ki hierarchy, prefix aur postfix (`++i` vs `i++`) ka subtle farak, short-circuit evaluation (`&&`, `||`), aur hardware-level bitwise operations.',
      hi: 'ऑपरेटरों की प्राथमिकता, प्रीफ़िक्स बनाम पोस्टफ़िक्स (++i बनाम i++), लॉजिकल शॉर्ट-सर्किट और बिटवाइज़ ऑपरेटर।',
    },
    lessons: [
      {
        id: 'lesson-03-01',
        moduleId: 'module-03',
        moduleTitle: 'Operators & Expression Evaluation',
        moduleNumber: 3,
        title: 'Prefix vs Postfix Increment & Precedence',
        level: 'beginner',
        estimatedMinutes: 16,
        summary: {
          en: 'Demystify ++x vs x++: prefix increments first then yields value; postfix yields value first then increments.',
          hinglish: '`++x` pehle value badhata hai fir use karta hai. `x++` pehle purani value use karta hai fir agle step par increment karta hai.',
          hi: 'प्रीफ़िक्स (++x) पहले मान बढ़ाता है और फिर उपयोग करता है; पोस्टफ़िक्स (x++) पहले उपयोग करता है और फिर बढ़ाता है।',
        },
        explanation: {
          en: 'Operator precedence determines which operator binds to operands first in an expression. For example, multiplication `*` has higher precedence than addition `+`. Increment operators come in two forms:\n1. Prefix (`++x`): The variable is incremented in memory first, and the new value is returned.\n2. Postfix (`x++`): A copy of the current value is returned for expression evaluation, and the variable is incremented afterward.',
          hinglish: 'C mein expression evaluation rule-bound hoti hai. `++a` (prefix) ka matlab: "Pehle 1 jod do, fir equation mein use karo". `a++` (postfix) ka matlab: "Pehle abhi ki value use kar lo, baad mein 1 jod dena".',
          hi: 'सी में ऑपरेटर प्राथमिकता तय करती है कि कौन सा ऑपरेटर पहले हल होगा। प्रीफ़िक्स और पोस्टफ़िक्स के बीच अंतर समझना आवश्यक है।',
        },
        syntax: `int a = ++x; // prefix: x increments, then a becomes x\nint b = y++; // postfix: b becomes y, then y increments`,
        codeExample: `#include <stdio.h>

int main(void) {
    int x = 5;
    int y = 5;

    int prefixResult = ++x; // x becomes 6, prefixResult = 6
    int postfixResult = y++; // postfixResult = 5, then y becomes 6

    printf("Prefix:  x=%d, result=%d\\n", x, prefixResult);
    printf("Postfix: y=%d, result=%d\\n", y, postfixResult);

    // Compound precedence example
    int a = 10, b = 4, c = 2;
    int res = a + b * c; // b * c evaluates first (8), then 10 + 8 = 18
    printf("10 + 4 * 2 = %d\\n", res);

    return 0;
}`,
        expectedOutput: `Prefix:  x=6, result=6\nPostfix: y=6, result=5\n10 + 4 * 2 = 18`,
        variableTrace: [
          { step: 1, line: 'int x = 5, y = 5;', variables: { x: '5', y: '5' }, notes: 'Variables initialized in stack frame' },
          { step: 2, line: 'int prefixResult = ++x;', variables: { x: '6', prefixResult: '6' }, notes: 'x incremented to 6 immediately, assigned to prefixResult' },
          { step: 3, line: 'int postfixResult = y++;', variables: { y: '6', postfixResult: '5' }, notes: 'y old value (5) captured for postfixResult, then y incremented to 6' },
        ],
        commonMistakes: [
          {
            mistake: 'Modifying a variable multiple times in the same expression (Undefined Behavior)',
            incorrectSnippet: 'int i = 5;\nint x = i++ + ++i; // UNDEFINED BEHAVIOR!',
            correctSnippet: 'int i = 5;\ni++;\nint x = i + (i + 1);\ni++;',
            why: 'In C, modifying a scalar object more than once between sequence points invokes Undefined Behavior (UB). Different compilers produce different values.',
          },
        ],
        practiceQuestion: {
          question: 'If `int a = 3; int b = a++ * 2;`, what are the final values of `a` and `b`?',
          options: ['a = 4, b = 6', 'a = 4, b = 8', 'a = 3, b = 6', 'a = 3, b = 8'],
          correctAnswerIndex: 0,
          explanation: 'In postfix increment, a is used with its current value (3) for the multiplication: 3 * 2 = 6, so b = 6. Afterward, a is incremented to 4.',
        },
      },
      {
        id: 'lesson-03-02',
        moduleId: 'module-03',
        moduleTitle: 'Operators & Expression Evaluation',
        moduleNumber: 3,
        title: 'Bitwise Operators & Low-Level Manipulation',
        level: 'intermediate',
        estimatedMinutes: 20,
        summary: {
          en: 'Manipulate raw bits using AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<) and Right Shift (>>). Crucial for embedded systems and performance.',
          hinglish: 'Bits (0 aur 1) ke saath direct khelna: Bitwise AND (&), OR (|), XOR (^), Left Shift (<<) se number 2 se multiply hota hai aur Right Shift (>>) se 2 se divide hota hai.',
          hi: 'बिटवाइज़ ऑपरेटर सीधे बाइनरी बिट्स पर कार्य करते हैं। एम्बेडेड सिस्टम और तेज गणनाओं के लिए यह अत्यंत महत्वपूर्ण हैं।',
        },
        explanation: {
          en: 'Bitwise operators operate directly on individual bits of integer data types:\n- `&` (AND): Bit is 1 if both operands have 1.\n- `|` (OR): Bit is 1 if at least one operand has 1.\n- `^` (XOR): Bit is 1 if operands have differing bits (toggle flag).\n- `~` (NOT): Inverts all bits (one\'s complement).\n- `<<` (Left Shift): Shifting left by n bits multiplies the integer by 2^n.\n- `>>` (Right Shift): Shifting right by n bits divides positive integers by 2^n.',
          hinglish: 'C language ki sabse badi taaqat hardware control hai. Bitwise operators se aap microcontroller ki registers configure kar sakte hain, permissions check kar sakte hain, aur super fast math kar sakte hain. Jaise `x << 1` likhne se `x * 2` fast ho jata hai.',
          hi: 'बिटवाइज़ ऑपरेटर बाइनरी स्तर पर डेटा को प्रोसेस करते हैं। यह हार्डवेयर प्रोग्रामिंग और हाई-परफॉर्मेंस अल्गोरिदम में बहुत उपयोगी हैं।',
        },
        syntax: `int mask = (1 << bit_position);\nint isSet = value & mask;\nvalue |= mask;  // Set bit\nvalue &= ~mask; // Clear bit\nvalue ^= mask;  // Toggle bit`,
        codeExample: `#include <stdio.h>

int main(void) {
    unsigned char flags = 0b00000101; // 5 in binary (bits 0 and 2 are ON)

    // Check if bit 2 is set (mask = 1 << 2 = 4 = 0b00000100)
    int isBit2Set = (flags & (1 << 2)) != 0;
    printf("Is Bit 2 ON? %s\\n", isBit2Set ? "YES" : "NO");

    // Set bit 1 (mask = 1 << 1 = 2)
    flags |= (1 << 1);
    printf("After setting bit 1: flags = %d (binary 0b00000111)\\n", flags);

    // Fast multiply and divide by powers of 2
    int num = 7;
    printf("7 << 2 (7 * 4) = %d\\n", num << 2);
    printf("20 >> 2 (20 / 4) = %d\\n", 20 >> 2);

    return 0;
}`,
        expectedOutput: `Is Bit 2 ON? YES\nAfter setting bit 1: flags = 7 (binary 0b00000111)\n7 << 2 (7 * 4) = 28\n20 >> 2 (20 / 4) = 5`,
        commonMistakes: [
          {
            mistake: 'Confusing logical operators (&&, ||) with bitwise operators (&, |)',
            incorrectSnippet: 'if (a & b) { ... } // Evaluates bitwise mask, not logical boolean truth',
            correctSnippet: 'if (a && b) { ... } // Evaluates boolean truth with short-circuiting',
            why: '`&&` evaluates whether both expressions are non-zero with short-circuit evaluation. `&` evaluates binary bitwise AND without short-circuiting.',
          },
        ],
        practiceQuestion: {
          question: 'What is the result of evaluating `8 >> 2` in C?',
          options: ['32', '16', '2', '4'],
          correctAnswerIndex: 2,
          explanation: 'Right shifting an integer by 2 positions divides by 2^2 = 4. 8 / 4 = 2.',
        },
      },
    ],
  },
  {
    id: 'module-04',
    number: 4,
    title: 'Control Flow, Loops & Pattern Printing',
    subtitle: 'Decisions, Nested Iterations & Step Traces',
    badge: 'Logic & Loops',
    description: {
      en: 'Master decision making with if-else, switch-case, while, do-while, and for loops. Understand break, continue, and step-by-step loop iteration tables.',
      hinglish: 'Decisions lena (if, else if, switch) aur loops (for, while, do-while) ka execution flow. Step-by-step iteration tables se loops ke variables trace karna.',
      hi: 'शर्तें (if-else, switch), लूप्स (for, while, do-while), ब्रेक, कंटिन्यू और पैटर्न प्रिंटिंग। चरणबद्ध पुनरावृत्ति (Iteration) तालिकाओं के साथ।',
    },
    lessons: [
      {
        id: 'lesson-04-01',
        moduleId: 'module-04',
        moduleTitle: 'Control Flow, Loops & Pattern Printing',
        moduleNumber: 4,
        title: 'For Loops & Iteration Execution Table',
        level: 'beginner',
        estimatedMinutes: 20,
        summary: {
          en: 'Understand initialization, loop condition check, body execution, and step update with a transparent iteration trace table.',
          hinglish: '`for` loop ke 4 stages: initialization -> condition check -> loop body execute -> increment/update. Table ke zariye dekhein har step par variables kaise badalte hain.',
          hi: 'for लूप के निष्पादन का चरणबद्ध विश्लेषण। पुनरावृत्ति तालिका के माध्यम से वेरिएबल के मानों को ट्रैक करना।',
        },
        explanation: {
          en: 'A for loop executes in 4 distinct steps:\n1. Initialization: Executes once at the very start (`int i = 1`).\n2. Condition Evaluation: Before each iteration, checks if condition is true (`i <= 5`). If false, loop terminates.\n3. Body Execution: Statements inside `{ ... }` run.\n4. Update/Step: Executes at the bottom of each iteration (`i++`), then jumps back to Step 2.',
          hinglish: 'Loop ka matlab kisi kaam ko baar-baar repeat karna jab tak di gayi condition sach hai. `for (init; cond; update)` har round mein condition check karta hai. Jab condition false hoti hai, loop turant ruk jata hai.',
          hi: 'for लूप एक निश्चित संख्या में कोड ब्लॉक को दोहराने की अनुमति देता है। यह स्थिति की जांच करके तब तक चलता है जब तक वह सत्य रहती है।',
        },
        syntax: `for (initialization; test_condition; update_step) {\n    // Code to repeat\n}`,
        codeExample: `#include <stdio.h>

int main(void) {
    int sum = 0;

    for (int i = 1; i <= 4; i++) {
        sum += i;
        printf("Iteration %d: i=%d, sum=%d\\n", i, i, sum);
    }

    printf("Final Sum = %d\\n", sum);
    return 0;
}`,
        expectedOutput: `Iteration 1: i=1, sum=1\nIteration 2: i=2, sum=3\nIteration 3: i=3, sum=6\nIteration 4: i=4, sum=10\nFinal Sum = 10`,
        iterationTable: {
          columns: ['Step', 'Condition Check', 'Variables (i, sum)', 'Console Output', 'Next Action'],
          steps: [
            { step: 1, condition: 'i = 1 <= 4 (TRUE)', variables: { i: 1, sum: 1 }, output: 'Iteration 1: i=1, sum=1', explanation: 'i initialized to 1; sum becomes 0 + 1 = 1; i increments to 2' },
            { step: 2, condition: 'i = 2 <= 4 (TRUE)', variables: { i: 2, sum: 3 }, output: 'Iteration 2: i=2, sum=3', explanation: 'sum becomes 1 + 2 = 3; i increments to 3' },
            { step: 3, condition: 'i = 3 <= 4 (TRUE)', variables: { i: 3, sum: 6 }, output: 'Iteration 3: i=3, sum=6', explanation: 'sum becomes 3 + 3 = 6; i increments to 4' },
            { step: 4, condition: 'i = 4 <= 4 (TRUE)', variables: { i: 4, sum: 10 }, output: 'Iteration 4: i=4, sum=10', explanation: 'sum becomes 6 + 4 = 10; i increments to 5' },
            { step: 5, condition: 'i = 5 <= 4 (FALSE)', variables: { i: 5, sum: 10 }, output: 'Loop Exits', explanation: 'Condition 5 <= 4 is FALSE. Loop finishes.' },
          ],
        },
        commonMistakes: [
          {
            mistake: 'Off-by-one errors in loop boundaries',
            incorrectSnippet: 'for (int i = 0; i <= 5; i++) // Runs 6 times (0, 1, 2, 3, 4, 5)',
            correctSnippet: 'for (int i = 0; i < 5; i++)  // Runs exactly 5 times (0, 1, 2, 3, 4)',
            why: 'When iterating over an array of size N, indices range from 0 to N-1. Using <= N accesses out-of-bounds memory at index N.',
          },
          {
            mistake: 'Placing a semicolon right after for(...)',
            incorrectSnippet: 'for (int i = 0; i < 5; i++);\n{\n    printf("%d\\n", i);\n}',
            correctSnippet: 'for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}',
            why: 'A semicolon creates an empty body for the loop. The loop runs to completion doing nothing, and the subsequent block executes only once afterward.',
          },
        ],
        practiceQuestion: {
          question: 'How many times will `for (int k = 10; k > 0; k -= 3)` execute?',
          options: ['3 times', '4 times', '5 times', 'Infinite loop'],
          correctAnswerIndex: 1,
          explanation: 'Values of k during iterations: 10, 7, 4, 1. When decremented again, k becomes -2 which fails k > 0. Total iterations = 4.',
        },
      },
    ],
  },
  {
    id: 'module-05',
    number: 5,
    title: 'Functions, Scope & Storage Classes',
    subtitle: 'Modularity, Call-by-Value vs Reference, Stack Frames',
    badge: 'Functions',
    description: {
      en: 'Master function prototypes, parameter passing, return values, call stack activation records, recursion, variable scope, and storage classes (auto, register, static, extern).',
      hinglish: 'Functions banana, prototype declaration kyu zaroori hai, Call-by-Value vs Call-by-Reference ka farak, Call Stack kaise kaam karta hai, aur storage classes (`static`, `extern`).',
      hi: 'फ़ंक्शंस, प्रोटोटाइप, कॉल-बाय-वैल्यू, रिकर्शन (Recursion), वेरिएबल का दायरा (Scope) और स्टोरेज क्लासेस।',
    },
    lessons: [
      {
        id: 'lesson-05-01',
        moduleId: 'module-05',
        moduleTitle: 'Functions, Scope & Storage Classes',
        moduleNumber: 5,
        title: 'Function Prototypes, Stack Frames & Scope',
        level: 'beginner',
        estimatedMinutes: 20,
        summary: {
          en: 'Learn why forward declarations (prototypes) are needed, how arguments are copied by value, and how local variables reside on the CPU Call Stack.',
          hinglish: 'Compiler single-pass hota hai isliye function ka prototype upar declare karna zaroori hota hai. Function call hone par stack par ek naya frame banta hai.',
          hi: 'फ़ंक्शन प्रोटोटाइप की आवश्यकता, स्टैक फ्रेम्स और लोकल बनाम ग्लोबल स्कोप को समझें।',
        },
        explanation: {
          en: 'A function prototype informs the compiler about the function\'s name, return type, and parameter list before its actual definition appears. When a function is invoked, the CPU pushes a new "Stack Frame" containing its parameters and local variables. When the function returns, that stack frame is popped off and the memory is reclaimed.',
          hinglish: 'C compiler code ko upar se neeche padhta hai. Agar aap `main()` ke neeche function likhte hain, toh compiler ko upar batana padega ki "aisa function aane wala hai"—ise function prototype kehte hain. C mein by-default saare arguments "Call by Value" hote hain (original variable ki copy banti hai).',
          hi: 'फ़ंक्शन प्रोटोटाइप कंपाइलर को फलन के हस्ताक्षर के बारे में पहले ही सूचित कर देता है। स्टैक फ्रेम फ़ंक्शन के समाप्त होने पर नष्ट हो जाता है।',
        },
        syntax: `// Function Prototype (Forward Declaration)\nreturn_type function_name(param_type param1, param_type param2);\n\n// Function Definition\nreturn_type function_name(param_type param1, param_type param2) {\n    return result;\n}`,
        codeExample: `#include <stdio.h>

// 1. Function Prototype
int calculatePower(int base, int exp);

int main(void) {
    int b = 3, e = 4;
    int ans = calculatePower(b, e);
    printf("%d raised to power %d = %d\\n", b, e, ans);
    return 0;
}

// 2. Function Definition
int calculatePower(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}`,
        expectedOutput: `3 raised to power 4 = 81`,
        commonMistakes: [
          {
            mistake: 'Expecting changes to parameters to affect caller arguments (Call by Value misunderstanding)',
            incorrectSnippet: 'void swap(int a, int b) {\n    int temp = a; a = b; b = temp;\n}',
            correctSnippet: 'void swap(int *a, int *b) {\n    int temp = *a; *a = *b; *b = temp;\n}',
            why: 'In C, parameters receive copies of argument values. Modifying a and b only modifies the local stack copy. To modify caller variables, pass memory pointers (addresses).',
          },
        ],
        practiceQuestion: {
          question: 'What happens to local variables defined inside a standard C function when that function finishes executing and returns?',
          options: [
            'They are permanently stored on the Heap',
            'Their stack frame is popped and their storage is deallocated',
            'They are converted into global variables',
            'They remain cached in CPU registers indefinitely',
          ],
          correctAnswerIndex: 1,
          explanation: 'Local variables have automatic storage duration. Their memory lives inside the function\'s call stack frame and is deallocated immediately when the function returns.',
        },
      },
    ],
  },
  {
    id: 'module-06',
    number: 6,
    title: 'Arrays, Multidimensional Arrays & Strings',
    subtitle: 'Contiguous Memory, 2D Grids & Null-Terminated Strings',
    badge: 'Data Structures',
    description: {
      en: 'Contiguous memory layout of arrays, row-major order in 2D arrays, C-strings as null-terminated char arrays, and standard string.h functions (strlen, strcpy, strcat, strcmp).',
      hinglish: 'Arrays ki contiguous memory (ek ke baad ek bytes), 2D matrix ka row-major layout, C strings ka secret (`\\0` null terminator), aur string library functions.',
      hi: 'ऐरे की सन्निहित (Contiguous) मेमोरी, 2D ऐरे, नल-टर्मिनेटेड स्ट्रिंग्स और string.h लाइब्रेरी के महत्वपूर्ण फ़ंक्शंस।',
    },
    lessons: [
      {
        id: 'lesson-06-01',
        moduleId: 'module-06',
        moduleTitle: 'Arrays, Multidimensional Arrays & Strings',
        moduleNumber: 6,
        title: 'Arrays & The Null-Terminated String Protocol',
        level: 'beginner',
        estimatedMinutes: 22,
        summary: {
          en: 'Understand contiguous memory indexing, buffer overflows, and why every valid C string must terminate with the null byte (\'\\0\').',
          hinglish: 'C mein string koi alag data type nahi hai—yeh ek `char` array hota hai jiske aakhri mein `\\0` (null character) laga hota hai taaki functions ko pata chale string kahan khatam ho rahi hai.',
          hi: 'सी में स्ट्रिंग्स केवल कैरेक्टर ऐरे होते हैं जो \'\\0\' (नल कैरेक्टर) पर समाप्त होते हैं। बफर ओवरफ्लो से बचना सीखें।',
        },
        explanation: {
          en: 'An array is a collection of elements of the identical data type stored in contiguous memory locations. In C, arrays do NOT store their own length. For strings, C solves this by requiring a sentinel value: the null terminator character `\'\\0\'` (ASCII code 0). Standard functions like `printf("%s", str)` or `strlen(str)` traverse memory byte-by-byte until encountering `\'\\0\'`.',
          hinglish: 'Array ka matlab ek hi line mein consecutive memory blocks. Array ka naam `arr` darasal uske pehle element `&arr[0]` ka memory address hota hai. Jab hum string banate hain jaise "CODE", memory mein 5 bytes use hoti hain: \'C\', \'O\', \'D\', \'E\', aur \'\\0\'. Agar `\\0` nahi hoga toh computer tab tak aage ki RAM print karta rahega jab tak crash na ho jaye!',
          hi: 'ऐरे सन्निहित मेमोरी में समान प्रकार के तत्वों का संग्रह है। स्ट्रिंग्स के अंत में \'\\0\' होना अनिवार्य है, अन्यथा अपरिभाषित व्यवहार हो सकता है।',
        },
        syntax: `type arrayName[SIZE];\nchar str[SIZE] = "Hello"; // Implicitly appends '\\0'`,
        codeExample: `#include <stdio.h>
#include <string.h>

int main(void) {
    // Array of numbers
    int scores[4] = {88, 92, 79, 95};
    printf("First element: %d at address: %p\\n", scores[0], (void*)&scores[0]);
    printf("Second element: %d at address: %p\\n", scores[1], (void*)&scores[1]);
    // Notice addresses differ by exactly 4 bytes (sizeof(int))!

    // String demonstration
    char greeting[10] = "Hi!"; // 'H', 'i', '!', '\\0'
    printf("String: %s (Length: %zu, Array Size: %zu)\\n",
           greeting, strlen(greeting), sizeof(greeting));

    return 0;
}`,
        expectedOutput: `First element: 88 at address: 0x7fff1234a000\nSecond element: 92 at address: 0x7fff1234a004\nString: Hi! (Length: 3, Array Size: 10)`,
        commonMistakes: [
          {
            mistake: 'Allocating string array without room for the null terminator',
            incorrectSnippet: 'char name[4] = "John"; // 4 chars + 1 null byte needs 5 bytes! Buffer overflow!',
            correctSnippet: 'char name[5] = "John"; // Fits \'J\',\'o\',\'h\',\'n\',\'\\0\'',
            why: 'A string literal "John" has 4 characters plus 1 invisible terminating null byte. An array of size 4 cannot store the null byte, resulting in memory corruption.',
          },
          {
            mistake: 'Using unsafe gets() function instead of fgets()',
            incorrectSnippet: 'char buf[50];\ngets(buf); // DEPRECATED AND REMOVED IN C11 - HUGE SECURITY HOLE',
            correctSnippet: 'char buf[50];\nfgets(buf, sizeof(buf), stdin); // Safe: limits input to buffer size',
            why: 'gets() does not check buffer boundaries and was the root cause of historic buffer overflow exploits. Modern C strictly mandates fgets().',
          },
        ],
        practiceQuestion: {
          question: 'What is the minimum array size needed to store the string "Dennis Ritchie"?',
          options: ['14 bytes', '15 bytes', '16 bytes', '8 bytes'],
          correctAnswerIndex: 1,
          explanation: '"Dennis Ritchie" has 14 visible characters (including the space). Plus 1 byte for the null terminator \'\\0\' = 15 bytes minimum.',
        },
      },
    ],
  },
  {
    id: 'module-07',
    number: 7,
    title: 'Pointers & Memory Architecture',
    subtitle: 'Addresses, Dereferencing, Pointer Arithmetic & Function Pointers',
    badge: 'Mastery Core',
    description: {
      en: 'The definitive superpower of C: Pointer variables, memory addresses (&), dereferencing (*), pointer arithmetic, void pointers, double pointers, and function pointers.',
      hinglish: 'C ki asli taaqat: Pointers! Memory address (`&`), dereferencing (`*`), pointer arithmetic, array aur pointer ka relation, double pointer (`**ptr`), aur function pointers.',
      hi: 'पॉइंटर्स की संपूर्ण समझ: मेमोरी एड्रेस (&), डिरेफरेंसिंग (*), पॉइंटर अंकगणित, डबल पॉइंटर्स और फ़ंक्शन पॉइंटर्स।',
    },
    lessons: [
      {
        id: 'lesson-07-01',
        moduleId: 'module-07',
        moduleTitle: 'Pointers & Memory Architecture',
        moduleNumber: 7,
        title: 'Pointer Fundamentals: Addresses & Dereferencing',
        level: 'intermediate',
        estimatedMinutes: 25,
        summary: {
          en: 'A pointer is simply a variable whose value is the memory address of another variable. Learn & (address-of) and * (dereference) operators.',
          hinglish: 'Pointer koi mushkil cheez nahi hai—yeh bas ek normal variable hai jisme kisi doosre variable ka RAM address store hota hai. `&` se address milta hai, aur `*` se us address par rakhi value milti hai.',
          hi: 'पॉइंटर केवल एक ऐसा वेरिएबल है जो दूसरे वेरिएबल का मेमोरी एड्रेस स्टोर करता है। & से पता मिलता है और * से उस पते का मान।',
        },
        explanation: {
          en: 'Every byte in computer RAM has a unique hexadecimal numerical index called its Memory Address. When you write `int x = 42;`, the compiler places 42 at an address like `0x7ffee4b1`. A pointer variable `int *ptr = &x;` stores that address. Applying the dereference operator `*ptr` accesses the value living at that address directly, allowing you to read or mutate it.',
          hinglish: 'Imagine kijiye ek hotel jisme har room ka ek number hai (memory address). Room 104 mein "Rahul" rehta hai (variable value). Agar aap ek parchi par "Room 104" likh lete hain, toh woh parchi ek Pointer hai! `ptr` bolne par "Room 104" milega, aur `*ptr` bolne par room ke andar ka aadmi "Rahul" milega.',
          hi: 'कंप्यूटर रैम में प्रत्येक बाइट का एक विशिष्ट पता होता है। पॉइंटर उस पते को रखता है और डिरेफरेंसिंग द्वारा उस पते पर मौजूद डेटा को संशोधित किया जा सकता है।',
        },
        syntax: `int val = 100;\nint *ptr = &val;  // ptr holds address of val\n*ptr = 200;       // changes val directly to 200`,
        codeExample: `#include <stdio.h>

int main(void) {
    int target = 42;
    int *ptr = &target; // ptr stores address of target

    printf("Value of target:        %d\\n", target);
    printf("Address of target (&):  %p\\n", (void*)&target);
    printf("Value stored in ptr:    %p\\n", (void*)ptr);
    printf("Dereferenced (*ptr):    %d\\n", *ptr);

    // Mutating variable through pointer
    *ptr = 99;
    printf("After *ptr = 99, target is now: %d\\n", target);

    return 0;
}`,
        expectedOutput: `Value of target:        42\nAddress of target (&):  0x7ffd9820\nValue stored in ptr:    0x7ffd9820\nDereferenced (*ptr):    42\nAfter *ptr = 99, target is now: 99`,
        variableTrace: [
          { step: 1, line: 'int target = 42;', variables: { target: '42' }, notes: 'target allocated at address 0x7ffd9820 with value 42' },
          { step: 2, line: 'int *ptr = &target;', variables: { ptr: '0x7ffd9820' }, notes: 'ptr stores 0x7ffd9820 (address of target)' },
          { step: 3, line: '*ptr = 99;', variables: { '*ptr': '99', target: '99' }, notes: 'CPU follows pointer address and overwrites target memory with 99' },
        ],
        commonMistakes: [
          {
            mistake: 'Dereferencing an uninitialized (Wild) or NULL pointer',
            incorrectSnippet: 'int *ptr; // Uninitialized wild pointer pointing to garbage\n*ptr = 10; // CRASH! Segmentation fault / Memory corruption',
            correctSnippet: 'int *ptr = NULL;\nint x = 10;\nptr = &x;\n*ptr = 10; // Safe',
            why: 'An uninitialized pointer contains random garbage bits. Writing to it attempts to modify arbitrary kernel or invalid memory, causing an instant OS crash.',
          },
        ],
        practiceQuestion: {
          question: 'If `int x = 10; int *p = &x; *p += 5;`, what will `printf("%d", x);` output?',
          options: ['10', '15', '5', 'Segmentation fault'],
          correctAnswerIndex: 1,
          explanation: '*p dereferences to x. *p += 5 adds 5 directly to the memory location of x, making x = 15.',
        },
      },
    ],
  },
  {
    id: 'module-08',
    number: 8,
    title: 'Structures, Unions, Enums & Typedef',
    subtitle: 'User-Defined Types, Memory Layout & Struct Padding',
    badge: 'Composite Types',
    description: {
      en: 'Group heterogeneous data with structs, save memory with unions, define symbolic constants with enums, and understand CPU memory alignment and byte padding.',
      hinglish: 'Alag-alag data types ko ek saath jodne ke liye `struct`, memory bachane ke liye `union`, readable constants ke liye `enum`, aur CPU byte alignment aur padding.',
      hi: 'संरचनाएं (struct), यूनियन (union), गणनाएं (enum) और typedef। मेमोरी अलाइनमेंट और बाइट पैडिंग की गहरी समझ।',
    },
    lessons: [
      {
        id: 'lesson-08-01',
        moduleId: 'module-08',
        moduleTitle: 'Structures, Unions, Enums & Typedef',
        moduleNumber: 8,
        title: 'Structures & Memory Padding',
        level: 'intermediate',
        estimatedMinutes: 20,
        summary: {
          en: 'A struct bundles multiple variables into one custom record. Discover dot (.) and arrow (->) operators and why struct size is often larger than the sum of its members due to CPU alignment.',
          hinglish: 'Struct se hum apna custom data type banate hain (jaise Student: roll, name, marks). `.` operator se member access hota hai aur pointer ho toh `->` operator use karte hain.',
          hi: 'स्ट्रक्चर विभिन्न डेटा प्रकारों का एक बंडल है। सीपीयू अलाइनमेंट के कारण स्ट्रक्चर का आकार सदस्यों के योग से बड़ा हो सकता है।',
        },
        explanation: {
          en: 'A `struct` is a composite type that groups variables of different types under a single name. To access members from a value, use the dot operator `student.age`. To access members through a pointer, use the arrow operator `ptr->age` (which is shorthand for `(*ptr).age`). Modern CPUs fetch memory in 4 or 8-byte aligned words; hence, compilers inject invisible "padding bytes" between members to align them to native boundaries.',
          hinglish: 'Real-world data sirf ek integer ya float nahi hota; ek Student ke paas name, roll number aur marks sab hota hai. `struct` in sab ko ek container mein pack karta hai. Agar aapke paas struct ka pointer hai, toh `ptr->name` likhne se direct member milta hai.',
          hi: 'स्ट्रक्चर कई संबंधित वेरिएबल्स को एक साथ रखता है। पॉइंटर के साथ -> ऑपरेटर का उपयोग किया जाता है।',
        },
        syntax: `typedef struct {\n    int id;\n    char name[50];\n    float gpa;\n} Student;\n\nStudent s1 = {101, "Aman", 3.9f};\nStudent *sPtr = &s1;\nprintf("%s", sPtr->name);`,
        codeExample: `#include <stdio.h>

typedef struct {
    char id;     // 1 byte
    // 3 bytes padding injected here by compiler for 4-byte int alignment
    int score;   // 4 bytes
    double gpa;  // 8 bytes
} StudentRecord;

int main(void) {
    StudentRecord s = {'A', 95, 3.85};
    StudentRecord *ptr = &s;

    printf("Student Grade ID: %c\\n", ptr->id);
    printf("Student Score:    %d\\n", ptr->score);
    printf("Student GPA:      %.2f\\n", ptr->gpa);

    // Demonstration of struct alignment padding
    printf("Sum of member sizes: 1 + 4 + 8 = 13 bytes\\n");
    printf("Actual sizeof(StudentRecord): %zu bytes (padded to multiple of 8)!\\n", sizeof(StudentRecord));

    return 0;
}`,
        expectedOutput: `Student Grade ID: A\nStudent Score:    95\nStudent GPA:      3.85\nSum of member sizes: 1 + 4 + 8 = 13 bytes\nActual sizeof(StudentRecord): 16 bytes (padded to multiple of 8)!`,
        commonMistakes: [
          {
            mistake: 'Comparing two structs directly using == operator',
            incorrectSnippet: 'StudentRecord a, b;\nif (a == b) { ... } // COMPILER ERROR!',
            correctSnippet: 'if (a.id == b.id && a.score == b.score && a.gpa == b.gpa) { ... }',
            why: 'In C, the == operator cannot be applied to structs because invisible padding bytes may contain random garbage, making byte-by-byte comparison invalid.',
          },
        ],
        practiceQuestion: {
          question: 'If `struct Node *p;`, which expression is equivalent to `p->data`?',
          options: ['*p.data', '(*p).data', '&p.data', 'p.*data'],
          correctAnswerIndex: 1,
          explanation: 'The arrow operator -> is syntactic sugar for dereferencing the pointer first and then accessing the member: (*p).data.',
        },
      },
    ],
  },
  {
    id: 'module-09',
    number: 9,
    title: 'Dynamic Memory Allocation (Heap)',
    subtitle: 'malloc, calloc, realloc, free & Memory Leaks',
    badge: 'Memory Management',
    description: {
      en: 'Allocate runtime memory on the Heap using malloc, calloc, and realloc. Learn proper deallocation with free, preventing memory leaks and dangling pointers.',
      hinglish: 'Program chalte waqt Heap memory book karna: malloc (garbage value), calloc (zero initialized), realloc (size badhana/ghatana), aur free() na karne se hone wale Memory Leaks.',
      hi: 'डायनेमिक मेमोरी आवंटन (malloc, calloc, realloc, free)। मेमोरी लीक और डैंगलिंग पॉइंटर्स से बचने के नियम।',
    },
    lessons: [
      {
        id: 'lesson-09-01',
        moduleId: 'module-09',
        moduleTitle: 'Dynamic Memory Allocation (Heap)',
        moduleNumber: 9,
        title: 'malloc, free & Preventing Memory Leaks',
        level: 'intermediate',
        estimatedMinutes: 24,
        summary: {
          en: 'Dynamic memory lives on the Heap until explicitly freed. Master malloc allocation, NULL-checking, and setting freed pointers to NULL.',
          hinglish: 'Stack memory function khatam hote hi gayab ho jaati hai, lekin Heap par banai gayi memory tab tak rehti hai jab tak aap `free()` na karein. Agar free nahi kiya toh Memory Leak hota hai.',
          hi: 'Heap पर मेमोरी रनटाइम पर आवंटित होती है। free() द्वारा इसे मुक्त करना अनिवार्य है, अन्यथा मेमोरी लीक हो सकती है।',
        },
        explanation: {
          en: 'While stack memory is managed automatically by function frames, the Heap allows dynamic allocation whose size can be determined at runtime. `malloc(bytes)` requests contiguous uninitialized bytes from the OS. If RAM is exhausted, it returns `NULL`. You must always check for `NULL`, and call `free(ptr)` when done. Once freed, set `ptr = NULL;` to prevent dangling pointer bugs.',
          hinglish: 'Agar aapko pehle se nahi pata ki user kitne elements ka array chahta hai, toh aap `malloc` se user ki demand par Heap se memory mangte hain. Hamesha check karein `if (ptr == NULL)` taaki agar RAM khatam ho toh program gracefully handle kare. Kaam hone par `free(ptr)` zaroor karein!',
          hi: 'malloc हीप से मेमोरी आवंटित करता है। यदि आवंटन विफल रहता है, तो यह NULL लौटाता है। काम पूरा होने पर free() का उपयोग करें।',
        },
        syntax: `int *arr = (int*)malloc(n * sizeof(int));\nif (arr == NULL) {\n    // Allocation failed handle error\n}\n// Use arr...\nfree(arr);\narr = NULL; // Prevent dangling pointer`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int count = 3;

    // Allocate array of 3 integers on the Heap
    int *numbers = (int*)malloc(count * sizeof(int));

    // Crucial check: verify memory allocation succeeded
    if (numbers == NULL) {
        printf("Failed to allocate heap memory!\\n");
        return 1;
    }

    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;

    for (int i = 0; i < count; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }

    // Always release allocated heap memory
    free(numbers);
    numbers = NULL; // Defend against dangling pointer

    printf("Heap memory freed safely.\\n");
    return 0;
}`,
        expectedOutput: `numbers[0] = 10\nnumbers[1] = 20\nnumbers[2] = 30\nHeap memory freed safely.`,
        commonMistakes: [
          {
            mistake: 'Using memory after calling free() (Dangling Pointer / Use-After-Free)',
            incorrectSnippet: 'free(ptr);\nprintf("%d", *ptr); // UNDEFINED BEHAVIOR: Use After Free!',
            correctSnippet: 'free(ptr);\nptr = NULL; // ptr is now safely disarmed',
            why: 'Once memory is freed, the allocator may hand that address to another thread or subsystem. Reading or writing to it causes silent data corruption or security vulnerabilities.',
          },
          {
            mistake: 'Forgetting to free allocated memory (Memory Leak)',
            incorrectSnippet: 'void process() {\n    int *data = malloc(1000 * sizeof(int));\n    // returns without free(data)\n}',
            correctSnippet: 'void process() {\n    int *data = malloc(1000 * sizeof(int));\n    // ... work ...\n    free(data);\n}',
            why: 'Every byte allocated on the heap remains reserved until freed. In long-running programs (like servers), repeated leaks will exhaust system RAM and cause the OS to kill the process.',
          },
        ],
        practiceQuestion: {
          question: 'What is the primary difference between `malloc()` and `calloc()`?',
          options: [
            'malloc allocates on the Stack while calloc allocates on the Heap',
            'calloc zeroes out all allocated memory bytes, while malloc leaves memory uninitialized',
            'malloc takes two parameters, calloc takes one',
            'calloc cannot return NULL on failure',
          ],
          correctAnswerIndex: 1,
          explanation: 'malloc() allocates uninitialized memory containing random garbage bits. calloc() initializes every allocated byte to binary zero.',
        },
      },
    ],
  },
  {
    id: 'module-10',
    number: 10,
    title: 'File Handling & Persistent I/O',
    subtitle: 'Text vs Binary Files, Streams, Buffering & File Pointers',
    badge: 'Persistence',
    description: {
      en: 'Work with disk files using standard C file streams: fopen modes (r, w, a, rb, wb), fclose, fprintf, fscanf, fgets, fread, fwrite, and error handling with feof and ferror.',
      hinglish: 'Hard drive par data save karna: `FILE *fp`, file open modes (`r`, `w`, `a`), text files vs binary files, `fread`/`fwrite`, aur file close (`fclose`) karna.',
      hi: 'फ़ाइल हैंडलिंग: टेक्स्ट और बाइनरी फ़ाइलें, fopen, fclose, fprintf, fscanf, fread, fwrite और त्रुटि निवारण।',
    },
    lessons: [
      {
        id: 'lesson-10-01',
        moduleId: 'module-10',
        moduleTitle: 'File Handling & Persistent I/O',
        moduleNumber: 10,
        title: 'Working with Text & Binary Files',
        level: 'intermediate',
        estimatedMinutes: 22,
        summary: {
          en: 'Learn file stream pointers (FILE *), opening files safely, writing records, reading line by line, and checking EOF.',
          hinglish: 'File se data read/write karne ke liye standard library `FILE *` pointer deti hai. File na milne par NULL check karna aur open files ko `fclose()` se band karna zaroori hai.',
          hi: 'फ़ाइल पॉइंटर्स (FILE *), सुरक्षित फ़ाइल खोलना, लाइन-दर-लाइन पढ़ना और EOF की जांच करना।',
        },
        explanation: {
          en: 'All persistent file I/O in C flows through buffered streams represented by the opaque `FILE *` pointer type. `fopen("filename", "mode")` connects your program to a disk file. Modes include "w" (overwrite), "a" (append), "r" (read), and binary variants "wb", "rb". Because files might be missing or locked, always verify `fp != NULL` before calling `fprintf`, `fputs`, or `fscanf`.',
          hinglish: 'Jab program band hota hai, RAM ka data khatam ho jata hai. Persistent data store karne ke liye hum hard disk par file banate hain. `fopen()` file kholta hai. Agar file successfully khul gayi toh pointer milta hai, varna `NULL`. Har open file ko `fclose(fp)` se close karna padta hai taaki buffer disk par flush ho sake.',
          hi: 'सी में डिस्क फ़ाइलों को प्रबंधित करने के लिए FILE पॉइंटर का उपयोग किया जाता है। फाइल खोलने के बाद हमेशा NULL की जांच करें और अंत में fclose() करें।',
        },
        syntax: `FILE *fp = fopen("data.txt", "w");\nif (fp == NULL) { perror("Error opening file"); return 1; }\nfprintf(fp, "Name: %s\\n", "Aman");\nfclose(fp);`,
        codeExample: `#include <stdio.h>

int main(void) {
    const char *filename = "test_log.txt";

    // 1. Write to file
    FILE *outFile = fopen(filename, "w");
    if (outFile == NULL) {
        printf("Failed to create file!\\n");
        return 1;
    }
    fprintf(outFile, "C Tutor AI Learning Record\\n");
    fprintf(outFile, "Score: 100\\n");
    fclose(outFile); // Flushes OS buffers and closes descriptor

    // 2. Read back from file
    FILE *inFile = fopen(filename, "r");
    if (inFile == NULL) {
        printf("Failed to open file for reading!\\n");
        return 1;
    }

    char buffer[128];
    printf("--- File Contents ---\\n");
    while (fgets(buffer, sizeof(buffer), inFile) != NULL) {
        printf("%s", buffer);
    }
    fclose(inFile);

    return 0;
}`,
        expectedOutput: `--- File Contents ---\nC Tutor AI Learning Record\nScore: 100`,
        commonMistakes: [
          {
            mistake: 'Checking feof() before attempting a read operation',
            incorrectSnippet: 'while (!feof(fp)) {\n    fscanf(fp, "%d", &num);\n    printf("%d ", num); // Prints last element twice!\n}',
            correctSnippet: 'while (fscanf(fp, "%d", &num) == 1) {\n    printf("%d ", num); // Correct\n}',
            why: 'feof() only returns true AFTER a read operation has already failed upon encountering End-Of-File. Checking feof() first causes the loop to process garbage once more.',
          },
        ],
        practiceQuestion: {
          question: 'What does `fopen("records.txt", "w")` do if the file "records.txt" already exists on disk?',
          options: [
            'It returns NULL and does nothing',
            'It appends new data to the end of the existing file',
            'It truncates (erases) the existing contents to 0 bytes and creates a fresh empty file',
            'It throws a runtime exception',
          ],
          correctAnswerIndex: 2,
          explanation: 'The "w" mode immediately truncates any existing file with that name to zero length. If you wish to preserve existing content, use "a" (append) mode.',
        },
      },
    ],
  },
  {
    id: 'module-11',
    number: 11,
    title: 'Preprocessor Directives & Modular C',
    subtitle: 'Macros, Header Guards, Conditional Compilation & Multi-File Architecture',
    badge: 'Architecture',
    description: {
      en: 'Write production-grade multi-file C programs: #include, #define macros, parameterized macros, header guards (#ifndef, #define, #endif), and static functions.',
      hinglish: 'Professional multi-file C projects banana: Header guards (`#ifndef`), Macros ke fayde aur pitfalls, `#ifdef` conditional compilation, aur separate compilation.',
      hi: 'प्रीप्रोसेसर निर्देश, हेडर गार्ड्स (#ifndef), मैक्रोज़ और बहु-फ़ाइल (Modular) सी प्रोग्रामिंग।',
    },
    lessons: [
      {
        id: 'lesson-11-01',
        moduleId: 'module-11',
        moduleTitle: 'Preprocessor Directives & Modular C',
        moduleNumber: 11,
        title: 'Header Guards & Macro Hygiene',
        level: 'intermediate',
        estimatedMinutes: 18,
        summary: {
          en: 'Prevent double-inclusion errors with header guards and understand why macro arguments must always be wrapped in parentheses.',
          hinglish: 'Header files ko baar-baar include hone se bachane ke liye Header Guard lagate hain. Macro banate waqt har argument ke aaspas brackets `()` lagana kyu zaroori hota hai.',
          hi: 'हेडर गार्ड्स डुप्लिकेट डेफिनिशन को रोकते हैं। मैक्रोज़ में पैरेंट्थेसिस () का सही उपयोग सुरक्षित कोड बनाता है।',
        },
        explanation: {
          en: 'In large C projects, multiple `.c` files include the same header files (like `types.h`). Without header guards, the preprocessor pastes the declarations multiple times, resulting in "redefinition of type" compiler errors. A header guard `#ifndef MY_HEADER_H ... #endif` guarantees the header is evaluated exactly once per translation unit.',
          hinglish: 'Jab project bada hota hai, hum alag-alag `.h` files banate hain. Agar file A ne `student.h` include kiya aur file B ne bhi kiya, toh compiler bolega "student struct do baar declare ho gaya". Header guards (`#ifndef MY_HEADER_H`) se compiler pehli baar ke baad dobara include nahi karta.',
          hi: 'हेडर गार्ड्स यह सुनिश्चित करते हैं कि किसी हेडर फ़ाइल को संकलन के दौरान केवल एक बार शामिल किया जाए।',
        },
        syntax: `// In my_math.h:\n#ifndef MY_MATH_H\n#define MY_MATH_H\n\n#define SQUARE(x) ((x) * (x))\nint add(int a, int b);\n\n#endif // MY_MATH_H`,
        codeExample: `#include <stdio.h>

// Flawed macro vs Correct parenthesized macro
#define FLAWED_SQUARE(x) x * x
#define SAFE_SQUARE(x)   ((x) * (x))

int main(void) {
    // Evaluating FLAWED_SQUARE(2 + 3) expands literally to: 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11!
    int bad = FLAWED_SQUARE(2 + 3);

    // Evaluating SAFE_SQUARE(2 + 3) expands safely to: ((2 + 3) * (2 + 3)) = (5 * 5) = 25!
    int good = SAFE_SQUARE(2 + 3);

    printf("Flawed macro result: %d (Expected 25!)\\n", bad);
    printf("Safe macro result:   %d\\n", good);

    return 0;
}`,
        expectedOutput: `Flawed macro result: 11 (Expected 25!)\nSafe macro result:   25`,
        commonMistakes: [
          {
            mistake: 'Passing expressions with side-effects into macros',
            incorrectSnippet: 'int i = 2;\nint sq = SAFE_SQUARE(i++); // Expands to: ((i++) * (i++)) - i is incremented twice!',
            correctSnippet: 'int i = 2;\nint val = i;\ni++;\nint sq = SAFE_SQUARE(val);',
            why: 'Macros perform naive text replacement. If an argument has side effects (like ++ or --), it will be evaluated multiple times, creating dangerous bugs.',
          },
        ],
        practiceQuestion: {
          question: 'Why are header guards (#ifndef ... #define ... #endif) placed in C header files?',
          options: [
            'To encrypt the source code against reverse engineering',
            'To prevent multiple inclusion errors when a header is included in multiple places',
            'To speed up CPU clock cycles',
            'To allow functions to access private variables',
          ],
          correctAnswerIndex: 1,
          explanation: 'Header guards ensure that the C preprocessor processes the header contents only once per compilation unit, preventing duplicate declaration errors.',
        },
      },
    ],
  },
  {
    id: 'module-12',
    number: 12,
    title: 'Command Line, Debugging & Undefined Behavior',
    subtitle: 'argc/argv, GDB, Valgrind, Compiler Warnings & Undefined Behavior',
    badge: 'Pro Engineering',
    description: {
      en: 'Command-line arguments (argc, argv), compiler warning flags (-Wall -Wextra -Werror), GDB debugger fundamentals, memory sanitation, and avoiding Undefined Behavior (UB).',
      hinglish: 'Terminal arguments (`int argc, char *argv[]`), compiler flags (`-Wall -Wextra`), GDB se debugging, Valgrind se memory leaks dhundna, aur Undefined Behavior (UB) ke traps.',
      hi: 'कमांड-लाइन तर्क (argc, argv), डीबगिंग तकनीक, कंपाइलर चेतावनियां और सी में अपरिभाषित व्यवहार (Undefined Behavior) से बचाव।',
    },
    lessons: [
      {
        id: 'lesson-12-01',
        moduleId: 'module-12',
        moduleTitle: 'Command Line, Debugging & Undefined Behavior',
        moduleNumber: 12,
        title: 'Command Line Arguments & Undefined Behavior',
        level: 'advanced',
        estimatedMinutes: 22,
        summary: {
          en: 'Inspect argc and argv[] to accept CLI arguments. Understand why Undefined Behavior (UB) is the most critical hazard in professional C systems.',
          hinglish: 'CLI arguments kaise read karte hain (`argv[0]` program name hota hai). Undefined Behavior ka matlab: C standard koi guarantee nahi deta, program crash bhi ho sakta hai ya galat output de sakta hai.',
          hi: 'कमांड-लाइन तर्क और सी प्रोग्रामिंग में अपरिभाषित व्यवहार (UB) के गंभीर खतरों को समझें।',
        },
        explanation: {
          en: 'C programs receive command-line inputs through `main(int argc, char *argv[])`:\n- `argc` (argument count): Number of arguments passed, including program executable name.\n- `argv` (argument vector): Array of strings (`char*`), where `argv[0]` is the program name.\nUndefined Behavior (UB) refers to code where the ISO C specification imposes no requirements. If code invokes UB (e.g., dividing by zero, signed integer overflow, reading uninitialized variables, dereferencing null pointers), the compiler optimizer is free to assume it never happens, often leading to subtle bugs or exploitable vulnerabilities.',
          hinglish: 'Jab aap terminal par command likhte hain jaise `./app input.txt 50`, `argc` ki value 3 hoti hai aur `argv` mein strings hote hain. Undefined Behavior C ka sabse bada khatra hai—agar aapne uninitialized variable padh liya ya array boundary ke bahar chale gaye, compiler ajeeb tareeqe se optimize karke code ko corrupt kar sakta hai.',
          hi: 'कमांड लाइन तर्क argv ऐरे के माध्यम से प्राप्त होते हैं। अपरिभाषित व्यवहार कोड को अप्रत्याशित बना देता है।',
        },
        syntax: `int main(int argc, char *argv[]) {\n    for (int i = 0; i < argc; i++) {\n        printf("argv[%d] = %s\\n", i, argv[i]);\n    }\n    return 0;\n}`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    printf("Total Arguments: %d\\n", argc);

    // argv[0] is always the program binary name
    printf("Program Name: %s\\n", argv[0]);

    if (argc < 2) {
        printf("Usage: %s <number>\\n", argv[0]);
        return 1;
    }

    // Convert string argument to integer safely
    int val = atoi(argv[1]);
    printf("Parsed input number: %d (Doubled = %d)\\n", val, val * 2);

    return 0;
}`,
        expectedOutput: `Total Arguments: 2\nProgram Name: ./calc\nParsed input number: 25 (Doubled = 50)`,
        commonMistakes: [
          {
            mistake: 'Accessing argv[i] without checking if i < argc',
            incorrectSnippet: 'char *param = argv[1]; // If user ran ./app without args, argv[1] is NULL! Crash!',
            correctSnippet: 'if (argc > 1) {\n    char *param = argv[1];\n}',
            why: 'If the user provides no command line arguments, accessing argv[1] reads out-of-bounds or dereferences NULL.',
          },
        ],
        practiceQuestion: {
          question: 'In standard C, what does `argv[0]` always contain?',
          options: [
            'The first argument passed by the user',
            'The total number of CPU threads',
            'The name or path used to invoke the program executable',
            'A pointer to the operating system kernel',
          ],
          correctAnswerIndex: 2,
          explanation: 'By convention, argv[0] is the string representing the command or filename used to launch the program.',
        },
      },
    ],
  },
  {
    id: 'module-13',
    number: 13,
    title: 'Data Structures in C & Interview Prep',
    subtitle: 'Linked Lists, Stacks, Queues & Technical Interviews',
    badge: 'Algorithms & DSA',
    description: {
      en: 'Implement classical data structures in C from scratch: Singly Linked List, Stack (LIFO), Queue (FIFO), Big-O time complexity analysis, and top technical interview questions.',
      hinglish: 'C mein Data Structures scratch se banana: Linked List node pointers, Stack (LIFO push/pop), Queue, Big-O complexity, aur top C interview questions.',
      hi: 'डेटा संरचनाएं (लिंक्ड लिस्ट, स्टैक, कतार), बिग-ओ जटिलता और तकनीकी साक्षात्कार की तैयारी।',
    },
    lessons: [
      {
        id: 'lesson-13-01',
        moduleId: 'module-13',
        moduleTitle: 'Data Structures in C & Interview Prep',
        moduleNumber: 13,
        title: 'Building a Singly Linked List from Scratch',
        level: 'advanced',
        estimatedMinutes: 26,
        summary: {
          en: 'Create dynamic nodes with struct and pointers. Master node creation, head insertion, traversal, and clean memory deallocation.',
          hinglish: 'Linked list ek aisi chain hai jisme har element (Node) ke paas do cheezein hoti hain: data aur agle node ka pointer (`next`). Array ki tarah iska size fixed nahi hota.',
          hi: 'लिंक्ड लिस्ट नोड्स और पॉइंटर्स की एक गतिशील श्रृंखला है। नोड निर्माण, ट्रैवर्सल और मेमोरी को सुरक्षित रूप से मुक्त करना सीखें।',
        },
        explanation: {
          en: 'Unlike arrays which require fixed contiguous memory, a Linked List consists of independently allocated heap structures called Nodes. Each node contains a `data` field and a self-referential pointer `struct Node *next` pointing to the next node in the chain. The last node points to `NULL`.',
          hinglish: 'Array mein naya element beech mein daalna mehenga hota hai kyunki baaki saare elements shift karne padte hain. Linked list mein hum bas pointers change karte hain. Lekin random access `arr[5]` nahi hota; shuru se chal kar jana padta hai.',
          hi: 'लिंक्ड लिस्ट में नोड्स स्वतंत्र रूप से हीप पर बनते हैं और पॉइंटर्स के माध्यम से एक-दूसरे से जुड़े होते हैं।',
        },
        syntax: `typedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode *head = NULL;`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Insert a new node at the front of the list (O(1) time)
void pushFront(Node **headRef, int newData) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = newData;
    newNode->next = *headRef;
    *headRef = newNode;
}

int main(void) {
    Node *head = NULL;

    pushFront(&head, 30);
    pushFront(&head, 20);
    pushFront(&head, 10);

    // Print list
    printf("Linked List contents:\\n");
    Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");

    // Clean up memory
    curr = head;
    while (curr != NULL) {
        Node *temp = curr;
        curr = curr->next;
        free(temp);
    }

    return 0;
}`,
        expectedOutput: `Linked List contents:\n[10] -> [20] -> [30] -> NULL`,
        commonMistakes: [
          {
            mistake: 'Accessing temp->next after freeing temp during list deletion',
            incorrectSnippet: 'while (head != NULL) {\n    free(head);\n    head = head->next; // CRASH! Accessing freed memory!\n}',
            correctSnippet: 'while (head != NULL) {\n    Node *next = head->next;\n    free(head);\n    head = next; // Safe\n}',
            why: 'Once head is freed, head->next points to invalid memory. You must save the next pointer in a temporary variable BEFORE freeing the current node.',
          },
        ],
        practiceQuestion: {
          question: 'What is the time complexity to insert a new node at the head (beginning) of a singly linked list?',
          options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
          correctAnswerIndex: 1,
          explanation: 'Inserting at the head requires only allocating the new node, setting its next pointer to head, and updating head. This takes constant O(1) time.',
        },
      },
    ],
  },
  {
    id: 'module-14',
    number: 14,
    title: 'Capstone Practical Projects',
    subtitle: 'Real-World C Software: Calculators, Games & Record Systems',
    badge: 'Projects',
    description: {
      en: 'Synthesize everything you have learned by building complete, runnable practical projects: Scientific Calculator, Number Guessing Game, Student Record Manager, and File-Based Contact Book.',
      hinglish: 'Ab tak sikhi gayi saari cheezon ko mila kar poore projects banana: Scientific Calculator, Number Guessing Game, Student Record Manager, aur Contact Book.',
      hi: 'व्यावहारिक सी प्रोजेक्ट्स: वैज्ञानिक कैलकुलेटर, नंबर गेसिंग गेम, छात्र रिकॉर्ड प्रबंधक और फ़ाइल-आधारित संपर्क पुस्तिका।',
    },
    lessons: [
      {
        id: 'lesson-14-01',
        moduleId: 'module-14',
        moduleTitle: 'Capstone Practical Projects',
        moduleNumber: 14,
        title: 'Project 1: Robust Menu-Driven Calculator',
        level: 'beginner',
        estimatedMinutes: 20,
        summary: {
          en: 'Build a modular CLI calculator with input validation, divide-by-zero checks, and clean loop control.',
          hinglish: 'Ek solid interactive calculator banayein jo zero division errors ko handle kare aur user se baar-baar choices le sake.',
          hi: 'इनपुट सत्यापन और शून्य से विभाजन की जांच के साथ एक मेनू-संचालित कैलकुलेटर का निर्माण।',
        },
        explanation: {
          en: 'This project demonstrates clean architecture using functions, while-loop menus, switch statements, and error checking for divide-by-zero math conditions.',
          hinglish: 'Yeh project dikhata hai ki functions, switch case aur input validation ko ek saath jodkar real application kaise banti hai.',
          hi: 'यह प्रोजेक्ट फ़ंक्शंस, स्विच केस और त्रुटि हैंडलिंग को जोड़ता है।',
        },
        codeExample: `#include <stdio.h>

void printMenu(void) {
    printf("\\n=== C CALCULATOR ===\\n");
    printf("1. Add\\n2. Subtract\\n3. Multiply\\n4. Divide\\n5. Exit\\n");
    printf("Enter choice (1-5): ");
}

int main(void) {
    int choice;
    double a, b, result;

    while (1) {
        printMenu();
        if (scanf("%d", &choice) != 1 || choice == 5) {
            printf("Exiting calculator. Goodbye!\\n");
            break;
        }

        printf("Enter two numbers: ");
        scanf("%lf %lf", &a, &b);

        switch (choice) {
            case 1: result = a + b; printf("Result: %.2f\\n", result); break;
            case 2: result = a - b; printf("Result: %.2f\\n", result); break;
            case 3: result = a * b; printf("Result: %.2f\\n", result); break;
            case 4:
                if (b == 0.0) {
                    printf("Error: Division by zero is undefined!\\n");
                } else {
                    result = a / b;
                    printf("Result: %.2f\\n", result);
                }
                break;
            default:
                printf("Invalid choice! Please choose 1-5.\\n");
        }
    }
    return 0;
}`,
        expectedOutput: `=== C CALCULATOR ===\n1. Add\n2. Subtract\n3. Multiply\n4. Divide\n5. Exit\nEnter choice (1-5): 1\nEnter two numbers: 12 8\nResult: 20.00\nExiting calculator. Goodbye!`,
        commonMistakes: [
          {
            mistake: 'Failing to guard against floating-point or integer division by zero',
            incorrectSnippet: 'double res = a / b; // Crashes or produces Infinity if b == 0.0',
            correctSnippet: 'if (b == 0.0) { /* handle error */ } else { double res = a / b; }',
            why: 'Division by zero is undefined in mathematics and causes fatal arithmetic exceptions or IEEE floating-point Infinity.',
          },
        ],
        practiceQuestion: {
          question: 'What is the purpose of the `break` statement inside each `case` block of a `switch` statement in C?',
          options: [
            'To restart the program from main()',
            'To prevent "fall-through" execution into subsequent case blocks',
            'To free stack variables',
            'To exit the entire operating system',
          ],
          correctAnswerIndex: 1,
          explanation: 'In C, without a break statement, control flows directly into the code of the next case statement (fall-through), regardless of whether its condition matched.',
        },
      },
      {
        id: 'lesson-14-02',
        moduleId: 'module-14',
        moduleTitle: 'Capstone Practical Projects',
        moduleNumber: 14,
        title: 'Project 2: Student Record Manager with Structs & Files',
        level: 'intermediate',
        estimatedMinutes: 30,
        summary: {
          en: 'A complete practical CRUD application storing student records (ID, name, grade) using structs and saving to disk files.',
          hinglish: 'Ek complete CRUD project jisme student records ko struct array mein rakha jata hai aur hard disk file mein save karke reload kiya jata hai.',
          hi: 'स्ट्रक्चर और फ़ाइल हैंडलिंग का उपयोग करके छात्रों के रिकॉर्ड का संपूर्ण प्रबंधन (CRUD)।',
        },
        explanation: {
          en: 'This capstone project combines structs, array of structures, pointer passing, string manipulation, file saving with fprintf, and reading back with fscanf.',
          hinglish: 'Yeh project industry-level C coding ka standard example hai: User records input karega, struct array mein store hoga, aur file mein permanent save ho jayega.',
          hi: 'यह प्रोजेक्ट स्ट्रक्चर्स, पॉइंटर्स और डिस्क फाइल स्टोरेज को एक साथ जोड़ता है।',
        },
        codeExample: `#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 10

typedef struct {
    int id;
    char name[32];
    float marks;
} Student;

int main(void) {
    Student roster[MAX_STUDENTS];
    int count = 2;

    // Initialize two records
    roster[0].id = 101;
    strncpy(roster[0].name, "Aman Sharma", 32);
    roster[0].marks = 94.5f;

    roster[1].id = 102;
    strncpy(roster[1].name, "Priya Patel", 32);
    roster[1].marks = 98.0f;

    // Display formatted table
    printf("=== STUDENT RECORD ROSTER ===\\n");
    printf("%-6s %-16s %-6s\\n", "ID", "Name", "Marks");
    printf("------------------------------\\n");
    for (int i = 0; i < count; i++) {
        printf("%-6d %-16s %-6.2f\\n", roster[i].id, roster[i].name, roster[i].marks);
    }

    return 0;
}`,
        expectedOutput: `=== STUDENT RECORD ROSTER ===\nID     Name             Marks \n------------------------------\n101    Aman Sharma      94.50 \n102    Priya Patel      98.00`,
        commonMistakes: [
          {
            mistake: 'Using strcpy instead of strncpy for fixed-size struct char arrays',
            incorrectSnippet: 'strcpy(s.name, longInput); // Unbounded copy causes buffer overflow!',
            correctSnippet: 'strncpy(s.name, longInput, sizeof(s.name) - 1);\ns.name[sizeof(s.name) - 1] = \'\\0\';',
            why: 'strcpy does not enforce maximum destination length. If input exceeds the array size, it clobbers adjacent struct fields.',
          },
        ],
        practiceQuestion: {
          question: 'Why should you always null-terminate the destination buffer after calling `strncpy()`?',
          options: [
            'Because strncpy does not append a null byte if the source string length equals or exceeds the specified size limit',
            'Because strncpy converts characters into uppercase',
            'Because the operating system requires an uppercase letter',
            'Because strncpy returns a float',
          ],
          correctAnswerIndex: 0,
          explanation: 'If the source string length is greater than or equal to n, strncpy copies n bytes WITHOUT appending a null terminator. Explicitly setting str[n-1] = \'\\0\' prevents memory leaks and crashes.',
        },
      },
    ],
  },
];
