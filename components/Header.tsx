"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: "Components", href: "/ui-design" },
        { name: "Templates", href: "/templates" },
    ];

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                : "bg-white dark:bg-black border-b border-transparent"
                }`}
        >
            <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg transition-transform group-hover:scale-105">
                            P
                        </div>
                        <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
                            ProAnimix
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-zinc-500 hover:text-red-500 transition-colors"
                            >
                                Sign Out
                            </button>
                            <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                Log in
                            </Link>
                            <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
                    >
                        <div className="flex flex-col space-y-4 px-4 py-6">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-base font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <div className="text-sm font-medium text-zinc-900 dark:text-white px-4">
                                            Signed in as {user.name}
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full px-4 py-2 text-center text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-center text-sm font-medium text-zinc-600 hover:text-red-500 border border-gray-200 dark:border-gray-800 rounded-lg transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full px-4 py-2 text-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-gray-200 dark:border-gray-800 rounded-lg transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full px-4 py-2 text-center text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
