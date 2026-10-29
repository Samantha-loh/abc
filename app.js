import { QUESTION_BANK } from './questions.js';
import { soundManager } from './audio.js';
import { confetti } from './confetti.js';
import { getCharacterSvg } from './characters.js';

// Application State
const state = {
  currentLevel: 'easy',
  targetQuestionCount: 10,
  activeQuestions: [],
  currentIndex: 0,
  score: 0,
  isAnswered: false,
  soundOn: true,
  voiceOn: true
};

// Continent Explorer Data (Homage to Bonus Game: Map It!)
const CONTINENT_DATA = [
  { name: 'Africa', icon: '🦁', fact: 'Africa has 54 countries and is home to the mighty Sahara Desert and the long Nile River!' },
  { name: 'Asia', icon: '🐼', fact: 'Asia is the biggest continent on Earth! Giant pandas, tigers, and Mount Everest are here!' },
  { name: 'Europe', icon: '🏰', fact: 'Europe is home to castles, the Eiffel Tower, pizza in Italy, and windmills in the Netherlands!' },
  { name: 'North America', icon: '🦅', fact: 'North America has Canada, the United States, and Mexico, with giant redwoods and grizzly bears!' },
  { name: 'South America', icon: '🦜', fact: 'South America is home to the Amazon Rainforest, colorful macaws, and the high Andes Mountains!' },
  { name: 'Antarctica', icon: '🐧', fact: 'Antarctica is at the South Pole and is covered in 90% of all Earth\'s ice! Chilly penguins love it!' },
  { name: 'Australia', icon: '🦘', fact: 'Australia is both a continent and an island country, famous for hopping kangaroos and cuddly koalas!' },
  { name: 'Pacific Ocean', icon: '🐋', fact: 'The Pacific Ocean is the biggest ocean on Earth, even bigger than all continents put together!' },
  { name: 'Atlantic Ocean', icon: '⛵', fact: 'The Atlantic Ocean separates the Americas from Europe and Africa!' }
];

// DOM Elements
const elements = {
  // Screens
  screenWelcome: document.getElementById('screen-welcome'),
  screenQuiz: document.getElementById('screen-quiz'),
  screenFinale: document.getElementById('screen-finale'),

  // Controls
  btnSoundToggle: document.getElementById('btn-sound-toggle'),
  btnVoiceToggle: document.getElementById('btn-voice-toggle'),
  btnHome: document.getElementById('btn-home'),
  btnBonusMap: document.getElementById('btn-bonus-map'),
  btnReadGreeting: document.getElementById('btn-read-greeting'),

  // Quiz UI
  badgeCategory: document.getElementById('badge-category'),
  characterSlot: document.getElementById('character-slot'),
  questionText: document.getElementById('question-text'),
  btnSpeakQuestion: document.getElementById('btn-speak-question'),
  optionsGrid: document.getElementById('options-grid'),
  progressLabel: document.getElementById('progress-label'),
  progressFill: document.getElementById('progress-fill'),
  scoreStars: document.getElementById('score-stars'),

  // Modal Fact
  factModal: document.getElementById('fact-modal'),
  factResultBanner: document.getElementById('fact-result-banner'),
  factCharSlot: document.getElementById('fact-char-slot'),
  factText: document.getElementById('fact-text'),
  btnFactNext: document.getElementById('btn-fact-next'),

  // Finale UI
  finalScore: document.getElementById('final-score'),
  finalTotal: document.getElementById('final-total'),
  finalStarsCount: document.getElementById('final-stars-count'),
  btnPlayAgain: document.getElementById('btn-play-again'),
  btnChooseLevel: document.getElementById('btn-choose-level'),
  btnPrintCert: document.getElementById('btn-print-cert'),
  btnFinaleBonusMap: document.getElementById('btn-finale-bonus-map'),

  // Bonus Map Modal
  mapModal: document.getElementById('map-modal'),
  btnCloseMapModal: document.getElementById('btn-close-map-modal'),
  continentGrid: document.getElementById('continent-grid'),
  mapFactBubble: document.getElementById('map-fact-bubble')
};

// Initialize Application
function init() {
  confetti.init('confetti-canvas');
  bindEvents();
  renderContinentGrid();

  // Welcome mascot SVG
  const welcomeMascotSlot = document.getElementById('welcome-mascot-slot');
  if (welcomeMascotSlot) {
    welcomeMascotSlot.innerHTML = getCharacterSvg('earth', 180);
  }
}

// Bind User Interactions
function bindEvents() {
  // Sound toggle
  elements.btnSoundToggle.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    soundManager.soundEnabled = state.soundOn;
    elements.btnSoundToggle.textContent = state.soundOn ? '🔊' : '🔇';
    elements.btnSoundToggle.classList.toggle('active', state.soundOn);
    if (state.soundOn) soundManager.playPop();
  });

  // Voice toggle
  elements.btnVoiceToggle.addEventListener('click', () => {
    state.voiceOn = !state.voiceOn;
    soundManager.speechEnabled = state.voiceOn;
    elements.btnVoiceToggle.textContent = state.voiceOn ? '🗣️' : '🤫';
    elements.btnVoiceToggle.classList.toggle('active', state.voiceOn);
    if (!state.voiceOn) {
      soundManager.stopSpeech();
    } else {
      soundManager.speak("Voice reading is on! Let's explore, Clive!");
    }
  });

  // Home button
  elements.btnHome.addEventListener('click', () => {
    soundManager.playPop();
    soundManager.stopSpeech();
    showScreen('screen-welcome');
  });

  // Read greeting out loud
  const greetingScript = "Hi Clive Hercules Tan, let's see how much you know about our Earth home’s countries, land and seas.";
  elements.btnReadGreeting.addEventListener('click', () => {
    soundManager.playPop();
    soundManager.speak(greetingScript);
  });

  // Level selector buttons
  document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('click', () => {
      const level = card.getAttribute('data-level');
      startQuiz(level);
    });
  });

  // Speak current question
  elements.btnSpeakQuestion.addEventListener('click', () => {
    speakCurrentQuestion();
  });

  // Fact modal next button
  elements.btnFactNext.addEventListener('click', () => {
    soundManager.playPop();
    soundManager.stopSpeech();
    elements.factModal.classList.remove('active');
    nextQuestion();
  });

  // Finale action buttons
  elements.btnPlayAgain.addEventListener('click', () => {
    soundManager.playPop();
    confetti.stopGrandFinale();
    startQuiz(state.currentLevel);
  });

  elements.btnChooseLevel.addEventListener('click', () => {
    soundManager.playPop();
    confetti.stopGrandFinale();
    showScreen('screen-welcome');
  });

  elements.btnPrintCert.addEventListener('click', () => {
    soundManager.playPop();
    window.print();
  });

  // Bonus Map buttons
  elements.btnBonusMap.addEventListener('click', () => {
    soundManager.playPop();
    openMapModal();
  });

  elements.btnFinaleBonusMap.addEventListener('click', () => {
    soundManager.playPop();
    openMapModal();
  });

  elements.btnCloseMapModal.addEventListener('click', () => {
    soundManager.playPop();
    soundManager.stopSpeech();
    elements.mapModal.classList.remove('active');
  });
}

// Show specific view screen
function showScreen(screenId) {
  [elements.screenWelcome, elements.screenQuiz, elements.screenFinale].forEach(s => {
    s.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
}

// Start Quiz for chosen difficulty
function startQuiz(level) {
  state.currentLevel = level;
  state.currentIndex = 0;
  state.score = 0;
  state.isAnswered = false;

  let targetCount = 10;
  if (level === 'easy') targetCount = 10;
  if (level === 'medium') targetCount = 25;
  if (level === 'advanced') targetCount = 50;
  state.targetQuestionCount = targetCount;

  // Prepare questions: prioritize questions matching level, then pool
  let matching = QUESTION_BANK.filter(q => q.level === level);
  let others = QUESTION_BANK.filter(q => q.level !== level);

  // Shuffle both
  matching = shuffleArray([...matching]);
  others = shuffleArray([...others]);

  let selected = [...matching, ...others].slice(0, targetCount);
  state.activeQuestions = selected;

  soundManager.playPop();
  showScreen('screen-quiz');
  renderQuestion();
}

// Render current question
function renderQuestion() {
  state.isAnswered = false;
  const q = state.activeQuestions[state.currentIndex];
  if (!q) {
    showGrandFinale();
    return;
  }

  // Update Progress Bar & Stars
  const qNum = state.currentIndex + 1;
  const total = state.targetQuestionCount;
  elements.progressLabel.textContent = `Question ${qNum} of ${total}`;
  elements.progressFill.style.width = `${(qNum / total) * 100}%`;
  elements.scoreStars.textContent = `⭐ ${state.score}`;

  // Update Category Badge & Text
  elements.badgeCategory.textContent = `${q.emoji} ${q.category}`;
  elements.questionText.textContent = q.question;

  // Render Cute Character SVG
  elements.characterSlot.innerHTML = getCharacterSvg(q.character || 'earth', 160);

  // Randomize Option Order so the correct answer is not always in the same position
  elements.optionsGrid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  const shuffledOptions = q.options.map((text, originalIndex) => ({
    text,
    originalIndex,
    isCorrect: originalIndex === q.correctIndex
  }));
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach((opt, displayIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `option-btn-${opt.originalIndex}`;
    btn.innerHTML = `
      <span class="option-letter">${letters[displayIdx]}</span>
      <span class="option-label">${opt.text}</span>
    `;

    btn.addEventListener('click', (e) => {
      handleAnswer(opt.isCorrect, opt.originalIndex, btn, e);
    });

    elements.optionsGrid.appendChild(btn);
  });

  // Auto-speak question if voice narration is active
  if (state.voiceOn) {
    speakCurrentQuestion(shuffledOptions);
  }
}

// Speak question and choices for 5-year-old Clive
function speakCurrentQuestion(shuffledOptions) {
  const q = state.activeQuestions[state.currentIndex];
  if (!q) return;

  const optionsList = (shuffledOptions || q.options.map(t => ({ text: t }))).map(o => o.text);
  const textToRead = `${q.question}. Is it: ${optionsList.join(', or ')}?`;
  soundManager.speak(textToRead);
}

// Handle Option Selection
function handleAnswer(isCorrect, originalIndex, clickedBtn, clickEvent) {
  if (state.isAnswered) return;
  state.isAnswered = true;
  soundManager.stopSpeech();

  const q = state.activeQuestions[state.currentIndex];

  // Disable all options
  const allBtns = elements.optionsGrid.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (isCorrect) {
    // CORRECT ANSWER!
    state.score++;
    elements.scoreStars.textContent = `⭐ ${state.score}`;
    clickedBtn.classList.add('correct');

    // Cheering sound effect
    soundManager.playCheer();

    // Confetti ("grafetti") burst from the button location
    const rect = clickedBtn.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;
    confetti.burst(burstX, burstY, 80);

    // Show Fun Fact Modal after brief celebratory delay
    setTimeout(() => {
      showFactModal(true, q);
    }, 900);

  } else {
    // WRONG ANSWER - Encouraging response
    clickedBtn.classList.add('wrong');
    // Highlight correct answer gently so Clive learns
    const correctBtn = document.getElementById(`option-btn-${q.correctIndex}`);
    if (correctBtn) correctBtn.classList.add('correct');

    // Encouraging sound effect
    soundManager.playEncouraging();

    // Show Fun Fact Modal after brief delay
    setTimeout(() => {
      showFactModal(false, q);
    }, 1000);
  }
}

// Display Fun Fact Modal
function showFactModal(wasCorrect, questionObj) {
  if (wasCorrect) {
    elements.factResultBanner.textContent = "🌟 Hooray, Clive! That's Right! 🎉";
    elements.factResultBanner.className = 'fact-result-banner correct';
  } else {
    elements.factResultBanner.textContent = "🌟 Good try, Clive! Let's Learn This Together! 🚀";
    elements.factResultBanner.className = 'fact-result-banner encouraging';
  }

  elements.factCharSlot.innerHTML = getCharacterSvg(questionObj.character || 'earth', 120);
  elements.factText.textContent = questionObj.fact;

  elements.factModal.classList.add('active');

  // Read the fun fact out loud if voice is enabled
  if (state.voiceOn) {
    const praise = wasCorrect ? "Awesome job, Clive! " : "Keep going, Clive! ";
    soundManager.speak(praise + "Did you know? " + questionObj.fact);
  }
}

// Advance to next question or complete quiz
function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex < state.targetQuestionCount && state.currentIndex < state.activeQuestions.length) {
    renderQuestion();
  } else {
    showGrandFinale();
  }
}

// Grand Final Celebration (Regardless of results!)
function showGrandFinale() {
  soundManager.stopSpeech();
  showScreen('screen-finale');

  // Triumphant fanfare audio
  soundManager.playGrandCelebration();

  // Grand Finale continuous confetti / fireworks celebration
  confetti.grandFinale(9000);

  // Update Score stats
  elements.finalScore.textContent = state.score;
  elements.finalTotal.textContent = state.targetQuestionCount;
  elements.finalStarsCount.textContent = `⭐ ${state.score}`;

  // Speak congratulations aloud
  if (state.voiceOn) {
    setTimeout(() => {
      const congratsMsg = `Congratulations Clive Hercules Tan! You completed the quiz with ${state.score} stars! You are an amazing Earth Explorer!`;
      soundManager.speak(congratsMsg);
    }, 1200);
  }
}

// Bonus Continent Explorer (Homage to Bonus Game: Map It!)
function renderContinentGrid() {
  elements.continentGrid.innerHTML = '';
  CONTINENT_DATA.forEach(item => {
    const card = document.createElement('div');
    card.className = 'continent-tap-card';
    card.innerHTML = `
      <div class="char-icon">${item.icon}</div>
      <div class="name">${item.name}</div>
    `;

    card.addEventListener('click', () => {
      soundManager.playPop();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 30);
      elements.mapFactBubble.textContent = `🌍 ${item.name}: ${item.fact}`;
      if (state.voiceOn) {
        soundManager.speak(`${item.name}. ${item.fact}`);
      }
    });

    elements.continentGrid.appendChild(card);
  });
}

function openMapModal() {
  elements.mapFactBubble.textContent = "Tap any continent or ocean above to hear fun facts!";
  elements.mapModal.classList.add('active');
  if (state.voiceOn) {
    soundManager.speak("Tap any continent or ocean to explore!");
  }
}

// Utility: Fisher-Yates Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);
