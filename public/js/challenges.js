// VibeJS Challenges - Quiz and Challenge Logic

document.addEventListener('DOMContentLoaded', () => {
  initializeChallenges();
});

// Challenge data structure
const challenges = [
  {
    id: 1,
    title: {
      ar: 'أساسيات المتغيرات',
      en: 'Variables Basics'
    },
    question: {
      ar: 'ما هي الطريقة الصحيحة لإعلان متغير في JavaScript؟',
      en: 'What is the correct way to declare a variable in JavaScript?'
    },
    options: [
      { ar: 'variable x = 5;', en: 'variable x = 5;' },
      { ar: 'let x = 5;', en: 'let x = 5;' },
      { ar: 'var x := 5;', en: 'var x := 5;' },
      { ar: 'x = 5;', en: 'x = 5;' }
    ],
    correct: 1,
    explanation: {
      ar: 'الطريقة الصحيحة هي استخدام let أو const أو var. let هي الطريقة الحديثة المفضلة.',
      en: 'The correct way is to use let, const, or var. let is the modern preferred way.'
    }
  },
  {
    id: 2,
    title: {
      ar: 'أنواع البيانات',
      en: 'Data Types'
    },
    question: {
      ar: 'أي من التالي ليس نوع بيانات أساسي في JavaScript؟',
      en: 'Which of the following is NOT a primitive data type in JavaScript?'
    },
    options: [
      { ar: 'String', en: 'String' },
      { ar: 'Number', en: 'Number' },
      { ar: 'Array', en: 'Array' },
      { ar: 'Boolean', en: 'Boolean' }
    ],
    correct: 2,
    explanation: {
      ar: 'Array ليس نوع بيانات أساسي، بل هو كائن (Object). الأنواع الأساسية هي: String, Number, Boolean, Null, Undefined, Symbol, BigInt.',
      en: 'Array is not a primitive type, it\'s an Object. Primitive types are: String, Number, Boolean, Null, Undefined, Symbol, BigInt.'
    }
  },
  {
    id: 3,
    title: {
      ar: 'الدوال',
      en: 'Functions'
    },
    question: {
      ar: 'كيف تُعرّف دالة في JavaScript؟',
      en: 'How do you define a function in JavaScript?'
    },
    options: [
      { ar: 'function myFunc() {}', en: 'function myFunc() {}' },
      { ar: 'def myFunc() {}', en: 'def myFunc() {}' },
      { ar: 'func myFunc() {}', en: 'func myFunc() {}' },
      { ar: 'function:myFunc() {}', en: 'function:myFunc() {}' }
    ],
    correct: 0,
    explanation: {
      ar: 'تُعرّف الدوال باستخدام الكلمة المفتاحية function متبوعة باسم الدالة والأقواس.',
      en: 'Functions are defined using the function keyword followed by the function name and parentheses.'
    }
  },
  {
    id: 4,
    title: {
      ar: 'المصفوفات',
      en: 'Arrays'
    },
    question: {
      ar: 'كيف تصل إلى العنصر الأول في المصفوفة؟',
      en: 'How do you access the first element in an array?'
    },
    options: [
      { ar: 'array[1]', en: 'array[1]' },
      { ar: 'array[0]', en: 'array[0]' },
      { ar: 'array.first()', en: 'array.first()' },
      { ar: 'array(0)', en: 'array(0)' }
    ],
    correct: 1,
    explanation: {
      ar: 'المصفوفات في JavaScript تبدأ من الفهرس 0، لذا العنصر الأول هو array[0].',
      en: 'Arrays in JavaScript are zero-indexed, so the first element is array[0].'
    }
  },
  {
    id: 5,
    title: {
      ar: 'الشروط',
      en: 'Conditionals'
    },
    question: {
      ar: 'ما هي الصيغة الصحيحة لجملة if؟',
      en: 'What is the correct syntax for an if statement?'
    },
    options: [
      { ar: 'if x > 5 then', en: 'if x > 5 then' },
      { ar: 'if (x > 5)', en: 'if (x > 5)' },
      { ar: 'if x > 5:', en: 'if x > 5:' },
      { ar: 'if [x > 5]', en: 'if [x > 5]' }
    ],
    correct: 1,
    explanation: {
      ar: 'جملة if تتطلب وضع الشرط بين أقواس: if (condition)',
      en: 'The if statement requires the condition to be in parentheses: if (condition)'
    }
  }
];

let currentChallenge = 0;
let score = 0;
let answered = false;

function initializeChallenges() {
  const challengeContainer = document.getElementById('challengeContainer');
  if (!challengeContainer) return;

  renderChallenge();

  // Navigation buttons
  const nextBtn = document.getElementById('nextChallenge');
  const prevBtn = document.getElementById('prevChallenge');
  const restartBtn = document.getElementById('restartChallenges');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentChallenge < challenges.length - 1) {
        currentChallenge++;
        answered = false;
        renderChallenge();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentChallenge > 0) {
        currentChallenge--;
        answered = false;
        renderChallenge();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentChallenge = 0;
      score = 0;
      answered = false;
      renderChallenge();
    });
  }
}

function renderChallenge() {
  const container = document.getElementById('challengeContainer');
  if (!container) return;

  const challenge = challenges[currentChallenge];
  const lang = localStorage.getItem('vibe_lang') || 'en';

  const html = `
    <div class="challenge-card fade-in">
      <div class="challenge-header">
        <h3>${challenge.title[lang]}</h3>
        <span class="challenge-number">${currentChallenge + 1} / ${challenges.length}</span>
      </div>
      
      <div class="challenge-question">
        <p>${challenge.question[lang]}</p>
      </div>
      
      <div class="challenge-options">
        ${challenge.options.map((option, index) => `
          <button 
            class="option-btn" 
            data-index="${index}"
            onclick="selectOption(${index})"
          >
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option[lang]}</span>
          </button>
        `).join('')}
      </div>
      
      <div id="feedback" class="challenge-feedback" style="display: none;"></div>
      
      <div class="challenge-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${((currentChallenge + 1) / challenges.length) * 100}%"></div>
        </div>
        <p class="score-display">النقاط / Score: <strong>${score}</strong></p>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function selectOption(index) {
  if (answered) return;

  answered = true;
  const challenge = challenges[currentChallenge];
  const lang = localStorage.getItem('vibe_lang') || 'en';
  const isCorrect = index === challenge.correct;

  // Update score
  if (isCorrect) {
    score += 10;
  }

  // Highlight selected option
  const options = document.querySelectorAll('.option-btn');
  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === challenge.correct) {
      btn.classList.add('correct');
    } else if (i === index && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Show feedback
  const feedback = document.getElementById('feedback');
  if (feedback) {
    feedback.style.display = 'block';
    feedback.className = `challenge-feedback ${isCorrect ? 'correct' : 'incorrect'} fade-in`;
    feedback.innerHTML = `
      <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
      <div class="feedback-text">
        <strong>${isCorrect ? (lang === 'ar' ? 'إجابة صحيحة!' : 'Correct!') : (lang === 'ar' ? 'إجابة خاطئة!' : 'Incorrect!')}</strong>
        <p>${challenge.explanation[lang]}</p>
      </div>
    `;
  }

  // Update score display
  const scoreDisplay = document.querySelector('.score-display strong');
  if (scoreDisplay) {
    scoreDisplay.textContent = score;
    scoreDisplay.classList.add('pulse');
    setTimeout(() => scoreDisplay.classList.remove('pulse'), 600);
  }
}

// Make selectOption available globally
window.selectOption = selectOption;

// Add CSS for challenges (inject into page)
const challengeStyles = `
<style>
.challenge-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.challenge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--card-border);
}

.challenge-number {
  background: var(--accent);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 600;
}

.challenge-question {
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-lg);
}

.challenge-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.option-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-secondary);
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
}

[dir="rtl"] .option-btn {
  text-align: right;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--accent);
  transform: translateX(-4px);
}

[dir="rtl"] .option-btn:hover:not(:disabled) {
  transform: translateX(4px);
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
}

.option-btn.correct {
  border-color: var(--success);
  background: rgba(25, 135, 84, 0.1);
}

.option-btn.correct .option-letter {
  background: var(--success);
}

.option-btn.incorrect {
  border-color: var(--danger);
  background: rgba(220, 53, 69, 0.1);
}

.option-btn.incorrect .option-letter {
  background: var(--danger);
}

.challenge-feedback {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.challenge-feedback.correct {
  background: rgba(25, 135, 84, 0.1);
  border: 1px solid var(--success);
}

.challenge-feedback.incorrect {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid var(--danger);
}

.feedback-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feedback-text strong {
  display: block;
  margin-bottom: var(--spacing-sm);
}

.challenge-progress {
  margin-top: var(--spacing-xl);
}

.progress-bar {
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-hover));
  transition: width var(--transition-base);
}

.score-display {
  text-align: center;
  font-size: var(--font-size-lg);
}
</style>
`;

// Inject styles if on challenges page
if (document.getElementById('challengeContainer')) {
  document.head.insertAdjacentHTML('beforeend', challengeStyles);
}