function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav(active) {

    let output = "<ul>\n";
    let links = ["", "about/", "blogs/", "contact/", "construction/"];
    let linkName = ["Home", "About", "Blogs", "Contact Me", "Construction Zone"];

    for (let i = 0; i < 5; i++) {
        let currentLink = "/WSOA3028A_1830290/" + links[i] + "index.html";
        console.log(currentLink);
        output += "<li";
        output += (i == active) ? " class=\"active\"" : "";
        output += "><a href=\"";
        output += currentLink;
        output += "\">" + linkName[i] + "</a></li>\n";
    }
    output += "</ul>";

    document.getElementsByTagName("nav")[0].innerHTML += output;
}

function insertFooter() {
    document.getElementsByTagName("footer")[0].innerHTML +=
        '<p>Copyright &copy; 2020 Suzzi Inc. Ltd.</p>';
}


function insertElements(active) {
    insertHeader();
    generateNav(active);
    insertFooter();
}