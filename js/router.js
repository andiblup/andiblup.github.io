const routes = {
  404: "/pages/404.html",
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/contact": "/pages/contact.html",
  "/projects": "/pages/projects/overview.html",
  "/projects/overview": "/pages/projects/overview.html",
  "/projects/portfolio": "/pages/projects/portfolio.html",
  "/projects/example": "/pages/projects/example.html"
}

const handleLocation = async () => {

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
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
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
