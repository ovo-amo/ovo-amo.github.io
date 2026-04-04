document.getElementById("alot").innerHTML = LEVEL_ONE.length + LEVEL_TWO.length + LEVEL_THREE.length;
let currentLevelQuestions = LEVEL_ONE;
let questions = LEVEL_ONE;

// --- Shuffle helper ---
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- DOM elements ---
const questionMetaEl = document.getElementById("questionMeta");
const questionStemEl = document.getElementById("questionStem");
const optionsListEl = document.getElementById("optionsList");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const levelSelect = document.getElementById("levelSelect");

// --- State ---
let mode = "show";                 // "show" or "typewriter"
let typingIntervalId = null;
let typingSegmentIndex = 0;
let typingCharIndex = 0;
let typewriterSegments = [];
let isPresenting = false;
let hasAnswered = false;

let questionOrder = [];
let questionOrderPos = -1;
let currentQuestionIndex = null;

let currentOptionMapping = [];     // {letter, text, isCorrect, originalIndex}
let optionTextSpans = [];

// --- Mode and Level selection ---
document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
        mode = e.target.value;
        applyOptionsLayout();
    });
});

function updateQuestions() {
    const selectedCats = Array.from(document.querySelectorAll('.cat-checkbox:checked')).map(cb => cb.value);
    questions = currentLevelQuestions.filter(q => selectedCats.includes(q.meta));

    resetQuestionOrder();
    stopPresentation();
    hasAnswered = false;
    feedbackEl.innerHTML = "";
    feedbackEl.className = "feedback";
    questionMetaEl.innerHTML = "";

    if (questions.length === 0) {
        questionStemEl.innerHTML = "<em>No questions available for the selected categories in this level.</em>";
    } else {
        questionStemEl.innerHTML = "<em>Select 'Next Question' to begin.</em>";
    }
    optionsListEl.innerHTML = "";
}

levelSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "1") currentLevelQuestions = LEVEL_ONE;
    else if (val === "2") currentLevelQuestions = LEVEL_TWO;
    else if (val === "3") currentLevelQuestions = LEVEL_THREE;
    updateQuestions();
});

document.querySelectorAll('.cat-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
        const checkedBoxes = document.querySelectorAll('.cat-checkbox:checked');
        if (checkedBoxes.length === 0) {
            e.target.checked = true;
            alert("You must select at least one category.");
            return;
        }
        updateQuestions();
    });
});

function applyOptionsLayout() {
    optionsListEl.classList.remove("tts-inline", "typewriter-layout");
    optionsListEl.classList.add("typewriter-layout");
}

// --- Stop any ongoing presentation ---
function stopPresentation() {
    if (typingIntervalId !== null) {
        clearInterval(typingIntervalId);
        typingIntervalId = null;
    }
    isPresenting = false;
}

/**
 * Sanitizes a string by removing all HTML tags.
 * @param {string} htmlString - The string containing HTML.
 * @returns {string} - The cleaned text content.
 */
function sanitizeHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString.replaceAll("<br>", " ").replaceAll("<br/>", " ").replaceAll("<br />", " "), 'text/html');
    return doc.body.textContent || "";
}

// --- Render question shell: no text yet, options W./X./Y./Z. with blank text spans ---
function renderQuestion() {
    stopPresentation();
    hasAnswered = false;
    feedbackEl.innerHTML = "";
    feedbackEl.className = "feedback";

    const q = questions[currentQuestionIndex];
    questionMetaEl.innerHTML = q.meta;
    questionStemEl.innerHTML = "";
    optionsListEl.innerHTML = "";
    optionTextSpans = [];
    applyOptionsLayout();

    // Randomize options, assign to W/X/Y/Z
    const optionIndices = shuffleArray([0, 1, 2, 3]);
    const letters = ["W", "X", "Y", "Z"];
    currentOptionMapping = [];

    optionIndices.forEach((optIdx, pos) => {
        const mapping = {
            letter: letters[pos],
            text: q.options[optIdx],
            isCorrect: optIdx === q.i,
            originalIndex: optIdx
        };
        currentOptionMapping.push(mapping);

        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.dataset.index = String(pos);

        const labelSpan = document.createElement("span");
        labelSpan.className = "option-label";
        labelSpan.innerHTML = mapping.letter + "."; // add period after letter

        const textSpan = document.createElement("span");
        textSpan.className = "option-text";
        textSpan.innerHTML = ""; // filled by typewriter or on reveal

        optionTextSpans.push(textSpan);

        btn.appendChild(labelSpan);
        btn.appendChild(textSpan);

        btn.addEventListener("click", () => handleAnswerClick(pos));

        li.appendChild(btn);
        optionsListEl.appendChild(li);
    });
}

// --- Reveal full question + options instantly (after answering) ---
function revealFullQuestion() {
    const q = questions[currentQuestionIndex];
    questionStemEl.innerHTML = sanitizeHTML(q.stem);
    for (let i = 0; i < currentOptionMapping.length; i++) {
        optionTextSpans[i].innerHTML = sanitizeHTML(currentOptionMapping[i].text);
    }
}

// --- Handle answer selection ---
function handleAnswerClick(pos) {
    if (hasAnswered) return;
    hasAnswered = true;
    stopPresentation();
    revealFullQuestion();

    const q = questions[currentQuestionIndex];
    const buttons = optionsListEl.querySelectorAll(".option-btn");
    const chosen = currentOptionMapping[pos];

    buttons.forEach((btn, idx) => {
        const m = currentOptionMapping[idx];
        if (m.isCorrect) {
            btn.classList.add("correct");
        }
        if (idx === pos && !m.isCorrect) {
            btn.classList.add("incorrect");
        }
        btn.disabled = true;
    });

    const correctMapping = currentOptionMapping.find(m => m.isCorrect);
    const correctLetter = correctMapping ? correctMapping.letter : "?";

    if (chosen.isCorrect) {
        feedbackEl.innerHTML = "Correct. " + q.explanation;
        feedbackEl.classList.add("correct");
    } else {
        feedbackEl.innerHTML =
            `Incorrect. The correct answer is ${correctLetter}. ` + q.explanation;
        feedbackEl.classList.add("incorrect");
    }
}

// --- Typewriter presentation: stem then option texts ---
function startTypewriterPresentation() {
    const q = questions[currentQuestionIndex];
    typewriterSegments = [];
    typingSegmentIndex = 0;
    typingCharIndex = 0;

    questionStemEl.innerHTML = "";
    optionTextSpans.forEach(span => {
        span.innerHTML = "";
    });

    typewriterSegments.push({ el: questionStemEl, text: sanitizeHTML(q.stem) });
    for (let i = 0; i < currentOptionMapping.length; i++) {
        typewriterSegments.push({
            el: optionTextSpans[i],
            text: sanitizeHTML(currentOptionMapping[i].text)
        });
    }

    typingIntervalId = setInterval(() => {
        if (typingSegmentIndex >= typewriterSegments.length) {
            clearInterval(typingIntervalId);
            typingIntervalId = null;
            isPresenting = false;
            return;
        }
        const seg = typewriterSegments[typingSegmentIndex];
        if (typingCharIndex < seg.text.length) {
            seg.el.innerHTML += seg.text.charAt(typingCharIndex);
            typingCharIndex++;
        } else {
            typingSegmentIndex++;
            typingCharIndex = 0;
        }
    }, 30);
}

// --- Start the current question in the current mode ---
function startCurrentQuestion() {
    renderQuestion();
    isPresenting = true;

    if (mode === "show") {
        revealFullQuestion();
        isPresenting = false;
    } else {
        startTypewriterPresentation();
    }
}

// --- Build randomized question order ---
function resetQuestionOrder() {
    questionOrder = [];
    for (let i = 0; i < questions.length; i++) {
        questionOrder.push(i);
    }
    shuffleArray(questionOrder);
    questionOrderPos = -1;
}

// --- Advance to next question and auto-start ---
function advanceQuestion() {
    stopPresentation();
    hasAnswered = false;
    feedbackEl.innerHTML = "";
    feedbackEl.className = "feedback";

    questionOrderPos++;
    if (questionOrderPos >= questionOrder.length) {
        resetQuestionOrder();
        questionOrderPos = 0;
    }
    currentQuestionIndex = questionOrder[questionOrderPos];
    startCurrentQuestion();
}

// Next Question button
nextBtn.addEventListener("click", () => {
    if (questions.length === 0) return;
    if (!questionOrder.length) {
        resetQuestionOrder();
    }
    advanceQuestion();
});

// Initial setup (no question until Next Question)
applyOptionsLayout();
updateQuestions();