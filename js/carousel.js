(function () {
    function initIconCarousel() {
      const carousel = document.getElementById('iconCarousel');
      if (!carousel) {
        console.warn('Kein Element mit id "iconCarousel" gefunden.');
        return;
      }
      
      // Verhindere Mehrfachinitialisierungen (z.B. bei erneutem Routing)
      if (carousel.dataset.initialized === 'true') return;
      carousel.dataset.initialized = 'true';
      
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
      const containerHeight = carousel.offsetHeight; // z.B. 120px
      const minIconWidth = 240;  // Mindestbreite als Referenz
      const visibleCount = Math.floor(containerWidth / minIconWidth) || 1;
      const iconWidth = containerWidth / visibleCount;
    
      // Array der Icons
      const iconsList = [
        { class: 'devicon-bootstrap-plain', label: 'Bootstrap' },
        { class: 'devicon-sass-original', label: 'SASS' },
        { class: 'devicon-javascript-plain', label: 'JS' },
        { class: 'devicon-axios-plain', label: 'Axios' },
        { class: 'devicon-alpinejs-original', label: 'Alpine.js' },
        { class: 'devicon-vuejs-plain', label: 'Vue.js' },
        { class: 'devicon-nuxtjs-plain', label: 'Nuxt.js' },
        { class: 'devicon-vuetify-plain', label: 'Vuetify' },
        { class: 'devicon-vitejs-plain', label: 'Vitejs' },
        { class: 'devicon-php-plain', label: 'PHP' },
        { class: 'devicon-laravel-plain', label: 'Laravel' },
        { class: 'devicon-java-plain', label: 'Java' },
        { class: 'devicon-maven-plain', label: 'Maven' },
        { class: 'devicon-hibernate-plain', label: 'Hibernate' },
        { class: 'devicon-spring-original', label: 'Spring' },
        { class: 'devicon-kotlin-plain', label: 'Kotlin' },
        { class: 'devicon-jetpackcompose-plain', label: 'Android Jetpack Compose' },
        { class: 'devicon-dart-plain', label: 'Dart' },
        { class: 'devicon-flutter-plain', label: 'Flutter' },
        { class: 'devicon-postgresql-plain', label: 'Postgre' },
        { class: 'devicon-mariadb-original', label: 'MariaDB' },
        { class: 'devicon-sqlite-plain', label: 'SQLite' },
        { class: 'devicon-yaml-plain', label: 'Yaml' },
        { class: 'devicon-groovy-plain', label: 'Groovy' },
        { class: 'devicon-androidstudio-plain', label: 'Android Studio' },
        { class: 'devicon-visualstudio-plain', label: 'Visual Studio' },
        { class: 'devicon-vscode-plain', label: 'VS Code' },
        { class: 'devicon-intellij-plain', label: 'Intellij' },
        { class: 'devicon-postman-plain', label: 'Postman' },
        { class: 'devicon-jira-plain', label: 'Jira' },
        { class: 'devicon-slack-plain', label: 'Slack' },
        { class: 'devicon-markdown-plain', label: 'Markdown' },
      ];
    
      let currentIconIndex = 0;
      
      // Hilfsfunktion: Erzeugt einen Icon-Block bestehend aus Icon- und Label-Container.
      // Die Container nutzen ein Flexbox-Layout, sodass der Label-Bereich automatisch 
      // seine natürliche Höhe hat und der Icon-Bereich den restlichen Platz einnimmt.
      function createIconBlock(iconData) {
        const div = document.createElement('div');
        div.classList.add('icon-block');
        div.style.flex = `0 0 ${iconWidth}px`;
        div.style.width = iconWidth + 'px';
    
        // --- Icon-Container ---
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');
        // Hier erfolgt keine explizite Höhenangabe; die CSS-Regel `flex: 1` sorgt dafür,
        // dass er den restlichen Raum erhält.
        iconContainer.style.width = "100%";
    
        const iconEl = document.createElement('i');
        iconEl.className = iconData.class;
        // Statt eines fixen Skalierungsfaktors nutzen wir eine Berechnung, die
        // den verfügbaren Raum ermittelt:  
        // Verfügbarer Raum = Gesamthöhe des Karussells minus (definierte Abstände + 
        // geschätzte Höhe des Labels). Diese Werte können je nach Design angepasst werden.
        const totalPadding = 10;       // z. B. 5px oben + 5px unten innerhalb des Blocks
        const labelHeightEstimate = 20;  // Schätzung der Label-Höhe (kann je nach Schriftgröße variieren)
        const availableIconHeight = containerHeight - totalPadding - labelHeightEstimate;
        iconEl.style.fontSize = availableIconHeight + 'px';
    
        iconContainer.appendChild(iconEl);
        div.appendChild(iconContainer);
    
        // --- Label-Container ---
        const labelContainer = document.createElement('div');
        labelContainer.classList.add('label-container');
        // Keine feste Höhenangabe; die natürliche Textgröße bestimmt die Höhe.
    
        const labelEl = document.createElement('p');
        labelEl.textContent = iconData.label;
        labelEl.classList.add('icon-label');
        labelContainer.appendChild(labelEl);
        div.appendChild(labelContainer);
    
        return div;
      }
    
      // Fülle den inneren Track initial mit "visibleCount" Icon-Blöcken
      track.innerHTML = '';
      for (let i = 0; i < visibleCount; i++) {
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
    
      // Bei Resize: Animation abbrechen und neu initialisieren
      window.addEventListener('resize', () => {
        cancelAnimationFrame(animationFrameId);
        carousel.dataset.initialized = 'false';
        initIconCarousel();
      });
    }
    
    window.initIconCarousel = initIconCarousel;
    
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('iconCarousel')) {
        initIconCarousel();
      }
    });
  })();
  