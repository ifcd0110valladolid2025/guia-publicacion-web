(() => {
    const STORAGE_KEY = 'cookie_consent_choice';

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');

    function hideBanner() {
        banner.hidden = true;
    }

    function showBanner() {
        banner.hidden = false;
    }

    function setConsentGranted() {
        gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });

        localStorage.setItem(STORAGE_KEY, 'accepted');

        // Evento opcional para tu analítica
        gtag('event', 'cookie_consent_update', {
            consent_choice: 'accepted'
        });

        hideBanner();
    }

    function setConsentDenied() {
        gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });

        localStorage.setItem(STORAGE_KEY, 'rejected');

        // Evento opcional para tu analítica
        gtag('event', 'cookie_consent_update', {
            consent_choice: 'rejected'
        });

        hideBanner();
    }

    function initConsentBanner() {
        const savedChoice = localStorage.getItem(STORAGE_KEY);

        if (savedChoice === 'accepted') {
            setConsentGranted();
            return;
        }

        if (savedChoice === 'rejected') {
            setConsentDenied();
            return;
        }

        showBanner();
    }

    acceptBtn?.addEventListener('click', setConsentGranted);
    rejectBtn?.addEventListener('click', setConsentDenied);

    document.addEventListener('DOMContentLoaded', initConsentBanner);
})();