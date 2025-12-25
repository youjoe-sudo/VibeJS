// VibeJS Experiments - JS Playground Logic
// Safe code execution using iframe with srcdoc

document.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('runBtn');
  const clearBtn = document.getElementById('clearBtn');
  const resetBtn = document.getElementById('resetBtn');
  const codeArea = document.getElementById('codeArea');
  const outputFrame = document.getElementById('outputFrame');

  if (!runBtn || !codeArea || !outputFrame) {
    console.warn('Playground elements not found on this page');
    return;
  }

  // Default example code
  const defaultCode = `// مرحباً بك في مختبر JavaScript!
// Welcome to the JavaScript Lab!

// جرب هذا المثال:
// Try this example:

const message = "Hello from VibeJS! 🚀";
console.log(message);

// إنشاء عنصر في الصفحة
// Create an element on the page
const app = document.getElementById('app');
app.innerHTML = \`
  <div style="text-align: center; padding: 20px;">
    <h2 style="color: #0d6efd;">\${message}</h2>
    <p>أكتب كودك هنا وشاهد النتيجة!</p>
    <p>Write your code here and see the result!</p>
  </div>
\`;`;

  // Set default code if empty
  if (!codeArea.value.trim()) {
    codeArea.value = defaultCode;
  }

  // Run code
  runBtn.addEventListener('click', () => {
    runCode();
  });

  // Clear output
  clearBtn?.addEventListener('click', () => {
    clearOutput();
  });

  // Reset to default
  resetBtn?.addEventListener('click', () => {
    codeArea.value = defaultCode;
    clearOutput();
  });

  // Keyboard shortcuts
  codeArea.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }

    // Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeArea.selectionStart;
      const end = codeArea.selectionEnd;
      codeArea.value = codeArea.value.substring(0, start) + '  ' + codeArea.value.substring(end);
      codeArea.selectionStart = codeArea.selectionEnd = start + 2;
    }
  });

  function runCode() {
    const code = codeArea.value;

    // Create iframe content with error handling
    const srcdoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 20px;
            background: #f8f9fa;
          }
          #app {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .error {
            color: #dc3545;
            background: #f8d7da;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #dc3545;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            word-break: break-word;
          }
          .console-log {
            background: #e7f3ff;
            padding: 10px;
            margin: 5px 0;
            border-radius: 4px;
            border-left: 3px solid #0d6efd;
            font-family: 'Courier New', monospace;
          }
        </style>
      </head>
      <body>
        <div id="app"></div>
        <script>
          // Override console.log to display in page
          const originalLog = console.log;
          console.log = function(...args) {
            originalLog.apply(console, args);
            const logDiv = document.createElement('div');
            logDiv.className = 'console-log';
            logDiv.textContent = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            document.body.appendChild(logDiv);
          };

          // Error handling
          window.onerror = function(message, source, lineno, colno, error) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = '❌ Error: ' + message + '\\nLine: ' + lineno;
            document.body.appendChild(errorDiv);
            return true;
          };

          // Execute user code
          try {
            ${code}
          } catch (error) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = '❌ Error: ' + error.message + '\\n' + error.stack;
            document.body.appendChild(errorDiv);
          }
        </script>
      </body>
      </html>
    `;

    // Update iframe
    outputFrame.srcdoc = srcdoc;

    // Add success animation
    runBtn.classList.add('pulse');
    setTimeout(() => {
      runBtn.classList.remove('pulse');
    }, 600);
  }

  function clearOutput() {
    outputFrame.srcdoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8f9fa;
            color: #6c757d;
          }
        </style>
      </head>
      <body>
        <p>اضغط "تشغيل" لرؤية النتيجة / Click "Run" to see output</p>
      </body>
      </html>
    `;
  }

  // Initialize with empty output
  clearOutput();

  // Code examples
  const examples = {
    hello: `console.log("مرحباً بالعالم!");
console.log("Hello World!");`,

    dom: `const app = document.getElementById('app');
app.innerHTML = '<h1>مرحباً!</h1>';
app.style.color = '#0d6efd';
app.style.textAlign = 'center';`,

    loop: `for (let i = 1; i <= 5; i++) {
  console.log('العدد: ' + i);
}`,

    array: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('الأصلي:', numbers);
console.log('المضاعف:', doubled);`,

    object: `const student = {
  name: 'أحمد',
  age: 16,
  grade: 10
};
console.log('الطالب:', student);
console.log('الاسم:', student.name);`
  };

  // Load example buttons
  document.querySelectorAll('[data-example]').forEach(btn => {
    btn.addEventListener('click', () => {
      const exampleKey = btn.getAttribute('data-example');
      if (examples[exampleKey]) {
        codeArea.value = examples[exampleKey];
        runCode();
      }
    });
  });
});