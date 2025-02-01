// class ModSpinner extends HTMLElement {
//     constructor() {
//       super();
//       // Shadow DOM kapselt die interne Struktur und das Styling
//       this.attachShadow({ mode: 'open' });
//     }

//     connectedCallback() {
//       this.render();
//     }

//     render() {
//       // Bestehenden Inhalt im Shadow Root löschen
//       this.shadowRoot.innerHTML = '';

//       // Attribute auslesen
//       const color = this.getAttribute('data-spinner-color');
//       const gradient = this.getAttribute('data-spinner-gradient');

//       // Style-Block erstellen
//       const style = document.createElement('style');
//       style.textContent = `
//         :host {
//           display: inline-block;
//           width: 50px;
//           height: 50px;
//         }
//         .spinner {
//           box-sizing: border-box;
//           width: 100%;
//           height: 100%;
//           border: 5px solid transparent;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `;

//       // Anpassen der Spinner-Farbe:
//       if (gradient) {
//         // Bei Angabe eines Gradients: 
//         // – Zerlege den String in einzelne Farben
//         // – Nutze diese im conic-gradient für den border-image
//         const colors = gradient.split(',').map(c => c.trim()).join(', ');
//         style.textContent += `
//           .spinner {
//             /* Border wird über einen Farbverlauf realisiert */
//             border: 5px solid transparent;
//             border-image: conic-gradient(${colors}) 1;
//           }
//         `;
//       } else if (color) {
//         // Wenn ein Farbname angegeben wurde, wird die CSS-Variable verwendet.
//         style.textContent += `
//           .spinner {
//             border-top-color: var(--${color}, #000);
//           }
//         `;
//       } else {
//         // Fallback, falls keine Farbe angegeben wurde
//         style.textContent += `
//           .spinner {
//             border-top-color: #000;
//           }
//         `;
//       }

//       // Erstelle das eigentliche Spinner-Element
//       const spinner = document.createElement('div');
//       spinner.classList.add('spinner');

//       // Füge den Style und das Spinner-Element in das Shadow DOM ein
//       this.shadowRoot.appendChild(style);
//       this.shadowRoot.appendChild(spinner);
//     }
//   }

//   // Registriere die Custom Element
//   customElements.define('mod-spinner', ModSpinner);


// class ModSpinner extends HTMLElement {
//   // Hier werden die zu beobachtenden Attribute definiert
//   static get observedAttributes() {
//     return ['flare-spinner-color'];
//   }

//   constructor() {
//     super();
//     // Shadow DOM kapselt die interne Struktur und das Styling
//     this.attachShadow({ mode: 'open' });
//   }

//   connectedCallback() {
//     this.render();
//   }

//   // Wird aufgerufen, wenn sich ein beobachtetes Attribut ändert
//   attributeChangedCallback(name, oldValue, newValue) {
//     if (name === 'flare-spinner-color' && oldValue !== newValue) {
//       this.render();
//     }
//     if (name === 'flare-spinner-gradient' && oldValue !== newValue) {
//       this.render();
//     }
//   }

//   render() {
//     // Bestehenden Inhalt im Shadow Root leeren
//     this.shadowRoot.innerHTML = '';

//     // Attribute auslesen
//     const color = this.getAttribute('flare-spinner-color') || '#007bff';
//     const gradient = this.getAttribute('flare-spinner-gradient') || '##667eea, #764ba2, #6b8dd6, #8e37d7';

//     // Style-Block erstellen
//     const style = document.createElement('style');

//     // Gemeinsame Animation (Rotation)
//     style.textContent = `
//       @keyframes spin {
//         to { transform: rotate(360deg); }
//       }
//     `;

//     if (gradient) {
//       /* 
//         Für den Gradient-Spinner:
//         - Wir verwenden einen conic-gradient als Hintergrund.
//         - Der Verlauf startet bei -90° (oben) und zeigt einen farbigen Bogen von 90°,
//           danach wechselt er zu Dunkelgrau (hier: "darkgrey") bis 360°.
//         - Die Maskierung mittels radial-gradient sorgt dafür, dass nur
//           ein Ring (ca. 5px dick) sichtbar ist.
//       */
//       const colors = gradient.split(',').map(c => c.trim());
//       const arcAngle = 90; // Farbbogen: 90° (kann auch angepasst werden)
//       let stops = [];
//       if (colors.length === 1) {
//         // Falls nur eine Farbe angegeben wird, nutze sie für den gesamten Bogen
//         stops.push(`${colors[0]} 0deg`, `${colors[0]} ${arcAngle}deg`);
//       } else {
//         // Gleichmäßige Verteilung der Farben im Bogen von 0° bis arcAngle
//         const step = arcAngle / (colors.length - 1);
//         colors.forEach((col, i) => {
//           const angle = i * step;
//           stops.push(`${col} ${angle}deg`);
//         });
//       }
//       const gradientStops = stops.join(', ');
//       // Zusammensetzen des kompletten conic-gradient
//       const backgroundGradient = `conic-gradient(from -90deg, ${gradientStops}, darkgrey ${arcAngle}deg, darkgrey 360deg)`;

//       style.textContent += `
//         .spinner {
//           width: 50px;
//           height: 50px;
//           border-radius: 50%;
//           background: ${backgroundGradient};
//           animation: spin 1s linear infinite;
//           /* Maskierung: Nur der äußere Ring (ca. 5px dick) wird sichtbar.
//              Hier errechnet sich die innere Kreisgröße: 50px/2 = 25px 
//              Außenradius, 25px - 5px = 20px → 20/25 = 80% */
//           -webkit-mask: radial-gradient(closest-side, transparent 80%, black 80%);
//           mask: radial-gradient(closest-side, transparent 80%, black 80%);
//         }
//       `;
//     } else if (color) {
//       /* 
//         Spinner mit fester Farbe (ähnlich wie Bootstrap):
//         Es wird ein Ring gezeichnet, bei dem nur der obere Teil (border-top)
//         die angegebene Farbe (via CSS-Variable) hat, der Rest ist transparent.
//       */
//       style.textContent += `
//         .spinner {
//           width: 50px;
//           height: 50px;
//           border: 5px solid grey;
//           border-radius: 50%;
//           border-top-color: var(--${color}, #000);
//           animation: spin 1s linear infinite;
//         }
//       `;
//     } else {
//       // Fallback: Falls kein Attribut angegeben wurde
//       style.textContent += `
//         .spinner {
//           width: 50px;
//           height: 50px;
//           border: 5px solid grey;
//           border-radius: 50%;
//           border-top-color: #000;
//           animation: spin 1s linear infinite;
//         }
//       `;
//     }

//     // Erstelle das eigentliche Spinner-Element
//     const spinner = document.createElement('div');
//     spinner.classList.add('spinner');

//     // Füge den Style und das Spinner-Element in das Shadow DOM ein
//     this.shadowRoot.appendChild(style);
//     this.shadowRoot.appendChild(spinner);
//   }
// }

// // Registriere die Custom Element
// customElements.define('mod-spinner', ModSpinner);




class ModSpinner extends HTMLElement {
  // Beobachte beide Attribute, damit Änderungen registriert werden
  static get observedAttributes() {
    return ['flare-spinner-color', 'flare-spinner-gradient'];
  }

  constructor() {
    super();
    // Shadow DOM kapselt die interne Struktur und das Styling
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Bestehenden Inhalt im Shadow Root leeren
    this.shadowRoot.innerHTML = '';

    // Attribute auslesen – **ohne** Fallback für den Gradient
    const color = this.getAttribute('flare-spinner-color');
    const gradient = this.getAttribute('flare-spinner-gradient');

    // Style-Block erstellen
    const style = document.createElement('style');

    // Gemeinsame Animation (Rotation)
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;

    if (gradient) {
      /* 
        Für den Gradient-Spinner:
        - Wir verwenden einen conic-gradient als Hintergrund.
        - Der Verlauf startet bei -90° (oben) und zeigt einen farbigen Bogen von 90°,
          danach wechselt er zu Dunkelgrau (hier: "darkgrey") bis 360°.
        - Die Maskierung mittels radial-gradient sorgt dafür, dass nur
          ein Ring (ca. 5px dick) sichtbar ist.
      */
      const colors = gradient.split(',').map(c => c.trim());
      const arcAngle = 90; // Farbbogen: 90° (anpassbar)
      let stops = [];
      if (colors.length === 1) {
        // Falls nur eine Farbe angegeben wird, nutze sie für den gesamten Bogen
        stops.push(`${colors[0]} 0deg`, `${colors[0]} ${arcAngle}deg`);
      } else {
        // Gleichmäßige Verteilung der Farben im Bogen von 0° bis arcAngle
        const step = arcAngle / (colors.length - 1);
        colors.forEach((col, i) => {
          const angle = i * step;
          stops.push(`${col} ${angle}deg`);
        });
      }
      const gradientStops = stops.join(', ');
      // Zusammensetzen des kompletten conic-gradient
      const backgroundGradient = `conic-gradient(from -90deg, ${gradientStops}, darkgrey ${arcAngle}deg, darkgrey 360deg)`;

      style.textContent += `
        .spinner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: ${backgroundGradient};
          animation: spin 1s linear infinite;
          /* Maskierung: Nur der äußere Ring (ca. 5px dick) wird sichtbar */
          -webkit-mask: radial-gradient(closest-side, transparent 80%, black 80%);
          mask: radial-gradient(closest-side, transparent 80%, black 80%);
        }
      `;
    } else if (color) {
      /* 
        Spinner mit fester Farbe (ähnlich wie Bootstrap):
        Es wird ein Ring gezeichnet, bei dem nur der obere Teil (border-top)
        die angegebene Farbe (via CSS-Variable) hat, der Rest ist transparent.
      */
      style.textContent += `
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid grey;
          border-radius: 50%;
          border-top-color: var(--${color}, #000);
          animation: spin 1s linear infinite;
        }
      `;
    } else {
      // Fallback: Falls kein Attribut angegeben wurde
      style.textContent += `
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid grey;
          border-radius: 50%;
          border-top-color: #000;
          animation: spin 1s linear infinite;
        }
      `;
    }

    // Erstelle das eigentliche Spinner-Element
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    // Füge den Style und das Spinner-Element in das Shadow DOM ein
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(spinner);
  }
}

// Registriere das Custom Element
customElements.define('mod-spinner', ModSpinner);
