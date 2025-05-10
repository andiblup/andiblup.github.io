// document.addEventListener('DOMContentLoaded', function () {
//     const tooltip = document.getElementById('tooltip');

//     // Funktion zum Positionieren des Tooltips
//     function positionTooltip(target, text) {
//         // Setze den Tooltip-Text
//         tooltip.textContent = text;

//         // Entferne vorherige Klassen
//         tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');

//         // Füge colorize-Klasse hinzu, wenn colorize=true ist
//         const isColorize = document.documentElement.dataset.colorize === 'true';
//         if (isColorize) {
//             tooltip.classList.add('colorize');
//         }

//         // Positioniere den Tooltip offscreen, um die Größe zu berechnen
//         tooltip.style.top = '0px';
//         tooltip.style.left = '0px';
//         tooltip.style.display = 'block';

//         const targetRect = target.getBoundingClientRect();
//         const tooltipRect = tooltip.getBoundingClientRect();
//         const windowWidth = window.innerWidth;
//         const windowHeight = window.innerHeight;

//         // Standardposition ist oben
//         let top = targetRect.top - tooltipRect.height - 8; // 8px Abstand
//         let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
//         let position = 'top';

//         // Prüfe, ob genug Platz oben ist
//         if (top < 0) {
//             // Positioniere unten
//             top = targetRect.bottom + 8; // 8px Abstand
//             position = 'bottom';
//         }

//         // Prüfe, ob Tooltip über den Bildschirm hinausragt und passe die Position an
//         if (left < 8) { // Mindestens 8px Abstand vom linken Rand
//             left = 8;
//         } else if (left + tooltipRect.width > windowWidth - 8) { // Mindestens 8px Abstand vom rechten Rand
//             left = windowWidth - tooltipRect.width - 8;
//         }

//         // Setze die Position
//         tooltip.style.top = `${top + window.scrollY}px`;
//         tooltip.style.left = `${left + window.scrollX}px`;

//         // Füge die Positionierungs-Klasse hinzu
//         tooltip.classList.add(position);

//         // Sichtbar machen
//         requestAnimationFrame(() => {
//             tooltip.classList.add('visible');
//         });
//     }

//     // Funktion zum Verstecken des Tooltips
//     function hideTooltip() {
//         tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');
//     }

//     // Event Listener hinzufügen zu allen Elementen mit data-tooltip
//     document.querySelectorAll('[data-tooltip]').forEach(element => {
//         element.addEventListener('mouseenter', function () {
//             const text = this.getAttribute('data-tooltip');
//             positionTooltip(this, text);
//         });

//         element.addEventListener('mouseleave', hideTooltip);
//         element.addEventListener('scroll', hideTooltip, true); // Verstecke Tooltip beim Scrollen
//     });

//     // Optional: Verstecke Tooltip beim Scrollen der Seite
//     window.addEventListener('scroll', hideTooltip);
//     window.addEventListener('resize', hideTooltip);
// });

// ! OLD STABLE IN INDEX
// document.addEventListener('DOMContentLoaded', function () {
//     const tooltip = document.getElementById('tooltip');
//     const tooltipContent = tooltip.querySelector('.tooltip-content');

//     // Funktion zum Positionieren des Tooltips
//     function positionTooltip(target, text) {
//         // Setze den Tooltip-Text
//         tooltipContent.textContent = text;



//         // Entferne vorherige Klassen
//         tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');

//         // Positioniere den Tooltip offscreen, um die Größe zu berechnen
//         tooltip.style.display = 'block';
//         tooltip.style.top = '0px';
//         tooltip.style.left = '0px';

//         const targetRect = target.getBoundingClientRect();
//         const contentRect = tooltipContent.getBoundingClientRect();
//         const windowWidth = window.innerWidth;
//         const windowHeight = window.innerHeight;

//         // Standardposition ist oben
//         let top = targetRect.top - contentRect.height - 16; // 8px Abstand + 8px Rahmen
//         let left = targetRect.left + (targetRect.width / 2) - (contentRect.width / 2);
//         let position = 'top';

//         // Prüfe, ob genug Platz oben ist
//         if (top < 0) {
//             // Positioniere unten
//             top = targetRect.bottom + 8; // 8px Abstand
//             position = 'bottom';
//         }

//         // Prüfe, ob Tooltip über den Bildschirm hinausragt und passe die Position an
//         if (left < 8) { // Mindestens 8px Abstand vom linken Rand
//             left = 8;
//         } else if (left + contentRect.width > windowWidth - 8) { // Mindestens 8px Abstand vom rechten Rand
//             left = windowWidth - contentRect.width - 8;
//         }

//         // Setze die Position
//         tooltip.style.top = `${top + window.scrollY}px`;
//         tooltip.style.left = `${left + window.scrollX}px`;

//         // Füge die Positionierungs-Klasse hinzu
//         tooltip.classList.add(position);
//         const isColorize = document.documentElement.dataset.colorize === 'true';
//         if (isColorize) {
//             tooltip.classList.add('colorize');
//         }

//         // Sichtbar machen
//         requestAnimationFrame(() => {
//             tooltip.classList.add('visible');
//         });
//     }

//     // Funktion zum Verstecken des Tooltips
//     function hideTooltip() {
//         tooltip.classList.remove('visible', 'top', 'bottom');
//     }

//     // Event Listener hinzufügen zu allen Elementen mit data-tooltip
//     document.querySelectorAll('[data-tooltip]').forEach(element => {
//         element.addEventListener('mouseenter', function () {
//             const text = this.getAttribute('data-tooltip');
//             positionTooltip(this, text);
//         });

//         element.addEventListener('mouseleave', hideTooltip);
//         element.addEventListener('scroll', hideTooltip, true); // Verstecke Tooltip beim Scrollen
//     });

//     // Optional: Verstecke Tooltip beim Scrollen der Seite
//     window.addEventListener('scroll', hideTooltip);
//     window.addEventListener('resize', hideTooltip);
// });


// window.initTooltips = () => {
//     document.querySelectorAll('[data-tooltip]').forEach(element => {

//         const tooltip = document.getElementById('tooltip');
//         const tooltipContent = tooltip.querySelector('.tooltip-content');

//         // Funktion zum Positionieren des Tooltips
//         function positionTooltip(target, text) {
//             // Setze den Tooltip-Text
//             tooltipContent.textContent = text;



//             // Entferne vorherige Klassen
//             tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');

//             // Positioniere den Tooltip offscreen, um die Größe zu berechnen
//             tooltip.style.display = 'block';
//             tooltip.style.top = '0px';
//             tooltip.style.left = '0px';

//             const targetRect = target.getBoundingClientRect();
//             const contentRect = tooltipContent.getBoundingClientRect();
//             const windowWidth = window.innerWidth;
//             const windowHeight = window.innerHeight;

//             // Standardposition ist oben
//             let top = targetRect.top - contentRect.height - 16; // 8px Abstand + 8px Rahmen
//             let left = targetRect.left + (targetRect.width / 2) - (contentRect.width / 2);
//             let position = 'top';

//             // Prüfe, ob genug Platz oben ist
//             if (top < 0) {
//                 // Positioniere unten
//                 top = targetRect.bottom + 8; // 8px Abstand
//                 position = 'bottom';
//             }

//             // Prüfe, ob Tooltip über den Bildschirm hinausragt und passe die Position an
//             if (left < 8) { // Mindestens 8px Abstand vom linken Rand
//                 left = 8;
//             } else if (left + contentRect.width > windowWidth - 8) { // Mindestens 8px Abstand vom rechten Rand
//                 left = windowWidth - contentRect.width - 8;
//             }

//             // Setze die Position
//             tooltip.style.top = `${top + window.scrollY}px`;
//             tooltip.style.left = `${left + window.scrollX}px`;

//             // Füge die Positionierungs-Klasse hinzu
//             tooltip.classList.add(position);
//             const isColorize = document.documentElement.dataset.colorize === 'true';
//             if (isColorize) {
//                 tooltip.classList.add('colorize');
//             }

//             // Sichtbar machen
//             requestAnimationFrame(() => {
//                 tooltip.classList.add('visible');
//             });
//         }

//         // Funktion zum Verstecken des Tooltips
//         function hideTooltip() {
//             tooltip.classList.remove('visible', 'top', 'bottom');
//         }

//         // Event Listener hinzufügen zu allen Elementen mit data-tooltip
//         document.querySelectorAll('[data-tooltip]').forEach(element => {
//             element.addEventListener('mouseenter', function () {
//                 const text = this.getAttribute('data-tooltip');
//                 positionTooltip(this, text);
//             });

//             element.addEventListener('mouseleave', hideTooltip);
//             element.addEventListener('scroll', hideTooltip, true); // Verstecke Tooltip beim Scrollen
//         });

//         // Optional: Verstecke Tooltip beim Scrollen der Seite
//         window.addEventListener('scroll', hideTooltip);
//         window.addEventListener('resize', hideTooltip);

//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    // Tooltip-Element außerhalb des #app-Containers
    const tooltip = document.getElementById('tooltip');
    const tooltipContent = tooltip.querySelector('.tooltip-content');
  
    // Positionierungs-Funktion
    function positionTooltip(target, text) {
      tooltipContent.textContent = text;
      tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');
  
      // Vorbereitungen für Messung
      tooltip.style.display = 'block';
      tooltip.style.top = '0';
      tooltip.style.left = '0';
  
      const targetRect = target.getBoundingClientRect();
      const contentRect = tooltipContent.getBoundingClientRect();
      const winW = window.innerWidth;
  
      // Standard oben
      let top = targetRect.top - contentRect.height - 16;
      let left = targetRect.left + targetRect.width/2 - contentRect.width/2;
      let pos = 'top';
  
      // Unten, wenn oben nicht passt
      if (top < 8) {
        top = targetRect.bottom + 8;
        pos = 'bottom';
      }
      // Horizontaler Randabgleich
      left = Math.max(8, Math.min(left, winW - contentRect.width - 8));
  
      tooltip.style.top = `${top + window.scrollY}px`;
      tooltip.style.left = `${left + window.scrollX}px`;
      tooltip.classList.add(pos);
  
      if (document.documentElement.dataset.colorize === 'true') {
        tooltip.classList.add('colorize');
      }
  
      requestAnimationFrame(() => tooltip.classList.add('visible'));
    }
  
    // Verstecken
    function hideTooltip() {
      tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');
    }
  
    // Event-Delegation für alle data-tooltip-Elemente
    document.body.addEventListener('pointerover', e => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        positionTooltip(target, target.getAttribute('data-tooltip'));
      }
    });
    document.body.addEventListener('pointerout', e => {
      if (e.target.closest('[data-tooltip]')) {
        hideTooltip();
      }
    });
  
    // Tooltip verstecken bei Scroll/Resize
    window.addEventListener('scroll', hideTooltip);
    window.addEventListener('resize', hideTooltip);
  });
  

