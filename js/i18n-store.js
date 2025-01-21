

  const i18n = {
    currentLang: 'de',        // Standard-Sprache
    translations: {},         // Hier landen die aktuell geladenen Texte
    setLang(lang) {
      this.currentLang = lang;
      // Evtl. neu laden oder nur neu fetchen -> je nach Bedarf
      // location.reload(); // wenn du direkt neu laden willst
    },
    async loadPageTranslations(pageName) {
      // z.B.  "/lang/home/de.json" oder "/lang/home/en.json"
      const url = `/lang/${pageName}/${this.currentLang}.json`;
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Could not load: ${url}`);
        this.translations = await resp.json();
      } catch(e) {
        console.error("i18n load error:", e);
        this.translations = {};
      }
    },
    t(key) {
      return this.translations[key] || `MISSING[${key}]`;
    }
  };

window.i18n = i18n;