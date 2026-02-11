"use client";

// Re-using the same page content from old admin page, now in a sub-route
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, Search, Edit2, Shield, CreditCard, ChevronDown, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    plan: string;
    createdAt: string;
}

export default function UserManagementPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<UserData[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    // Edit State
    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{ role: string, plan: string }>({ role: '', plan: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push("/dashboard");
            } else {
                fetchUsers();
            }
        }
    }, [user, loading, router]);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (res.ok) {
                setUsers(data.users);
                setFilteredUsers(data.users);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => {
        const results = users.filter(u =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const startEdit = (user: UserData) => {
        setEditingUser(user._id);
        setEditForm({ role: user.role, plan: user.plan || 'basic' });
    };

    const cancelEdit = () => {
        setEditingUser(null);
    };

    const saveEdit = async (userId: string) => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                const data = await res.json();
                // Update local state
                const updatedUsers = users.map(u => u._id === userId ? { ...u, role: data.user.role, plan: data.user.plan } : u);
                setUsers(updatedUsers);
                setEditingUser(null);
            } else {
                alert("Failed to update user");
            }
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsSaving(false);
        }
    };

    const deleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setUsers(users.filter(u => u._id !== userId));
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    if (loading || isLoadingUsers) {
        return (
            <div className="h-96 flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">User Management</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">Manage users, roles, and subscriptions.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">User</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Date Joined</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Role</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Plan</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            <AnimatePresence>
                                {filteredUsers.map((userData) => (
                                    <motion.tr
                                        key={userData._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs uppercase">
                                                    {userData.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-neutral-900 dark:text-white">{userData.name}</div>
                                                    <div className="text-neutral-500 text-xs">{userData.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                                            {new Date(userData.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* ROLE COLUMN */}
                                        <td className="px-6 py-4">
                                            {editingUser === userData._id ? (
                                                <div className="relative">
                                                    <select
                                                        value={editForm.role}
                                                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                        className="appearance-none bg-neutral-100 dark:bg-neutral-800 border-none rounded px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="moderator">Moderator</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                                </div>
                                            ) : (
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border ${userData.role === 'admin'
                                                    ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
                                                    : 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'
                                                    }`}>
                                                    <Shield className="w-3 h-3" />
                                                    {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                                                </span>
                                            )}
                                        </td>

                                        {/* PLAN COLUMN */}
                                        <td className="px-6 py-4">
                                            {editingUser === userData._id ? (
                                                <div className="relative">
                                                    <select
                                                        value={editForm.plan}
                                                        onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
                                                        className="appearance-none bg-neutral-100 dark:bg-neutral-800 border-none rounded px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="basic">Basic</option>
                                                        <option value="pro">Pro</option>
                                                        <option value="premium">Premium</option>
                                                    </select>
                                                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                                </div>
                                            ) : (
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border ${userData.plan === 'premium'
                                                    ? 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800'
                                                    : userData.plan === 'pro'
                                                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800'
                                                        : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                                                    }`}>
                                                    <CreditCard className="w-3 h-3" />
                                                    {(userData.plan || 'Basic').charAt(0).toUpperCase() + (userData.plan || 'basic').slice(1)}
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {editingUser === userData._id ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => saveEdit(userData._id)}
                                                        disabled={isSaving}
                                                        className="text-green-600 hover:text-green-700 font-medium text-xs disabled:opacity-50"
                                                    >
                                                        {isSaving ? 'Saving...' : 'Save'}
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        disabled={isSaving}
                                                        className="text-neutral-400 hover:text-neutral-500 font-medium text-xs"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => startEdit(userData)}
                                                        className="p-1.5 text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(userData._id)}
                                                        className="p-1.5 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="px-6 py-12 text-center text-neutral-500 border-t border-neutral-200 dark:border-neutral-800">
                        No users found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
}
