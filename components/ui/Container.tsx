'use client';

import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'nav';
    size?: 'default' | 'narrow' | 'wide' | 'fluid';
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    as: Component = 'div',
    size = 'default',
    className = '',
    ...props
}) => {
    const sizeClasses = {
        default: 'max-w-[1400px]',
        narrow: 'max-w-4xl',
        wide: 'max-w-[1536px]',
        fluid: 'max-w-none'
    };

    return (
        <Component
            className={`w-full mx-auto px-5 sm:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Container;
