/* ! IMPORTANT: Removes default app styling ! */
document.querySelectorAll('link:is([href*="app."], [href*="chunk-vendors"], [href*="footer-cg"])[href*=".css"]').forEach((element) => {
  console.warn("Removing element:", element)
  element.remove()
})


document.addEventListener("scroll", headerBgChanger, { passive: true });

function headerBgChanger() {
  const header = document.querySelector(".head header");
  header?.classList.toggle("scrolled", window.scrollY > 10);
}

/// Call headerBgChanger in case page loads in the scrolled position
// document.addEventListener("DOMContentLoaded", (event) => {
//   console.log("DOM fully loaded and parsed");
//   // HACK: Trigger header background change after a delay, once the content is loaded
//   setTimeout(() => {
//     headerBgChanger();
//   }, 500);
// });


// * Page reload fix
document.body.addEventListener('click', (event) => {
  const emptyLink = event.target.closest('a:not([href]), a[href=""], a[href^="#"]:not([href^="#page/"])')
  if (emptyLink) {
    event?.preventDefault();
    console.debug(`Page reload avoided by preventing default on empty link:`, emptyLink)
  }

  // * Anchor navigation fix
  const anchorLink = event.target.closest('a[href^="#"]:not([href="#"]):not([href^="#page/"])')
  if (anchorLink) {
    event?.preventDefault();
    const targetElement = document.querySelector(anchorLink.getAttribute("href"));
    // TEMP DISABLED (to avoid conflict with hash-router)
    // TODO: --> ENABLE FOR PROD
    // history.replaceState({}, "", anchorLink.getAttribute("href"))      // Replaces current history entry
    if (targetElement) {
      targetElement.scrollIntoView();
      console.debug(`Scrolled to element after clicking on anchor link:`, anchorLink)
    }
  };
});



// * Copy content to clipboard
async function copyToClipboard(content) {

  event?.preventDefault();

  // * “Do... or do not... there is no try.”
  try {
    // Clipboard API
    try {
      await navigator.clipboard.writeText(content);
      console.debug(`Copied to clipboard using Clipboard API:`, content);
    }
    // Fallback
    catch (error) {
      document.execCommand('copy');
      console.warn(`Failed to copy using Clipboard API:`, error);
      console.debug(`Copied to clipboard using execCommand:`, content);
    }
  }
  // * “The greatest teacher, failure is.”
  catch (error) {
    console.error(`Failed to copy to clipboard:`, error);
  }
}