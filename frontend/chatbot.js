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
            answer: "हम 28+ popular business types को support करते हैं जो विभिन्न categories में organized हैं:\n• Retail & Shopping\n• Food & Beverage\n• Repair & Maintenance\n• Personal Care\n• Education & Fitness\n• Healthcare & Wellness\n• Transportation & Auto\n• Other Services\n\nअगर आपका business type नहीं है तो हमें contact करें।"
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

// Floating Button HTML
function createFloatingButton() {
    const floatingButton = `
    <button id="chatbot-floating-btn" class="chatbot-floating-btn" title="Open BizCalc Helper" aria-label="Open chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    </button>
    `;

    const floatingButtonCSS = `
    <style>
        .chatbot-floating-btn {
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
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(8, 145, 178, 0.4);
            transition: all 0.3s ease;
            font-size: 0;
            padding: 0;
        }

        .chatbot-floating-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(8, 145, 178, 0.6);
        }

        .chatbot-floating-btn:active {
            transform: scale(0.95);
        }

        .chatbot-floating-btn svg {
            width: 24px;
            height: 24px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .chatbot-floating-btn {
                width: 48px;
                height: 48px;
                bottom: 16px;
                right: 16px;
            }

            .chatbot-floating-btn svg {
                width: 20px;
                height: 20px;
            }
        }

        /* Hide floating button when chatbot is open */
        .chatbot-floating-btn.hidden {
            display: none;
        }
    </style>
    `;

    return floatingButton + floatingButtonCSS;
}

// Chatbot Widget HTML & CSS
function initializeChatbot() {
    const chatbotHTML = `
    <div id="chatbot-widget">
        <div id="chatbot-header">
            <span>💬 BizCalc Helper</span>
            <button id="chatbot-close" aria-label="Close chat" title="Close">✕</button>
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
        #chatbot-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            height: 550px;
            background: var(--bg-card);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            z-index: 9999;
            border: 1px solid var(--border);
            animation: slideInRight 0.3s ease;
            max-height: 90vh;
            overflow: hidden;
        }

        /* Hidden by default */
        #chatbot-widget.hidden {
            display: none;
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
            flex-shrink: 0;
        }

        #chatbot-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.2s;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #chatbot-close:hover {
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
            word-wrap: break-word;
            overflow-wrap: break-word;
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
            padding: 0.75rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            border-top: 1px solid var(--border);
            flex-shrink: 0;
            max-height: 200px;
            overflow-y: auto;
        }

        .suggestion-btn {
            background: linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%);
            border: 1px solid var(--border);
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            color: var(--text-primary);
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.2s;
            text-align: left;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .suggestion-btn:hover {
            background: linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%);
            border-color: var(--primary);
        }

        #chatbot-input-area {
            padding: 1rem;
            border-top: 1px solid var(--border);
            display: flex;
            gap: 0.5rem;
            flex-shrink: 0;
        }

        #chatbot-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 6px;
            font-family: inherit;
            font-size: 1rem;
            color: var(--text-primary);
            background: var(--bg-card);
        }

        #chatbot-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
        }

        #chatbot-send {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
        }

        #chatbot-send:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(8, 145, 178, 0.3);
        }

        #chatbot-send:active {
            transform: translateY(0);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            #chatbot-widget {
                width: 90vw;
                height: 80vh;
                max-width: 100%;
                right: 5vw;
                bottom: 80px;
                border-radius: 16px;
            }

            .suggestion-btn {
                font-size: 0.8rem;
                padding: 0.4rem 0.6rem;
            }

            #chatbot-input {
                padding: 0.6rem;
                font-size: 16px;
            }

            #chatbot-send {
                padding: 0.6rem 0.8rem;
                font-size: 0.9rem;
            }

            .bot-message p,
            .user-message p {
                max-width: 90%;
            }
        }

        @media (max-width: 480px) {
            #chatbot-widget {
                width: 95vw;
                height: 75vh;
                right: 2.5vw;
                bottom: 70px;
            }

            #chatbot-header {
                padding: 0.75rem;
            }

            #chatbot-messages {
                padding: 0.75rem;
            }

            #chatbot-input-area {
                padding: 0.75rem;
                gap: 0.3rem;
            }

            .suggestion-btn {
                font-size: 0.75rem;
                padding: 0.35rem 0.5rem;
            }
        }
    </style>
    `;

    return floatingButton + chatbotHTML + chatbotCSS;
}

// Initialize Chatbot on Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Add floating button and chatbot widget to page
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.innerHTML = createFloatingButton() + initializeChatbot();
    document.body.appendChild(chatbotContainer);

    // Get elements
    const floatingBtn = document.getElementById('chatbot-floating-btn');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const closeBtn = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chatbot-input');

    // Make chatbot hidden by default
    chatbotWidget.classList.add('hidden');

    // Toggle chatbot on floating button click
    floatingBtn.addEventListener('click', function() {
        chatbotWidget.classList.toggle('hidden');
        floatingBtn.classList.toggle('hidden');
        if (!chatbotWidget.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    // Close chatbot
    closeBtn.addEventListener('click', function() {
        chatbotWidget.classList.add('hidden');
        floatingBtn.classList.remove('hidden');
    });

    // Allow Enter key to send message
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});

// Select a predefined question
function selectChatQuestion(questionId) {
    const question = chatbotQA.queries.find(q => q.id === questionId);
    if (question) {
        displayUserMessage(question.question);
        displayBotMessage(question.answer);
        document.getElementById('chatbot-input').value = '';
    }
}

// Send custom message
function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message === '') return;

    displayUserMessage(message);
    input.value = '';

    // Find matching question
    let found = false;
    for (let query of chatbotQA.queries) {
        if (query.question.toLowerCase().includes(message.toLowerCase()) ||
            message.toLowerCase().includes(query.question.toLowerCase())) {
            displayBotMessage(query.answer);
            found = true;
            break;
        }
    }

    if (!found) {
        const response = "माफ कीजिए, मुझे इस सवाल का सटीक जवाब नहीं पता। कृपया हमारे predefined questions से चुनें या contact page पर हमसे संपर्क करें। 😊";
        displayBotMessage(response);
    }
}

// Display user message
function displayUserMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message user-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Display bot message
function displayBotMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message bot-message';

    // Handle line breaks
    const formattedMessage = message.replace(/\n/g, '<br>');
    messageDiv.innerHTML = `<p>${formattedMessage}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
