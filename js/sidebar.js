
let marginWidth = 0;
let sidebar = null;
let bodyheight = 0;

function onLoad() {

    marginWidth = (parseInt(getComputedStyle(document.getElementById("body")).marginLeft) + 15) + "px";
    bodyheight = `${parseInt(document.getElementById("body").clientHeight) - 60}px`
    sidebar = document.getElementById("sidebar");
    sidebar.style.transition = "width 0s";
    //sidebar.style.height = bodyheight;
    sidebar.style.left = marginWidth;

}

function openNav() {

    sidebar.style.transition = "width 0.5s";

    document.getElementById("sidebar").style.width = "200px";

    let marginWidth = (parseInt(getComputedStyle(document.getElementById("body")).marginLeft) + 15) + "px";
    document.getElementById("sidebar").style.left = marginWidth;
    console.log(marginWidth);



    //document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {

    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    sidebar.style.transition = "width 0s";
}