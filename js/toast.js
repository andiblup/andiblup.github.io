// toast.js

(function () {
    // Toastr-Konfiguration
    const toastrOptions = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        onclick: null,
        showDuration: 300, // in ms
        hideDuration: 1000, // in ms
        timeOut: 5000, // in ms
        extendedTimeOut: 2000, // in ms
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod:  (this.positionClass === 'toast-top-right' || this.positionClass === 'toast-bottom-right' ) ? 'slideInRight' : 'slideInLeft',
        hideMethod: (this.positionClass === 'toast-top-right' || this.positionClass === 'toast-bottom-right' ) ? 'slideOutRight' : 'slideOutLeft',
        tapToDismiss: false,
    };

    // Toast-Objekt
    class Toast {
        constructor(options) {
            this.options = { ...toastrOptions, ...options };
            this.container = document.getElementById('toast-container');

            if (!this.container) {
                console.warn("Toast container not found! Bitte stelle sicher, dass ein <div> mit der ID 'toast-container' im HTML vorhanden ist.");
                return;
            }
        }

        /**
         * Modifiziert die globalen Konfigurationen
         * @param {Object} newConfig - Neue Konfigurationseinstellungen
         */
        modifyConfigs(newConfig = {}) {
            this.options = { ...this.options, ...newConfig };
        }

        /**
         * Überprüft, ob ein Toast mit derselben Nachricht bereits vorhanden ist
         * @param {string} message - Die Nachricht des Toasts
         * @returns {boolean} - True, wenn ein Duplikat gefunden wurde
         */
        isDuplicate(message) {
            if (!this.options.preventDuplicates) return false;
            const toasts = this.container.getElementsByClassName('custom-toast');
            for (let toast of toasts) {
                if (toast.querySelector('.toast-message') && toast.querySelector('.toast-message').innerHTML === message) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Erzeugt und zeigt einen neuen Toast
         * @param {string} type - Der Typ des Toasts ('success', 'error', 'info', 'warning')
         * @param {string} title - Der Titel des Toasts
         * @param {string} message - Die Nachricht oder HTML-Inhalt des Toasts
         */
        show(type, title = '', message = '') {
            if (this.isDuplicate(message)) return;
            console.log(`Showing ${type} title: ${title} toast: ${message}`);

            const toast = document.createElement('div');
            toast.classList.add('custom-toast', `custom-toast-${type}`, this.options.showMethod);

            toast.innerHTML = `
                ${this.options.closeButton ? '<button class="close-btn"><i class="bi bi-x no-grad"></i></button>' : ''}
                <div class="toast-icon">${this.getIcon(type)}</div>
                <div class="toast-body">
                    ${title ? `<strong class="toast-title">${title}</strong>` : ''}
                    <div class="toast-message">${message}</div>
                </div>
                ${this.options.progressBar ? '<div class="progress"></div>' : ''}
                <button class="pin-btn"><i class="bi bi-pin-angle-fill no-grad"></i></button>
            `;

            // Schließen-Button Event
            if (this.options.closeButton) {
                const closeBtn = toast.querySelector('.close-btn');
                closeBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.removeToast(toast)
                });
            }

            // Pin-Button Event
            const pinBtn = toast.querySelector('.pin-btn');
            pinBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Verhindert das Schließen des Toasts beim Klicken auf den Pin-Button
                this.pinToast(toast, pinBtn);
            });

            // Hinzufügen zum Container
            if (this.options.newestOnTop) {
                this.container.prepend(toast);
            } else {
                this.container.appendChild(toast);
            }

            // Progress Bar
            if (this.options.progressBar) {
                const progress = toast.querySelector('.progress');
                let width = 100;
                const intervalTime = 100; // ms
                const decrement = (intervalTime / this.options.timeOut) * 100;
                progress.style.width = '100%';

                const progressInterval = setInterval(() => {
                    if (toast.classList.contains('pinned')) {
                        clearInterval(progressInterval);
                        progress.style.width = '100%';
                        return;
                    }
                    width -= decrement;
                    if (width <= 0) {
                        clearInterval(progressInterval);
                        this.removeToast(toast);
                    }
                    progress.style.width = `${width}%`;
                }, intervalTime);

                // Pause bei Hover
                toast.addEventListener('mouseenter', () => {
                    clearInterval(progressInterval);
                });
                toast.addEventListener('mouseleave', () => {
                    if (toast.classList.contains('pinned')) return;
                    // Resume Progress
                    const remainingTime = this.options.extendedTimeOut;
                    const newDecrement = (intervalTime / remainingTime) * 100;
                    let newWidth = parseFloat(progress.style.width);

                    const newProgressInterval = setInterval(() => {
                        if (toast.classList.contains('pinned')) {
                            clearInterval(newProgressInterval);
                            return;
                        }
                        newWidth -= newDecrement;
                        if (newWidth <= 0) {
                            clearInterval(newProgressInterval);
                            this.removeToast(toast);
                        }
                        progress.style.width = `${newWidth}%`;
                    }, intervalTime);
                });
                // toast.addEventListener('click', () => {
                //     clearInterval(progressInterval);
                //     progress.style.width = '100%';
                // });
                toast.addEventListener('contextmenu', (event) => {
                    // if (toast.classList.contains('transparent-toast')) {
                    //     event.preventDefault();
                    //     this.removeToast(toast);
                    //     return false;
                    // }
                    // event.preventDefault();
                    // console.log("Vor Toast entfernt.");
                    // console.log(toast);
                    event.preventDefault();
                    this.removeToast(toast);
                    return false;
                    // console.log("Toast entfernt.");
                    // console.log(toast);
                    
                    
                });
                toast.addEventListener('click', (event) => {
                    // toast.style.opacity = (toast.style.opacity === '1') ? '0.7' : '1';
                    // toast.style.opacity = '0';


                    //! Clicking in toast
                    event.stopPropagation();
                    event.preventDefault();
                    // console.log("Toast angeklickt.");
                    // console.log(toast.classList.contains('pinned'));
                    // console.log(toast.classList.contains('transparent-toast'));
                    // console.log(toast.classList);
                    // console.log(type);

                    // console.log(toast);


                    // Wenn recht drann dann neu slide in right
                    // if (toast.classList.contains('slideInRight')) {
                    //     toast.classList.remove('slideInRight');
                    //     toast.classList.add('slideInRight');
                    // }

                    // if (!toast.classList.contains('pinned')) {
                    //     toast.classList.toggle('transparent-toast');
                    // }
                    console.log("\n\n\n\n\n\nToast angeklickt.");
                    console.log(toast);
                    // console.log(this.options.positionClass);
                    

                    if (this.options.positionClass === 'toast-top-right') {
                        console.log("yahhuuuu");
                        
                        if (toast.classList.contains('slideOutRight')) {
                            toast.classList.remove('slideOutRight');
                            toast.classList.add('slideInRight');
                            console.log('before slideOutRight');
                            console.log('now slideInRight');
                            
                        } 
                        // else if (!toast.classList.contains('slideOutRight') && !toast.classList.contains('slideInRight')) {
                        //     toast.classList.add('slideOutRight');
                        //     // toast.classList.add('slideOutRight');
                        // } 
                        else {
                            toast.classList.remove('slideInRight');
                            toast.classList.add('slideOutRight');
                            console.log('before slideInRight');
                            console.log('now slideOutRight');
                        }

                        toast.classList.toggle('custom-toast');
                        toast.classList.toggle('transparent-toast');

                        console.log("Toast NOCHMAL angeklickt.");
                    console.log(toast);
                    console.log('\n\n\n\n\n\n');
                    
                    }
                    // if (!toast.classList.contains('slideInRight')) {
                    //     toast.classList.add('slideInRight');
                    // }
                    // if (!toast.classList.contains('slideInRight')) {
                    // toast.classList.add('slideOutRight');
                    // }
                    // toast.classList.toggle(`custom-toast-${type}`);


                    // if (toast.classList.contains('pinned')) {
                    //     toast.classList.toggle('transparent-toast');
                    // }   




                });
            }

            // Tap to Dismiss
            // if (this.options.tapToDismiss) {
            //     toast.addEventListener('click', () => this.removeToast(toast));
            // }

            // onclick Callback
            if (typeof this.options.onclick === 'function') {
                toast.addEventListener('click', (e) => {
                    this.options.onclick(e);
                });
            }

            // Automatisches Entfernen nach timeOut
            if (!toast.classList.contains('pinned')) {
                toast.hideTimeout = setTimeout(() => {
                    this.removeToast(toast);
                }, this.options.timeOut);
            }
            console.log("Toast angezeigt.");
            console.log(toast);
        }

        /**
         * Entfernt einen Toast aus dem DOM
         * @param {HTMLElement} toast - Das Toast-Element
         */
        removeToast(toast) {
            if (!toast) return;

            if (this.options.positionClass === 'toast-top-right') {
                toast.classList.toggle('slideOutRight');
                // if (!toast.classList.contains('transparent-toast')) {
                //     toast.classList.add('transparent-toast');
                //     toast.classList.toggle('custom-toast');
                // }
                console.log("Toast entfernt.");
                console.log(toast);
                // if (toast.classList.contains('slideInRight')) {
                //     toast.classList.remove('slideInRight');
                // }
                // if (toast.classList.contains('slideOutRight')) {
                //     toast.classList.remove('slideOutRight');
                // }
                // if (toast.classList.contains('slideOutRightAway')) {
                //     toast.classList.remove('slideOutRightAway');
                // }

                // !slideOutRight
                if (!toast.classList.contains('slideOutRight')) {
                    toast.classList.add('slideOutRightAway');
                } else {
                    toast.click();
                }
                
            }

            // toast.classList.toggle('transparent-toast');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }

        /**
         * Gibt das entsprechende Icon basierend auf dem Toast-Typ zurück
         * @param {string} type - Der Typ des Toasts
         * @returns {string} - HTML für das Icon
         */
        getIcon(type) {
            switch (type) {
                case 'success':
                    return '<i class="bi bi-check-circle-fill no-grad"></i>';
                case 'error':
                    return '<i class="bi bi-x-circle-fill no-grad"></i>';
                case 'info':
                    return '<i class="bi bi-info-circle-fill no-grad"></i>';
                case 'warning':
                    return '<i class="bi bi-exclamation-circle-fill no-grad"></i>';
                default:
                    return '';
            }
        }

        /**
         * Pinned einen Toast, sodass er nicht automatisch entfernt wird
         * @param {HTMLElement} toast - Das Toast-Element
         * @param {HTMLElement} pinBtn - Das Pin-Button-Element
         */
        pinToast(toast, pinBtn) {
            if (!toast.classList.contains('pinned')) {
                toast.classList.add('pinned');
                pinBtn.innerHTML = '<i class="bi bi-pin-fill no-grad"></i>'; // Ändert das Icon zum gefüllten Pin
                clearTimeout(toast.hideTimeout); // Stoppt das automatische Entfernen
                console.log("Toast gepinnt.");
            } else {
                toast.classList.remove('pinned');
                pinBtn.innerHTML = '<i class="bi bi-pin-angle-fill no-grad"></i>'; // Ändert das Icon zum leeren Pin
                // Startet das automatische Entfernen erneut
                toast.hideTimeout = setTimeout(() => {
                    this.removeToast(toast);
                }, this.options.timeOut);
                console.log("Toast freigegeben.");
            }
        }
    }

    // Initialisierung des Toast-Objekts
    window.Toast = new Toast(toastrOptions);

    // Globale Funktion zur Modifizierung der Toast-Konfigurationen
    window.modifyToastrConfigs = function (newConfigs) {
        window.Toast.modifyConfigs(newConfigs);
    };

    // Beispiel: Initiale Toasts nach dem Laden anzeigen
    document.addEventListener('DOMContentLoaded', () => {
        window.Toast.show('success', 'Welcome!', 'Welcome to my portfolio page.');
        window.Toast.show('warning', 'Current development', 'It is still under development, not every styling, functionally and content has been added yet.<br>Feel free to contact me alfred.narjes@gmail.com.');
        window.Toast.show('info', 'Click me', 'I know you want it.');
        let pin = true;
        document.querySelectorAll('.custom-toast').forEach(toast => {

            // toast.classList.add('pinned');
            if (pin) {
                toast.classList.add('slideInRight')

                // toast.classList.toggle('custom-toast');
                // toast.classList.toggle('transparent-toast');
                toast.click();
                pin = false;
            }
            // click on .pin-btn child element of this toast
            toast.querySelector('.pin-btn').click();

        });
    });

})();
