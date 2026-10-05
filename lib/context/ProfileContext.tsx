'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { RuleEngine } from '@/lib/numerology/calculator';

export interface ParentInputs {
    fatherName?: string;
    fatherDob?: string;
    motherName?: string;
    motherDob?: string;
}

export interface ProfileInputs {
    fullName: string;
    lastName: string;
    middleName: string;
    firstName: string;
    dob: string; // YYYY-MM-DD
    gender: 'Nam' | 'Nữ' | string;
    homeName?: string;
    calendarType?: 'SOLAR' | 'LUNAR';
    birthTime?: string;
    parents?: ParentInputs;
}

export interface ChildProfileData {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    homeName: string;
    fullName: string;
    calendarType?: 'SOLAR' | 'LUNAR';
    birthTime?: string;
    lp: number;
    lpRaw: number;
    lpHasMaster: boolean;
    lpHasDebt: boolean;
    lpKarmicDebts: number[];
    expression: number;
    expressionRaw: number;
    soulUrge: number;
    soulRaw: number;
    personality: number;
    personalityRaw: number;
    nameKarmicDebts: number[];
    attitude: any;
    birthday: number;
    birthdayRaw: number;
    birthdayKarmicDebts: number[];
    allKarmicDebts: number[];
    maturity: number;
    rationalThought: any;
    personalYear: number;
    personalMonth: number;
    personalDay: number;
    gridData: any;
    bmsRatio: any;
    nameDetails: any;
    timeline: any;
    parents?: ParentInputs;
}

export interface ProfileContextType {
    profile: ProfileInputs;
    data: ChildProfileData | null;
    hasCreatedMap: boolean;
    hasCompletedTour: boolean;
    discoveryFocus: string[];
    compareNamesList: string[];
    seenHints: Record<string, boolean>;
    activeGuide: string | null;
    isHelpCenterOpen: boolean;
    updateProfile: (inputs: Partial<ProfileInputs>) => void;
    completeOnboarding: (inputs: Partial<ProfileInputs>, focus?: string[]) => void;
    completeTour: () => void;
    resetTour: () => void;
    clearProfile: () => void;
    setCompareNamesList: (list: string[]) => void;
    updateCompareNameAtIndex: (index: number, val: string) => void;
    addCompareName: (name: string) => void;
    applyName: (name: string) => void;
    getReportQueryString: () => string;
    markHintSeen: (key: string) => void;
    markGuideSeen: (key: string) => void;
    isGuideSeen: (key: string) => boolean;
    triggerGuide: (guideId: string) => void;
    closeGuide: () => void;
    openHelpCenter: () => void;
    closeHelpCenter: () => void;
    setHelpCenterOpen: (open: boolean) => void;
    resetGuide: (key: string) => void;
    resetAllHints: () => void;
}

export const DEFAULT_PROFILE: ProfileInputs = {
    fullName: 'Phan Minh Khuê Anh',
    lastName: 'Phan',
    middleName: 'Minh Khuê',
    firstName: 'Anh',
    dob: '2026-06-17',
    gender: 'Nữ',
    homeName: 'Miu',
    calendarType: 'SOLAR',
    parents: {
        fatherName: 'Phan Thanh Sơn',
        fatherDob: '1994-10-12',
        motherName: 'Nguyễn Thị Mai',
        motherDob: '1996-08-20'
    }
};

const STORAGE_KEY = 'tsh_active_profile_v1';
const COMPARE_KEY = 'tsh_compare_names_v1';
const MAP_CREATED_KEY = 'tsh_has_created_map_v1';
const TOUR_COMPLETED_KEY = 'tsh_has_completed_tour_v1';
const FOCUS_KEY = 'tsh_discovery_focus_v1';
const HINTS_KEY = 'tsh_seen_hints_v1';

export function computeChildData(profile: ProfileInputs): ChildProfileData | null {
    const { lastName = '', middleName = '', firstName = '', dob, gender = 'Nữ', homeName = '', calendarType, birthTime, parents } = profile;

    if (!dob) return null;

    const fullName = `${lastName} ${middleName} ${firstName}`.replace(/\s+/g, ' ').trim() || profile.fullName || 'Người khám phá';

    try {
        const lpObj = RuleEngine.calculateLifePath(dob);
        const nameNumbers = RuleEngine.calculateNameNumbers(fullName);
        const attitude = RuleEngine.calculateAttitude(dob);
        const dobObj = RuleEngine.calculateDayOfBirth(dob);
        const personal = RuleEngine.calculatePersonalMetrics(dob);
        const maturity = RuleEngine.calculateMaturityNumber(lpObj.lifePath, nameNumbers.expression);
        const rationalThought = RuleEngine.calculateRationalThought(dob, firstName ? nameNumbers.expression : 0);

        const gridData = RuleEngine.calculateBirthGrid(dob, fullName);
        const bmsRatio = RuleEngine.calculateBodyMindSoul(dob, fullName);
        const nameDetails = RuleEngine.calculateNameDetails(fullName);
        const timeline = RuleEngine.calculateCyclesPinnacles(dob, lpObj.lifePath);

        const allKarmicDebts = Array.from(new Set([
            ...(lpObj.karmicDebts || []),
            ...(dobObj.karmicDebts || []),
            ...(firstName ? (nameNumbers.exprKarmicDebts || []) : []),
            ...(firstName ? (nameNumbers.soulKarmicDebts || []) : [])
        ]));

        return {
            firstName,
            middleName,
            lastName,
            dob,
            gender,
            homeName: homeName || '',
            fullName,
            calendarType,
            birthTime,
            lp: lpObj.lifePath,
            lpRaw: lpObj.rawSum,
            lpHasMaster: lpObj.hasMaster,
            lpHasDebt: lpObj.hasDebt,
            lpKarmicDebts: lpObj.karmicDebts || [],
            expression: firstName ? nameNumbers.expression : 0,
            expressionRaw: firstName ? nameNumbers.expressionRaw : 0,
            soulUrge: firstName ? nameNumbers.soulUrge : 0,
            soulRaw: firstName ? nameNumbers.soulRaw : 0,
            personality: firstName ? nameNumbers.personality : 0,
            personalityRaw: firstName ? nameNumbers.personalityRaw : 0,
            nameKarmicDebts: firstName ? (nameNumbers.karmicDebts || []) : [],
            attitude,
            birthday: dobObj.birthday,
            birthdayRaw: dobObj.rawDay,
            birthdayKarmicDebts: dobObj.karmicDebts || [],
            allKarmicDebts,
            maturity: firstName ? maturity : 0,
            rationalThought,
            personalYear: personal.personalYear,
            personalMonth: personal.personalMonth,
            personalDay: personal.personalDay,
            gridData,
            bmsRatio,
            nameDetails,
            timeline,
            parents: parents || DEFAULT_PROFILE.parents
        };
    } catch (err) {
        console.error('Error computing child data:', err);
        return null;
    }
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function ProfileSyncInner({
    children
}: {
    children: ReactNode;
}) {
    const searchParams = useSearchParams();

    const [profile, setProfileState] = useState<ProfileInputs>(() => {
        return DEFAULT_PROFILE;
    });

    const [hasCreatedMap, setHasCreatedMap] = useState<boolean>(true);
    const [hasCompletedTour, setHasCompletedTour] = useState<boolean>(false);
    const [discoveryFocus, setDiscoveryFocus] = useState<string[]>([]);
    const [compareNamesList, setCompareNamesListState] = useState<string[]>(['', '', '', '', '']);
    const [seenHints, setSeenHints] = useState<Record<string, boolean>>({});
    const [activeGuide, setActiveGuide] = useState<string | null>(null);
    const [isHelpCenterOpen, setIsHelpCenterOpen] = useState<boolean>(false);

    // Hydrate from URL query or LocalStorage on mount
    useEffect(() => {
        const nameParam = searchParams.get('name') || searchParams.get('fullName');
        const dobParam = searchParams.get('birthDate') || searchParams.get('dob');
        const genderParam = searchParams.get('gender');
        const calendarParam = searchParams.get('calendarType') as 'SOLAR' | 'LUNAR' | null;

        let hasExplicitMap = false;

        if (nameParam || dobParam) {
            const words = (nameParam || DEFAULT_PROFILE.fullName).trim().split(/\s+/);
            const lName = words[0] || '';
            const fName = words.length > 1 ? words[words.length - 1] : '';
            const mName = words.length > 2 ? words.slice(1, words.length - 1).join(' ') : '';

            const urlProfile: ProfileInputs = {
                ...DEFAULT_PROFILE,
                fullName: nameParam || DEFAULT_PROFILE.fullName,
                lastName: lName,
                middleName: mName,
                firstName: fName,
                dob: dobParam || DEFAULT_PROFILE.dob,
                gender: (genderParam as any) || DEFAULT_PROFILE.gender,
                calendarType: calendarParam || 'SOLAR'
            };
            setProfileState(urlProfile);
            hasExplicitMap = true;
            setHasCreatedMap(true);
        } else {
            try {
                const mapCreatedFlag = localStorage.getItem(MAP_CREATED_KEY);
                if (mapCreatedFlag !== null) {
                    setHasCreatedMap(mapCreatedFlag === 'true');
                    hasExplicitMap = mapCreatedFlag === 'true';
                }

                const cached = localStorage.getItem(STORAGE_KEY);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && parsed.dob) {
                        setProfileState(parsed);
                        if (mapCreatedFlag === null) {
                            setHasCreatedMap(true);
                        }
                    }
                }
            } catch (e) {
                // Ignore storage error
            }
        }

        try {
            const tourFlag = localStorage.getItem(TOUR_COMPLETED_KEY);
            if (tourFlag !== null) {
                setHasCompletedTour(tourFlag === 'true');
            }

            const focusData = localStorage.getItem(FOCUS_KEY);
            if (focusData) {
                setDiscoveryFocus(JSON.parse(focusData));
            }

            const cachedCompare = localStorage.getItem(COMPARE_KEY);
            if (cachedCompare) {
                const parsedList = JSON.parse(cachedCompare);
                if (Array.isArray(parsedList)) {
                    setCompareNamesListState(parsedList);
                }
            }

            const cachedHints = localStorage.getItem(HINTS_KEY);
            if (cachedHints) {
                const parsedHints = JSON.parse(cachedHints);
                if (parsedHints && typeof parsedHints === 'object') {
                    setSeenHints(parsedHints);
                }
            }
        } catch (e) {
            // Ignore
        }
    }, [searchParams]);

    const updateProfile = useCallback((inputs: Partial<ProfileInputs>) => {
        setProfileState((prev) => {
            let nextFullName = inputs.fullName;
            let nextLastName = inputs.lastName ?? prev.lastName;
            let nextMiddleName = inputs.middleName ?? prev.middleName;
            let nextFirstName = inputs.firstName ?? prev.firstName;

            if (inputs.fullName && !inputs.firstName && !inputs.lastName) {
                const words = inputs.fullName.trim().split(/\s+/);
                nextLastName = words[0] || '';
                nextFirstName = words.length > 1 ? words[words.length - 1] : '';
                nextMiddleName = words.length > 2 ? words.slice(1, words.length - 1).join(' ') : '';
            } else if (!inputs.fullName && (inputs.firstName || inputs.lastName || inputs.middleName)) {
                nextFullName = `${nextLastName} ${nextMiddleName} ${nextFirstName}`.replace(/\s+/g, ' ').trim();
            }

            const updated: ProfileInputs = {
                ...prev,
                ...inputs,
                lastName: nextLastName,
                middleName: nextMiddleName,
                firstName: nextFirstName,
                fullName: nextFullName || `${nextLastName} ${nextMiddleName} ${nextFirstName}`.replace(/\s+/g, ' ').trim()
            };

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                // Ignore storage error
            }
            return updated;
        });
    }, []);

    const completeOnboarding = useCallback((inputs: Partial<ProfileInputs>, focus: string[] = []) => {
        updateProfile(inputs);
        setHasCreatedMap(true);
        setDiscoveryFocus(focus);
        setHasCompletedTour(false); // Enable tour for newly created map

        try {
            localStorage.setItem(MAP_CREATED_KEY, 'true');
            localStorage.setItem(TOUR_COMPLETED_KEY, 'false');
            localStorage.setItem(FOCUS_KEY, JSON.stringify(focus));
        } catch (e) {
            // Ignore
        }
    }, [updateProfile]);

    const completeTour = useCallback(() => {
        setHasCompletedTour(true);
        try {
            localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
        } catch (e) {
            // Ignore
        }
    }, []);

    const resetTour = useCallback(() => {
        setHasCompletedTour(false);
        setSeenHints({});
        try {
            localStorage.setItem(TOUR_COMPLETED_KEY, 'false');
            localStorage.removeItem(HINTS_KEY);
        } catch (e) {
            // Ignore
        }
    }, []);

    const markHintSeen = useCallback((key: string) => {
        setSeenHints(prev => {
            const next = { ...prev, [key]: true };
            try {
                localStorage.setItem(HINTS_KEY, JSON.stringify(next));
            } catch (e) {
                // Ignore
            }
            return next;
        });
    }, []);

    const markGuideSeen = markHintSeen;

    const isGuideSeen = useCallback((key: string) => {
        return !!seenHints[key];
    }, [seenHints]);

    const triggerGuide = useCallback((guideId: string) => {
        setActiveGuide(guideId);
    }, []);

    const closeGuide = useCallback(() => {
        setActiveGuide(null);
    }, []);

    const openHelpCenter = useCallback(() => {
        setIsHelpCenterOpen(true);
    }, []);

    const closeHelpCenter = useCallback(() => {
        setIsHelpCenterOpen(false);
    }, []);

    const setHelpCenterOpen = useCallback((open: boolean) => {
        setIsHelpCenterOpen(open);
    }, []);

    const resetGuide = useCallback((key: string) => {
        setSeenHints(prev => {
            const next = { ...prev };
            delete next[key];
            try {
                localStorage.setItem(HINTS_KEY, JSON.stringify(next));
            } catch (e) {
                // Ignore
            }
            return next;
        });
    }, []);

    const resetAllHints = useCallback(() => {
        setSeenHints({});
        try {
            localStorage.removeItem(HINTS_KEY);
        } catch (e) {
            // Ignore
        }
    }, []);

    const clearProfile = useCallback(() => {
        setHasCreatedMap(false);
        setHasCompletedTour(false);
        setDiscoveryFocus([]);
        setSeenHints({});
        try {
            localStorage.removeItem(MAP_CREATED_KEY);
            localStorage.removeItem(TOUR_COMPLETED_KEY);
            localStorage.removeItem(FOCUS_KEY);
            localStorage.removeItem(HINTS_KEY);
        } catch (e) {
            // Ignore
        }
    }, []);

    const setCompareNamesList = useCallback((list: string[]) => {
        setCompareNamesListState(list);
        try {
            localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
        } catch (e) {
            // Ignore
        }
    }, []);

    const updateCompareNameAtIndex = useCallback((index: number, val: string) => {
        setCompareNamesListState((prev) => {
            const updated = [...prev];
            updated[index] = val;
            try {
                localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
            } catch (e) {
                // Ignore
            }
            return updated;
        });
    }, []);

    const addCompareName = useCallback((name: string) => {
        setCompareNamesListState((prev) => {
            const list = [...prev];
            const emptyIdx = list.findIndex((n) => !n || n.trim() === '');
            if (emptyIdx !== -1) {
                list[emptyIdx] = name;
            } else {
                list[list.length - 1] = name;
            }
            try {
                localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
            } catch (e) {
                // Ignore
            }
            return list;
        });
    }, []);

    const applyName = useCallback((suggestedName: string) => {
        const words = suggestedName.trim().split(/\s+/);
        let newFirst = '';
        let newMiddle = '';
        let newLast = profile.lastName;
        if (words.length > 0) {
            newFirst = words[words.length - 1];
            newMiddle = words.slice(0, words.length - 1).join(' ');
        }
        updateProfile({
            firstName: newFirst,
            middleName: newMiddle,
            lastName: newLast,
            fullName: `${newLast} ${newMiddle} ${newFirst}`.replace(/\s+/g, ' ').trim()
        });
    }, [profile.lastName, updateProfile]);

    const getReportQueryString = useCallback(() => {
        const params = new URLSearchParams();
        if (profile.fullName) params.set('name', profile.fullName);
        if (profile.dob) params.set('birthDate', profile.dob);
        if (profile.calendarType) params.set('calendarType', profile.calendarType);
        return params.toString();
    }, [profile]);

    const data = useMemo(() => {
        return computeChildData(profile);
    }, [profile]);

    const value = useMemo<ProfileContextType>(() => ({
        profile,
        data,
        hasCreatedMap,
        hasCompletedTour,
        discoveryFocus,
        compareNamesList,
        seenHints,
        activeGuide,
        isHelpCenterOpen,
        updateProfile,
        completeOnboarding,
        completeTour,
        resetTour,
        clearProfile,
        setCompareNamesList,
        updateCompareNameAtIndex,
        addCompareName,
        applyName,
        getReportQueryString,
        markHintSeen,
        markGuideSeen,
        isGuideSeen,
        triggerGuide,
        closeGuide,
        openHelpCenter,
        closeHelpCenter,
        setHelpCenterOpen,
        resetGuide,
        resetAllHints
    }), [
        profile,
        data,
        hasCreatedMap,
        hasCompletedTour,
        discoveryFocus,
        compareNamesList,
        seenHints,
        activeGuide,
        isHelpCenterOpen,
        updateProfile,
        completeOnboarding,
        completeTour,
        resetTour,
        clearProfile,
        setCompareNamesList,
        updateCompareNameAtIndex,
        addCompareName,
        applyName,
        getReportQueryString,
        markHintSeen,
        markGuideSeen,
        isGuideSeen,
        triggerGuide,
        closeGuide,
        openHelpCenter,
        closeHelpCenter,
        setHelpCenterOpen,
        resetGuide,
        resetAllHints
    ]);

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}

export function ProfileProvider({
    children
}: {
    children: ReactNode;
}) {
    return (
        <React.Suspense fallback={null}>
            <ProfileSyncInner>
                {children}
            </ProfileSyncInner>
        </React.Suspense>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
