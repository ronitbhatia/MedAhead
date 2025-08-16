// Conference Buddy - JavaScript Functionality
// AI-powered conference networking assistant

let currentStep = 0;
let selectedConference = null;
let contacts = [];
let meetings = [];
let analysisComplete = false;

// Current conferences data - Updated December 2024
const conferences = [
    {
        id: "himss-2026",
        name: "HIMSS Global Health Conference & Exhibition",
        date: "2026-03-09 to 2026-03-12",
        location: "Orlando, FL",
        focus: "Health Information Technology",
        attendees: 45000,
        description: "World's largest health information technology conference focusing on digital health transformation",
        relevanceScore: 95
    },
    {
        id: "digital-health-2025",
        name: "Digital Health World Conference",
        date: "2025-09-15 to 2025-09-17",
        location: "San Francisco, CA",
        focus: "Digital Health Innovation",
        attendees: 12000,
        description: "Premier digital health conference showcasing AI, telemedicine, and health tech innovations",
        relevanceScore: 93
    },
    {
        id: "bio-2026",
        name: "BIO International Convention",
        date: "2026-06-08 to 2026-06-11",
        location: "Boston, MA",
        focus: "Biotechnology & Life Sciences",
        attendees: 18000,
        description: "World's largest biotechnology partnering event connecting biotech innovators globally",
        relevanceScore: 88
    },
    {
        id: "rsna-2025",
        name: "Radiological Society of North America Annual Meeting",
        date: "2025-11-30 to 2025-12-05",
        location: "Chicago, IL",
        focus: "Radiology & Medical Imaging",
        attendees: 50000,
        description: "World's premier radiology conference showcasing latest imaging technologies and research",
        relevanceScore: 85
    },
    {
        id: "ahima-2025",
        name: "AHIMA Health Information Management Convention",
        date: "2025-10-05 to 2025-10-09",
        location: "Las Vegas, NV",
        focus: "Health Information Management",
        attendees: 8000,
        description: "Leading conference for health information professionals and data analytics",
        relevanceScore: 82
    },
    {
        id: "jp-morgan-2026",
        name: "J.P. Morgan Healthcare Conference",
        date: "2026-01-11 to 2026-01-14",
        location: "San Francisco, CA",
        focus: "Healthcare Investment & Innovation",
        attendees: 9000,
        description: "Premier healthcare investment conference bringing together industry leaders and investors",
        relevanceScore: 80
    }
];

// Sample contacts data for demo
const sampleContacts = [
    {
        id: "1",
        name: "Dr. Anika Mehrotra",
        email: "anika.mehrotra@mountsinai.org",
        company: "Mount Sinai Health System",
        title: "Chief Medical Information Officer",
        industry: "Healthcare Technology",
        score: 95,
        priority: "high",
        notes: "Leading AI implementation at major health system. Perfect for discussing clinical AI applications."
    },
    {
        id: "2",
        name: "Mateo Alvarez",
        email: "mateo.alvarez@epic.com",
        company: "Epic Systems",
        title: "VP, Digital Transformation",
        industry: "Healthcare Technology",
        score: 92,
        priority: "high",
        notes: "Driving digital transformation initiatives. Key contact for technology partnerships."
    },
    {
        id: "3",
        name: "Dr. Priya Narayanan",
        email: "priya.narayanan@partners.org",
        company: "Mass General Brigham",
        title: "Director of Clinical Innovation",
        industry: "Healthcare",
        score: 88,
        priority: "high",
        notes: "Focuses on innovative patient care solutions. Excellent for clinical technology discussions."
    },
    {
        id: "4",
        name: "Amina El-Sayed",
        email: "amina.elsayed@unitedhealthgroup.com",
        company: "UnitedHealth Group",
        title: "SVP, Digital Health",
        industry: "Payer / Digital Health",
        score: 94,
        priority: "high",
        notes: "Driving digital platforms at scale across payer operations."
    },
    {
        id: "5",
        name: "Hiroshi Tanaka",
        email: "hiroshi.tanaka@google.com",
        company: "Google Health",
        title: "Director of Engineering, Health AI",
        industry: "Healthcare Technology",
        score: 89,
        priority: "high",
        notes: "Technology leader in scalable clinical ML systems and infra."
    },
    {
        id: "6",
        name: "Ethan McAllister",
        email: "ethan.mcallister@kaiserpermanente.org",
        company: "Kaiser Permanente",
        title: "Chief Innovation Officer",
        industry: "Healthcare",
        score: 86,
        priority: "medium",
        notes: "Leading innovation initiatives across hospital network. Good for strategic partnerships."
    },
    {
        id: "7",
        name: "Sofia Petrov",
        email: "sofia.petrov@a16z.com",
        company: "Andreessen Horowitz Bio + Health",
        title: "Partner",
        industry: "Venture Capital",
        score: 83,
        priority: "medium",
        notes: "Healthcare investor focused on AI and digital health startups."
    },
    {
        id: "8",
        name: "Dr. Xiomara Castillo",
        email: "xi.castillo@stanford.edu",
        company: "Stanford Medicine",
        title: "Director, Biomedical Informatics",
        industry: "Healthcare Education",
        score: 81,
        priority: "medium",
        notes: "Academic leader in health informatics. Great for research collaborations."
    }
];

// Sample meeting suggestions
const sampleMeetings = [
    {
        id: "1",
        contactId: "1",
        contactName: "Dr. Anika Mehrotra",
        contactCompany: "Mount Sinai Health System",
        suggestedTime: "Day 1, 10:00 AM",
        reason: "Perfect alignment on AI in clinical workflows",
        personalizedMessage: "Hi Dr. Mehrotra, I noticed your innovative work on AI implementation at Mount Sinai. I'd love to discuss our clinical AI solutions over coffee at HIMSS. Are you available Monday morning?",
        priority: "high"
    },
    {
        id: "2",
        contactId: "4",
        contactName: "Amina El-Sayed",
        contactCompany: "UnitedHealth Group",
        suggestedTime: "Day 1, 2:00 PM",
        reason: "CEO-level strategic discussion on AI trends",
        personalizedMessage: "Hi Amina, driving digital platforms at scale takes real rigor. I'd value your perspective on payer-led digital health initiatives. Lunch on Monday?",
        priority: "high"
    },
    {
        id: "3",
        contactId: "2",
        contactName: "Mateo Alvarez",
        contactCompany: "Epic Systems",
        suggestedTime: "Day 2, 11:00 AM",
        reason: "Digital transformation partnership opportunities",
        personalizedMessage: "Hi Mateo, I'm impressed by Epic's approach to digital transformation. Let's discuss potential collaboration opportunities at HIMSS.",
        priority: "high"
    },
    {
        id: "4",
        contactId: "5",
        contactName: "Hiroshi Tanaka",
        contactCompany: "Google Health",
        suggestedTime: "Day 2, 3:00 PM",
        reason: "Technical deep-dive on integration solutions",
        personalizedMessage: "Hi Hiroshi, I'd love to explore technical synergies between our platforms. Available for a technical discussion Tuesday afternoon?",
        priority: "medium"
    },
    {
        id: "5",
        contactId: "3",
        contactName: "Dr. Priya Narayanan",
        contactCompany: "Mass General Brigham",
        suggestedTime: "Day 3, 9:00 AM",
        reason: "Clinical innovation and patient care solutions",
        personalizedMessage: "Hi Dr. Narayanan, your work on clinical innovation aligns with our patient care solutions. Coffee Wednesday morning?",
        priority: "medium"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    populateConferences();
    updateProgress();
}

function populateConferences() {
    const conferenceGrid = document.getElementById('conferenceGrid');
    conferenceGrid.innerHTML = '';
    
    conferences.forEach(conference => {
        const conferenceCard = document.createElement('div');
        conferenceCard.className = 'conference-card';
        conferenceCard.onclick = () => selectConference(conference);

        conferenceCard.innerHTML = `
            <div class="relevance-badge">${conference.relevanceScore}% Match</div>
            <h3>${conference.name}</h3>
            <div class="conference-date">
                <i class="fas fa-calendar"></i> ${conference.date}
            </div>
            <div class="conference-location">
                <i class="fas fa-map-marker-alt"></i> ${conference.location}
            </div>
            <p>${conference.description}</p>
            <div class="conference-stats">
                <div class="stat">
                    <i class="fas fa-users"></i> ${conference.attendees.toString()} attendees
                </div>
                <div class="stat">
                    <i class="fas fa-tag"></i> ${conference.focus}
                </div>
            </div>
        `;
        
        conferenceGrid.appendChild(conferenceCard);
    });
}

function selectConference(conference) {
    selectedConference = conference;
    
    // Update UI to show selection
    document.querySelectorAll('.conference-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    
    // Enable continue button
    document.getElementById('selectConferenceBtn').disabled = false;
}

function nextStep() {
    if (currentStep === 0) {
        // Validate profile form
        if (!validateProfile()) return;
    } else if (currentStep === 1) {
        // Validate conference selection
        if (!selectedConference) {
            alert('Please select a conference to continue.');
            return;
        }
    } else if (currentStep === 2) {
        // Show meetings
        if (!analysisComplete) return;
        populateMeetings();
    } else if (currentStep === 3) {
        // Show dashboard
        populateDashboard();
    }
    
    // Hide current step
    hideAllSteps();
    
    // Move to next step
    currentStep++;
    
    // Show next step
    showCurrentStep();
    
    // Update progress and indicators
    updateProgress();
    updateStepIndicators();
}

function hideAllSteps() {
    document.getElementById('profileStep').classList.add('hidden');
    document.getElementById('conferenceStep').classList.add('hidden');
    document.getElementById('analysisStep').classList.add('hidden');
    document.getElementById('meetingStep').classList.add('hidden');
    document.getElementById('dashboardStep').classList.add('hidden');
}

function showCurrentStep() {
    const stepElements = [
        'profileStep',
        'conferenceStep', 
        'analysisStep',
        'meetingStep',
        'dashboardStep'
    ];
    
    if (currentStep < stepElements.length) {
        document.getElementById(stepElements[currentStep]).classList.remove('hidden');
    }
}

function updateProgress() {
    const progress = ((currentStep) / 4) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateStepIndicators() {
    for (let i = 0; i <= 4; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (i < currentStep) {
            stepElement.className = 'step completed';
        } else if (i === currentStep) {
            stepElement.className = 'step active';
        } else {
            stepElement.className = 'step';
        }
    }
}

function validateProfile() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const company = document.getElementById('userCompany').value;
    const industry = document.getElementById('userIndustry').value;
    
    if (!name || !email || !company || !industry) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    return true;
}

function startScrapingAndAnalysis() {
    // Hide the scraping introduction and show the analysis content
    document.querySelector('#analysisStep .card:first-of-type').style.display = 'none';
    document.getElementById('analysisContent').classList.remove('hidden');
    
    const analysisContent = document.getElementById('analysisContent');
    
    // Show scraping phase
    analysisContent.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner"></div>
            <h3 style="color: var(--text); margin-bottom: 16px;">Scraping conference attendees</h3>
            <p id=\"scrapingStatus\">Connecting to ${selectedConference.name} attendee directory...</p>
            <div style=\"background: #f8f9fa; border-radius: 8px; padding: 16px; margin-top: 20px; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto;\">
                <div id=\"scrapingProgress\">
                    <div>Connected to conference website</div>
                </div>
            </div>
        </div>
    `;
    
    // Simulate scraping steps
    setTimeout(() => {
        document.getElementById('scrapingStatus').textContent = 'Analyzing speaker directory...';
        document.getElementById('scrapingProgress').innerHTML += '<div>Found 150+ speakers and panelists</div>';
    }, 2000);
    
    setTimeout(() => {
        document.getElementById('scrapingStatus').textContent = 'Scanning sponsor and exhibitor lists...';
        document.getElementById('scrapingProgress').innerHTML += '<div>Identified 300+ sponsors and exhibitors</div>';
    }, 4000);
    
    setTimeout(() => {
        document.getElementById('scrapingStatus').textContent = 'Analyzing social media mentions...';
        document.getElementById('scrapingProgress').innerHTML += '<div>Collected 500+ attendee profiles from LinkedIn</div>';
    }, 6000);
    
    setTimeout(() => {
        document.getElementById('scrapingStatus').textContent = 'Running AI analysis on collected data...';
        document.getElementById('scrapingProgress').innerHTML += '<div>Total contacts found: 850+ attendees</div>';
        startAnalysis();
    }, 8000);
}

function startAnalysis() {
    // Set contacts from sample data (simulating scraped data)
    contacts = [...sampleContacts];
    
    const analysisContent = document.getElementById('analysisContent');
    
    // Show loading state
    analysisContent.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner"></div>
            <h3 style="color: var(--text); margin-bottom: 16px;">AI analysis in progress</h3>
            <p>Analyzing 850+ scraped contacts with AI algorithms...</p>
            <p style=\"color: #6b7280; margin-top: 10px;\">Scoring relevance, identifying key connections, and generating personalized insights.</p>
            <div style=\"background: #f8f9fa; border-radius: 8px; padding: 16px; margin-top: 20px; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto;\">
                <div>Analyzing professional backgrounds...</div>
                <div>Calculating networking relevance scores...</div>
                <div>Identifying key decision makers...</div>
                <div>Generating meeting recommendations...</div>
            </div>
        </div>
    `;
    
    // Simulate analysis delay
    setTimeout(() => {
        showAnalysisResults();
        analysisComplete = true;
        
        // Auto-advance after showing results
        setTimeout(() => {
            nextStep();
        }, 3000);
    }, 5000);
}

function showAnalysisResults() {
    const analysisContent = document.getElementById('analysisContent');
    
    const highPriorityCount = contacts.filter(c => c.priority === 'high').length;
    const mediumPriorityCount = contacts.filter(c => c.priority === 'medium').length;
    const avgScore = Math.round(contacts.reduce((sum, c) => sum + c.score, 0) / contacts.length);
    
    analysisContent.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            Analysis complete! Found ${highPriorityCount} high-priority networking opportunities.
        </div>
        
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-number">${contacts.length}</div>
                <div class="stat-label">Total Contacts</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${highPriorityCount}</div>
                <div class="stat-label">High Priority</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${mediumPriorityCount}</div>
                <div class="stat-label">Medium Priority</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${avgScore}%</div>
                <div class="stat-label">Avg. Relevance</div>
            </div>
        </div>
        
        <h3 style="margin: 20px 0;">Top Contacts Analysis</h3>
        <table class="contact-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                ${contacts.slice(0, 5).map(contact => `
                    <tr>
                        <td>${contact.name}</td>
                        <td>${contact.company}</td>
                        <td>${contact.title}</td>
                        <td>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${contact.score}%"></div>
                            </div>
                            ${contact.score}%
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <p style="text-align: center; margin-top: 20px; color: #6b7280; font-weight: 500;">
            Generating personalized meeting recommendations...
        </p>
    `;
}

function populateMeetings() {
    const meetingList = document.getElementById('meetingList');
    meetings = [...sampleMeetings];
    
    meetingList.innerHTML = meetings.map(meeting => `
        <div class="meeting-card">
            <div class="meeting-contact">${meeting.contactName}</div>
            <div class="meeting-company">${meeting.contactCompany}</div>
            <div class="meeting-time">
                <i class="fas fa-clock"></i> ${meeting.suggestedTime}
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Why this meeting:</strong> ${meeting.reason}
            </div>
            <div class="meeting-message">
                <strong>Suggested message:</strong><br>
                "${meeting.personalizedMessage}"
            </div>
            <div class="action-bar">
                <button class="action-btn primary" onclick="sendLinkedInDM('${meeting.contactName}', '${meeting.contactCompany}')">
                    <i class="fab fa-linkedin"></i> LinkedIn DM
                </button>
                <button class="action-btn" onclick="sendEmail('${meeting.contactName}', '${meeting.contactCompany}')">
                    <i class="fas fa-envelope"></i> Email
                </button>
                <button class="action-btn success" onclick="scheduleMeeting('${meeting.contactName}', '${meeting.suggestedTime}')">
                    <i class="fas fa-calendar-check"></i> Schedule
                </button>
            </div>
        </div>
    `).join('');
}

function populateDashboard() {
    // Update dashboard stats
    const highPriorityCount = contacts.filter(c => c.priority === 'high').length;
    const avgScore = Math.round(contacts.reduce((sum, c) => sum + c.score, 0) / contacts.length);
    
    document.getElementById('totalContacts').textContent = contacts.length;
    document.getElementById('highPriority').textContent = highPriorityCount;
    document.getElementById('meetingSuggestions').textContent = meetings.length;
    document.getElementById('avgScore').textContent = `${avgScore}%`;
    
    // Populate contacts table
    const contactTableBody = document.getElementById('contactTableBody');
    contactTableBody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.company}</td>
            <td>${contact.title}</td>
            <td><span class="priority-${contact.priority}">${contact.priority.toUpperCase()}</span></td>
            <td>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${contact.score}%"></div>
                </div>
                ${contact.score}%
            </td>
        </tr>
    `).join('');
    
    // Populate dashboard meetings
    const dashboardMeetings = document.getElementById('dashboardMeetings');
    dashboardMeetings.innerHTML = meetings.map(meeting => `
        <div class="meeting-card">
            <div class="meeting-contact">${meeting.contactName}</div>
            <div class="meeting-company">${meeting.contactCompany}</div>
            <div class="meeting-time">
                <i class="fas fa-clock"></i> ${meeting.suggestedTime}
            </div>
            <div style="margin-bottom: 8px;">${meeting.reason}</div>
            <div class="action-bar">
                <button class="action-btn primary" onclick="sendLinkedInDM('${meeting.contactName}', '${meeting.contactCompany}')">
                    <i class="fab fa-linkedin"></i> LinkedIn DM
                </button>
                <button class="action-btn" onclick="sendEmail('${meeting.contactName}', '${meeting.contactCompany}')">
                    <i class="fas fa-envelope"></i> Email
                </button>
                <button class="action-btn success" onclick="scheduleMeeting('${meeting.contactName}', '${meeting.suggestedTime}')">
                    <i class="fas fa-calendar-check"></i> Schedule
                </button>
            </div>
        </div>
    `).join('');
}

function sendLinkedInDM(name, company) {
    const message = `Hi ${name}, I’m attending the same conference and would value a quick chat about potential synergies with ${company}. Are you available for a 15-minute coffee during a break?`;
    alert(`LinkedIn DM prepared:\n\n${message}\n\nOpening LinkedIn composer...`);
}

function sendEmail(name, company) {
    const subject = encodeURIComponent(`Quick meeting at the conference?`);
    const body = encodeURIComponent(`Hi ${name},\n\nI’d love to connect briefly during the conference to discuss potential collaboration with ${company}. Would a 15-minute coffee chat work?\n\nBest regards,\n${document.getElementById('userName').value}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function scheduleMeeting(name, time) {
    const details = `Meeting with ${name} at ${time}`;
    alert(`Scheduling assistant\n\n${details}\n\nSuggested slots:\n- Day 1: 10:00–10:15 (Coffee Bar A)\n- Day 1: 14:00–14:15 (Hallway near Stage 2)\n- Day 2: 11:00–11:15 (Sponsor Lounge)\n\nUse your calendar tool to send an invite.`);
}

function showTab(tabName) {
    // Hide all tabs
    document.getElementById('contactsTab').classList.add('hidden');
    document.getElementById('meetingsTab').classList.add('hidden');
    document.getElementById('researchTab').classList.add('hidden');
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.remove('hidden');
    
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

function resetDemo() {
    currentStep = 0;
    selectedConference = null;
    contacts = [];
    meetings = [];
    analysisComplete = false;
    
    // Reset form
    document.getElementById('userName').value = 'Dr. Sarah Johnson';
    document.getElementById('userEmail').value = 'sarah.johnson@healthcorp.com';
    document.getElementById('userCompany').value = 'HealthCorp Solutions';
    document.getElementById('userIndustry').value = 'Healthcare Technology';
    document.getElementById('userGoals').value = 'Looking to connect with healthcare technology leaders, explore AI solutions for patient care, and discuss digital transformation initiatives.';
    
    // Reset buttons
    document.getElementById('selectConferenceBtn').disabled = true;
    
    // Clear selections
    document.querySelectorAll('.conference-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Show first step
    hideAllSteps();
    showCurrentStep();
    updateProgress();
    updateStepIndicators();
}

function exportResults() {
    const results = {
        profile: {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            company: document.getElementById('userCompany').value,
            industry: document.getElementById('userIndustry').value
        },
        selectedConference: selectedConference,
        contacts: contacts,
        meetings: meetings,
        generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'conference-buddy-results.json';
    link.click();
    
    // Show success message
    alert('Results exported successfully! Check your downloads folder.');
}

// Add some demo interactions
document.addEventListener('DOMContentLoaded', function() {
    // Auto-populate some demo data
    setTimeout(() => {
        console.log('Conference Buddy Ready! 🚀');
        console.log('Features:');
        console.log('- AI-powered conference recommendations');
        console.log('- Intelligent attendee scraping & analysis');
        console.log('- Personalized meeting suggestions');
        console.log('- Comprehensive networking dashboard');
    }, 1000);
});
