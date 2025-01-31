
// modal.js

// console.log('modal.js wurde geladen');

// (function() {
//     // Standard-Animationen
//     const defaultAnimationIn = 'animate-bounceIn';
//     const defaultAnimationOut = 'animate-fadeOut';

//     // Funktion zum Öffnen eines Modals
//     const openModal = (modalId) => {
//         const modal = document.getElementById(modalId);
//         if (modal) {
//             modal.classList.add('active');

//             // Animation-In
//             const animationIn = modal.getAttribute('data-animation-in') || defaultAnimationIn;
//             const modalContent = modal.querySelector('.custom-modal-content');
//             if (modalContent) {
//                 modalContent.classList.add(animationIn);
//             }

//             // Fokus setzen für Zugänglichkeit
//             modal.setAttribute('aria-hidden', 'false');
//             modalContent?.focus();

//             console.log(`Modal "${modalId}" geöffnet mit Animation: ${animationIn}`);
//         } else {
//             console.warn(`Modal mit ID "${modalId}" nicht gefunden.`);
//         }
//     };

//     // Funktion zum Schließen eines Modals
//     const closeModal = (modal) => {
//         if (modal) {
//             // Animation-Out
//             const animationOut = modal.getAttribute('data-animation-out') || defaultAnimationOut;
//             const modalContent = modal.querySelector('.custom-modal-content');
//             if (modalContent) {
//                 modalContent.classList.add(animationOut);

//                 // Nach Ablauf der Animation das Modal verstecken
//                 const animationDuration = getAnimationDuration(modalContent, animationOut);
//                 setTimeout(() => {
//                     modal.classList.remove('active');
//                     modal.setAttribute('aria-hidden', 'true');
//                     modalContent.classList.remove(animationOut);
//                     console.log(`Modal "${modal.id}" geschlossen mit Animation: ${animationOut}`);
//                 }, animationDuration);
//             } else {
//                 // Fallback: Modal sofort verstecken
//                 modal.classList.remove('active');
//                 modal.setAttribute('aria-hidden', 'true');
//                 console.log(`Modal "${modal.id}" geschlossen (keine Animation).`);
//             }
//         }
//     };

//     // Funktion zur Bestimmung der Animationsdauer in Millisekunden
//     const getAnimationDuration = (element, animationName) => {
//         const style = window.getComputedStyle(element);
//         const duration = style.getPropertyValue('animation-duration');
//         const delay = style.getPropertyValue('animation-delay');
//         const durationMs = parseFloat(duration) * 1000;
//         const delayMs = parseFloat(delay) * 1000;
//         return isNaN(durationMs) ? 300 : durationMs + delayMs;
//     };

//     // Event-Delegation für Modal-Trigger und Schließen-Buttons
//     document.body.addEventListener('click', (e) => {
//         // Öffnen eines Modals
//         const trigger = e.target.closest('[data-modal]');
//         if (trigger) {
//             e.preventDefault();
//             const modalId = trigger.getAttribute('data-modal');
//             console.log('Klick auf Modal-Trigger erkannt via Delegation:', modalId);
//             openModal(modalId);
//             return; // Verhindert, dass weitere Event-Listener ausgeführt werden
//         }

//         // Schließen eines Modals durch Klick auf [data-close]
//         const closeBtn = e.target.closest('[data-close]');
//         if (closeBtn) {
//             e.preventDefault();
//             const modal = closeBtn.closest('.custom-modal');
//             if (modal) {
//                 const modalId = modal.id;
//                 console.log('Klick auf Modal-Schließen-Button erkannt:', modalId);
//                 closeModal(modal);
//             }
//             return;
//         }

//         // Schließen eines Modals durch Klick außerhalb des Modal-Inhalts
//         const modalBackground = e.target.closest('.custom-modal');
//         if (modalBackground && e.target === modalBackground) {
//             const modalId = modalBackground.id;
//             console.log('Klick auf Modal-Hintergrund erkannt:', modalId);
//             closeModal(modalBackground);
//             return;
//         }
//     });

//     // Event-Listener für das Schließen von Modals durch Drücken der ESC-Taste
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             console.log('ESC-Taste gedrückt');
//             const openModal = document.querySelector('.custom-modal.active');
//             if (openModal) {
//                 const modalId = openModal.id;
//                 console.log('Schließe Modal via ESC:', modalId);
//                 closeModal(openModal);
//             }
//         }
//     });

//     // Exportieren der Funktionen, falls benötigt
//     window.Modal = {
//         open: openModal,
//         close: closeModal
//     };
// })();



// // modal.js

// console.log('modal.js wurde geladen');

// (function() {
//     // Standard-Animationen
//     const defaultAnimationIn = 'animate-bounceIn';
//     const defaultAnimationOut = 'animate-fadeOut';

//     // Funktion zum Öffnen eines Modals
//     const openModal = (modalId) => {
//         const modal = document.getElementById(modalId);
//         if (modal) {
//             modal.classList.add('active');

//             // Animation-In
//             const animationIn = modal.getAttribute('data-animation-in') || defaultAnimationIn;
//             const modalContent = modal.querySelector('.custom-modal-content');
//             if (modalContent) {
//                 modalContent.classList.add(animationIn);
//             }

//             // Fokus setzen für Zugänglichkeit
//             modal.setAttribute('aria-hidden', 'false');
//             modalContent?.focus();

//             console.log(`Modal "${modalId}" geöffnet mit Animation: ${animationIn}`);
//         } else {
//             console.warn(`Modal mit ID "${modalId}" nicht gefunden.`);
//         }
//     };

//     // Funktion zum Schließen eines Modals
//     const closeModal = (modal) => {
//         if (modal) {
//             // Animation-Out
//             const animationOut = modal.getAttribute('data-animation-out') || defaultAnimationOut;
//             const modalContent = modal.querySelector('.custom-modal-content');
//             if (modalContent) {
//                 modalContent.classList.add(animationOut);

//                 // Nach Ablauf der Animation das Modal verstecken
//                 const animationDuration = getAnimationDuration(modalContent, animationOut);
//                 setTimeout(() => {
//                     modal.classList.remove('active');
//                     modal.setAttribute('aria-hidden', 'true');
//                     modalContent.classList.remove(animationOut);
//                     console.log(`Modal "${modal.id}" geschlossen mit Animation: ${animationOut}`);
//                 }, animationDuration);
//             } else {
//                 // Fallback: Modal sofort verstecken
//                 modal.classList.remove('active');
//                 modal.setAttribute('aria-hidden', 'true');
//                 console.log(`Modal "${modal.id}" geschlossen (keine Animation).`);
//             }
//         }
//     };

//     // Funktion zur Bestimmung der Animationsdauer in Millisekunden
//     const getAnimationDuration = (element, animationName) => {
//         const style = window.getComputedStyle(element);
//         const duration = style.getPropertyValue('animation-duration');
//         const delay = style.getPropertyValue('animation-delay');
//         const durationMs = parseFloat(duration) * 1000;
//         const delayMs = parseFloat(delay) * 1000;
//         return isNaN(durationMs) ? 300 : durationMs + delayMs;
//     };

//     // Event-Delegation für Modal-Trigger und Schließen-Buttons
//     document.body.addEventListener('click', (e) => {
//         // Öffnen eines Modals
//         const trigger = e.target.closest('[data-modal]');
//         if (trigger) {
//             e.preventDefault();
//             const modalId = trigger.getAttribute('data-modal');
//             console.log('Klick auf Modal-Trigger erkannt via Delegation:', modalId);
//             openModal(modalId);
//             return; // Verhindert, dass weitere Event-Listener ausgeführt werden
//         }

//         // Schließen eines Modals durch Klick auf [data-close]
//         const closeBtn = e.target.closest('[data-close]');
//         if (closeBtn) {
//             e.preventDefault();
//             const modal = closeBtn.closest('.custom-modal');
//             if (modal) {
//                 const modalId = modal.id;
//                 console.log('Klick auf Modal-Schließen-Button erkannt:', modalId);
//                 closeModal(modal);
//             }
//             return;
//         }

//         // Schließen eines Modals durch Klick außerhalb des Modal-Inhalts
//         const modalBackground = e.target.closest('.custom-modal');
//         if (modalBackground && e.target === modalBackground) {
//             const modalId = modalBackground.id;
//             // Überprüfen des data-close-on-overlay Attributs
//             const closeOnOverlay = modalBackground.getAttribute('data-close-on-overlay');
//             const canClose = closeOnOverlay === null ? true : closeOnOverlay === 'true';
//             if (canClose) {
//                 console.log('Klick auf Modal-Hintergrund erkannt und erlaubt:', modalId);
//                 closeModal(modalBackground);
//             } else {
//                 console.log('Klick auf Modal-Hintergrund erkannt, aber nicht erlaubt:', modalId);
//             }
//             return;
//         }
//     });

//     // Event-Listener für das Schließen von Modals durch Drücken der ESC-Taste
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             console.log('ESC-Taste gedrückt');
//             const openModal = document.querySelector('.custom-modal.active');
//             if (openModal) {
//                 // Überprüfen des data-close-on-overlay Attributs
//                 const closeOnOverlay = openModal.getAttribute('data-close-on-overlay');
//                 const canClose = closeOnOverlay === null ? true : closeOnOverlay === 'true';
//                 if (canClose) {
//                     const modalId = openModal.id;
//                     console.log('Schließe Modal via ESC:', modalId);
//                     closeModal(openModal);
//                 } else {
//                     console.log('Schließe Modal via ESC nicht erlaubt:', openModal.id);
//                 }
//             }
//         }
//     });

//     // Exportieren der Funktionen, falls benötigt
//     window.Modal = {
//         open: openModal,
//         close: closeModal
//     };
// })();



// modal.js

console.log('modal.js wurde geladen');

(function() {
    // Standard-Animationen
    const defaultAnimationIn = 'animate-bounceIn';
    const defaultAnimationOut = 'animate-fadeOut';

    // Funktion zum Öffnen eines Modals
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');

            // Animation-In
            const animationIn = modal.getAttribute('data-animation-in') || defaultAnimationIn;
            const modalContent = modal.querySelector('.custom-modal-content');
            if (modalContent) {
                modalContent.classList.add(animationIn);
            }

            // Fokus setzen für Zugänglichkeit
            modal.setAttribute('aria-hidden', 'false');
            modalContent?.focus();

            console.log(`Modal "${modalId}" geöffnet mit Animation: ${animationIn}`);
        } else {
            console.warn(`Modal mit ID "${modalId}" nicht gefunden.`);
        }
    };

    // Funktion zum Schließen eines Modals
    const closeModal = (modal) => {
        if (modal) {
            // Animation-Out
            const animationOut = modal.getAttribute('data-animation-out') || defaultAnimationOut;
            const modalContent = modal.querySelector('.custom-modal-content');
            if (modalContent) {
                modalContent.classList.add(animationOut);

                // Nach Ablauf der Animation das Modal verstecken
                const animationDuration = getAnimationDuration(modalContent, animationOut);
                setTimeout(() => {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    modalContent.classList.remove(animationOut);
                    console.log(`Modal "${modal.id}" geschlossen mit Animation: ${animationOut}`);
                }, animationDuration);
            } else {
                // Fallback: Modal sofort verstecken
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                console.log(`Modal "${modal.id}" geschlossen (keine Animation).`);
            }
        }
    };

    // Funktion zur Bestimmung der Animationsdauer in Millisekunden
    const getAnimationDuration = (element, animationName) => {
        const style = window.getComputedStyle(element);
        const duration = style.getPropertyValue('animation-duration');
        const delay = style.getPropertyValue('animation-delay');
        const durationMs = parseFloat(duration) * 1000;
        const delayMs = parseFloat(delay) * 1000;
        return isNaN(durationMs) ? 300 : durationMs + delayMs;
    };

    // Event-Delegation für Modal-Trigger und Schließen-Buttons
    document.body.addEventListener('click', (e) => {
        // Öffnen eines Modals
        const trigger = e.target.closest('[data-modal]');
        if (trigger) {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            console.log('Klick auf Modal-Trigger erkannt via Delegation:', modalId);

            // Vor dem Öffnen des Modals prüfen und setzen des data-close-on-overlay Attributs
            const modal = document.getElementById(modalId);
            if (modal) {
                // Wenn kein data-close-on-overlay Attribut vorhanden ist, setze es auf true
                if (!modal.hasAttribute('data-close-on-overlay')) {
                    modal.setAttribute('data-close-on-overlay', 'true');
                }
            }

            openModal(modalId);
            return; // Verhindert, dass weitere Event-Listener ausgeführt werden
        }

        // Schließen eines Modals durch Klick auf [data-close]
        const closeBtn = e.target.closest('[data-close]');
        if (closeBtn) {
            e.preventDefault();
            const modal = closeBtn.closest('.custom-modal');
            if (modal) {
                const modalId = modal.id;
                console.log('Klick auf Modal-Schließen-Button erkannt:', modalId);
                closeModal(modal);
            }
            return;
        }

        // Schließen eines Modals durch Klick außerhalb des Modal-Inhalts
        const modalBackground = e.target.closest('.custom-modal');
        if (modalBackground && e.target === modalBackground) {
            const modalId = modalBackground.id;
            // Überprüfen des data-close-on-overlay Attributs
            const closeOnOverlay = modalBackground.getAttribute('data-close-on-overlay');
            const canClose = closeOnOverlay === null ? true : closeOnOverlay === 'true';
            if (canClose) {
                console.log('Klick auf Modal-Hintergrund erkannt und erlaubt:', modalId);
                closeModal(modalBackground);
            } else {
                console.log('Klick auf Modal-Hintergrund erkannt, aber nicht erlaubt:', modalId);
            }
            return;
        }
    });

    // Event-Listener für das Schließen von Modals durch Drücken der ESC-Taste
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('ESC-Taste gedrückt');
            const openModal = document.querySelector('.custom-modal.active');
            if (openModal) {
                // Überprüfen des data-close-on-overlay Attributs
                const closeOnOverlay = openModal.getAttribute('data-close-on-overlay');
                const canClose = closeOnOverlay === null ? true : closeOnOverlay === 'true';
                if (canClose) {
                    const modalId = openModal.id;
                    console.log('Schließe Modal via ESC:', modalId);
                    closeModal(openModal);
                } else {
                    console.log('Schließe Modal via ESC nicht erlaubt:', openModal.id);
                }
            }
        }
    });

    // Exportieren der Funktionen, falls benötigt
    window.Modal = {
        open: openModal,
        close: closeModal
    };
})();
