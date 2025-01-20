
const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
    "/projects/overview": "/pages/projects/overview.html",
    "/projects/example": "/pages/projects/example.html"
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];

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
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
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
    if (window.location.pathname === "/") {
      return [{ name: "Home", path: "/" }];
    }
    const segments = window.location.pathname
      .split('/')
      .filter(Boolean);
  
    // Erzeuge ein Array von Objekten { name, path }
    const breadCrumbs = segments.map((segment, index) => {
      // Den absoluten Pfad bis einschließlich dieses Segments zusammensetzen
      const path = '/' + segments.slice(0, index + 1).join('/').toLowerCase();
      const name =
      segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
      return {
        name: name,
        path: path
      };
    });
    
    // console.log(breadCrumbs);
    
    return breadCrumbs;
  };
  


window.breadCrumbs = getBreadCrumbsArray;

window.onpopstate = handleLocation;
window.route = route;
window.routes = routes;

handleLocation();
