class WhatsAppClone {
    constructor() {
        this.currentChat = 1;
        this.messages = {
            1: [
                { type: 'received', text: 'Hey! How are you doing?', time: '14:25' },
                { type: 'sent', text: 'Hey Sarah! I\'m good, thanks! How about you?', time: '14:26' },
                { type: 'received', text: 'I\'m great! Just finished work. What are you up to?', time: '14:27' },
                { type: 'sent', text: 'Just chilling at home. Watching some Netflix 😎', time: '14:28' }
            ],
            2: [
                { type: 'received', text: 'Thanks for the help yesterday!', time: '09:15' }
            ],
            3: [
                { type: 'received', text: 'Mike: Meeting at 3 PM today', time: '10:15' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadChat(1);
        this.scrollToBottom();
    }
    
    bindEvents() {
        // Chat selection
        document.querySelectorAll('.chat-item').forEach(chat => {
            chat.addEventListener('click', (e) => {
                const chatId = parseInt(chat.dataset.chat);
                this.selectChat(chatId, chat);
            });
        });
        
        // Send message
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Mobile menu toggle (add hamburger menu if needed)
        document.querySelector('.menu-icon').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }
    
    selectChat(chatId, chatElement) {
        // Update active chat
        document.querySelector('.chat-item.active')?.classList.remove('active');
        chatElement.classList.add('active');
        
        this.currentChat = chatId;
        this.loadChat(chatId);
        this.scrollToBottom();
    }
    
    loadChat(chatId) {
        const container = document.getElementById('messagesContainer');
        const chatMessages = this.messages[chatId] || [];
        
        container.innerHTML = chatMessages.map(msg => `
            <div class="message ${msg.type}">
                <div class="message-content">
                    ${msg.text}
                    <div class="message-time">${msg.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const text = messageInput.value.trim();
        
        if (!text) return;
        
        const time = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Add sent message
        this.messages[this.currentChat].push({
            type: 'sent',
            text: text,
            time: time
        });
        
        // Clear input and reload
        messageInput.value = '';
        this.loadChat(this.currentChat);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        container.scrollTop = container.scrollHeight;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppClone();
});
