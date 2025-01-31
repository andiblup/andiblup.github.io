// // modal.js

// console.log('modal.js wurde geladen');

// (function() {
//   // Funktion zum Öffnen eines Modals
//   const openModal = (modalId) => {
//     const modal = document.getElementById(modalId);
//     if (modal) {
//       modal.style.display = 'block';
//       modal.setAttribute('aria-hidden', 'false');
//       // Optional: Fokussieren auf das Modal für Zugänglichkeit
//       modal.querySelector('.custom-modal-content').focus();
//       console.log(`Modal "${modalId}" geöffnet`);
//     } else {
//       console.warn(`Modal mit ID "${modalId}" nicht gefunden.`);
//     }
//   };

//   // Funktion zum Schließen eines Modals
//   const closeModal = (modal) => {
//     if (modal) {
//       modal.style.display = 'none';
//       modal.setAttribute('aria-hidden', 'true');
//       console.log(`Modal "${modal.id}" geschlossen`);
//     }
//   };

//   // Event-Listener für das Öffnen von Modals mittels Event Delegation
//   document.addEventListener('click', (e) => {
//     const trigger = e.target.closest('[data-modal]');
//     if (trigger) {
//       e.preventDefault();
//       console.log('Klick auf Modal-Trigger erkannt via Delegation');
//       const modalId = trigger.getAttribute('data-modal');
//       openModal(modalId);
//     }

//     // Event-Listener für das Schließen von Modals
//     if (e.target.matches('[data-close]') || e.target.matches('.custom-modal')) {
//       const modal = e.target.closest('.custom-modal');
//       closeModal(modal);
//     }
//   });

//   // Event-Listener für das Schließen von Modals durch Drücken der ESC-Taste
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//       const openModal = document.querySelector('.custom-modal[aria-hidden="false"]');
//       if (openModal) {
//         closeModal(openModal);
//       }
//     }
//   });

//   // Optional: Fokus-Trapping und weitere Zugänglichkeitsfunktionen können hier hinzugefügt werden

//   // Exportieren der Funktionen, falls benötigt
//   window.Modal = {
//     open: openModal,
//     close: closeModal
//   };
// })();





// modal.js

// console.log('modal.js wurde geladen');

// (function() {
//     // Funktion zum Öffnen eines Modals
//     const openModal = (modalId) => {
//         const modal = document.getElementById(modalId);
//         if (modal) {
//             // Füge die Start-Animationsklasse hinzu
//             const animationIn = modal.getAttribute('data-animation-in');
//             if (animationIn) {
//                 modal.querySelector('.custom-modal-content').classList.add(animationIn);
//             }
//             modal.style.display = 'block';
//             modal.setAttribute('aria-hidden', 'false');
//             // Optional: Fokussieren auf das Modal für Zugänglichkeit
//             modal.querySelector('.custom-modal-content').focus();
//             console.log(`Modal "${modalId}" geöffnet`);
//         } else {
//             console.warn(`Modal mit ID "${modalId}" nicht gefunden.`);
//         }
//     };

//     // Funktion zum Schließen eines Modals
//     const closeModal = (modal) => {
//         if (modal) {
//             // Füge die Schließ-Animationsklasse hinzu
//             const animationOut = modal.getAttribute('data-animation-out');
//             if (animationOut) {
//                 modal.querySelector('.custom-modal-content').classList.add(animationOut);
//             }
//             modal.setAttribute('aria-hidden', 'true');
//             // Entferne die Anzeige nach der Animationsdauer
//             const animationDuration = getAnimationDuration(modal.querySelector('.custom-modal-content'));
//             setTimeout(() => {
//                 modal.style.display = 'none';
//                 // Entferne die Animationsklassen nach dem Schließen
//                 modal.querySelector('.custom-modal-content').classList.remove(animationOut);
//             }, animationDuration);
//             console.log(`Modal "${modal.id}" geschlossen`);
//         }
//     };

//     // Funktion zur Bestimmung der Animationsdauer in Millisekunden
//     const getAnimationDuration = (element) => {
//         const style = window.getComputedStyle(element);
//         const duration = style.getPropertyValue('animation-duration');
//         const durationMs = parseFloat(duration) * 1000;
//         return isNaN(durationMs) ? 300 : durationMs; // Fallback auf 300ms
//     };

//     // Event-Listener für das Öffnen von Modals mittels Event Delegation
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
//             const openModal = document.querySelector('.custom-modal[aria-hidden="false"]');
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
            console.log('Klick auf Modal-Hintergrund erkannt:', modalId);
            closeModal(modalBackground);
            return;
        }
    });

    // Event-Listener für das Schließen von Modals durch Drücken der ESC-Taste
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('ESC-Taste gedrückt');
            const openModal = document.querySelector('.custom-modal.active');
            if (openModal) {
                const modalId = openModal.id;
                console.log('Schließe Modal via ESC:', modalId);
                closeModal(openModal);
            }
        }
    });

    // Exportieren der Funktionen, falls benötigt
    window.Modal = {
        open: openModal,
        close: closeModal
    };
})();
