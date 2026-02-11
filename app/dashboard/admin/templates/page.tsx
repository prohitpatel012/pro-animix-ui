"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, Search, Edit2, Trash2, Plus, RefreshCw, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateData {
    _id: string;
    title: string;
    slug: string;
    plan: "Free" | "Pro" | "Premium";
    price: string;
    description: string;
    livePreviewUrl: string;
}

export default function TemplatesManagementPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<TemplateData>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push("/dashboard");
            } else {
                fetchTemplates();
            }
        }
    }, [user, loading, router]);

    const fetchTemplates = async () => {
        try {
            const res = await fetch("/api/admin/templates");
            const data = await res.json();
            if (res.ok) {
                setTemplates(data);
            }
        } catch (error) {
            console.error("Failed to fetch templates", error);
        } finally {
            setIsLoading(false);
        }
    };

    const seedTemplates = async () => {
        if (!confirm("This will populate the database with default templates. Continue?")) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/seed", { method: "POST" });
            if (res.ok) {
                fetchTemplates();
            } else {
                const data = await res.json();
                alert(data.message || "Failed to seed");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const createTemplate = async () => {
        const title = prompt("Enter template title:");
        if (!title) return;
        const slug = prompt("Enter template slug (unique):", title.toLowerCase().replace(/\s+/g, '-'));
        if (!slug) return;

        try {
            const res = await fetch("/api/admin/templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    slug,
                    description: "New template description...",
                    livePreviewUrl: "#",
                    price: "$0",
                    plan: "Free"
                })
            });
            if (res.ok) {
                fetchTemplates();
            } else {
                alert("Failed to create template");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteTemplate = async (id: string) => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        try {
            const res = await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
            if (res.ok) {
                setTemplates(templates.filter(t => t._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const startEdit = (template: TemplateData) => {
        setEditingId(template._id);
        setEditForm({ ...template });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = async (id: string) => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/templates/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });
            if (res.ok) {
                const updated = await res.json();
                setTemplates(templates.map(t => t._id === id ? updated : t));
                setEditingId(null);
            } else {
                alert("Failed to update");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const filteredTemplates = templates.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading || isLoading) {
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
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Templates</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">Manage landing pages and plans.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={seedTemplates}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" /> Seed DB
                    </button>
                    <button
                        onClick={createTemplate}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> New Template
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
            </div>

            <div className="bg-white dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Title</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Slug</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Plan</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Price</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            <AnimatePresence>
                                {filteredTemplates.map((template) => (
                                    <motion.tr
                                        key={template._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors"
                                    >
                                        {/* Title Input */}
                                        <td className="px-6 py-4 font-medium">
                                            {editingId === template._id ? (
                                                <input
                                                    value={editForm.title || ""}
                                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                                    className="w-full bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 border-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            ) : template.title}
                                        </td>

                                        {/* Slug (Read-only usually, but editable if needed) */}
                                        <td className="px-6 py-4 text-neutral-500">
                                            {editingId === template._id ? (
                                                <input
                                                    value={editForm.slug || ""}
                                                    onChange={e => setEditForm({ ...editForm, slug: e.target.value })}
                                                    className="w-full bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 border-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            ) : template.slug}
                                        </td>

                                        {/* Plan Select */}
                                        <td className="px-6 py-4">
                                            {editingId === template._id ? (
                                                <select
                                                    value={editForm.plan || "Free"}
                                                    onChange={e => setEditForm({ ...editForm, plan: e.target.value as any })}
                                                    className="bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 border-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    <option value="Free">Free</option>
                                                    <option value="Pro">Pro</option>
                                                    <option value="Premium">Premium</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${template.plan === "Pro" || template.plan === "Premium"
                                                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                                                        : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                                                    }`}>
                                                    {template.plan}
                                                </span>
                                            )}
                                        </td>

                                        {/* Price Input */}
                                        <td className="px-6 py-4">
                                            {editingId === template._id ? (
                                                <input
                                                    value={editForm.price || ""}
                                                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                                    className="w-20 bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 border-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            ) : template.price}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {editingId === template._id ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => saveEdit(template._id)} disabled={isSaving} className="text-green-600 hover:text-green-700 font-medium text-xs">Save</button>
                                                    <button onClick={cancelEdit} disabled={isSaving} className="text-neutral-400 hover:text-neutral-500 font-medium text-xs">Cancel</button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => startEdit(template)} className="p-1.5 text-neutral-400 hover:text-indigo-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => deleteTemplate(template._id)} className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="p-12 text-center text-neutral-500">
                        <LayoutTemplate className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No templates found</h3>
                        <p className="mb-6">Get started by seeding the database or creating a new template.</p>
                        <button onClick={seedTemplates} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Seed Default Templates</button>
                    </div>
                )}
            </div>
        </div>
    );
}
