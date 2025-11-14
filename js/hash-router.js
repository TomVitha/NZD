const pageTitlePrefix = ''
const pageTitleSuffix = ' - Nadační fond zdraví dětí'

const routes = {
    404: {
        template: "/load/cms/pages/404.html",
        title: "404",
        description: "",
    },
    home: {
        template: "/load/cms/pages/home.html",
        title: "Home",
        description: "",
    },
    pomahame: {
        template: "/load/cms/pages/pomahame.html",
        title: "Jak pomáháme",
        description: "",
    },
    akce: {
        template: "/load/cms/pages/akce.html",
        title: "Akce",
        description: "",
    },
    podporte: {
        template: "/load/cms/pages/podporte.html",
        title: "Podpořte",
        description: "",
    },
    tiskovka: {
        template: "/load/cms/pages/tiskovka.html",
        title: "Vzor tiskovky",
        description: "",
    },
    kontakty: {
        template: "/load/cms/pages/kontakty.html",
        title: "Kontakty",
        description: "",
    },
    downloads: {
        template: "/load/cms/pages/downloads.html",
        title: "Ke stažení",
        description: "",
    },
};


// Function that watches the url and calls the urlLocationHandler
const hashRouterHandler = async (hashChangeEvent) => {
    // Debug logs
    // console.debug("Event: ", hashChangeEvent);
    // console.debug("new url: ", hashChangeEvent.newURL);
    // console.debug("old url: ", hashChangeEvent.oldURL);

    // Avoids redirect if hash is empty
    if (!window.location.hash) {
        window.history.pushState(null, null, hashChangeEvent.oldURL);
        console.warn('Router alert: Redirect avoided (empty hash).');
        return
    }

    let location = window.location.hash.replace("#page/", "")									// get the fragment (without the hash), corresponding to url path
    if (location.length == 0) {																// if the path length is 0, set it to 404 (or primary page route)
        console.warn("Router error: No location provided.")
        location = "404";
    }

    navigate(location);    // "navigate" to route (load the template html)
};

async function navigate(location) {
    // Validation
    if (!location) {
        console.error("Navigator Error: No location name provided.")
        return
    }

    let route = routes[location];
    if (!route) {
        console.error(`Navigator Error: Location "${location}" doesn't exist.`)
        console.log('Redirecting to 404...')
        route = routes["404"]
    }
    const pageHTML = await fetch(route.template).then((response) => response.text());						// get the html from the template
    document.querySelector("#dev-cms-content").innerHTML = pageHTML;											// set the content of the content div to the html
    document.title = `${pageTitlePrefix}${route.title}${pageTitleSuffix}`;							// set the title of the document to the title of the route
    document.querySelector('meta[name="description"]')?.setAttribute("content", route.description);		// set the description of the document to the description of the route
    // updateNavbarActiveLink(location)					                                                // update the active link in the navbar
}

window.addEventListener("hashchange", hashRouterHandler);                   // create a function that watches the hash and calls the urlLocationHandler
if (window.location.hash.startsWith('#page/')) {
    navigate(window.location.hash.replace("#page/", ""));            // first-time load navigation - from existing hash, or default to index
} else {
    navigate("home")
}


// // TODO?: Move from router file to custom script ?
// // FIXME: Dropdown with active link should be open
// function updateNavbarActiveLink(location) {
//     // Remove existing active class (from all items)
//     document.querySelectorAll(`.navbar :is(.nav-item, .dropdown-item)`).forEach(navItem => {
//         navItem.classList.remove('active')
//     })
//     // Apply active class to the appropriate page
//     document.querySelectorAll(`.navbar :is(.nav-item:has(.nav-link[href*="#${location}"]), .dropdown-item[href*="#${location}"])`).forEach(navItem => {
//         navItem.classList.add('active')
//     })
// }