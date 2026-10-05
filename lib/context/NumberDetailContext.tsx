'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NumberDetailData, NumberDetailPanel } from '@/components/numerology/NumberDetailPanel';

interface NumberDetailContextType {
    activeDetailData: NumberDetailData | null;
    isDetailOpen: boolean;
    openNumberDetail: (data: NumberDetailData) => void;
    closeNumberDetail: () => void;
}

const NumberDetailContext = createContext<NumberDetailContextType | undefined>(undefined);

export function NumberDetailProvider({ children }: { children: ReactNode }) {
    const [activeDetailData, setActiveDetailData] = useState<NumberDetailData | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const openNumberDetail = (data: NumberDetailData) => {
        setActiveDetailData(data);
        setIsDetailOpen(true);
    };

    const closeNumberDetail = () => {
        setIsDetailOpen(false);
    };

    return (
        <NumberDetailContext.Provider
            value={{
                activeDetailData,
                isDetailOpen,
                openNumberDetail,
                closeNumberDetail
            }}
        >
            {children}
            <NumberDetailPanel
                data={activeDetailData}
                isOpen={isDetailOpen}
                onClose={closeNumberDetail}
            />
        </NumberDetailContext.Provider>
    );
}

export function useNumberDetail() {
    const context = useContext(NumberDetailContext);
    if (!context) {
        throw new Error('useNumberDetail must be used within a NumberDetailProvider');
    }
    return context;
}
