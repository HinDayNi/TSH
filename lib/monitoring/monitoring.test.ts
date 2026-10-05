import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent, AnalyticsEvents } from './analytics';
import { captureException, captureMessage } from './sentry';

describe('Production Monitoring & Analytics (Gói 9)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('Analytics (GA4 & PostHog)', () => {
        it('bỏ qua an toàn khi chạy server-side (window is undefined)', () => {
            expect(() => {
                trackEvent({ action: 'test_server_event' });
            }).not.toThrow();
        });

        it('kích hoạt các sự kiện trong phễu chuyển đổi chuẩn xác', () => {
            expect(() => {
                AnalyticsEvents.formSubmitted('Nguyễn Văn Huy', 7, false);
                AnalyticsEvents.vipCtaClicked(888999);
                AnalyticsEvents.paymentSuccess(888999, 199000);
                AnalyticsEvents.newsletterSubscribed('test@example.com');
            }).not.toThrow();
        });
    });

    describe('Sentry & Runtime Error Tracking', () => {
        it('ghi nhận lỗi runtime và context mà không làm crash ứng dụng', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const testError = new Error('Test runtime exception in numerology engine');

            captureException(testError, {
                tags: { env: 'production', module: 'numerology_calculator' },
                extra: { userId: '123' }
            });

            expect(consoleSpy).toHaveBeenCalled();
            const logCall = consoleSpy.mock.calls[0][1];
            expect(logCall).toContain('Test runtime exception in numerology engine');
        });

        it('ghi nhận thông điệp giám sát cấp info/warning', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
            captureMessage('Hệ thống thanh toán hoạt động ổn định', 'info');

            expect(consoleSpy).toHaveBeenCalled();
            expect(consoleSpy.mock.calls[0][0]).toContain('[Monitoring Sentry INFO]:');
            expect(consoleSpy.mock.calls[0][1]).toBe('Hệ thống thanh toán hoạt động ổn định');
        });
    });
});
