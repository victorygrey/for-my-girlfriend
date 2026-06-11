const quiz = [
  {
    question: "Kalau kita punya satu hari tanpa gangguan, rencana paling romantis adalah...",
    answers: [
      { text: "Jalan santai, makan enak, lalu ngobrol sampai lupa waktu", points: 3 },
      { text: "Maraton film sambil rebahan", points: 2 },
      { text: "Tidur panjang dulu, baru kangen-kangenan", points: 1 },
    ],
  },
  {
    question: "Hal kecil yang paling bikin hubungan terasa hangat itu...",
    answers: [
      { text: "Diingatkan makan dan istirahat", points: 2 },
      { text: "Dikirim pesan random yang manis", points: 3 },
      { text: "Ditemani meski cuma lewat chat", points: 3 },
    ],
  },
  {
    question: "Kalau aku lagi kangen, kode rahasianya adalah...",
    answers: [
      { text: "Tiba-tiba kirim lagu", points: 2 },
      { text: "Nanya kabar berkali-kali", points: 2 },
      { text: "Bilang langsung: aku kangen kamu", points: 3 },
    ],
  },
  {
    question: "Hadiah terbaik dari hubungan ini adalah...",
    answers: [
      { text: "Punya tempat pulang yang bentuknya seseorang", points: 3 },
      { text: "Banyak cerita lucu untuk dikenang", points: 2 },
      { text: "Ada alasan untuk jadi versi diri yang lebih baik", points: 3 },
    ],
  },
  {
    question: "Ending paling cocok untuk game kecil ini...",
    answers: [
      { text: "Pelukan panjang", points: 3 },
      { text: "Janji date berikutnya", points: 2 },
      { text: "Dua-duanya, karena kamu pantas dapat bonus", points: 4 },
    ],
  },
];

const treasureMessages = [
  "Aku suka cara kamu hadir.",
  "Senyummu selalu jadi bagian favorit hariku.",
  "Terima kasih sudah memilih bertahan.",
  "Kamu cantik dengan cara yang susah dijelaskan.",
  "Aku sayang kamu, hari ini dan besok-besoknya.",
];

const state = {
  questionIndex: 0,
  score: 0,
  quizDone: false,
  foundTreasures: 0,
  vaultDone: false,
};

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const progressText = document.getElementById("progressText");
const startButton = document.getElementById("startButton");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const scoreText = document.getElementById("scoreText");
const quizFeedback = document.getElementById("quizFeedback");
const foundStrip = document.getElementById("foundStrip");
const heartTokens = document.querySelectorAll(".heart-token");
const unlockButton = document.getElementById("unlockButton");
const vault = document.querySelector(".vault");
const vaultTitle = document.getElementById("vaultTitle");
const vaultMessage = document.getElementById("vaultMessage");
const lockIcon = document.getElementById("lockIcon");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function completedMissions() {
  return [state.quizDone, state.foundTreasures === treasureMessages.length, state.vaultDone].filter(Boolean)
    .length;
}

function updateProgress() {
  progressText.textContent = `${completedMissions()}/3 misi selesai`;
}

function activatePanel(panelId) {
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.target === panelId));
  document.getElementById("game").scrollIntoView({ behavior: "smooth", block: "start" });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function distanceBetween(pointA, pointB) {
  return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
}

function randomizeTreasurePositions() {
  const isNarrow = window.matchMedia("(max-width: 820px)").matches;
  const bounds = isNarrow
    ? { minX: 9, maxX: 82, minY: 9, maxY: 48, minDistance: 18 }
    : { minX: 8, maxX: 86, minY: 9, maxY: 60, minDistance: 16 };
  const positions = [];

  heartTokens.forEach((token) => {
    let nextPosition;

    for (let attempt = 0; attempt < 80; attempt += 1) {
      const candidate = {
        x: randomBetween(bounds.minX, bounds.maxX),
        y: randomBetween(bounds.minY, bounds.maxY),
      };
      const hasRoom = positions.every(
        (position) => distanceBetween(candidate, position) >= bounds.minDistance,
      );

      if (hasRoom) {
        nextPosition = candidate;
        break;
      }
    }

    if (!nextPosition) {
      nextPosition = {
        x: randomBetween(bounds.minX, bounds.maxX),
        y: randomBetween(bounds.minY, bounds.maxY),
      };
    }

    positions.push(nextPosition);
    token.style.left = `${nextPosition.x}%`;
    token.style.top = `${nextPosition.y}%`;
    token.style.right = "auto";
    token.style.bottom = "auto";
  });
}

function renderQuestion() {
  const current = quiz[state.questionIndex];

  questionCount.textContent = `Pertanyaan ${state.questionIndex + 1} dari ${quiz.length}`;
  questionText.textContent = current.question;
  answers.innerHTML = "";

  current.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer.text;
    button.addEventListener("click", () => chooseAnswer(answer.points));
    answers.appendChild(button);
  });
}

function chooseAnswer(points) {
  state.score += points;
  scoreText.textContent = state.score;
  state.questionIndex += 1;

  if (state.questionIndex >= quiz.length) {
    finishQuiz();
    return;
  }

  quizFeedback.textContent = points >= 3 ? "Jawaban ini manis banget." : "Dicatat sebagai bagian dari cerita kita.";
  renderQuestion();
}

function finishQuiz() {
  state.quizDone = true;
  questionCount.textContent = "Quiz selesai";
  questionText.textContent = "Skor bukan segalanya, tapi kamu jelas menang di hati aku.";
  answers.innerHTML = "";
  quizFeedback.textContent = `Total skor kamu ${state.score}. Hadiahnya: lanjut cari harta tersembunyi.`;

  const nextButton = document.createElement("button");
  nextButton.className = "primary-action";
  nextButton.type = "button";
  nextButton.textContent = "Lanjut Treasure Hunt";
  nextButton.addEventListener("click", () => activatePanel("huntPanel"));
  answers.appendChild(nextButton);

  updateProgress();
  showToast("Quiz selesai. Misi pertama terbuka dengan manis.");
}

function findTreasure(token, index) {
  if (token.classList.contains("found")) return;

  token.classList.add("found");
  token.textContent = "♥";
  state.foundTreasures += 1;

  const message = document.createElement("span");
  message.textContent = treasureMessages[index];
  foundStrip.appendChild(message);

  if (state.foundTreasures === treasureMessages.length) {
    showToast("Semua harta ditemukan. Pesan rahasia siap dibuka.");
    activatePanel("vaultPanel");
  } else {
    showToast(`Harta ${state.foundTreasures}/5 ditemukan.`);
  }

  updateProgress();
}

function unlockVault() {
  if (!state.quizDone || state.foundTreasures < treasureMessages.length) {
    showToast("Masih ada misi yang belum selesai, sayang.");
    return;
  }

  state.vaultDone = true;
  vault.classList.add("unlocked");
  lockIcon.textContent = "♡";
  vaultTitle.textContent = "Pesan rahasia terbuka";
  vaultMessage.textContent =
    "Sayang, terima kasih sudah jadi rumah paling hangat di hidupku. Aku bikin ini karena kamu layak merasa dirayakan, bukan cuma di hari spesial, tapi di hari biasa juga. Aku bangga punya kamu, aku sayang kamu, dan aku mau terus belajar mencintai kamu dengan cara yang bikin kamu merasa aman, dipilih, dan bahagia.";
  unlockButton.textContent = "Sudah Terbuka";
  unlockButton.disabled = true;
  updateProgress();
  showToast("Pesan terakhir terbuka. Semoga dia senyum ya.");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activatePanel(tab.dataset.target));
});

startButton.addEventListener("click", () => {
  activatePanel("quizPanel");
  playMusic();
});
heartTokens.forEach((token, index) => {
  token.addEventListener("click", () => findTreasure(token, index));
});
unlockButton.addEventListener("click", unlockVault);

// Polaroid Preview Modal Logic
const previewModal = document.getElementById("previewModal");
const previewImage = document.getElementById("previewImage");
const previewCaption = document.getElementById("previewCaption");
const previewClose = document.getElementById("previewClose");
const previewOverlay = document.getElementById("previewOverlay");
const photoCards = document.querySelectorAll(".photo-card");

function openPreview(card) {
  const bgImage = window.getComputedStyle(card).backgroundImage;
  const captionText = card.querySelector("span").textContent;

  previewImage.style.backgroundImage = bgImage;
  previewCaption.textContent = captionText;
  previewModal.classList.add("show");
  previewModal.setAttribute("aria-hidden", "false");
}

function closePreview() {
  previewModal.classList.remove("show");
  previewModal.setAttribute("aria-hidden", "true");
}

photoCards.forEach((card) => {
  card.addEventListener("click", () => openPreview(card));
});

previewClose.addEventListener("click", closePreview);
previewOverlay.addEventListener("click", closePreview);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && previewModal.classList.contains("show")) {
    closePreview();
  }
});

// Background Music Logic
const bgMusic = document.getElementById("bgMusic");
const musicController = document.getElementById("musicController");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");

function toggleMusic() {
  if (bgMusic.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  bgMusic.play()
    .then(() => {
      musicController.classList.add("playing");
      musicIcon.textContent = "🎵";
    })
    .catch((err) => {
      console.log("Autoplay prevented or audio load failed: ", err);
    });
}

function pauseMusic() {
  bgMusic.pause();
  musicController.classList.remove("playing");
  musicIcon.textContent = "🔇";
}

// Autoplay on load or first user interaction
function autoPlayMusic() {
  playMusic();
  cleanUpAutoPlayListeners();
}

function cleanUpAutoPlayListeners() {
  document.removeEventListener("click", autoPlayMusic);
  document.removeEventListener("touchstart", autoPlayMusic);
  document.removeEventListener("keydown", autoPlayMusic);
}

// Attempt to play immediately on load, or listen to first user gesture
window.addEventListener("DOMContentLoaded", () => {
  bgMusic.play()
    .then(() => {
      musicController.classList.add("playing");
      musicIcon.textContent = "🎵";
    })
    .catch(() => {
      // Autoplay blocked, wait for first user gesture
      document.addEventListener("click", autoPlayMusic);
      document.addEventListener("touchstart", autoPlayMusic);
      document.addEventListener("keydown", autoPlayMusic);
    });
});

// When the song ends, update UI (since loop is removed)
bgMusic.addEventListener("ended", () => {
  musicController.classList.remove("playing");
  musicIcon.textContent = "🔇";
});

musicBtn.addEventListener("click", toggleMusic);

randomizeTreasurePositions();
renderQuestion();
updateProgress();
