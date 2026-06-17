// --- 1. Generate 40 Lessons dynamically ---
const TOTAL_LESSONS = 40;
const curriculum = Array.from({ length: TOTAL_LESSONS }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}`,
    description: i === 39 ? "Final Mastery Assessment" : "Core Vocabulary & Grammar"
}));

// --- 2. State Management ---
let currentUser = null;
let activeAssessmentId = null;

function initApp() {
    const savedUser = localStorage.getItem('student_profile');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showAuth();
    }
}

// --- 3. Authentication Flow ---
function handleLogin(event) {
    event.preventDefault();
    
    const name = document.getElementById('auth-name').value;
    const email = document.getElementById('auth-email').value;

    // Check if user exists, otherwise create new profile
    const existingData = localStorage.getItem(`profile_${email}`);
    if (existingData) {
        currentUser = JSON.parse(existingData);
    } else {
        currentUser = {
            name: name,
            email: email,
            completedLessons: [] // Array of completed lesson IDs
        };
    }
    
    saveUser();
    showDashboard();
}

// NEW: Ghost login function moved safely OUTSIDE of handleLogin
function loginAsGhost() {
    // 1. Create the ghost user automatically
    currentUser = {
        name: "Ghost Admin",
        email: "admin@deutsch-app.local",
        completedLessons: [] // Starts at 0 lessons
    };
    
    // 2. Save them to local storage
    saveUser();
    
    // 3. Force the app to open the dashboard
    showDashboard();
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('student_profile');
    showAuth();
}

function saveUser() {
    localStorage.setItem('student_profile', JSON.stringify(currentUser));
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(currentUser)); // Save progress permanently to email
}

// --- 4. View Controllers ---
function showAuth() {
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('user-controls').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    
    document.getElementById('user-controls').classList.remove('hidden');
    document.getElementById('welcome-text').innerText = `Hallo, ${currentUser.name}!`;
    
    updateProgress();
    renderModules();
}

// --- 5. Core Logic: Rendering Lessons & Progress ---
function updateProgress() {
    const completedCount = currentUser.completedLessons.length;
    const percentage = (completedCount / TOTAL_LESSONS) * 100;
    
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('progress-text').innerText = `${completedCount} of ${TOTAL_LESSONS} Lessons Completed`;

    // Unlock Certificate if 40 lessons done
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

    // Determine the highest unlocked lesson (Last completed + 1)
    const highestUnlocked = currentUser.completedLessons.length + 1;

    curriculum.forEach((module) => {
        const isCompleted = currentUser.completedLessons.includes(module.id);
        const isCurrent = module.id === highestUnlocked;
        const isLocked = module.id > highestUnlocked;

        const card = document.createElement('div');
        
        // Styling based on state
        if (isCompleted) {
            card.className = 'p-5 rounded-2xl border bg-darkCard border-emerald-900/50 shadow-md opacity-70';
        } else if (isCurrent) {
            card.className = 'p-5 rounded-2xl border bg-darkCard border-primaryGreen shadow-lg shadow-primaryGreen/10 cursor-pointer hover:border-emerald-500 transition-all';
            card.onclick = () => openAssessment(module.id);
        } else {
            card.className = 'p-5 rounded-2xl border bg-zinc-900/30 border-zinc-900/80 opacity-40';
        }
        
        // Status Badges/Icons
        let statusHtml = '';
        if (isCompleted) {
            statusHtml = `<span class="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded">Passed</span>`;
        } else if (isCurrent) {
            statusHtml = `<button class="text-xs bg-primaryGreen text-white font-bold px-3 py-1.5 rounded hover:bg-emerald-600 transition">Take Assessment</button>`;
        } else {
            statusHtml = `<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`;
        }

        card.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-base font-bold ${isLocked ? 'text-gray-500' : 'text-white'}">${module.title}</h3>
                    <p class="text-xs text-gray-400 mt-1">${module.description}</p>
                </div>
                <div class="ml-4 flex-shrink-0 flex items-center">
                    ${statusHtml}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 6. Assessment Logic ---
function openAssessment(lessonId) {
    activeAssessmentId = lessonId;
    document.getElementById('assessment-title').innerText = `Lesson ${lessonId} Assessment`;
    document.getElementById('assessment-modal').classList.remove('hidden');
}

function closeAssessment() {
    document.getElementById('assessment-modal').classList.add('hidden');
    activeAssessmentId = null;
}

function submitAssessment() {
    // Simulate passing the 10-question assessment
    if (activeAssessmentId && !currentUser.completedLessons.includes(activeAssessmentId)) {
        currentUser.completedLessons.push(activeAssessmentId);
        saveUser();
        
        alert(`🎉 Excellent! You scored 10/10. Lesson ${activeAssessmentId + 1} is now unlocked.`);
    }
    
    closeAssessment();
    updateProgress();
    renderModules();
}

// --- 7. Certificate Generation ---
function generateCertificate() {
    if (currentUser.completedLessons.length < TOTAL_LESSONS) return;

    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Create a printable window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>A1 Certificate - ${currentUser.name}</title>
                <style>
                    body { font-family: 'Georgia', serif; text-align: center; padding: 50px; background-color: #f4f4f5; }
                    .cert-container { border: 10px solid #047857; padding: 50px; background-color: white; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                    h1 { color: #047857; font-size: 48px; margin-bottom: 10px; }
                    h2 { color: #333; font-size: 24px; font-weight: normal; margin-bottom: 40px; }
                    .name { font-size: 36px; font-weight: bold; border-bottom: 2px solid #ccc; display: inline-block; padding-bottom: 5px; margin-bottom: 40px; }
                    p { color: #555; font-size: 18px; line-height: 1.6; }
                    .footer { margin-top: 60px; display: flex; justify-content: space-between; padding: 0 40px; }
                    .signature { border-top: 1px solid #333; padding-top: 5px; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="cert-container">
                    <h1>Zertifikat Deutsch A1</h1>
                    <h2>Certificate of Completion</h2>
                    <p>This is to certify that</p>
                    <div class="name">${currentUser.name}</div>
                    <p>has successfully completed all 40 progression modules and passed the required assessments to demonstrate foundational proficiency in German A1.</p>
                    <div class="footer">
                        <div class="signature">Date: ${date}</div>
                        <div class="signature">Progression Hub Director</div>
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
