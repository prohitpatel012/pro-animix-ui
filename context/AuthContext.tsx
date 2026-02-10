"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, User } from "@/lib/store/useAuthStore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user, login: storeLogin, logout: storeLogout } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            try {
                // If we already have a user in store (from persist), we are technically "loaded"
                // but we should still verify with server in background or if no user.
                // However, for immediate perceived performance, we can set loading false if user exists.

                // Fetch latest from server to ensure validity and sync
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    storeLogin(data.user);
                } else {
                    // If server says unauthorized, but we have a user, we should logout
                    if (user) {
                        storeLogout();
                    }
                }
            } catch (error) {
                console.error("Failed to load user", error);
                // On error, if we had a user, maybe keep them? Or logout? Safer to do nothing or logout.
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, [storeLogin, storeLogout]); // Remove 'user' dependency to avoid loops

    const login = (userData: User) => {
        storeLogin(userData);
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/me", { method: "POST" }); // Logout endpoint
            storeLogout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // If local storage has user, we can skip the initial loading state for better UX
    // But for this specific "bug" request, user wants to avoid "Loading..." loop
    // const effectiveLoading = loading && !user; 

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

