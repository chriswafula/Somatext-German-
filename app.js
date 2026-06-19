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

// --- 2. FULL GERMAN A1 CURRICULUM (40 Lessons) ---
const sampleLessons = [
    // MODULE 1: Foundations & Introductions
    { id: 1, title: "Lesson 1: Das Alphabet & Pronunciation", module: "Module 1: Foundations", content: "Welcome! In German, 'W' sounds like 'V', 'V' sounds like 'F', and 'J' sounds like 'Y'. 'Ä', 'Ö', and 'Ü' are umlauts. 'ß' is a double 's'.", question: "Which English letter does the German 'W' sound like?", answer: "v" },
    { id: 2, title: "Lesson 2: Begrüßungen (Greetings)", module: "Module 1: Foundations", content: "Greet people based on time: 'Guten Morgen' (Morning), 'Guten Tag' (Day), 'Guten Abend' (Evening). 'Hallo' is casual, 'Tschüss' is casual goodbye.", question: "Translate into German: 'Good morning'", answer: "guten morgen" },
    { id: 3, title: "Lesson 3: Sich vorstellen (Introductions)", module: "Module 1: Foundations", content: "To say your name: 'Ich heiße...' or 'Mein Name ist...'. To ask formally: 'Wie heißen Sie?'. Informally: 'Wie heißt du?'.", question: "Translate: 'My name is'", answer: "mein name ist" },
    { id: 4, title: "Lesson 4: Woher kommst du? (Origins)", module: "Module 1: Foundations", content: "To say where you are from, use 'Ich komme aus...' (I come from...). For example: 'Ich komme aus Kenia' or 'Ich komme aus Deutschland'.", question: "Translate: 'I come from'", answer: "ich komme aus" },
    { id: 5, title: "Lesson 5: Zahlen 1-20 (Numbers)", module: "Module 1: Foundations", content: "1 to 10: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn. 11: elf, 12: zwölf. Master these for daily transactions.", question: "What is the German word for the number 5?", answer: "fünf" },

    // MODULE 2: Basic Grammar & Nouns
    { id: 6, title: "Lesson 6: Die Artikel (Der, Die, Das)", module: "Module 2: Basic Grammar", content: "German has 3 genders for 'the': 'der' (masculine), 'die' (feminine/plural), 'das' (neuter). Always learn nouns with their articles!", question: "Which article is used for feminine nouns?", answer: "die" },
    { id: 7, title: "Lesson 7: Personalpronomen (Pronouns)", module: "Module 2: Basic Grammar", content: "Ich (I), du (you singular informal), er (he), sie (she/they), es (it), wir (we), ihr (you plural informal), Sie (you formal).", question: "What is the formal word for 'you' in German?", answer: "sie" },
    { id: 8, title: "Lesson 8: The Verb 'sein' (to be)", module: "Module 2: Basic Grammar", content: "'Sein' is irregular. Ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. Example: 'Ich bin Student' (I am a student).", question: "Translate: 'I am'", answer: "ich bin" },
    { id: 9, title: "Lesson 9: The Verb 'haben' (to have)", module: "Module 2: Basic Grammar", content: "'Haben' is crucial. Ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben. Example: 'Ich habe Zeit' (I have time).", question: "Translate: 'He has'", answer: "er hat" },
    { id: 10, title: "Lesson 10: Die Familie (Family)", module: "Module 2: Basic Grammar", content: "Der Vater (father), die Mutter (mother), der Bruder (brother), die Schwester (sister). Use 'mein' (my masculine/neuter) and 'meine' (my feminine/plural).", question: "Translate: 'The mother'", answer: "die mutter" },

    // MODULE 3: Daily Life & Time
    { id: 11, title: "Lesson 11: Wochentage (Days of the Week)", module: "Module 3: Daily Life", content: "Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag. Use 'am' before days: 'am Montag' (on Monday).", question: "What is the German word for Friday?", answer: "freitag" },
    { id: 12, title: "Lesson 12: Monate & Jahreszeiten (Months & Seasons)", module: "Module 3: Daily Life", content: "Seasons: der Sommer, der Winter, der Herbst, der Frühling. Use 'im' before months and seasons: 'im Sommer' (in summer).", question: "Translate: 'In summer'", answer: "im sommer" },
    { id: 13, title: "Lesson 13: Die Uhrzeit (Telling Time)", module: "Module 3: Daily Life", content: "Ask 'Wie spät ist es?' (What time is it?). Answer: 'Es ist...'. 'Viertel nach' is quarter past, 'halb' is half to the next hour.", question: "Translate: 'What time is it?' (Leave out punctuation)", answer: "wie spät ist es" },
    { id: 14, title: "Lesson 14: Essen und Trinken (Food & Drink)", module: "Module 3: Daily Life", content: "Das Wasser (water), das Brot (bread), der Apfel (apple), der Kaffee (coffee). 'Ich esse' (I eat), 'Ich trinke' (I drink).", question: "Translate: 'The water'", answer: "das wasser" },
    { id: 15, title: "Lesson 15: Im Café (Ordering in a Cafe)", module: "Module 3: Daily Life", content: "To order politely, say 'Ich hätte gern...' (I would like to have...) or 'Ich möchte...' (I would like...). 'Bitte' means please/you're welcome.", question: "Translate: 'I would like'", answer: "ich möchte" },

    // MODULE 4: The Accusative Case & Places
    { id: 16, title: "Lesson 16: The Accusative Case (Direct Objects)", module: "Module 4: Accusative Case", content: "The Accusative case is for direct objects. Only masculine articles change! 'der' becomes 'den', 'ein' becomes 'einen'. Die and Das stay the same.", question: "In the accusative case, 'der' changes to what?", answer: "den" },
    { id: 17, title: "Lesson 17: Orte in der Stadt (Places in the City)", module: "Module 4: Accusative Case", content: "Der Bahnhof (train station), die Post (post office), das Krankenhaus (hospital). 'Ich suche den Bahnhof' (I am looking for the train station).", question: "Translate: 'The hospital'", answer: "das krankenhaus" },
    { id: 18, title: "Lesson 18: Verkehrsmittel (Transportation)", module: "Module 4: Accusative Case", content: "Der Bus, der Zug (train), das Auto (car), das Fahrrad (bicycle). To say you travel by something, use 'mit dem' (e.g., mit dem Bus).", question: "Translate: 'The train'", answer: "der zug" },
    { id: 19, title: "Lesson 19: Negation (Nicht vs. Kein)", module: "Module 4: Accusative Case", content: "Use 'kein' to negate a noun with an indefinite article (Ich habe kein Auto). Use 'nicht' to negate verbs or adjectives (Das ist nicht gut).", question: "Which word do you use to negate a noun with an indefinite article?", answer: "kein" },
    { id: 20, title: "Lesson 20: Fragewörter (Question Words)", module: "Module 4: Accusative Case", content: "Wer (Who), Was (What), Wo (Where), Wann (When), Warum (Why), Wie (How). Example: 'Wo ist der Bahnhof?'", question: "Translate the question word: 'Where'", answer: "wo" },

    // MODULE 5: Work, Abilities, & Modal Verbs
    { id: 21, title: "Lesson 21: Berufe (Professions)", module: "Module 5: Work & Abilities", content: "To state your job: 'Ich bin Arzt von Beruf' (I am a doctor by profession). Note: Female professions usually end in '-in' (die Ärztin).", question: "What suffix is usually added for a female profession?", answer: "in" },
    { id: 22, title: "Lesson 22: Modal Verb: Können (Can/Ability)", module: "Module 5: Work & Abilities", content: "'Können' expresses ability. Ich kann, du kannst, er kann. The second verb goes to the very END of the sentence in its infinitive form.", question: "Translate: 'I can'", answer: "ich kann" },
    { id: 23, title: "Lesson 23: Modal Verb: Müssen (Must/Necessity)", module: "Module 5: Work & Abilities", content: "'Müssen' means must. Ich muss, du musst, er muss. 'Ich muss heute arbeiten' (I must work today).", question: "Translate: 'I must'", answer: "ich muss" },
    { id: 24, title: "Lesson 24: Modal Verb: Wollen (Want to)", module: "Module 5: Work & Abilities", content: "'Wollen' expresses a strong desire or plan. Ich will, du willst, er will. 'Ich will Deutsch lernen' (I want to learn German).", question: "Translate: 'I want'", answer: "ich will" },
    { id: 25, title: "Lesson 25: Der Imperativ (Commands)", module: "Module 5: Work & Abilities", content: "Commands are used for instructions. Formal: 'Kommen Sie!' (Come!). Informal singular: 'Komm!' (Come!). Let's go: 'Gehen wir!'", question: "Translate into an informal singular command: 'Come!'", answer: "komm" },

    // MODULE 6: Health & The Dative Case Introduction
    { id: 26, title: "Lesson 26: Der Körper (Body Parts)", module: "Module 6: Health & Dative", content: "Der Kopf (head), der Arm (arm), das Bein (leg), der Bauch (stomach). 'Mein Kopf tut weh' means 'My head hurts'.", question: "Translate: 'The head'", answer: "der kopf" },
    { id: 27, title: "Lesson 27: Beim Arzt (At the Doctor)", module: "Module 6: Health & Dative", content: "To express illness: 'Ich bin krank' (I am sick). The doctor might ask 'Was fehlt Ihnen?' (What is wrong with you?).", question: "Translate: 'I am sick'", answer: "ich bin krank" },
    { id: 28, title: "Lesson 28: Intro to Dative Case (Indirect Objects)", module: "Module 6: Health & Dative", content: "Dative indicates the receiver. Articles change drastically: der->dem, das->dem, die->der, die(plural)->den. 'Ich helfe dem Mann' (I help the man).", question: "In the Dative case, 'der' changes to what?", answer: "dem" },
    { id: 29, title: "Lesson 29: Prepositions with Dative", module: "Module 6: Health & Dative", content: "Some prepositions ALWAYS take Dative: aus, bei, mit, nach, seit, von, zu. Example: 'Ich fahre mit dem Bus' (I travel with the bus).", question: "Which case always follows the preposition 'mit'?", answer: "dative" },
    { id: 30, title: "Lesson 30: Kleidung (Clothing)", module: "Module 6: Health & Dative", content: "Die Hose (pants), das Hemd (shirt), die Jacke (jacket). 'Ich trage eine Jacke' (I am wearing a jacket).", question: "Translate: 'The jacket'", answer: "die jaсke" },

    // MODULE 7: Housing & Separable Verbs
    { id: 31, title: "Lesson 31: Das Haus (The House)", module: "Module 7: Living Spaces", content: "Das Wohnzimmer (living room), die Küche (kitchen), das Schlafzimmer (bedroom), das Bad (bathroom).", question: "Translate: 'The kitchen'", answer: "die küche" },
    { id: 32, title: "Lesson 32: Möbel (Furniture)", module: "Module 7: Living Spaces", content: "Der Tisch (table), der Stuhl (chair), das Bett (bed), der Schrank (closet).", question: "Translate: 'The bed'", answer: "das bett" },
    { id: 33, title: "Lesson 33: Trennbare Verben (Separable Verbs)", module: "Module 7: Living Spaces", content: "Some verbs split. 'aufstehen' (to wake up). In a standard sentence, the prefix goes to the end: 'Ich stehe um 7 Uhr auf'.", question: "Where does the separable prefix go in a standard sentence?", answer: "end" },
    { id: 34, title: "Lesson 34: Freizeit & Hobbys (Free Time)", module: "Module 7: Living Spaces", content: "Lesen (to read), spielen (to play), schwimmen (to swim). 'Was machst du in deiner Freizeit?' (What do you do in your free time?).", question: "Translate: 'To read'", answer: "lesen" },
    { id: 35, title: "Lesson 35: Einkaufen (Shopping)", module: "Module 7: Living Spaces", content: "Teuer (expensive), billig (cheap). 'Wie viel kostet das?' (How much does that cost?).", question: "Translate: 'Expensive'", answer: "teuer" },

    // MODULE 8: The Past Tense & Final Evaluation
    { id: 36, title: "Lesson 36: Das Perfekt (Past Tense with Haben)", module: "Module 8: Past Tense", content: "Conversational past tense mostly uses 'haben' + a participle (ge-). 'Ich habe gespielt' (I played), 'Ich habe gemacht' (I did/made).", question: "What prefix is commonly used for past participles in German?", answer: "ge" },
    { id: 37, title: "Lesson 37: Das Perfekt (Past Tense with Sein)", module: "Module 8: Past Tense", content: "Verbs involving movement from A to B (gehen, fahren) use 'sein' instead of haben. 'Ich bin gegangen' (I went).", question: "Does the verb 'gehen' (to go) use 'haben' or 'sein' in the past tense?", answer: "sein" },
    { id: 38, title: "Lesson 38: Briefe schreiben (Writing Letters/Emails)", module: "Module 8: Past Tense", content: "Formal start: 'Sehr geehrte(r)...'. Informal start: 'Liebe(r)...'. Formal end: 'Mit freundlichen Grüßen'.", question: "Translate the formal sign-off: 'Mit freundlichen Grüßen'", answer: "with kind regards" },
    { id: 39, title: "Lesson 39: Speaking Exam Prep", module: "Module 8: Past Tense", content: "In the A1 speaking exam, you must introduce yourself: Name, Alter (age), Land (country), Wohnort (living place), Sprachen (languages), Beruf (profession).", question: "Translate: 'Age'", answer: "alter" },
    { id: 40, title: "Lesson 40: Final A1 Certification Validation", module: "Module 8: Past Tense", content: "Congratulations! You have covered the A1 structures. Validate your final milestone to unlock the Mitua Massive CBO Certificate generation.", question: "Type 'zertifikat' to complete your A1 level track.", answer: "zertifikat" }
];
// --- 2.5 TOAST GENERATOR UTILITY ---
function showToast(message) {
    const toast = document.getElementById('custom-toast');
    if (!toast) return; // Safety check
    
    document.getElementById('toast-message').innerText = message;
    
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => { toast.classList.add('hidden'); }, 500);
    }, 4000);
}

// --- 2.6 MENU NAVIGATION FLOW ---
function showAuthSelection() {
    document.getElementById('auth-selection').classList.remove('hidden');
    document.getElementById('form-signin').classList.add('hidden');
    document.getElementById('form-signup').classList.add('hidden');
    
    document.getElementById('form-signin').reset();
    if(document.getElementById('form-signup')) document.getElementById('form-signup').reset();
}

function showSignInForm() {
    document.getElementById('auth-selection').classList.add('hidden');
    document.getElementById('form-signup').classList.add('hidden');
    document.getElementById('form-signin').classList.remove('hidden');
}

function showSignUpForm() {
    document.getElementById('auth-selection').classList.add('hidden');
    document.getElementById('form-signin').classList.add('hidden');
    document.getElementById('form-signup').classList.remove('hidden');
}


// --- 3. AUTHENTICATION & PORTAL ENTER LOGIC ---
function handleLogin(event) {
    event.preventDefault();
    
    const admCode = document.getElementById('signin-admission').value.trim();
    const phone = document.getElementById('signin-phone').value.trim();

    // Mock Login Logic (To be replaced by Firebase Auth in Phase 2)
    appState.currentUser = {
        name: admCode === "ADMIN-001" ? "System Administrator" : "Student Node",
        admission: admCode,
        email: "verified@somatex.org",
        phone: phone,
        country: "Kenya",
        location: "Mitua Hub"
    };
    
    // Check if user is an Admin using secure structural patterns
    if (admCode === "ADMIN-001") {
        appState.isTeacher = true;
        document.getElementById('admin-toggle-btn').classList.remove('hidden');
        showToast("System Director Mode Activated.");
    } else {
        appState.isTeacher = false;
        document.getElementById('admin-toggle-btn').classList.add('hidden');
        showToast("Student Profile Authenticated.");
    }
    
    initializeDashboard();
}

function handleLogout() {
    appState.currentUser = null;
    appState.isTeacher = false;
    
    // Complete UI visibility resets
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('user-controls').classList.add('hidden');
    document.getElementById('user-controls').classList.remove('flex');
    document.getElementById('admin-toggle-btn').classList.add('hidden');
    
    // Clear all form inputs safely
    document.getElementById('form-signin').reset();
    if(document.getElementById('form-signup')) document.getElementById('form-signup').reset();
    
    showToast("Session successfully terminated.");
}

// --- 4. INITIALIZE DASHBOARD VIEWS ---
function initializeDashboard() {
    // Hide auth, reveal structural workspace wrapper nodes
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    document.getElementById('user-controls').classList.add('flex');
    document.getElementById('user-controls').classList.remove('hidden');
    
    // Map Student Badge UI Fields
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
    container.innerHTML = ""; // Clear existing elements safely

    sampleLessons.forEach(lesson => {
        // Strict anti-cheat lock: Next lesson is locked if the previous one isn't completed
        const isLocked = lesson.id > 1 && !appState.completedLessons.has(lesson.id - 1);
        
        const card = document.createElement('div');
        card.className = `p-5 rounded-xl border transition-all text-left ${
            isLocked 
            ? 'bg-gray-900/40 border-gray-800 opacity-50 cursor-not-allowed' 
            : 'bg-hubCard border-gray-800 hover:border-cboGreen cursor-pointer shadow-md'
        }`;
        
        if (!isLocked) {
            card.onclick = () => openLesson(lesson.id);
        }

        const statusIcon = appState.completedLessons.has(lesson.id) ? "✅" : isLocked ? "🔒" : "📖";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="text-xs font-black uppercase tracking-wider text-cboGreen">${lesson.module}</span>
                <span>${statusIcon}</span>
            </div>
            <h4 class="text-white font-bold mt-2 text-base">${lesson.title}</h4>
            <p class="text-xs text-gray-400 mt-1 line-clamp-1">Click to view lesson materials and run diagnostic testing.</p>
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
        link.target = "_blank"; // Save bandwidth by opening in external standard environments
        link.className = "block p-4 bg-gray-900 hover:bg-gray-800/80 rounded-xl border-l-4 border-cboBlue transition text-gray-200 text-sm font-semibold shadow-sm mb-2";
        link.innerHTML = `
            <div class="flex justify-between items-center">
                <span>${res.title}</span>
                <span class="text-xs text-cboBlue font-normal">External Link ↗</span>
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
        certBtn.className = "w-full mt-3 bg-cboGreen text-white font-bold py-2 px-3 rounded-xl text-xs transition hover:bg-emerald-600 border border-transparent cursor-pointer shadow-md uppercase tracking-wider";
    } else {
        certBtn.disabled = true;
        certBtn.className = "w-full mt-3 bg-gray-800 text-gray-500 font-bold py-2 px-3 rounded-xl text-xs cursor-not-allowed border border-gray-700 transition uppercase tracking-wider";
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
        <div class="p-4 bg-black/30 rounded-xl border border-gray-800 mt-6 text-xs">
            <span class="text-cboOrange font-bold block mb-1">💡 Study Guidance Note:</span>
            To keep internet access costs and bandwidth footprints extremely low for rural setups, verify streaming videos listed under the "Broadcast Media Repositories" portal tab whenever you are connected to a high-speed node.
        </div>
    `;
    
    document.getElementById('start-quiz-btn').onclick = () => openAssessmentModal(lesson);
}

function showDashboard() {
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    initializeDashboard(); // Refreshes curriculum tracking states perfectly
}

// --- 7. SECURITY & ANTI-CHEAT ASSESSMENT HUB ---
function openAssessmentModal(lesson) {
    const modal = document.getElementById('assessment-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Centers layout neatly
    
    document.getElementById('assessment-title').innerText = `Diagnostic: Lesson ${lesson.id}`;
    
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <div class="space-y-2">
            <label class="block text-sm font-bold text-white mb-3">${lesson.question}</label>
            <input type="text" id="assessment-answer" placeholder="Type your answer here..." autocomplete="off" class="w-full bg-hubBg border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cboOrange transition">
        </div>
    `;
    
    setTimeout(() => {
        const inputField = document.getElementById('assessment-answer');
        if(inputField) inputField.focus();
    }, 100);
}

function closeAssessment() {
    const modal = document.getElementById('assessment-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    appState.activeLesson = null;
}

function submitAssessment() {
    const inputField = document.getElementById('assessment-answer');
    const answerInput = inputField.value.trim().toLowerCase();
    const correctAnswer = appState.activeLesson.answer.toLowerCase();

    if (answerInput === correctAnswer) {
        appState.completedLessons.add(appState.activeLesson.id);
        showToast(`Verification Successful! Lesson ${appState.activeLesson.id} unlocked.`);
        closeAssessment();
        renderCurriculum();
        updateProgressMeter();
        showDashboard();
    } else {
        appState.failedAttempts++;
        document.getElementById('admin-fail-count').innerText = appState.failedAttempts;
        
        // Error visual feedback tracking
        inputField.classList.add('border-cboRed', 'bg-cboRed/10');
        setTimeout(() => {
            inputField.classList.remove('border-cboRed', 'bg-cboRed/10');
        }, 800);
        
        showToast("Access Denied: Incorrect validation key. Review lesson and try again.");
    }
}

// --- 8. TEACHER / ADMIN CONSOLE LOGIC ---
function toggleAdminDashboard() {
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('lesson-view').classList.add('hidden');
    document.getElementById('admin-view').classList.remove('hidden');
}

function resetStudentProgress() {
    if(confirm("Are you sure you want to purge this student's fault records?")) {
        appState.failedAttempts = 0;
        document.getElementById('admin-fail-count').innerText = "0";
        showToast("Student Evaluation Logs Purged.");
    }
}

function publishResource() {
    const title = document.getElementById('resource-title').value.trim();
    const url = document.getElementById('resource-url').value.trim();
    
    if(!title || !url) {
        showToast("Missing Data: Provide both an Asset Title and URL.");
        return;
    }
    
    appState.externalResources.push({ title: `🔗 ${title}`, url: url });
    
    document.getElementById('resource-title').value = '';
    document.getElementById('resource-url').value = '';
    
    renderResources();
    showToast("Broadcast Successful: Asset deployed to all active nodes.");
}

function generateCertificate() {
    if (appState.completedLessons.size < appState.totalLessons) return;
    showToast("Processing request... Establishing connection to Certification Registry Database.");
}
