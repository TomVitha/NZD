// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'

// document.addEventListener("scroll", headerBgChanger, { passive: true });

// function headerBgChanger() {
//   const header = document.querySelector(".head header");
//   header?.classList.toggle("scrolled", window.scrollY > 10);
// }



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

const swiperEl = document.querySelector(".swiper")
if (swiperEl) {
  const { Swiper } = await import('https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs')
  console.debug("Initializing Swiper", Swiper)
  const swiper = new Swiper('.swiper', {
    // Parameters
    loop: true,

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // autoplay
    autoplay: {
      delay: 3000,
    },
  });

}


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