document.addEventListener('DOMContentLoaded', function () {
    const tooltip = document.getElementById('tooltip');

    // Funktion zum Positionieren des Tooltips
    function positionTooltip(target, text) {
        // Setze den Tooltip-Text
        tooltip.textContent = text;

        // Entferne vorherige Klassen
        tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');

        // Füge colorize-Klasse hinzu, wenn colorize=true ist
        const isColorize = document.documentElement.dataset.colorize === 'true';
        if (isColorize) {
            tooltip.classList.add('colorize');
        }

        // Positioniere den Tooltip offscreen, um die Größe zu berechnen
        tooltip.style.top = '0px';
        tooltip.style.left = '0px';
        tooltip.style.display = 'block';

        const targetRect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Standardposition ist oben
        let top = targetRect.top - tooltipRect.height - 8; // 8px Abstand
        let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        let position = 'top';

        // Prüfe, ob genug Platz oben ist
        if (top < 0) {
            // Positioniere unten
            top = targetRect.bottom + 8; // 8px Abstand
            position = 'bottom';
        }

        // Prüfe, ob Tooltip über den Bildschirm hinausragt und passe die Position an
        if (left < 8) { // Mindestens 8px Abstand vom linken Rand
            left = 8;
        } else if (left + tooltipRect.width > windowWidth - 8) { // Mindestens 8px Abstand vom rechten Rand
            left = windowWidth - tooltipRect.width - 8;
        }

        // Setze die Position
        tooltip.style.top = `${top + window.scrollY}px`;
        tooltip.style.left = `${left + window.scrollX}px`;

        // Füge die Positionierungs-Klasse hinzu
        tooltip.classList.add(position);

        // Sichtbar machen
        requestAnimationFrame(() => {
            tooltip.classList.add('visible');
        });
    }

    // Funktion zum Verstecken des Tooltips
    function hideTooltip() {
        tooltip.classList.remove('visible', 'top', 'bottom', 'colorize');
    }

    // Event Listener hinzufügen zu allen Elementen mit data-tooltip
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function () {
            const text = this.getAttribute('data-tooltip');
            positionTooltip(this, text);
        });

        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('scroll', hideTooltip, true); // Verstecke Tooltip beim Scrollen
    });

    // Optional: Verstecke Tooltip beim Scrollen der Seite
    window.addEventListener('scroll', hideTooltip);
    window.addEventListener('resize', hideTooltip);
});