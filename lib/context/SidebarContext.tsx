'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    toggleCollapse: () => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (open: boolean) => void;
    openMobile: () => void;
    closeMobile: () => void;
    toggleMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const STORAGE_KEY = 'numero_sidebar_collapsed';

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsedState] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved !== null) {
                setIsCollapsedState(saved === 'true');
            }
        } catch {
            // ignore localStorage access issues
        }
    }, []);

    const setIsCollapsed = (collapsed: boolean) => {
        setIsCollapsedState(collapsed);
        try {
            localStorage.setItem(STORAGE_KEY, String(collapsed));
        } catch {
            // ignore
        }
    };

    const toggleCollapse = () => {
        setIsCollapsedState((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(STORAGE_KEY, String(next));
            } catch {
                // ignore
            }
            return next;
        });
    };

    const openMobile = () => setIsMobileOpen(true);
    const closeMobile = () => setIsMobileOpen(false);
    const toggleMobile = () => setIsMobileOpen((prev) => !prev);

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (isMobileOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isMobileOpen]);

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                setIsCollapsed,
                toggleCollapse,
                isMobileOpen,
                setIsMobileOpen,
                openMobile,
                closeMobile,
                toggleMobile
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}
