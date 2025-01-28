// const routes = {
//   404: "/pages/404.html",
//   "/": "/pages/home.html",
//   "/about": "/pages/about.html",
//   "/contact": "/pages/contact.html",
//   "/projects": "/pages/projects/overview.html",
//   "/projects/overview": "/pages/projects/overview.html",
//   "/projects/portfolio": "/pages/projects/portfolio.html",
//   "/projects/example": "/pages/projects/example.html"
// }

if (window.location === 'https://andiblup.github.io/portfolio/' || window.location === 'https://andiblup.github.io/portfolio') {
  window.location.href = 'https://andiblup.github.io/';
} else if (window.location.href === '127.0.0.1:5500/portfolio' || window.location.href === '127.0.0.1:5500/portfolio/') {
  window.location.href = '127.0.0.1:5500/';
}

//! Workaround für das Problem, dass die SVGs nicht korrekt angezeigt werden
function colorizeSVGs() {

  const currentTheme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'dark';
  let svgColor = 'black';
  if (currentTheme === 'dark') {
    svgColor = 'white';
  } else {
    svgColor = 'black';
  }

  if (window.location.hash === '#/projects/doGether' || window.location.hash === '#/' || window.location.hash === '') {
    let times = 80;
    const intervalIdInertia = setInterval(() => {
      try {
        const inertiaIcons = document.querySelectorAll('.icons-custom-inertia');
        console.log(inertiaIcons);

        inertiaIcons.forEach(icon => {
          const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><g transform='translate(0,200) scale(0.1,-0.1)' fill='${svgColor}' stroke='none'><path d='M0 1000 l0 -1000 1000 0 1000 0 0 1000 0 1000 -1000 0 -1000 0 0 -1000z m900 205 l205 -205 -205 -205 -205 -205 -213 0 -214 0 196 201 c108 110 196 205 196 209 0 4 -88 99 -196 209 l-196 201 214 0 213 0 205 -205z m636 0 l203 -205 -203 -205 -203 -205 -212 0 c-116 0 -211 3 -211 7 0 4 89 97 197 205 l198 198 -198 198 c-108 108 -197 201 -197 205 0 4 95 7 212 7 l211 0 203 -205z'/></g></svg>`;
          const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
          icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
          icon.style.backgroundSize = 'contain';
          icon.style.backgroundRepeat = 'no-repeat';
          icon.style.backgroundPosition = 'center';
        });

        if (inertiaIcons.length > 0) {
          clearInterval(intervalIdInertia);
          console.log('Icons found, stopping interval.');
        }
        times--;
        if (times === 0) {
          clearInterval(intervalIdInertia);
          console.log('Maximum attempts reached, stopping interval.');
        }
      } catch (warn) {
        console.warn('Error: ', warn);
      }
    }, 3000);
  }

  if (window.location.hash === '#/projects/fantasyQuest' || window.location.hash === '#/' || window.location.hash === '') {
    let times = 80;
    const intervalIdMapbox = setInterval(() => {
      try {
        const mapboxIcons = document.querySelectorAll('.icons-custom-mapbox');
        console.log(mapboxIcons);

        mapboxIcons.forEach(icon => {
          const svg = `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='${svgColor}' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>`;
          const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
          icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
          icon.style.backgroundSize = 'contain';
          icon.style.backgroundRepeat = 'no-repeat';
          icon.style.backgroundPosition = 'center';
        });

        if (mapboxIcons.length > 0) {
          clearInterval(intervalIdMapbox);
          console.log('Icons found, stopping interval.');
        }
        times--;
        if (times === 0) {
          clearInterval(intervalIdMapbox);
          console.log('Maximum attempts reached, stopping interval.');
        }
      } catch (warn) {
        console.warn('Error: ', warn);
      }
    }, 2000);
  }

  // if (window.location.hash === '#/projects/doGether' || window.location.hash === '#/' || window.location.hash === '') {
  //   let times = 8;
  //   const intervalIdInertia = setInterval(() => {
  //     try {
  //       const inertiaIcons = document.querySelectorAll('.icons-custom-inertia');
  //       console.log(inertiaIcons);

  //       inertiaIcons.forEach(icon => {
  //         const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><g transform='translate(0,200) scale(0.1,-0.1)' fill='${svgColor}' stroke='none'><path d='M0 1000 l0 -1000 1000 0 1000 0 0 1000 0 1000 -1000 0 -1000 0 0 -1000z m900 205 l205 -205 -205 -205 -205 -205 -213 0 -214 0 196 201 c108 110 196 205 196 209 0 4 -88 99 -196 209 l-196 201 214 0 213 0 205 -205z m636 0 l203 -205 -203 -205 -203 -205 -212 0 c-116 0 -211 3 -211 7 0 4 89 97 197 205 l198 198 -198 198 c-108 108 -197 201 -197 205 0 4 95 7 212 7 l211 0 203 -205z'/></g></svg>`;
  //         const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
  //         icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
  //         icon.style.backgroundSize = 'contain';
  //         icon.style.backgroundRepeat = 'no-repeat';
  //         icon.style.backgroundPosition = 'center';
  //       });


  //       if (inertiaIcons.length > 0) {
  //         clearInterval(intervalIdInertia);
  //       }
  //       if (times === 0) {
  //         clearInterval(intervalIdInertia);
  //       }
  //       times--;
  //     } catch (warn) {
  //       console.warn('Error: ', warn);
  //     }
  //   }, 1000);
  // };
  // if (window.location.hash === '#/projects/fantsyQuest' || window.location.hash === '#/' || window.location.hash === '') {
  //   let times = 8;
  //   const intervalIdMapbox = setInterval(() => {
  //     try {
  //       const mapboxIcons = document.querySelectorAll('.icons-custom-mapbox');
  //       console.log(mapboxIcons);

  //       mapboxIcons.forEach(icon => {
  //         const svg = `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='${svgColor}' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>`;
  //         const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
  //         icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
  //         icon.style.backgroundSize = 'contain';
  //         icon.style.backgroundRepeat = 'no-repeat';
  //         icon.style.backgroundPosition = 'center';
  //       });


  //       if (inertiaIcons.length > 0) {
  //         clearInterval(intervalIdMapbox);
  //       }
  //       if (times === 0) {
  //         clearInterval(intervalIdMapbox);
  //       }
  //       times--;
  //     } catch (warn) {
  //       console.warn('Error: ', warn);
  //     }
  //   }, 1000);
  // };

}

let routes = {};

// Funktion zum Laden der Routen aus der JSON-Datei
async function loadRoutes() {
  try {
    const response = await fetch('/data/routes.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Routen geladen:', data);
    routes = data;
  } catch (error) {
    console.error('Fehler beim Laden der Routen:', error);
    // Fallback-Routen, falls das Laden fehlschlägt
    // routes = {
    //   "404": "/pages/404.html",
    //   "/": "/pages/home.html",
    //   "/about": "/pages/about.html",
    //   "/contact": "/pages/contact.html",
    //   "/projects": "/pages/projects/overview.html",
    //   "/projects/overview": "/pages/projects/overview.html",
    //   "/projects/portfolio": "/pages/projects/portfolio.html",
    //   "/projects/example": "/pages/projects/example.html"
    // };
  }
}

const handleLocation = async () => {
  // Sicherstellen, dass die Routen geladen sind
  if (Object.keys(routes).length === 0) {
    await loadRoutes();
  }

  if (window.location === 'https://andiblup.github.io/portfolio/' || window.location === 'https://andiblup.github.io/portfolio') {
    window.location.href = 'https://andiblup.github.io/';
  } else if (window.location.href === '127.0.0.1:5500/portfolio' || window.location.href === '127.0.0.1:5500/portfolio/') {
    window.location.href = '127.0.0.1:5500/';
  }
  // Falls der Nutzer noch keinen Hash hat (z. B. erste Seite: #/ ), setze standardmäßig #/
  if (!window.location.hash) {
    window.location.hash = "#/";
  }

  // z. B. "#/about" -> routeKey="/about"
  const routeKey = window.location.hash.slice(1) || "/";

  // Such das Template in deinem Routen-Objekt
  const route = routes[routeKey] || routes["404"];

  try {
    const response = await fetch(route);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();
    document.querySelector("#app").innerHTML = html;

    // Nach dem Laden der Route, SVGs einfärben
    // colorizeSVGs();

    // Nach dem Einfügen der neuen Seite, initialisiere das Karussell falls vorhanden
    const newCarousel = document.querySelector("#app #iconCarousel");
    if (newCarousel) {
      const listName = newCarousel.getAttribute("data-icon-list");
      if (listName && typeof window.initIconCarousel === 'function') {
        window.initIconCarousel(listName);
      }
    }

  } catch (error) {
    console.error("Error loading page:", error);

    console.log(document.querySelector("#app"));

    const errorPage = await fetch(routes["404"]);
    const errorHtml = await errorPage.text();
    document.querySelector("#app").innerHTML = errorHtml;

    // Nach dem Laden der Route, SVGs einfärben
    // colorizeSVGs();

    // Initialisiere ggf. das Karussell auf der 404-Seite
    const errorCarousel = document.querySelector("#app #iconCarousel");
    if (errorCarousel) {
      const listName = errorCarousel.getAttribute("data-icon-list");
      if (listName && typeof window.initIconCarousel === 'function') {
        window.initIconCarousel(listName);
      }
    }
  }

}

const route = (event) => {
  // event.preventDefault();
  // window.location.hash = event.target.getAttribute("href").replace("#", "");
  if (window.location === 'https://andiblup.github.io/portfolio/' || window.location === 'https://andiblup.github.io/portfolio') {
    window.location.href = 'https://andiblup.github.io/';
  }
  handleLocation();
}

const getBreadCrumbsArray = () => {
  // Aktuellen Hash auslesen, z. B. "#/projects/example"
  let hash = window.location.hash;
  if (!hash || hash === "#/") {
    // Startseite => nur "Home"
    return [{ name: "Home", path: "#/" }];
  }

  // Entferne das führende "#/"
  // Damit bleibt z. B. "projects/example"
  hash = hash.replace(/^#\//, "");

  // In Segmente aufsplitten
  const segments = hash.split("/").filter(Boolean);
  // z. B. ["projects", "example"]

  // Jedes Segment in ein { name, path } wandeln
  const breadCrumbs = segments.map((segment, index) => {
    // Pfad: "#/" + alle Segmente bis hier
    const link = "#/" + segments.slice(0, index + 1).join("/");
    // Name: Erster Buchstabe groß, Rest klein
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { name, path: link };
  });

  // Ganz vorne noch Home rein
  breadCrumbs.unshift({ name: "Home", path: "#/" });

  return breadCrumbs;
};

// Bei jedem Hashwechsel
window.addEventListener("hashchange", handleLocation);
// Beim ersten Laden
window.addEventListener("DOMContentLoaded", handleLocation);

window.breadCrumbs = getBreadCrumbsArray;

window.onpopstate = handleLocation;
window.route = route;
window.routes = routes;

// Initialisiere beim ersten Laden
handleLocation();
