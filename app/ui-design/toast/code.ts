export const installation = `npm install framer-motion lucide-react`;

export const componentCode = `"use client";

import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    id: string;
    message: string;
    type?: ToastType;
    isVisible: boolean;
    onClose: (id: string) => void;
}

export function Toast({ id, message, type = "info", isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose(id);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, id]);

    const icons = {
        success: <CheckCircle className="text-green-500" size={20} />,
        error: <AlertCircle className="text-red-500" size={20} />,
        info: <Info className="text-blue-500" size={20} />,
    };

    const bgColors = {
        success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
        info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={\`flex items-center gap-3 w-auto max-w-sm p-4 rounded-xl shadow-lg border \${bgColors[type]} backdrop-blur-md relative\`}
                >
                    <div className="shrink-0">
                        {icons[type]}
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {message}
                    </p>
                    <button
                        onClick={() => onClose(id)}
                        className="ml-auto shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
`;

export const usageCode = `import { useState } from "react";
import { Toast } from "@/components/ui/Toast";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Show Toast
      </button>

      {/* Position container if needed, or place globally */}
      <div className="fixed bottom-4 right-4 z-50">
        <Toast
          id="demo-toast"
          isVisible={isOpen}
          onClose={() => setIsOpen(false)}
          message="This is a toast message!"
          type="success"
        />
      </div>
    </div>
  );
}`;
