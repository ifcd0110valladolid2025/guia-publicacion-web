(() => {
    const STORAGE_KEY = 'cookie_consent_choice';

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');

    function hideBanner() {
        if (banner) {
            banner.hidden = true;
        }
    }

    function showBanner() {
        if (banner) {
            banner.hidden = false;
        }
    }

    function updateConsent(consentValue) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                analytics_storage: consentValue,
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
            });
        }
    }

    function setConsentGranted() {
        updateConsent('granted');
        localStorage.setItem(STORAGE_KEY, 'accepted');

        if (typeof gtag === 'function') {
            gtag('event', 'cookie_consent_update', {
                consent_choice: 'accepted'
            });
        }

        hideBanner();
    }

    function setConsentDenied() {
        updateConsent('denied');
        localStorage.setItem(STORAGE_KEY, 'rejected');

        if (typeof gtag === 'function') {
            gtag('event', 'cookie_consent_update', {
                consent_choice: 'rejected'
            });
        }

        hideBanner();
    }

    function resetCookieConsent() {
        localStorage.removeItem(STORAGE_KEY);

        updateConsent('denied');
        showBanner();
    }

    function initConsentBanner() {
        const savedChoice = localStorage.getItem(STORAGE_KEY);

        if (savedChoice === 'accepted') {
            updateConsent('granted');
            hideBanner();
            return;
        }

        if (savedChoice === 'rejected') {
            updateConsent('denied');
            hideBanner();
            return;
        }

        showBanner();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', setConsentGranted);
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', setConsentDenied);
    }

    document.addEventListener('DOMContentLoaded', initConsentBanner);

    // Exponer funciones globales para poder usarlas desde otras páginas
    window.resetCookieConsent = resetCookieConsent;
    window.acceptCookieConsent = setConsentGranted;
    window.rejectCookieConsent = setConsentDenied;
})();