'use client';

import React, { ReactNode } from 'react';

export interface TabPageShellProps {
    id?: string;
    icon?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    children?: ReactNode;
    insights?: ReactNode;
}

export default function TabPageShell({ id, icon, title, subtitle, children, insights }: TabPageShellProps) {
    return (
        <div className="tab-page tab-content active" id={id}>
            <div className="section-title-wrap">
                <h2>{icon} {title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </div>
            {insights}
            <div className="tab-page-body">{children}</div>
        </div>
    );
}
