document.addEventListener("DOMContentLoaded", function () {
    // Beim Laden: Zeige das Modal, wenn noch kein Consent vorhanden ist
    if (sessionStorage.getItem('privacyConsent') !== 'true') {
        showPrivacyModal(false);
    }

    // MutationObserver: Beobachtet, ob das Modal entfernt wird.
    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            mutation.removedNodes.forEach((removedNode) => {
                if (removedNode.id === "privacyModal") {
                    // Falls das Modal gelöscht wurde und noch kein Consent vorliegt,
                    // zeige zusätzlich einen Error-Alert (falls gewünscht) und erstelle das Modal neu.
                    if (sessionStorage.getItem('privacyConsent') !== 'true') {
                        // showErrorAlert();
                        showPrivacyModal(true);
                    } else {
                        console.log('Privacy Modal wurde gelöscht, aber Consent liegt vor.');

                        buildPrivacyModal();

                    }
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback: Überprüfe alle 5s, ob das Modal existiert, und falls nicht und Consent fehlt, erstelle es neu.
    setInterval(function () {
        if (sessionStorage.getItem('privacyConsent') !== 'true' && !document.getElementById('privacyModal')) {
            showPrivacyModal(true);
        }
        if (!document.getElementById('privacyModal')) {
            console.log('Privacy Modal existiert nicht, wird neu erstellt.');

            buildPrivacyModal();
        }
    }, 5000);
});

// Hilfsfunktionen zum Parsen und Vergleichen von DOM-Inhalten (falls benötigt)
function parseHTML(htmlString) {
    const parser = new DOMParser();
    return parser.parseFromString(htmlString, "text/html").body;
}

function compareDOM(element1, element2) {
    return element1.innerHTML.trim() === element2.innerHTML.trim();
}

// Funktion zum Anzeigen/Erstellen des Privacy Modals
function showPrivacyModal(showAlert = false, btnClick = true) {
    // Suche nach dem Modal-Element
    let modal = document.getElementById('privacyModal');
    // Erzeuge den HTML-Code als Template-String

    const modalHTML = createPrivacyModal(showAlert);

    // Wenn ein Modal bereits existiert, vergleichen wir den bestehenden mit dem neuen
    if (modal) {
        if (!compareDOM(parseHTML(modal), parseHTML(modalHTML))) {
            modal.remove();
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    } else {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('privacyModal');
    }

    // Falls der Button zum Öffnen des Modals fehlt, füge einen Fallback ein
    let btn = document.querySelector('[data-modal="privacyModal"]');
    if (!btn) {
        let container = document.querySelector('#privacyModalContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'privacyModalContainer';
            document.body.appendChild(container);
        }
        container.insertAdjacentHTML('beforeend', `<a data-tooltip="Privacy" class="btn modal-trigger" data-modal="privacyModal"><i class="bi bi-shield-shaded"></i></a>`);
        btn = document.querySelector('[data-modal="privacyModal"]');
    }

    // Falls btnClick true ist, simuliere einen Klick, um das Modal zu öffnen
    if (btnClick) {
        btn.click();
    }
}

function createPrivacyModal(showAlertParam = false) {
    return `
<div id="privacyModal" class="custom-modal" data-animation-in="animate-bounceIn"
   data-animation-out="animate-fadeOut" data-close-on-overlay="false" aria-hidden="true" role="dialog"
   aria-labelledby="modal-title-privacy" x-data="{
        showAlert: ${showAlertParam},
        sections: {
         introduction: false,
         responsibleParty: false,
         dataCollection: false,
         noPersonalData: false,
         deleteData: false,
         userRights: false,
         changes: false,
         contact: false
       },
       consent: false,
       granularConsent: sessionStorage.getItem('granularConsent') === 'true',
       sessionStorageVar: 'privacyConsent',
       init() {
         this.consent = sessionStorage.getItem(this.sessionStorageVar) === 'true';
         console.log('consent', this.consent);
         if (!this.consent) {
           Modal.open('privacyModal');
         }
       },
       toggleSection(section) {
         this.sections[section] = !this.sections[section];
       },
       isSectionOpen(section) {
         return this.sections[section];
       },
       accept() {
         sessionStorage.setItem(this.sessionStorageVar, 'true');
         Modal.close(document.getElementById('privacyModal'));
       },
       handleOverlayClick(event) {
         const modal = document.getElementById('privacyModal');
         this.consent = sessionStorage.getItem(this.sessionStorageVar) === 'true';
         modal.setAttribute('data-close-on-overlay', this.consent ? 'true' : 'false');
       },
       handleEscape(event) {
         this.consent = sessionStorage.getItem(this.sessionStorageVar) === 'true';
         if (this.consent) {
           Modal.close(document.getElementById('privacyModal'));
         }
       },
       updateGranularConsent() {
         sessionStorage.setItem('granularConsent', this.granularConsent ? 'true' : 'false');
         if (window.gtag) {
           window.gtag('consent', 'update', {
             'analytics_storage': this.granularConsent ? 'granted' : 'denied'
           });
         }
       }
   }" x-init="init()">
<div class="custom-modal-content" style="max-height: 90vh; overflow-y: auto;"
     :style="{'max-width': (globalScreenWidth < 689) ? '95%' : '60%'}"
     @click.away="handleOverlayClick($event)" @keydown.escape.window="handleEscape($event)">
  <h2 id="modal-title-privacy" class="mb-4 text-xl font-semibold" x-html="pageLang.privacyModal.header"></h2>
  <div x-show="showAlert" @click="showAlert = !showAlert; let count = 6; setInterval(() => {if (count > 0) {document.getElementById('consentPrivacyPolicy').classList.toggle('blink'); count--;} else {return;}}, 600)" class="error-alert">You attempted to delete the modal!</div>
  <div class="space-y-4">
    <!-- Hier folgen alle Accordion-Abschnitte -->
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('introduction')">
        <span x-html="pageLang.privacyModal.sections.introduction.title"></span>
      </p>
      <div x-show="isSectionOpen('introduction')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.introduction.content"></p>
      </div>
    </div>
    <!-- Weitere Abschnitte (responsibleParty, dataCollection, noPersonalData, deleteData, userRights, changes, contact) -->
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('responsibleParty')">
        <span x-html="pageLang.privacyModal.sections.responsibleParty.title"></span>
      </p>
      <div x-show="isSectionOpen('responsibleParty')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.responsibleParty.content"></p>
      </div>
    </div>
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('dataCollection')">
        <span x-html="pageLang.privacyModal.sections.dataCollection.title"></span>
      </p>
      <div x-show="isSectionOpen('dataCollection')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.dataCollection.content"></p>
      </div>
    </div>
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('noPersonalData')">
        <span x-html="pageLang.privacyModal.sections.noPersonalData.title"></span>
      </p>
      <div x-show="isSectionOpen('noPersonalData')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.noPersonalData.content"></p>
      </div>
    </div>
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('deleteData')">
        <span x-html="pageLang.privacyModal.sections.deleteData.title"></span>
      </p>
      <div x-show="isSectionOpen('deleteData')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.deleteData.content"></p>
      </div>
    </div>
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('userRights')">
        <span x-html="pageLang.privacyModal.sections.userRights.title"></span>
      </p>
      <div x-show="isSectionOpen('userRights')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.userRights.content"></p>
      </div>
    </div>
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('changes')">
        <span x-html="pageLang.privacyModal.sections.changes.title"></span>
      </p>
      <div x-show="isSectionOpen('changes')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.changes.content"></p>
      </div>
    </div>
    <div>
      <p class="mt-1 accordion-button cursor-pointer" :class="{'fs-small': globalScreenWidth < 689}"
         @click="toggleSection('contact')">
        <span x-html="pageLang.privacyModal.sections.contact.title"></span>
      </p>
      <div x-show="isSectionOpen('contact')" class="accordion-content" x-cloak>
        <p x-html="pageLang.privacyModal.sections.contact.content"></p>
      </div>
    </div>
  </div>
  <div>
    <label for="granularConsentToggle" class="toggle-label" style="cursor: pointer; display: inline-flex; align-items: center;">
      <input id="granularConsentToggle" type="checkbox" x-model="granularConsent" @change="updateGranularConsent()" style="display: none;">
      <span class="bi bi-grad toggle-icon" :class="{' bi-toggle-on': granularConsent, 'bi-toggle-off': !granularConsent}" style="font-size: 2rem;"></span>
      <span style="margin-left: 0.5rem;" x-text="granularConsent ? 'Granular data collection enabled' : 'Granular data collection disabled'"></span>
    </label>
  </div>
  <div class="mt-6 text-right">
    <a id="consentPrivacyPolicy" @click="accept()" :class="{'fs-small': globalScreenWidth < 689}" class="px-4 py-2 btn btn-success" x-html="pageLang.privacyModal.acceptButton"></a>
  </div>
</div>
</div>
`;
}

function buildPrivacyModal() {
    document.body.insertAdjacentHTML('beforeend', createPrivacyModal());
};

if (!document.getElementById('privacyModal')) {
    buildPrivacyModal();
}