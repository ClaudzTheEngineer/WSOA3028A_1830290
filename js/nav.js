function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav(active) {

    let output = "<ul>\n";
    let links = ["", "about/", "blogs/", "contact/", "services/", "construction/"];
    let linkName = ["Home", "About", "Blogs", "Contact Me", "Services", "Construction Zone"];

    for (let i = 0; i < links.length; i++) {
        let currentLink = "/WSOA3028A_1830290/" + links[i] + "index.html";

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

function insertBlogNav() {

    let path = window.location.pathname;
    let blogNum = path.substring(path.lastIndexOf('/') + 5);
    blogNum = parseInt(blogNum.substring(0, blogNum.lastIndexOf('.')));

    let output = "";

    if (blogNum > 1) {
        output += `<a href="blog1.html">&#171;</a>`;
        output += `<a href="blog` + (blogNum - 1) + `.html">&#8249;</a>`;
    }
    output += `<a href="#top">&#94;</a>`;
    if (blogNum < cards.length) {
        output += `<a href="blog` + (blogNum + 1) + `.html">&#8250;</a>`;
        output += `<a href="blog` + cards.length + `.html">&#187;</a>`;
    }
    output += "<p>Blog " + blogNum + " of " + cards.length + "</p>"
    document.getElementsByClassName("blogNav")[0].innerHTML += output;

    blogIndex = cards.length - blogNum;
    output = "";
    output += "| Published: " + cards[blogIndex].creation + " | Edited: " + cards[blogIndex].lastModified;
    document.getElementById("info").innerHTML += output;

}

function insertBlogDateTime() {

}

function insertElements(active, isBlog = false) {
    insertHeader();
    generateNav(active);
    insertFooter();
    if (active == 2) getCards(active, isBlog);
}

function refreshBlogContents(active, isBlog = false) {
    if (active == 2 && isBlog == false) { generateCards(); };
    if (isBlog) {
        insertBlogNav();
        insertBlogDateTime();
    }
}

function CardToHTML(card) {
    return `<a class="card" href="` + card.link + `">
        <img src="` + card.image + `" alt=` + card.imageAlt + `>
        <div class="container">
            <h2>
            ` + card.title + `
            </h2>
            <p>
            ` + card.text + `
            </p>
        </div>
        </a>`
}

let cards = [];


let maxCardsOnScreen = 6;
let pos = 0;

function getCards(active, isBlog = false) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cards = JSON.parse(this.responseText);
            refreshBlogContents(active, isBlog);
        }
    };
    xmlhttp.open("GET", "/WSOA3028A_1830290/blogs/contents.json", true);
    xmlhttp.send();
}

function generateCards() {

    output = "";
    for (let i = pos; i < clamp(pos + maxCardsOnScreen, 0, cards.length); i++) {
        output += CardToHTML(cards[i]);
    }
    document.getElementsByClassName("BlogIndexNumber")[0].innerHTML = "Blog page " + (pos / 6 + 1) + " of " + Math.ceil(cards.length / 6);
    document.getElementsByClassName("gridContainer")[0].innerHTML = output;

    document.getElementById("prevButton").disabled = (pos <= 0);
    document.getElementById("nextButton").disabled = (pos >= cards.length - 6);
}

function clamp(val, min, max) {
    return Math.min(Math.max(min, val), max);
}

function nextPage() {
    pos += 6;
    generateCards();
}

function previousPage() {
    pos -= 6;
    generateCards();

}