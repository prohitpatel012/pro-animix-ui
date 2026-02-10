"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">Dashboard</h1>
                <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-lg font-medium text-neutral-900 dark:text-white">Profile Information</p>
                            <p className="text-neutral-500 text-sm">Manage your account details and subscription.</p>
                        </div>
                        {user.role === 'admin' && (
                            <button
                                onClick={() => router.push('/dashboard/admin')}
                                className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                Admin Dashboard
                            </button>
                        )}
                    </div>

                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="text-sm font-medium text-neutral-500 block mb-1">Full Name</label>
                            <p className="text-neutral-900 dark:text-white font-medium">{user.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-neutral-500 block mb-1">Email Address</label>
                            <p className="text-neutral-900 dark:text-white font-medium">{user.email}</p>
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <label className="text-sm font-medium text-neutral-500 block mb-1">Role</label>
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium border border-neutral-200 dark:border-neutral-700 capitalize">
                                    {user.role}
                                </span>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-500 block mb-1">Current Plan</label>
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border capitalize ${user.plan === 'premium'
                                    ? 'bg-linear-to-r from-pink-500/10 to-purple-500/10 text-pink-600 border-pink-200 dark:border-pink-900'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                                    }`}>
                                    {user.plan || 'Basic'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                        <button
                            onClick={() => logout()}
                            className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
