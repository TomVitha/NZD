/* ! IMPORTANT: Removes default app styling ! */
document.querySelectorAll('link:is([href*="app."], [href*="chunk-vendors"], [href*="footer-cg"])[href*=".css"]').forEach((element) => {
  console.warn("Removing element:", element)
  element.remove()
})