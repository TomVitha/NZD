const pageTitlePrefix = ''
const pageTitleSuffix = ' - Nadační fond zdraví dětí'

// Track scripts added by page navigation for cleanup
let pageScripts = []

const routes = {
  404: {
    template: "./load/cms/pages/404.html",
    title: "404",
    description: "",
  },
  uvod: {
    template: "./load/cms/pages/uvod.html",
    title: "O nadačním fondu",
    description: "",
  },
  pomahame: {
    template: "./load/cms/pages/pomahame.html",
    title: "Jak jsme již pomohli",
    description: "",
  },
  pomoci: {
    template: "./load/cms/pages/pomoci.html",
    title: "Jak můžete pomoci vy",
    description: "",
  },
  kontakty: {
    template: "./load/cms/pages/kontakty.html",
    title: "Kontakty",
    description: "",
  },
  'ke-stazeni': {
    template: "./load/cms/pages/ke-stazeni.html",
    title: "Ke stažení",
    description: "",
  },
  akce: {
    template: "./load/cms/pages/akce.html",
    title: "Aktuality",
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

// Clean up scripts from previous page
function cleanupPageScripts() {
  pageScripts.forEach(script => {
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  })
  pageScripts = []
}

// Extract and execute scripts from loaded HTML
function executeScripts(container) {
  const scriptTags = container.querySelectorAll('script')

  scriptTags.forEach(oldScript => {
    const newScript = document.createElement('script')

    // Copy all attributes from the old script to the new one
    Array.from(oldScript.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value)
    })

    // Copy the script content
    newScript.textContent = oldScript.textContent

    // Handle deferred scripts
    if (newScript.hasAttribute('defer')) {
      // Execute after a short delay to mimic defer behavior
      setTimeout(() => {
        document.body.appendChild(newScript)
        pageScripts.push(newScript)
      }, 0)
    } else {
      // Execute immediately for non-deferred scripts
      document.body.appendChild(newScript)
      pageScripts.push(newScript)
    }

    // Remove the old script tag from the content
    oldScript.remove()
  })
}

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

  // Clean up scripts from previous page
  cleanupPageScripts()

  const pageHTML = await fetch(route.template).then((response) => response.text());						// get the html from the template
  const contentContainer = document.querySelector("#dev-cms-content")
  contentContainer.innerHTML = pageHTML;											// set the content of the content div to the html

  // Execute scripts from the loaded page
  executeScripts(contentContainer)

  document.title = `${pageTitlePrefix}${route.title}${pageTitleSuffix}`;							// set the title of the document to the title of the route
  document.querySelector('meta[name="description"]')?.setAttribute("content", route.description);		// set the description of the document to the description of the route
  // Jump to the top of the page
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  })
  // updateNavbarActiveLink(location)					                                                // update the active link in the navbar
}

window.addEventListener("hashchange", hashRouterHandler);                   // create a function that watches the hash and calls the urlLocationHandler
if (window.location.hash.startsWith('#page/')) {
  navigate(window.location.hash.replace("#page/", ""));            // first-time load navigation - from existing hash, or default to index
} else {
  navigate("uvod")
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