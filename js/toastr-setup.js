
// Toastr-Konfiguration
const toastrOptions = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    // onclick: function() {
    //     // Überprüft, ob der Toast bereits gepinnt ist
    //     if (!this.classList.contains('pinned')) {
    //         // Pinnt den Toast
    //         this.classList.add('pinned');
    //         this.style.opacity = 1; // Stellt sicher, dass der Toast voll sichtbar bleibt
    //         toastr.clear(this, { force: false }); // Stoppt das automatische Verschwinden

    //         console.log("Toast gepinnt.");
    //     } else {
    //         // Entpinnt den Toast
    //         this.classList.remove('pinned');
    //         toastr.remove(this); // Entfernt den Toast komplett

    //         console.log("Toast freigegeben.");
    //     }
    // },
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '2000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    tapToDismiss: false,  // Verhindert das Schließen des Toasts durch einfaches Anklicken

};

toastr.options = toastrOptions;

window.modifyToastrConfigs = function ({
    closeButton = true,
    debug = false,
    newestOnTop = false,
    progressBar = true,
    positionClass = 'toast-top-right',
    preventDuplicates = false,
    onclick = null,
    showDuration = '300',
    hideDuration = '1000',
    timeOut = '5000',
    extendedTimeOut = '1000',
    showEasing = 'swing',
    hideEasing = 'linear',
    showMethod = 'fadeIn',
    hideMethod = 'fadeOut'
} = {}) {
    toastr.options = {
        closeButton,
        debug,
        newestOnTop,
        progressBar,
        positionClass,
        preventDuplicates,
        onclick,
        showDuration,
        hideDuration,
        timeOut,
        extendedTimeOut,
        showEasing,
        hideEasing,
        showMethod,
        hideMethod
    };
}



window.showToast = function (type, message = '', title = '') {
    // const messageWithPin = `<div>${message}<button onclick='window.pinToast(event, "${type}", this)' style='margin-left: 10px; background: none; border: none; color: white; cursor: pointer;'>Pin</button></div>`;
    toastr[type](message, title);
    // switch (type) {
    //     case 'success':
    //         toastr.success(messageWithPin, title);
    //         break;
    //     case 'info':
    //         toastr.info(message, title);
    //         break;
    //     case 'warning':
    //         toastr.warning(message, title);
    //         break;
    //     case 'error':
    //         toastr.error(messageWithPin, title);
    //         break;
    //     default:
    //         toastr.info(message, title);
    // }
}


// window.pinToast = function(event, type, buttonElement) {
//     // Stoppt das Bubbling des Events, damit der Toast nicht durch Klicken auf den Button geschlossen wird.
//     event.stopPropagation();

//     let toastElement = buttonElement.closest('.toast');
//     if (toastElement) {
//         let $toastElement = $(toastElement);

//         // Stoppt alle Animationen auf dem Toast, die ihn ausblenden könnten.
//         $toastElement.stop();

//         // Entfernen des automatischen Ausblendens.
//         toastr.remove($toastElement);

//         // Optionen nach dem Pin-Vorgang aktualisieren, um sicherzustellen, dass der Toast nicht ausgeblendet wird.
//         toastr.options.timeOut = 0;  // Kein automatisches Ausblenden
//         toastr.options.extendedTimeOut = 0;  // Kein automatisches Ausblenden nach der Interaktion
//         toastr.options.tapToDismiss = false;  // Deaktiviert das Schließen des Toasts beim Klicken

//         // Toast neu anzeigen mit den aktualisierten Optionen.
//         toastr[type](toastElement.innerHTML, { timeOut: 0, extendedTimeOut: 0, tapToDismiss: false });

//         // Aktualisiere den Text des Pin-Buttons und deaktiviere ihn.
//         $(buttonElement).text('Pinned').prop('disabled', true);

//         toastr.options.timeOut = 5000;  // Kein automatisches Ausblenden
//         toastr.options.extendedTimeOut = 1000;
//         console.log("Toast wurde erfolgreich gepinnt.");
//     }
// }


