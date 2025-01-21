
const routes = {
  404: "/pages/404.html",
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/contact": "/pages/contact.html",
  "/projects": "/pages/projects/overview.html",
  "/projects/overview": "/pages/projects/overview.html",
  "/projects/example": "/pages/projects/example.html"
}

const handleLocation = async () => {
  // const path = window.location.pathname;
  // const route = routes[path] || routes[404];

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
  } catch (error) {
    console.error("Error loading page:", error);

    console.log(document.querySelector("#app"));

    document.querySelector("#app").innerHTML = await fetch(routes[404]).then((data) => data.text());
    //     document.querySelector("#app").innerHTML = `
    //     <section>
    //         <h1>Fehler</h1>
    //         <p>Die angeforderte Seite konnte nicht geladen werden.</p>
    //     </section>
    // `;
  }

  // console.log(route);

  // const html = await fetch(route).then(response => response.text());
  // document.querySelector("#app").innerHTML = html;>
}

const route = (event) => {
  // event = event || window.event;
  // event.preventDefault();
  // window.history.pushState({}, "", event.target.href);
  // handleLocation();
  event.preventDefault();
  // Wir setzen einfach den hash:
  window.location.hash = event.target.getAttribute("href").replace("#", "");
  // Dann Laden:
  handleLocation();
}

// const getBreadCrumbsPath = () => {
//     const crumbs = window.location.pathname
//       .split("/")
//       .filter(Boolean); // Entfernt leere Einträge, z. B. vor oder nach dem Slash

//     return crumbs
//       .map((crumb, index) => {
//         const path = "/" + crumbs.slice(0, index + 1).join("/");

//         const separator = index > 0 ? " / " : "";
//         console.log(`${separator}<a href="${path}" onclick="route()">${crumb}</a>`);

//         return `${separator}<a href="${path}" onclick="route()">${crumb}</a>`;
//       })
//       .join("");
//   };
const getBreadCrumbsArray = () => {
  // if (window.location.pathname === "/") {
  //   return [{ name: "Home", path: "#/" }];
  // }
  // const segments = window.location.pathname
  //   .split('/')
  //   .filter(Boolean);

  // // Erzeuge ein Array von Objekten { name, path }
  // const breadCrumbs = segments.map((segment, index) => {
  //   // Den absoluten Pfad bis einschließlich dieses Segments zusammensetzen
  //   const path = '/' + segments.slice(0, index + 1).join('/').toLowerCase();
  //   const name =
  //     segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
  //   return {
  //     name: name,
  //     path: path
  //   };
  // });

  // // console.log(breadCrumbs);

  // return breadCrumbs;

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

handleLocation();
