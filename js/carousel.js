(function () {
    async function loadIconLists() {
        try {
            const response = await fetch('/data/iconLists.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Icon-Listen geladen:', data);
            return data;
        } catch (error) {
            console.error('Fehler beim Laden der Icon-Listen:', error);
            return null;
        }
    }

    async function initIconCarousel(listName) {
        const carousel = document.getElementById('iconCarousel');
        if (!carousel) {
            console.warn('Kein Element mit id "iconCarousel" gefunden.');
            return;
        }

        // Verhindere Mehrfachinitialisierungen
        if (carousel.dataset.initialized === 'true') return;
        carousel.dataset.initialized = 'true';

        // Lade die Icon-Listen
        const allIconLists = await loadIconLists();
        if (!allIconLists) {
            console.warn('Icon-Listen konnten nicht geladen werden.');
            return;
        }

        // Hole die entsprechende Icon-Liste
        const iconsList = allIconLists[listName];
        if (!iconsList || iconsList.length === 0) {
            console.warn(`Icon-Liste "${listName}" nicht gefunden oder leer.`);
            return;
        }

        // Erstelle oder leere den inneren Track
        let track = document.getElementById('carouselTrack');
        if (!track) {
            track = document.createElement('div');
            track.id = 'carouselTrack';
            carousel.appendChild(track);
        } else {
            track.innerHTML = '';
        }

        // Berechne Container-Breite und -Höhe
        const containerWidth = carousel.offsetWidth;
        const containerHeight = carousel.offsetHeight || 120; // Fallback auf 120px, falls undefined
        const minIconWidth = 240;  // Mindestbreite als Referenz
        const visibleCount = Math.floor(containerWidth / minIconWidth) || 1;
        const iconWidth = containerWidth / visibleCount;

        let currentIconIndex = 0;

        // Hilfsfunktion: Erzeugt einen Icon-Block bestehend aus Icon- und Label-Container.
        function createIconBlock(iconData) {
            const div = document.createElement('div');
            div.classList.add('icon-block');
            div.style.flex = `0 0 ${iconWidth}px`;
            div.style.width = `${iconWidth}px`;

            // --- Icon-Container ---
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('icon-container');
            iconContainer.style.width = "100%";

            const iconEl = document.createElement('i');
            iconEl.className = iconData.class;

            const totalPadding = 10; // z.B. 5px oben + 5px unten innerhalb des Blocks
            const labelHeightEstimate = 20; // Schätzung der Label-Höhe
            const availableIconHeight = containerHeight - totalPadding - labelHeightEstimate;
            iconEl.style.fontSize = `${availableIconHeight}px`;

            iconContainer.appendChild(iconEl);
            div.appendChild(iconContainer);

            // --- Label-Container ---
            const labelContainer = document.createElement('div');
            labelContainer.classList.add('label-container');

            const labelEl = document.createElement('p');
            labelEl.textContent = iconData.label;
            labelEl.classList.add('icon-label');
            labelContainer.appendChild(labelEl);
            div.appendChild(labelContainer);

            return div;
        }

        // Fülle den inneren Track initial mit "visibleCount" Icon-Blöcken
        track.innerHTML = '';
        for (let i = 0; i <= visibleCount; i++) {
            const iconData = iconsList[i % iconsList.length];
            track.appendChild(createIconBlock(iconData));
            currentIconIndex = i % iconsList.length;
        }

        // Variablen für das kontinuierliche Scrolling
        let scrollAmount = 0;
        const speed = 0.5;  // Pixel pro Frame
        let firstIconWidth = iconWidth;

        let animationFrameId;
        function animateScroll() {
            scrollAmount += speed;
            track.style.transform = `translateX(-${scrollAmount}px)`;

            if (scrollAmount >= firstIconWidth) {
                scrollAmount -= firstIconWidth;
                const firstBlock = track.firstElementChild;
                if (firstBlock) {
                    track.removeChild(firstBlock);
                }
                // Zyklisch: Füge ein neues Icon ans Ende hinzu
                currentIconIndex = (currentIconIndex + 1) % iconsList.length;
                const newIconData = iconsList[currentIconIndex];
                track.appendChild(createIconBlock(newIconData));
                track.style.transform = `translateX(-${scrollAmount}px)`;
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        }
        requestAnimationFrame(animateScroll);

        // Debounced Resize Handler
        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        const debouncedResizeHandler = debounce(async () => {
            cancelAnimationFrame(animationFrameId);
            carousel.dataset.initialized = 'false';
            await initIconCarousel(listName);
        }, 200); 
        
        window.addEventListener('resize', debouncedResizeHandler);
    }

    window.initIconCarousel = initIconCarousel;

    // Initialisierung bei DOMContentLoaded (für den initialen Seitenaufruf)
    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.getElementById('iconCarousel');
        if (carousel) {
            const listName = carousel.dataset.iconList;
            if (listName && typeof initIconCarousel === 'function') {
                initIconCarousel(listName);
            }
        }
    });
})();
