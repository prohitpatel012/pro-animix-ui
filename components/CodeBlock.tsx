"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    return (
        <div className="relative group rounded-xl overflow-hidden bg-gray-900 border border-gray-800 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-800">
                <span className="text-xs text-gray-400 font-mono uppercase">{language}</span>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-500" />
                            <span className="text-green-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-300 leading-relaxed tab-4">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
