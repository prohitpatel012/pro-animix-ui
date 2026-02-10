"use client";

import React, { useState } from "react";
import { Toast, ToastType } from "../../../components/ui/Toast";
import { CodeBlock } from "../../../components/CodeBlock";
import { installation, componentCode, usageCode } from "./code";

export default function ToastPage() {
    const [activeToast, setActiveToast] = useState<{ id: string; message: string; type: ToastType } | null>(null);

    const showToast = (type: ToastType) => {
        setActiveToast({
            id: Math.random().toString(),
            message: `This is a ${type} message notification.`,
            type,
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Toast</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    A brief notification that appears temporarily to provide feedback on an operation.
                </p>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h2>
                <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-zinc-900/50 flex flex-wrap items-center justify-center gap-4 min-h-[300px] relative overflow-hidden">
                    <button
                        onClick={() => showToast("success")}
                        className="px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30"
                    >
                        Success Toast
                    </button>
                    <button
                        onClick={() => showToast("error")}
                        className="px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
                    >
                        Error Toast
                    </button>
                    <button
                        onClick={() => showToast("info")}
                        className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Info Toast
                    </button>

                    {/* Toast Container Positioned Relatively for Preview */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm flex justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <Toast
                                id={activeToast?.id || "preview"}
                                isVisible={!!activeToast}
                                onClose={() => setActiveToast(null)}
                                message={activeToast?.message || ""}
                                type={activeToast?.type || "info"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Installation Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Installation</h2>
                <p className="text-gray-600 dark:text-gray-400">Install the required dependencies:</p>
                <CodeBlock code={installation} language="bash" />
            </div>

            {/* Create Component Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Create Component</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Create a new file at <code className="text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-900/10 px-1.5 py-0.5 rounded">components/ui/Toast.tsx</code> and paste the following code:
                </p>
                <CodeBlock code={componentCode} language="tsx" />
            </div>

            {/* Usage Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Usage</h2>
                <CodeBlock code={usageCode} language="tsx" />
            </div>
        </div>
    );
}
