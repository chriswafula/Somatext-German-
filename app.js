const TOTAL_LESSONS = 40;

// --- 1. German A1 Curriculum Data ---
// We define real content for Lesson 1, and placeholder data for the rest.
const curriculumData = [
    {
        id: 1,
        title: "Lektion 1: Begrüßungen (Greetings & Introductions)",
        description: "Learn how to say hello and introduce yourself.",
        content: `
            <h3 class="text-xl text-primaryGreen font-bold mb-2">Die Konversation (The Conversation)</h3>
            <div class="bg-darkBg p-4 rounded-lg border border-gray-700 mb-6 space-y-2">
                <p><strong>Anna:</strong> Hallo! Wie heißt du?</p>
                <p><strong>Ben:</strong> Guten Tag! Ich heiße Ben. Und wie heißt du?</p>
                <p><strong>Anna:</strong> Ich bin Anna. Freut mich!</p>
                <p><strong>Ben:</strong> Freut mich auch. Woher kommst du, Anna?</p>
                <p><strong>Anna:</strong> Ich komme aus Kenia. Und du?</p>
                <p><strong>Ben:</strong> Ich komme aus Deutschland.</p>
            </div>

            <h3 class="text-xl text-primaryGreen font-bold mb-2">Wortschatz (Vocabulary)</h3>
            <ul class="list-disc pl-5 space-y-1">
                <li><strong>Hallo</strong> - Hello</li>
                <li><strong>Guten Tag</strong> - Good day</li>
                <li><strong>Wie heißt du?</strong> - What is your name?</li>
                <li><strong>Ich heiße...</strong> - My name is...</li>
                <li><strong>Ich bin...</strong> - I am...</li>
                <li><strong>Freut mich</strong> - Nice to meet you</li>
                <li><strong>Woher kommst du?</strong> - Where are you from?</li>
                <li><strong>Ich komme aus...</strong> - I come from...</li>
                <li><strong>Und du?</strong> - And you?</li>
            </ul>
        `,
        quiz: [
            { q: 'How do you say "Hello" in German?', options: ['Tschüss', 'Hallo', 'Danke', 'Bitte'], answer: 1 },
            { q: '"Guten Tag" translates to...', options: ['Good morning', 'Good night', 'Good day', 'Goodbye'], answer: 2 },
            { q: 'How do you ask "What is your name?"', options: ['Wie gehts?', 'Woher kommst du?', 'Wie heißt du?', 'Wer bist du?'], answer: 2 },
            { q: 'How do you reply "My name is Ben"?', options: ['Ich bin aus Ben', 'Ich heiße Ben', 'Ich habe Ben', 'Mein Name Ben'], answer: 1 },
            { q: '"Woher kommst du?" means...', options: ['Where are you going?', 'How old are you?', 'Where do you live?', 'Where are you from?'], answer: 3 },
            { q: 'Translate "I come from Kenya":', options: ['Ich gehe nach Kenia', 'Ich komme aus Kenia', 'Ich bin in Kenia', 'Kenia ist schön'], answer: 1 },
            { q: 'What does "Freut mich" mean?', options: ['Nice to meet you', 'I am sorry', 'Excuse me', 'See you later'], answer: 0 },
            { q: 'How do you say "And you?"', options: ['Oder du?', 'Aber du?', 'Und du?', 'Für dich?'], answer: 2 },
            { q: 'Translate "Ich bin Anna":', options: ['I have Anna', 'I know Anna', 'I like Anna', 'I am Anna'], answer: 3 },
            { q: 'Which is a formal greeting?', options: ['Hi', 'Hallo', 'Guten Tag', 'Na'], answer: 2 }
        ]
    }
];

// Generate placeholder data for lessons 2 through 40
for (let i = 2; i <= TOTAL_LESSONS; i++) {
    curriculumData.push({
        id: i,
        title: `Lektion ${i}`,
        description: i === 40 ? "Final Mastery Assessment" : "Core Vocabulary & Grammar",
        content: `<p>Content for Lektion ${i} is locked or under construction in this prototype.</p>`,
        quiz: Array(10).fill({ q: `Placeholder Question for Lesson ${i}?`, options: ['A', 'B', 'C', 'D'], answer: 0 })
    });
}

// --- 2. State Management ---
let currentUser = null;
let activeLessonId = null;

function initApp() {
    const savedUser = localStorage.getItem('student_profile');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showAuth();
    }
}

// --- 3. Authentication ---
function handleLogin(event) {
    event.preventDefault();
    const name = document.getElementById('auth-name').value;
    const email = document.getElementById('auth-email').value;

    const existingData = localStorage.getItem(`profile_${email}`);
    if (existingData) {
        currentUser = JSON.parse(existingData);
    } else {
        currentUser = { name: name, email: email, completedLessons: [] };
    }
    saveUser();
    showDashboard();
}

function loginAsGhost() {
    currentUser = { name: "Ghost Admin", email: "admin@deutsch-app.local", completedLessons: [] };
    saveUser();
    showDashboard();
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('student_profile');
    showAuth();
}

function saveUser() {
    localStorage.setItem('student_profile', JSON.stringify(currentUser));
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(currentUser));
}

// --- 4. View Controllers ---
function showAuth() {
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('user-controls').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    
    document.getElementById('user-controls').classList.remove('hidden');
    document.getElementById('welcome-text').innerText = `Hallo, ${currentUser.name}!`;
    
    updateProgress();
    renderModules();
}

// --- 5. Rendering Dashboard ---
function updateProgress() {
    const completedCount = currentUser.completedLessons.length;
    const percentage = (completedCount / TOTAL_LESSONS) * 100;
    
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('progress-text').innerText = `${completedCount} of ${TOTAL_LESSONS} Lessons Completed`;

    const certBtn = document.getElementById('cert-btn');
    const certHint = document.getElementById('cert-hint');
    
    if (completedCount >= TOTAL_LESSONS) {
        certBtn.disabled = false;
        certBtn.className = "w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-yellow-500/20";
        certHint.innerText = "🎉 Certificate Unlocked!";
        certHint.classList.replace('text-gray-500', 'text-yellow-500');
    }
}

function renderModules() {
    const container = document.getElementById('module-container');
    container.innerHTML = '';
    const highestUnlocked = currentUser.completedLessons.length + 1;

    curriculumData.forEach((module) => {
        const isCompleted = currentUser.completedLessons.includes(module.id);
        const isCurrent = module.id === highestUnlocked;
        const isLocked = module.id > highestUnlocked;

        const card = document.createElement('div');
        
        if (isCompleted) {
            card.className = 'p-5 rounded-2xl border bg-darkCard border-emerald-900/50 shadow-md opacity-70 flex flex-col justify-between';
        } else if (isCurrent) {
            card.className = 'p-5 rounded-2xl border bg-darkCard border-primaryGreen shadow-lg shadow-primaryGreen/10 cursor-pointer hover:border-emerald-500 transition-all flex flex-col justify-between';
            card.onclick = () => openLesson(module.id);
        } else {
            card.className = 'p-5 rounded-2xl border bg-zinc-900/30 border-zinc-900/80 opacity-40 flex flex-col justify-between';
        }
        
        let statusHtml = '';
        if (isCompleted) {
            statusHtml = `<span class="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded">Passed</span>`;
        } else if (isCurrent) {
            statusHtml = `<button class="mt-4 w-full text-sm bg-primaryGreen text-white font-bold py-2 rounded hover:bg-emerald-600 transition">Study Lesson</button>`;
        } else {
            statusHtml = `<div class="mt-4 flex justify-end"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div>`;
        }

        card.innerHTML = `
            <div>
                <h3 class="text-base font-bold ${isLocked ? 'text-gray-500' : 'text-white'}">${module.title}</h3>
                <p class="text-xs text-gray-400 mt-1">${module.description}</p>
            </div>
            ${statusHtml}
        `;
        container.appendChild(card);
    });
}

// --- 6. Study Lesson Logic ---
function openLesson(lessonId) {
    const lesson = curriculumData.find(l => l.id === lessonId);
    activeLessonId = lessonId;
    
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.remove('hidden');
    
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-content').innerHTML = lesson.content;
    
    const quizBtn = document.getElementById('start-quiz-btn');
    quizBtn.onclick = () => startAssessment(lessonId);
}

// --- 7. Quiz & Assessment Logic ---
function startAssessment(lessonId) {
    const lesson = curriculumData.find(l => l.id === lessonId);
    document.getElementById('assessment-title').innerText = `${lesson.title} - Assessment`;
    
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // Clear old questions

    // Generate questions UI
    lesson.quiz.forEach((qObj, index) => {
        let optionsHtml = '';
        qObj.options.forEach((opt, optIndex) => {
            optionsHtml += `
                <label class="block p-3 rounded bg-darkBg border border-gray-700 hover:border-primaryGreen cursor-pointer transition">
                    <input type="radio" name="q${index}" value="${optIndex}" class="mr-2 text-primaryGreen">
                    <span class="text-gray-300 text-sm">${opt}</span>
                </label>
            `;
        });

        container.innerHTML += `
            <div class="bg-zinc-900/50 p-4 rounded-xl border border-gray-800" data-answer="${qObj.answer}">
                <p class="text-white font-bold mb-3">${index + 1}. ${qObj.q}</p>
                <div class="space-y-2">
                    ${optionsHtml}
                </div>
            </div>
        `;
    });

    document.getElementById('assessment-modal').classList.remove('hidden');
}

function closeAssessment() {
    document.getElementById('assessment-modal').classList.add('hidden');
}

function submitAssessment() {
    const lesson = curriculumData.find(l => l.id === activeLessonId);
    let score = 0;
    const totalQuestions = lesson.quiz.length;

    // Grade the quiz
    for (let i = 0; i < totalQuestions; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correctAns = lesson.quiz[i].answer;
        
        if (selected && parseInt(selected.value) === correctAns) {
            score++;
        }
    }

    // Check pass criteria (8 out of 10)
    if (score >= 8) {
        if (!currentUser.completedLessons.includes(activeLessonId)) {
            currentUser.completedLessons.push(activeLessonId);
            saveUser();
        }
        alert(`🎉 Pass! You scored ${score}/${totalQuestions}. Next lesson unlocked!`);
        closeAssessment();
        showDashboard();
    } else {
        alert(`❌ You scored ${score}/${totalQuestions}. You need at least 8 to pass. Please review the lesson and try again!`);
    }
}

// --- 8. Certificate Generation ---
function generateCertificate() {
    if (currentUser.completedLessons.length < TOTAL_LESSONS) return;

    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>A1 Certificate - ${currentUser.name}</title>
                <style>
                    body { font-family: 'Georgia', serif; text-align: center; padding: 50px; background-color: #f4f4f5; }
                    .cert-container { border: 10px solid #047857; padding: 50px; background-color: white; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; }
                    
                    /* Logo and Partnership Header */
                    .partnership-header { display: flex; justify-content: space-between; items-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px;}
                    .partnership-header img { max-height: 60px; }
                    .partnership-text { text-align: left; font-family: Arial, sans-serif; color: #555; font-size: 14px; }
                    
                    h1 { color: #047857; font-size: 48px; margin-bottom: 10px; margin-top: 20px;}
                    h2 { color: #333; font-size: 24px; font-weight: normal; margin-bottom: 40px; }
                    .name { font-size: 36px; font-weight: bold; border-bottom: 2px solid #ccc; display: inline-block; padding-bottom: 5px; margin-bottom: 40px; }
                    p { color: #555; font-size: 18px; line-height: 1.6; padding: 0 20px;}
                    
                    .footer { margin-top: 70px; display: flex; justify-content: space-between; padding: 0 20px; text-align: left; }
                    .signature-block { width: 45%; }
                    .signature-line { border-bottom: 1px solid #333; height: 40px; margin-bottom: 5px; }
                    .signature-title { font-size: 14px; font-family: Arial, sans-serif; color: #333; font-weight: bold;}
                    .signature-sub { font-size: 12px; font-family: Arial, sans-serif; color: #777;}
                </style>
            </head>
            <body>
                <div class="cert-container">
                    
                    <div class="partnership-header">
                        <div class="partnership-text">
                            <strong>In Partnership With:</strong><br>
                            Mitua Mercy Family
                        </div>
                        <img src="https://via.placeholder.com/200x60/ffffff/047857?text=Mitua+Mercy+Family" alt="Mitua Mercy Family Logo">
                    </div>

                    <h1>Zertifikat Deutsch A1</h1>
                    <h2>Certificate of Completion</h2>
                    <p>This is to certify that</p>
                    <div class="name">${currentUser.name}</div>
                    <p>has successfully completed all 40 progression modules and passed the required assessments to demonstrate foundational proficiency in the German A1 Language Framework.</p>
                    
                    <div class="footer">
                        <div class="signature-block">
                            <div class="signature-line" style="text-align: center; font-family: 'Brush Script MT', cursive; font-size: 24px; line-height: 40px; color: #047857;">
                                Chris Wafula
                            </div>
                            <div class="signature-title">Chris Wafula</div>
                            <div class="signature-sub">Director, Progression Hub<br>Date: ${date}</div>
                        </div>
                        
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <div class="signature-title">Mitua Massive Family CBO</div>
                            <div class="signature-sub">Cooperative Partner & Sponsor</div>
                        </div>
                    </div>

                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

// --- Initialize ---
window.onload = initApp;
