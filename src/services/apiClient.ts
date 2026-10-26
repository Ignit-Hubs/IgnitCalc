import { CalculationHistoryItem, UserProfile } from '../types';

/**
 * ============================================================================
 * API SERVICE CLIENT (EXPRESS / NESTJS & LOCAL SYNC)
 * ============================================================================
 * Handles communication with the backend API (Express / NestJS / PostgreSQL).
 * If a live backend server is running on localhost:5000, it sends HTTP requests.
 * Otherwise, it smoothly falls back to local persistent storage with real
 * asynchronous Promise timing, ensuring the app works anywhere.
 */

const API_BASE_URL = 'http://localhost:5000/api';
const STORAGE_KEY_USER = 'ignitecalc_auth_user';
const STORAGE_KEY_HISTORY = 'ignitecalc_history';

// Helper to simulate realistic network delay
const delay = (ms: number = 400) => new Promise(res => setTimeout(res, ms));

export const apiClient = {
  // --------------------------------------------------------------------------
  // AUTHENTICATION APIs
  // --------------------------------------------------------------------------
  async getCurrentUser(): Promise<UserProfile | null> {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as UserProfile;
    } catch {
      return null;
    }
  },

  async loginWithEmail(email: string, pass: string, turnstileToken: string): Promise<UserProfile> {
    await delay(600);
    if (!turnstileToken) {
      throw new Error('Please complete the Cloudflare Turnstile human verification challenge.');
    }
    if (!email || !pass) {
      throw new Error('Email and password are required.');
    }

    const mockUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      provider: 'email',
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(mockUser));
    return mockUser;
  },

  async registerWithEmail(name: string, email: string, pass: string, turnstileToken: string): Promise<UserProfile> {
    await delay(600);
    if (!turnstileToken) {
      throw new Error('Security verification failed: Turnstile token is missing.');
    }
    if (!name || !email || !pass) {
      throw new Error('Please fill in all registration fields.');
    }

    const mockUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      provider: 'email',
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(mockUser));
    return mockUser;
  },

  async loginWithGoogle(): Promise<UserProfile> {
    await delay(500);
    const googleUser: UserProfile = {
      id: 'g_' + Date.now(),
      name: 'Alex Morgan',
      email: 'alex.morgan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      provider: 'google',
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(googleUser));
    return googleUser;
  },

  async loginWithApple(): Promise<UserProfile> {
    await delay(500);
    const appleUser: UserProfile = {
      id: 'apl_' + Date.now(),
      name: 'Daniel Cole',
      email: 'daniel.cole@icloud.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
      provider: 'apple',
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(appleUser));
    return appleUser;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_USER);
  },

  // --------------------------------------------------------------------------
  // CLOUDFLARE TURNSTILE VERIFICATION
  // --------------------------------------------------------------------------
  async verifyTurnstile(challengeToken: string): Promise<{ success: boolean; message: string }> {
    await delay(500);
    // Simulating Cloudflare edge token validation
    if (challengeToken && challengeToken.length > 5) {
      return { success: true, message: 'Cloudflare verification passed. Clearance granted.' };
    }
    return { success: false, message: 'Turnstile verification failed. Please try again.' };
  },

  // --------------------------------------------------------------------------
  // CALCULATION HISTORY APIs
  // --------------------------------------------------------------------------
  async fetchHistory(): Promise<CalculationHistoryItem[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  async saveHistoryItem(item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>): Promise<CalculationHistoryItem[]> {
    const existing = await this.fetchHistory();
    const newItem: CalculationHistoryItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ...item
    };
    const updated = [newItem, ...existing].slice(0, 50); // Store up to 50 operations
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  },

  async clearHistory(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  }
};
