/**
 * Sentry & Runtime Error Monitoring Integration
 */

export interface ErrorContext {
    user?: { id?: string; email?: string };
    tags?: Record<string, string>;
    extra?: Record<string, any>;
}

export function captureException(error: Error | any, context?: ErrorContext): void {
    const errorDetails = {
        message: error?.message || String(error),
        stack: error?.stack,
        timestamp: new Date().toISOString(),
        context
    };

    // 1. Nếu đã tích hợp Sentry SDK
    if (typeof (globalThis as any).Sentry?.captureException === 'function') {
        (globalThis as any).Sentry.captureException(error, {
            tags: context?.tags,
            extra: context?.extra
        });
    }

    // 2. Logging server-side an toàn
    console.error('[Monitoring Sentry Exception]:', JSON.stringify(errorDetails, null, 2));
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
    if (typeof (globalThis as any).Sentry?.captureMessage === 'function') {
        (globalThis as any).Sentry.captureMessage(message, level);
    }
    console.log(`[Monitoring Sentry ${level.toUpperCase()}]:`, message);
}
