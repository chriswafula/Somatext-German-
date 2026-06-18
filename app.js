/**
 * SOMATEX SOLUTIONS | DEUTSCH A1 PORTAL CORE ENGINE
 * Bridging Education & Technology in Partnership with Mitua Massive Family-CBO
 */

// --- 1. STATE MANAGEMENT ---
let appState = {
    isTeacher: false,
    currentUser: null,
    failedAttempts: 0,
    completedLessons: new Set(),
    totalLessons: 40,
    externalResources: [
        { title: "📺 Welcome Video: Kickstart Your German A1 Journey", url: "https://youtube.com/watch?v=example1" },
        { title: "📝 Mitua Massive CBO Partnership Overview & Syllabus", url: "https://docs.google.com/document/d/example" }
    ],
    activeLesson: null
};

// --- 2. SAMPLE LESSON DATA (Scalable up to 40 Lessons) ---
const sampleLessons = [
    { id: 1, title: "Lesson 1: Das Alphabet & Pronunciation", module: "Module 1: Foundations", content: "Welcome to German! Let's master the alphabet. Notice how 'W' sounds like an English 'V', and 'V' sounds like an English 'F'. Try practicing the sounds offline.", question: "Translate into German text: 'Good morning'", answer: "guten morgen" },
    { id: 2, title: "Lesson 2: Begrüßungen (Greetings)", module: "Module 1: Foundations", content: "Learn how to greet people at different times of day. 'Guten Morgen' (Morning), 'Guten Tag' (Day), 'Guten Abend' (Evening).", question: "Translate into German text: 'Goodbye' (Formal)", answer: "auf wiedersehen" },
    { id: 3, title: "Lesson 3: Sich vorstellen (Introductions)", module: "Module 1: Foundations", content: "To state your name, say 'Ich heiße...' or 'Mein Name ist...'. To ask someone's name formally, use 'Wie heißen Sie?'.", question: "Translate: 'My name is'", answer: "mein name ist" },
    { id: 4, title: "Lesson 4: Zahlen 1-20 (Numbers)", module: "Module 2: Everyday Math", content: "Let's count: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn... Master these before progressing.", question: "What is the German word for the number 4?", answer: "vier" }
];

// Fill out remaining slots dynamically to hit the 40-lesson framework visually
for (let i = i = 5; i <= 40; i++) {
    sampleLessons.push({
        id: i,
        title: `Lesson ${i}: Advanced Progression Content Track`,
        module: i <= 15 ? "Module 2: Conversational Basics" : i <= 30 ? "Module 3: Intermediate Structures" : "Module 4: Career Preparation",
        content: "This module covers standard linguistic patterns designed to align seamlessly with future career or nursing-sector validation metrics.",
        question: "Type 'pass' to complete this placeholder verification",
        answer: "pass"
    });
}

// --- 3. AUTHENTICATION & PORTAL ENTER LOGIC ---
function handleLogin(event) {
    event.preventDefault();
    
    appState.currentUser = {
        name: document.getElementById('auth-name').value.trim(),
        admission: document.getElementById('auth-admission').value.trim(),
        email: document.getElementById('auth-email').value.trim(),
        phone: document.getElementById('auth-phone').value.trim(),
        country: document.getElementById('auth-country').value.trim(),
        location: document.getElementById('auth-location').value.trim()
    };
    appState.isTeacher = false;
    
    initializeDashboard();
}

function loginAsGhost() {
    appState.currentUser = {
        name: "Director / Teacher Mode",
        admission: "MMF-001",
        email: "admin@somatex.org",
        phone: "N/A",
        country: "Kenya",
        location: "Nairobi / Mitua Hub"
    };
    appState.isTeacher = true;
    
    // Reveal teacher access options
    document.getElementById('admin-toggle-btn').classList.remove('hidden');
    initializeDashboard();
}

function handleLogout() {
    appState.currentUser = null;
    appState.isTeacher = false;
    appState.failedAttempts = 0;
    appState.completedLessons.clear();
    
    // UI resets
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('user-controls').classList.add('hidden');
    document.getElementById('admin-toggle-btn').classList.add('hidden');
    document.querySelector('form').reset();
}

// --- 4. INITIALIZE DASHBOARD VIEWS ---
function initializeDashboard() {
    // Hide auth, show dynamic dashboard panel structure
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    document.getElementById('user-controls').classList.remove('flex');
    document.getElementById('user-controls').classList.remove('hidden');
    
    // Map Student Badge UI Fields
    document.getElementById('welcome-text').innerText = `Hello, ${appState.currentUser.name}`;
    document.getElementById('student-badge-name').innerText = appState.currentUser.name;
    document.getElementById('student-badge-adm').innerText = `ADM: ${appState.currentUser.admission}`;
    document.getElementById('student-badge-location').innerText = appState.currentUser.location;
    document.getElementById('student-badge-country').innerText = appState.currentUser.country;
    document.getElementById('student-badge-phone').innerText = appState.currentUser.phone;
    
    // Sync the Admin Data Screen Fields simultaneously
    document.getElementById('admin-student-name').innerText = appState.currentUser.name;
    document.getElementById('admin-student-email').innerText = `${appState.currentUser.email} | Adm: ${appState.currentUser.admission}`;
    document.getElementById('admin-fail-count').innerText = appState.failedAttempts;

    renderCurriculum();
    renderResources();
    updateProgressMeter();
}

// --- 5. RENDER OVERLAYS (CURRICULUM & RESOURCES) ---
function renderCurriculum() {
    const container = document.getElementById('module-container');
    container.innerHTML = ""; // Clear existing elements Safely

    sampleLessons.forEach(lesson => {
        const isLocked = lesson.id > 1 && !appState.completedLessons.has(lesson.id - 1);
        
        const card = document.createElement('div');
        card.className = `p-5 rounded-xl border transition-all text-left ${
            isLocked 
            ? 'bg-gray-900/40 border-gray-800 opacity-50 cursor-not-allowed' 
            : 'bg-darkCard border-gray-800 hover:border-primaryGreen cursor-pointer shadow-md'
        }`;
        
        if (!isLocked) {
            card.onclick = () => openLesson(lesson.id);
        }

        const statusIcon = appState.completedLessons.has(lesson.id) ? "✅" : isLocked ? "🔒" : "📖";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="text-xs font-black uppercase tracking-wider text-primaryGreen">${lesson.module}</span>
                <span>${statusIcon}</span>
            </div>
            <h4 class="text-white font-bold mt-2 text-base">${lesson.title}</h4>
            <p class="text-xs text-gray-400 mt-1 line-clamp-1">Click to view lesson materials and run diagnostic validation testing.</p>
        `;
        container.appendChild(card);
    });
}

function renderResources() {
    const container = document.getElementById('resource-container');
    if (!container) return;
    
    container.innerHTML = "";
    
    appState.externalResources.forEach(res => {
        const link = document.createElement('a');
        link.href = res.url;
        link.target = "_blank"; // Force opens externally in native browser/YouTube app to save local storage
        link.className = "block p-4 bg-gray-900 hover:bg-gray-800/80 rounded-xl border-l-4 border-primaryGreen transition text-gray-200 text-sm font-semibold shadow-sm";
        link.innerHTML = `
            <div class="flex justify-between items-center">
                <span>${res.title}</span>
                <span class="text-xs text-gray-500 font-normal">External Link ↗</span>
            </div>
        `;
        container.appendChild(link);
    });
}

function updateProgressMeter() {
    const count = appState.completedLessons.size;
    document.getElementById('progress-text').innerText = `${count} / ${appState.totalLessons} Completed`;
    
    const percentage = (count / appState.totalLessons) * 100;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    
    const certBtn = document.getElementById('cert-btn');
    if (count >= appState.totalLessons) {
        certBtn.disabled = false;
        certBtn.className = "w-full mt-3 bg-primaryGreen text-white font-bold py-2 px-3 rounded-lg text-xs transition hover:bg-emerald-600 border border-transparent cursor-pointer shadow-md";
    } else {
        certBtn.disabled = true;
        certBtn.className = "w-full mt-3 bg-gray-800 text-gray-500 font-bold py-2 px-3 rounded-lg text-xs cursor-not-allowed border border-gray-700 transition";
    }
}

// --- 6. LESSON VIEW SYSTEM INTERFACES ---
function openLesson(lessonId) {
    const lesson = sampleLessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    appState.activeLesson = lesson;
    
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.remove('hidden');
    
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-content').innerHTML = `
        <p class="text-gray-300 text-sm leading-relaxed">${lesson.content}</p>
        <div class="p-4 bg-black/30 rounded-xl border border-gray-800 mt-4 text-xs">
            <span class="text-amber-500 font-bold block mb-1">💡 Study Guidance Note:</span>
            To keep internet access costs and bandwidth footprints extremely low for rural setups, verify streaming videos listed under the "Video & Assignments" portal tab whenever you are connected to a high-speed node.
        </div>
    `;
    
    // Wire up assessment button launcher dynamically
    document.getElementById('start-quiz-btn').onclick = () => openAssessmentModal(lesson);
}

function showDashboard() {
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    initializeDashboard(); // Refreshes curriculum tracking states accurately
}

// --- 7. SECURITY & ANTI-CHEAT ASSESSMENT HUB ---
function openAssessmentModal(lesson) {
    const modal = document.getElementById('assessment-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Centers tailwind layout neatly
    
    document.getElementById('assessment-title').innerText = `Verification Evaluation: Lesson ${lesson.id}`;
    
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <div class="
