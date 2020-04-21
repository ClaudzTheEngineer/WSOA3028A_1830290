function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav(active) {

    let output = "<ul>";
    let links = ["", "about/", "blogs/", "contact/", "construction/"];
    let linkName = ["Home", "About", "Blogs", "Contact Me", "Construction Zone"];

    for (let i = 0; i < links.length; i++) {
        let currentLink = "/WSOA3028A_1830290/" + links[i] + "index.html";

        output += "<li" + (i = active) ? " class=\"active\"" : "" + "><a href=\"" + currentLink + "\">" + linkName[i] + "</a></li>";
    }
    output += "</ul>";

    document.getElementsByTagName("nav")[0].innerHTML += output;
}


function insertElements(active) {
    insertHeader();
    generateNav(active);
}