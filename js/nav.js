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

function insertBlogNav(isBlog = false) {
    if (isBlog) {
        let path = window.location.pathname;
        let blogNum = path.substring(path.lastIndexOf('/') + 5);
        blogNum = parseInt(blogNum.substring(0, blogNum.lastIndexOf('.')));
        console.log(blogNum);

        let output = "";

        if (blogNum > 1) output += `<a href="blog` + (blogNum - 1) + `.html"> &#129068</a>`;
        output += `<a href="#top">&#129069</a>`;
        if (blogNum < 10) output += `<a href="blog` + (blogNum + 1) + `.html"> &#129070</a>`;

        document.getElementsByClassName("blogNav")[0].innerHTML += output;
    }
}

function insertElements(active, isBlog = false) {
    insertHeader();
    generateNav(active);
    insertFooter();
    if (active == 2 && isBlog == false) { generateCards() };
    insertBlogNav(isBlog);
}


class Card {
    constructor(link, image, imageAlt, title, text) {
        this.link = link;
        this.image = image;
        this.imageAlt = imageAlt;
        this.title = title;
        this.text = text;
    }
    toHTML() {
        return `<a class="card" href="` + this.link + `">
        <img src="` + this.image + `" alt=` + this.imageAlt + `>
        <div class="container">
            <h2>
            ` + this.title + `
            </h2>
            <p>
            ` + this.text + `
            </p>
        </div>
        </a>`
    }
}

let cards = [
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Interacting with Interactivity",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog9.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Teaching and learning online.",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog8.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Why U matter.",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog7.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Giovanni's Company during the Outbreak",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog6.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Communication Ideas - Speculation",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog5.html",
            "../images/Henry-Cat2.jpg",
            "Henry the Cat",
            "Meta Meta-data blog post",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog4.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Semantics of Semantic Markup",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog3.html",
            "../images/Nonno.jpg",
            "Giovanni at War",
            "cout &lt;&lt; \"Hello World\";",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog2.html",
            "../images/Arpanet_logical_map.png",
            "Logical Map of Arpanet circa 1977",
            "The Internet's First Hello World",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog1.html",
            "../images/Vannevar_Bush_portrait.jpg",
            "Portrait of Vannevar Bush",
            "As we may retroactively think",
            "Lorem ipsum blah blah fish paste...")




]

let maxCardsOnScreen = 6;
let pos = 0;

function generateCards() {
    output = "";
    for (let i = pos; i < clamp(pos + maxCardsOnScreen, 0, cards.length); i++) {
        output += cards[i].toHTML();
    }

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