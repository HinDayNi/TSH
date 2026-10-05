/**
 * Analytics & User Behavior Tracking (PostHog & Google Analytics 4)
 */

export interface TrackingEvent {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    metadata?: Record<string, any>;
}

export function trackEvent(event: TrackingEvent): void {
    if (typeof window === 'undefined') return;

    try {
        // 1. Google Analytics 4 (gtag)
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', event.action, {
                event_category: event.category || 'General',
                event_label: event.label,
                value: event.value,
                ...event.metadata
            });
        }

        // 2. PostHog Analytics
        if (typeof (window as any).posthog?.capture === 'function') {
            (window as any).posthog.capture(event.action, {
                category: event.category,
                label: event.label,
                value: event.value,
                ...event.metadata
            });
        }

        // 3. Console debug mode in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics Tracked] ${event.action}:`, event);
        }
    } catch (err) {
        console.warn('Analytics tracking error:', err);
    }
}

// Các sự kiện then chốt trong phễu chuyển đổi (Conversion Funnel)
export const AnalyticsEvents = {
    formSubmitted: (name: string, lifePath: number, isLunar: boolean) =>
        trackEvent({
            action: 'numerology_form_submitted',
            category: 'Funnel_Step_1',
            label: name,
            value: lifePath,
            metadata: { isLunar }
        }),

    vipCtaClicked: (orderCode?: number) =>
        trackEvent({
            action: 'vip_paywall_cta_clicked',
            category: 'Funnel_Step_2',
            label: 'Upgrade_Button',
            metadata: { orderCode }
        }),

    paymentSuccess: (orderCode: number, amount: number) =>
        trackEvent({
            action: 'payment_completed_vip',
            category: 'Conversion_Success',
            label: `Order_${orderCode}`,
            value: amount,
            metadata: { orderCode, amount }
        }),

    newsletterSubscribed: (email: string) =>
        trackEvent({
            action: 'newsletter_subscribed',
            category: 'Retention',
            label: email
        })
};
