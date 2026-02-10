import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
    plan?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (userData) => set({ user: userData, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            updateUser: (userData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),
        }),
        {
            name: 'auth-storage', // unique name for local storage key
            storage: createJSONStorage(() => localStorage),
        }
    )
);
