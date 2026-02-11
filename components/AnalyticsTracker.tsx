"use client";

import React, { useEffect } from "react";

export function AnalyticsTracker() {
    useEffect(() => {
        const track = async () => {
            try {
                // Determine if this is a "page view" event
                await fetch("/api/analytics/track", {
                    method: "POST",
                });
            } catch (e) {
                // Silently fail
            }
        };

        // Track on mount
        track();
    }, []);

    return null;
}
