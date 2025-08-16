// MedAhead Demo - JavaScript Functionality
// Hardcoded data for hackathon demo

let currentStep = 0;
let selectedConference = null;
let contacts = [];
let meetings = [];
let analysisComplete = false;

// Current healthcare conferences data - Updated August 2025
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
        name: "Dr. Michael Chen",
        email: "mchen@stmaryshospital.org",
        company: "St. Mary's Health System",
        title: "Chief Medical Information Officer",
        industry: "Healthcare Technology",
        score: 95,
        priority: "high",
        notes: "Leading AI implementation at major health system. Perfect for discussing clinical AI applications."
    },
    {
        id: "2",
        name: "Sarah Williams",
        email: "swilliams@innovhealth.com",
        company: "InnovHealth Solutions",
        title: "VP of Digital Transformation",
        industry: "Healthcare Technology",
        score: 92,
        priority: "high",
        notes: "Driving digital transformation initiatives. Key contact for technology partnerships."
    },
    {
        id: "3",
        name: "Dr. James Rodriguez",
        email: "jrodriguez@citymedical.edu",
        company: "City Medical Center",
        title: "Director of Clinical Innovation",
        industry: "Healthcare",
        score: 88,
        priority: "high",
        notes: "Focuses on innovative patient care solutions. Excellent for clinical technology discussions."
    },
    {
        id: "4",
        name: "Lisa Thompson",
        email: "lthompson@healthtech.ai",
        company: "HealthTech AI",
        title: "CEO",
        industry: "Digital Health",
        score: 94,
        priority: "high",
        notes: "AI healthcare startup CEO. Great for discussing emerging AI applications in healthcare."
    },
    {
        id: "5",
        name: "Robert Kim",
        email: "rkim@medicore.com",
        company: "MediCore Systems",
        title: "CTO",
        industry: "Healthcare Technology",
        score: 89,
        priority: "high",
        notes: "Technology leader at established health IT company. Perfect for technical discussions."
    },
    {
        id: "6",
        name: "Dr. Amanda Foster",
        email: "afoster@regionalhospital.org",
        company: "Regional Hospital Network",
        title: "Chief Innovation Officer",
        industry: "Healthcare",
        score: 86,
        priority: "medium",
        notes: "Leading innovation initiatives across hospital network. Good for strategic partnerships."
    },
    {
        id: "7",
        name: "David Park",
        email: "dpark@healthventures.com",
        company: "Health Ventures Capital",
        title: "Principal",
        industry: "Healthcare Investment",
        score: 83,
        priority: "medium",
        notes: "Healthcare investor focused on AI and digital health startups."
    },
    {
        id: "8",
        name: "Dr. Jennifer Liu",
        email: "jliu@medschool.edu",
        company: "University Medical School",
        title: "Director of Health Informatics",
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
        contactName: "Dr. Michael Chen",
        contactCompany: "St. Mary's Health System",
        suggestedTime: "Day 1, 10:00 AM",
        reason: "Perfect alignment on AI in clinical workflows",
        personalizedMessage: "Hi Dr. Chen, I noticed your innovative work on AI implementation at St. Mary's. I'd love to discuss our clinical AI solutions over coffee at HIMSS. Are you available Monday morning?",
        priority: "high"
    },
    {
        id: "2",
        contactId: "4",
        contactName: "Lisa Thompson",
        contactCompany: "HealthTech AI",
        suggestedTime: "Day 1, 2:00 PM",
        reason: "CEO-level strategic discussion on AI trends",
        personalizedMessage: "Hi Lisa, As fellow leaders in healthcare AI, I'd value your insights on the future of AI in clinical settings. Available for lunch on Monday?",
        priority: "high"
    },
    {
        id: "3",
        contactId: "2",
        contactName: "Sarah Williams",
        contactCompany: "InnovHealth Solutions",
        suggestedTime: "Day 2, 11:00 AM",
        reason: "Digital transformation partnership opportunities",
        personalizedMessage: "Hi Sarah, I'm impressed by InnovHealth's digital transformation approach. Let's discuss potential collaboration opportunities at HIMSS.",
        priority: "high"
    },
    {
        id: "4",
        contactId: "5",
        contactName: "Robert Kim",
        contactCompany: "MediCore Systems",
        suggestedTime: "Day 2, 3:00 PM",
        reason: "Technical deep-dive on integration solutions",
        personalizedMessage: "Hi Robert, I'd love to explore technical synergies between our platforms. Available for a technical discussion Tuesday afternoon?",
        priority: "medium"
    },
    {
        id: "5",
        contactId: "3",
        contactName: "Dr. James Rodriguez",
        contactCompany: "City Medical Center",
        suggestedTime: "Day 3, 9:00 AM",
        reason: "Clinical innovation and patient care solutions",
        personalizedMessage: "Hi Dr. Rodriguez, Your work on clinical innovation aligns perfectly with our patient care solutions. Coffee Wednesday morning?",
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
    
    // Setup drag and drop for file upload
    setupDragAndDrop();
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
                    <i class="fas fa-users"></i> ${conference.attendees.toLocaleString()} attendees
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
        // Start analysis
        if (contacts.length === 0) {
            alert('Please upload contacts or use demo data to continue.');
            return;
        }
        startAnalysis();
    } else if (currentStep === 3) {
        // Show meetings
        if (!analysisComplete) return;
        populateMeetings();
    } else if (currentStep === 4) {
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
    document.getElementById('uploadStep').classList.add('hidden');
    document.getElementById('analysisStep').classList.add('hidden');
    document.getElementById('meetingStep').classList.add('hidden');
    document.getElementById('dashboardStep').classList.add('hidden');
}

function showCurrentStep() {
    const stepElements = [
        'profileStep',
        'conferenceStep', 
        'uploadStep',
        'analysisStep',
        'meetingStep',
        'dashboardStep'
    ];
    
    if (currentStep < stepElements.length) {
        document.getElementById(stepElements[currentStep]).classList.remove('hidden');
    }
}

function updateProgress() {
    const progress = ((currentStep) / 5) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateStepIndicators() {
    for (let i = 0; i <= 5; i++) {
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

function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload({ target: { files: files } });
        }
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
        alert('Please upload a CSV file.');
        return;
    }
    
    // Simulate file processing
    const uploadStatus = document.getElementById('uploadStatus');
    uploadStatus.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            Successfully uploaded "${file.name}" - Processing ${Math.floor(Math.random() * 50) + 20} contacts
        </div>
    `;
    uploadStatus.classList.remove('hidden');
    
    // Use sample data
    contacts = [...sampleContacts];
    document.getElementById('uploadNextBtn').disabled = false;
}

function simulateUpload() {
    const uploadStatus = document.getElementById('uploadStatus');
    uploadStatus.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            Demo data loaded successfully - ${sampleContacts.length} contacts ready for analysis
        </div>
    `;
    uploadStatus.classList.remove('hidden');
    
    contacts = [...sampleContacts];
    document.getElementById('uploadNextBtn').disabled = false;
}

function startAnalysis() {
    const analysisContent = document.getElementById('analysisContent');
    
    // Show loading state
    analysisContent.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner"></div>
            <p>Analyzing ${contacts.length} contacts with AI...</p>
            <p style="color: #666; margin-top: 10px;">Scoring relevance, identifying key connections, and generating insights.</p>
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
    }, 3000);
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
        
        <p style="text-align: center; margin-top: 20px; color: #667eea; font-weight: 600;">
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
            <div>${meeting.reason}</div>
        </div>
    `).join('');
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
    
    // Reset upload
    document.getElementById('uploadStatus').classList.add('hidden');
    document.getElementById('uploadNextBtn').disabled = true;
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
    link.download = 'medahead-results.json';
    link.click();
    
    // Show success message
    alert('Results exported successfully! Check your downloads folder.');
}

// Add some demo interactions
document.addEventListener('DOMContentLoaded', function() {
    // Auto-populate some demo data
    setTimeout(() => {
        console.log('MedAhead Demo Ready! 🚀');
        console.log('Features:');
        console.log('- AI-powered conference recommendations');
        console.log('- Intelligent contact analysis');
        console.log('- Personalized meeting suggestions');
        console.log('- Comprehensive networking dashboard');
    }, 1000);
});
