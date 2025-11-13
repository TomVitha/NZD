/* ! IMPORTANT: Removes default app styling ! */
document.querySelectorAll('link:is([href*="app."], [href*="chunk-vendors"], [href*="footer-cg"])[href*=".css"]').forEach((element) => {
  console.warn("Removing element: ", element)
  element.remove()
})


document.body.addEventListener('click', function (event) {
  // WIP: Page reload fix
  const emptyLink = event.target.closest('a:not([href]), a[href=""], a[href^="#"]:not([href^="#page/"])')
  if (emptyLink) {
    event?.preventDefault();
    console.debug(`Page reload avoided by preventing default on empty link:`, emptyLink)
  }

  // WIP: Anchor navigation fix
  const anchorLink = event.target.closest('a[href^="#"]:not([href="#"]):not([href^="#page/"])')
  if (anchorLink) {
    event?.preventDefault();
    const targetElement = document.querySelector(anchorLink.getAttribute("href"));
    // TEMP DISABLED (to avoid conflict with hash-router)
    // TODO: ENABLE FOR PROD
    // history.replaceState({}, "", anchorLink.getAttribute("href"))      // Replaces current history entry
    if (targetElement) {
      targetElement.scrollIntoView();
      console.debug(`Scrolled to element after clicking on anchor link:`, anchorLink)
    }
  };
});



// # Copy to clipboard function
async function copyToClipboard(newClipText) {

  event?.preventDefault();

  // * “Do... or do not... there is no try.”
  try {
    // Clipboard API
    try {
      await navigator.clipboard.writeText(newClipText);
      console.debug(`Copied to clipboard using Clipboard API:`, newClipText);
    }
    // Fallback
    catch (error) {
      document.execCommand('copy');
      console.warn(`Failed to copy using Clipboard API:`, error);
      console.debug(`Copied to clipboard using execCommand:`, newClipText);
    }
  }
  // * “The greatest teacher, failure is.”
  catch (error) {
    console.error(`Failed to copy to clipboard:`, error);
  }
}