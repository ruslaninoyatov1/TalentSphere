/**
 * TalentSphere Global State Management
 * Handles data persistence via localStorage and provides a central source of truth.
 */

const APP_STATE_KEY = 'talentsphere_app_state';

const InitialState = {
    user: {
        id: 'user_001',
        name: 'Alex Design',
        role: 'performer', // 'customer' or 'performer'
        status: 'Pro Member',
        avatar: 'neon-glow-blue',
        stats: {
            rating: 4.9,
            completedProjects: 45,
            trustQuotient: 98
        }
    },
    wallet: {
        balance: 14500.50,
        currency: '$',
        transactions: [
            { id: 'tx_001', type: 'incoming', amount: 3500, label: 'UI/UX Редизайн Dashboard', date: '2025-12-18' },
            { id: 'tx_002', type: 'incoming', amount: 1200, label: 'Лендинг CryptoApp', date: '2025-12-15' },
            { id: 'tx_003', type: 'outgoing', amount: 150, label: 'Подписка Pro Member', date: '2025-12-01' }
        ]
    },
    notifications: [
        { id: 'nt_001', title: 'Новое сообщение', text: 'Sarah Connor прислала вам файл', time: '5 мин назад', read: false },
        { id: 'nt_002', title: 'Оплата получена', text: 'За проект "Dashboard" зачислено $3,500', time: '2 часа назад', read: true }
    ],
    messages: {
        unreadCount: 3,
        chats: [
            { id: 'chat_001', user: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', lastMessage: 'Ок, жду прототипы', time: '14:20', online: true },
            { id: 'chat_002', user: 'John Doe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', lastMessage: 'Когда будет готово?', time: 'Вчера', online: false }
        ]
    },
    activeProjects: [
        { id: 'prj_001', name: 'UI/UX Редизайн Dashboard', client: 'TechSolutions', deadline: '2025-12-30', progress: 65 }
    ]
};

class StateManager {
    constructor() {
        this.state = this.loadState();
    }

    loadState() {
        const savedState = localStorage.getItem(APP_STATE_KEY);
        if (savedState) {
            try {
                return JSON.parse(savedState);
            } catch (e) {
                console.error('Error parsing state from localStorage:', e);
            }
        }
        return JSON.parse(JSON.stringify(InitialState));
    }

    saveState() {
        localStorage.setItem(APP_STATE_KEY, JSON.stringify(this.state));
        this.notifySubscribers();
    }

    // Update state and persist
    update(path, value) {
        // Simple path update (e.g. 'user.name') - limited nesting for simplicity
        const parts = path.split('.');
        let current = this.state;
        for (let i = 0; i < parts.length - 1; i++) {
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        this.saveState();
    }

    reset() {
        this.state = JSON.parse(JSON.stringify(InitialState));
        this.saveState();
    }

    // Basic pub/sub for UI updates
    subscribers = [];
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(cb => cb(this.state));
    }
}

// Global instance
window.TalentSphereState = new StateManager();
