/**
 * Quiz Mini — Shared quiz engine for STEM Geometry modules.
 *
 * Usage: In each module HTML, define a global QUIZ_DATA array before loading this script:
 *
 *   <script>
 *     var QUIZ_DATA = [
 *       { q: "Tổng 3 góc tam giác bằng?", opts: ["90°", "180°", "360°"], ans: 1 },
 *       { q: "Góc A=60°, B=70°, C=?", opts: ["40°", "50°", "60°"], ans: 1 }
 *     ];
 *   </script>
 *   <script src="../js/quiz.js"></script>
 */

(function () {
  'use strict';

  if (typeof QUIZ_DATA === 'undefined' || !Array.isArray(QUIZ_DATA)) return;

  const container = document.getElementById('quiz-section');
  if (!container) return;

  let currentQ = 0;
  let score = 0;
  let answered = false;

  function render() {
    const q = QUIZ_DATA[currentQ];
    const total = QUIZ_DATA.length;

    container.innerHTML = `
      <div class="quiz-progress">Câu ${currentQ + 1} / ${total}</div>
      <p class="quiz-question">${q.q}</p>
      <div class="quiz-options">
        ${q.opts.map((opt, i) => `
          <button class="quiz-opt" data-idx="${i}" onclick="window.__quizAnswer(${i})">
            <span class="quiz-opt-letter">${String.fromCharCode(65 + i)}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
    `;
  }

  function showResult() {
    const total = QUIZ_DATA.length;
    const pct = Math.round((score / total) * 100);
    let emoji, msg;
    if (pct === 100) { emoji = '🏆'; msg = 'Xuất sắc! Bạn nắm vững kiến thức!'; }
    else if (pct >= 50) { emoji = '👍'; msg = 'Khá tốt! Hãy thử lại để hoàn hảo hơn!'; }
    else { emoji = '💪'; msg = 'Cần ôn lại nhé! Hãy tương tác thêm rồi thử lại.'; }

    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji">${emoji}</div>
        <div class="quiz-result-score">${score} / ${total}</div>
        <p class="quiz-result-msg">${msg}</p>
        <button class="btn-clay btn-primary quiz-retry" onclick="window.__quizRetry()">🔄 Làm lại</button>
      </div>
    `;
  }

  window.__quizAnswer = function (idx) {
    if (answered) return;
    answered = true;

    const q = QUIZ_DATA[currentQ];
    const btns = container.querySelectorAll('.quiz-opt');
    const feedback = document.getElementById('quiz-feedback');

    btns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('quiz-correct');
      if (i === idx && idx !== q.ans) btn.classList.add('quiz-wrong');
    });

    if (idx === q.ans) {
      score++;
      feedback.textContent = '✅ Chính xác!';
      feedback.className = 'quiz-feedback quiz-fb-correct';
    } else {
      feedback.textContent = '❌ Sai rồi! Đáp án đúng là ' + String.fromCharCode(65 + q.ans) + '.';
      feedback.className = 'quiz-feedback quiz-fb-wrong';
    }

    setTimeout(() => {
      currentQ++;
      answered = false;
      if (currentQ < QUIZ_DATA.length) render();
      else showResult();
    }, 1200);
  };

  window.__quizRetry = function () {
    currentQ = 0;
    score = 0;
    answered = false;
    render();
  };

  // Init
  render();
})();
