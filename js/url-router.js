const pageTitlePrefix = "(2)";
const pageTitleSuffix = "Klientský portál Central Group";

// CLICK EVENT LISTENER
document.addEventListener("click", (event) => {
	// Use closest to find the nearest matching link element
	const link = event.target.closest('a[href^="./"]');
	if (!link) {
		event?.preventDefault();	// debug
		console.error(`Router: Unwanted element: `, event.target)	// debug
		return;
	}
	console.warn(`Router: Wanted element: `, link)	// debug
	event?.preventDefault();
	console.log("link.pathname: ", link.pathname);
	const path = link.pathname.replace("./", "");
	console.log("path: ", path);
	navigate(path);
});

// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "./load/cms/pages/404.html",
		title: "404",
		description: "",
	},
	home: {
		template: "./load/cms/pages/home.html",
		title: "Home",
		description: "",
	},
	pomahame: {
		template: "./load/cms/pages/pomahame.html",
		title: "Pomáháme",
		description: "",
	},
	akce: {
		template: "./load/cms/pages/akce.html",
		title: "Charitativní akce",
		description: "",
	},
	podporte: {
		template: "./load/cms/pages/podporte.html",
		title: "Podpořte",
		description: "",
	},
	tiskovka: {
		template: "./load/cms/pages/tiskovka.html",
		title: "Vzor tiskovky",
		description: "",
	},
	kontakty: {
		template: "./load/cms/pages/kontakty.html",
		title: "Kontakty",
		description: "",
	},
	downloads: {
		template: "./load/cms/pages/downloads.html",
		title: "Ke stažení",
		description: "",
	},
};

// create a function that watches the url and calls the urlLocationHandler
function navigate(link) {
	window.history.pushState({}, "", link);
	urlLocationHandler();
};

// create a function that handles the url location
async function urlLocationHandler() {
	// let location = window.location.pathname.replace("/", ""); // gets current url pathname (without slash "/")
	let location = window.location.pathname.split("/").pop()	// gets the last segment of pathname

	// TODO: Rewrite
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "home";
	}

	const route = routes[location] || routes["404"];											// get the route object from the urlRoutes object
	console.warn("!route: ", route)
	const html = await fetch(route.template).then((response) => response.text());					// get the html from the template
	document.querySelector("#dev-cms-content").innerHTML = html;										// set the content of the content div to the html
	document.title = `${pageTitlePrefix} ${route.title} - ${pageTitleSuffix}`;						// set the title of the document to the title of the route
	document.querySelector('meta[name="description"]')?.setAttribute("content", route.description);	// set the description of the document to the description of the route
	// Jump to the top of the page
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "instant"
	})
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url -- used for navigating forwards/backwards
window.route = navigator;
// FIXME: Initial page load doesn't work -- if we load into a non-existing page, our code is not there, obviously
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();

