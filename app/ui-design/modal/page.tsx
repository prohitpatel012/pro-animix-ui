"use client";

import React, { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { CodeBlock } from "../../../components/CodeBlock";
import { installation, componentCode, usageCode } from "./code";

export default function ModalPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modal</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    A dialog that focuses the user's attention exclusively on an information via a window that is overlaid on primary content.
                </p>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h2>
                <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-zinc-900/50 flex items-center justify-center min-h-[300px]">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                    >
                        Open Demo Modal
                    </button>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Payment Successful"
                >
                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            Your payment has been successfully processed. We have sent a confirmation email to your registered address.
                        </p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">Transaction ID: #123456789</span>
                            </div>
                        </div>
                    </div>
                </Modal>
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
                    Create a new file at <code className="text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-900/10 px-1.5 py-0.5 rounded">components/ui/Modal.tsx</code> and paste the following code:
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
