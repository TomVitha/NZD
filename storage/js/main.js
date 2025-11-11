/* ! Removes default app styling ! */
// document.querySelectorAll('link[href*="app."][href*=".css"], link[href*="chunk-vendors"][href*=".css"], link[href*="footer-cg"][href*=".css"]').forEach((element) => {

document.querySelectorAll('link:is([href*="app."], [href*="chunk-vendors"], [href*="footer-cg"])[href*=".css"]').forEach((element) => {
    console.warn("Removing element: ", element)
    element.remove()
})


// TODO: Anchor navigation fix
document.body.addEventListener('click', function (event) {
    if (event.target.id == 'whatever') {
        
    };
});