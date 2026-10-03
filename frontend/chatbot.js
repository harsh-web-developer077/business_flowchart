// BizCalc Chatbot - Predefined Questions & Answers
const chatbotQA = {
    queries: [
        {
            id: 1,
            question: "Calculation कितनी accurate है?",
            answer: "हमारे calculations Sri Dungargarh के real market data पर based हैं। Land prices (₹6,000/sq ft highway, ₹10,000/sq ft market), labor costs, और equipment prices को regularly update किया जाता है। Actual costs location और specifications के आधार पर vary हो सकते हैं।"
        },
        {
            id: 2,
            question: "क्या BizCalc बिल्कुल Free है?",
            answer: "हाँ! BizCalc पूरी तरह free है। कोई subscription नहीं, कोई hidden charges नहीं। सभी features सभी entrepreneurs के लिए available हैं।"
        },
        {
            id: 3,
            question: "मैं अपने calculations save कर सकता हूँ?",
            answer: "हाँ! Sign up करके आप अपने सभी calculations save कर सकते हैं, Dashboard से access कर सकते हैं, और report export कर सकते हैं। Guest mode में भी आप calculations देख सकते हैं।"
        },
        {
            id: 4,
            question: "क्या bank loan के लिए use कर सकता हूँ?",
            answer: "बिल्कुल! हमारे detailed, itemized breakdowns को banks और financial institutions accept करते हैं। आप calculations को directly अपने loan application में use कर सकते हैं।"
        },
        {
            id: 5,
            question: "कितने business types support हैं?",
            answer: "हम 13+ popular business types को support करते हैं:\n• Kirana Shop\n• Cafe/Restaurant\n• Clothing Store\n• Electronics Store\n• Pharmacy\n• Furniture Store\n• और भी बहुत कुछ!\n\nअगर आपका business type नहीं है तो हमें contact करें।"
        },
        {
            id: 6,
            question: "Notifications कैसे काम करते हैं?",
            answer: "आप अपने dashboard में notification preferences set कर सकते हैं:\n• WhatsApp पर updates (recommended)\n• Email पर important news\n• Tips & business advice\n• New features की जानकारी\n\nआप कभी भी preferences change कर सकते हैं।"
        },
        {
            id: 7,
            question: "अगर land prices बदल जाएं तो?",
            answer: "हम regularly market data update करते हैं। आप कभी भी calculator में जाकर latest prices के साथ recalculate कर सकते हैं। हमेशा सबसे recent calculations use करें।"
        },
        {
            id: 8,
            question: "क्या मेरा data safe है?",
            answer: "हाँ, आपका data बिल्कुल safe है। हम कोई भी personal या calculation data अपने servers पर store नहीं करते। सभी calculations आपके browser में होते हैं, आपके पास ही रहते हैं।"
        },
        {
            id: 9,
            question: "Employee costs कैसे calculate होती हैं?",
            answer: "Employee costs में शामिल है:\n• Salary (minimum wage based)\n• ESI (Employee State Insurance)\n• Provident Fund\n• Gratuity provision\n\nये सभी Sri Dungargarh के current labor laws के अनुसार हैं।"
        },
        {
            id: 10,
            question: "क्या मुझे अपना data export करना पड़ेगा?",
            answer: "हाँ! आप अपने सभी calculations को:\n• PDF के रूप में download कर सकते हैं\n• Email पर भेज सकते हैं\n• Screenshot ले सकते हैं\n• Direct print कर सकते हैं\n\nयह सब बिल्कुल free है।"
        }
    ]
};

// Circular Chatbot Button & Widget
function initializeChatbot() {
    // Create circular button
    const chatbotButtonHTML = `
    <button id="chatbot-button" title="Open Chat Assistant">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
    </button>
    `;

    const chatbotHTML = `
    <div id="chatbot-widget" style="display: none;">
        <div id="chatbot-header">
            <span>💬 BizCalc Helper</span>
            <button id="chatbot-minimize">_</button>
        </div>
        <div id="chatbot-messages">
            <div class="chatbot-message bot-message">
                <p>नमस्ते! 👋 मैं BizCalc का chatbot हूँ। आपके सवालों का जवाब दे सकता हूँ।</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.8;">कोई question चुनें या type करें:</p>
            </div>
        </div>
        <div id="chatbot-suggestions">
            ${chatbotQA.queries.slice(0, 3).map(q => `
                <button class="suggestion-btn" onclick="selectChatQuestion(${q.id})" title="${q.question}">
                    ${q.question.length > 30 ? q.question.substring(0, 27) + '...' : q.question}
                </button>
            `).join('')}
        </div>
        <div id="chatbot-input-area">
            <input type="text" id="chatbot-input" placeholder="अपना सवाल लिखें...">
            <button id="chatbot-send" onclick="sendChatMessage()">➤</button>
        </div>
    </div>
    `;

    const chatbotCSS = `
    <style>
        /* Circular Chat Button */
        #chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(8, 145, 178, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9998;
            padding: 0;
            line-height: 1;
        }

        #chatbot-button:hover {
            transform: scale(1.12) translateY(-4px);
            box-shadow: 0 8px 24px rgba(8, 145, 178, 0.6);
        }

        #chatbot-button:active {
            transform: scale(0.96);
        }

        #chatbot-button.hidden {
            display: none;
        }

        #chatbot-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            height: 550px;
            background: var(--bg-card);
            border-radius: 12px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            z-index: 9999;
            border: 1px solid var(--border);
            animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        #chatbot-widget.minimized {
            height: 60px;
            width: 350px;
        }

        #chatbot-widget.minimized #chatbot-messages,
        #chatbot-widget.minimized #chatbot-suggestions,
        #chatbot-widget.minimized #chatbot-input-area {
            display: none;
        }

        #chatbot-header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 1rem;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            cursor: pointer;
        }

        #chatbot-minimize {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.2s;
        }

        #chatbot-minimize:hover {
            background: rgba(255,255,255,0.3);
        }

        #chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .chatbot-message {
            display: flex;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .chatbot-message p {
            margin: 0;
            line-height: 1.5;
        }

        .bot-message {
            justify-content: flex-start;
        }

        .bot-message p {
            background: linear-gradient(135deg, rgba(8, 145, 178, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            color: var(--text-primary);
            max-width: 85%;
        }

        .user-message {
            justify-content: flex-end;
        }

        .user-message p {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            max-width: 85%;
        }

        #chatbot-suggestions {
            padding: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            border-top: 1px solid var(--border);
        }

        .suggestion-btn {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-secondary);
            padding: 0.6rem 0.75rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.8rem;
            text-align: left;
            transition: all 0.2s;
            font-family: 'Inter', sans-serif;
        }

        .suggestion-btn:hover {
            background: linear-gradient(135deg, rgba(8, 145, 178, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%);
            border-color: var(--primary);
            color: var(--primary);
        }

        #chatbot-input-area {
            padding: 0.75rem;
            border-top: 1px solid var(--border);
            display: flex;
            gap: 0.5rem;
        }

        #chatbot-input {
            flex: 1;
            padding: 0.6rem;
            border: 1px solid var(--border);
            border-radius: 6px;
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--text-primary);
            font-size: 0.9rem;
        }

        #chatbot-input:focus {
            outline: none;
            border-color: var(--primary);
        }

        #chatbot-send {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.2s;
        }

        #chatbot-send:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(8, 145, 178, 0.3);
        }

        @media (max-width: 768px) {
            #chatbot-button {
                bottom: 20px;
                right: 20px;
                width: 56px;
                height: 56px;
            }

            #chatbot-widget {
                width: calc(100vw - 20px);
                height: 70vh;
                bottom: 80px;
                right: 10px;
                left: 10px;
                max-height: 600px;
            }

            #chatbot-widget.minimized {
                width: calc(100vw - 20px);
            }
        }

        @media (max-width: 480px) {
            #chatbot-button {
                width: 48px;
                height: 48px;
                bottom: 16px;
                right: 16px;
            }

            #chatbot-button svg {
                width: 24px;
                height: 24px;
            }

            #chatbot-widget {
                width: calc(100vw - 16px);
                height: 60vh;
                bottom: 72px;
                right: 8px;
                left: 8px;
            }
        }

        /* Scrollbar styling */
        #chatbot-messages::-webkit-scrollbar {
            width: 6px;
        }

        #chatbot-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        #chatbot-messages::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 3px;
        }

        #chatbot-messages::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
        }
    </style>
    `;

    // Inject CSS and HTML
    document.head.insertAdjacentHTML('beforeend', chatbotCSS);
    document.body.insertAdjacentHTML('beforeend', chatbotButtonHTML);
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Setup event listeners
    setupChatbotListeners();
}

function setupChatbotListeners() {
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const minimizeBtn = document.getElementById('chatbot-minimize');
    const header = document.getElementById('chatbot-header');
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWidget = document.getElementById('chatbot-widget');

    // Button to toggle widget visibility
    chatbotButton.addEventListener('click', () => {
        const isVisible = chatbotWidget.style.display !== 'none';
        chatbotWidget.style.display = isVisible ? 'none' : 'flex';
        chatbotButton.classList.toggle('active');
    });

    sendBtn.addEventListener('click', sendChatMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('chatbot-widget').classList.toggle('minimized');
    });

    header.addEventListener('click', () => {
        const widget = document.getElementById('chatbot-widget');
        if (widget.classList.contains('minimized')) {
            widget.classList.remove('minimized');
        }
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#chatbot-button') && !e.target.closest('#chatbot-widget')) {
            chatbotWidget.style.display = 'none';
            chatbotButton.classList.remove('active');
        }
    });
}

function selectChatQuestion(questionId) {
    const qa = chatbotQA.queries.find(q => q.id === questionId);
    if (qa) {
        document.getElementById('chatbot-input').value = qa.question;
        sendChatMessage(qa.id);
    }
}

function sendChatMessage(predefinedId = null) {
    const input = document.getElementById('chatbot-input');
    const messagesDiv = document.getElementById('chatbot-messages');
    const suggestionsDiv = document.getElementById('chatbot-suggestions');

    let userQuery = input.value.trim();

    if (!userQuery && !predefinedId) return;

    let answer = null;
    let matchedId = null;

    if (predefinedId) {
        answer = chatbotQA.queries.find(q => q.id === predefinedId);
    } else {
        // Search for matching question
        const query = userQuery.toLowerCase();
        answer = chatbotQA.queries.find(q =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query)
        );

        // Fuzzy match if exact match not found
        if (!answer) {
            const words = query.split(' ');
            answer = chatbotQA.queries.find(q =>
                words.some(word =>
                    q.question.toLowerCase().includes(word) ||
                    q.answer.toLowerCase().includes(word)
                )
            );
        }
    }

    // Display user message
    if (!predefinedId) {
        const userMsg = document.createElement('div');
        userMsg.className = 'chatbot-message user-message';
        userMsg.innerHTML = `<p>${escapeHtml(userQuery)}</p>`;
        messagesDiv.appendChild(userMsg);
        input.value = '';
    }

    // Display bot response
    const botMsg = document.createElement('div');
    botMsg.className = 'chatbot-message bot-message';

    if (answer) {
        botMsg.innerHTML = `<p>${answer.answer}</p>`;
        matchedId = answer.id;
    } else {
        botMsg.innerHTML = `<p>मुझे सटीक जवाब नहीं मिला। कृपया हमसे <a href="contact.html" style="color: var(--primary); font-weight: 600;">contact करें</a> या नीचे दिए suggestions से चुनें। 😊</p>`;
    }

    messagesDiv.appendChild(botMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Update suggestions
    const otherSuggestions = chatbotQA.queries.filter(q => q.id !== matchedId).slice(0, 3);
    suggestionsDiv.innerHTML = otherSuggestions.map(q => `
        <button class="suggestion-btn" onclick="selectChatQuestion(${q.id})" title="${q.question}">
            ${q.question.length > 30 ? q.question.substring(0, 27) + '...' : q.question}
        </button>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize chatbot when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
    initializeChatbot();
}
