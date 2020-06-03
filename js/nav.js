function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav(active) {
    let links = ["", "about/", "blogs/", "contact/", "services/", "construction/"];
    let linkName = ["Home", "About", "Blogs", "Contact Me", "Services", "Construction Zone"];
    let nav = document.createElement("ul");
    for (let i = 0; i < links.length; i++) {
        let currentLink = "/WSOA3028A_1830290/" + links[i] + "index.html";
        item = document.createElement("li");
        link = document.createElement("a");
        link.href = currentLink;
        link.innerText = linkName[i];
        if (active == i) link.setAttribute('class', 'active');

        item.appendChild(link);
        if (i == 2) {
            dropdownContainer = document.createElement("div");
            dropdownContainer.setAttribute('class', 'dropdown-content');
            for (let index = 0; index < clamp(cards.length, 0, 6); index++) {
                bloglink = document.createElement("a");
                bloglink.innerText = cards[index].title;
                bloglink.href = "/WSOA3028A_1830290/blogs/" + cards[index].link;
                dropdownContainer.appendChild(bloglink);
            }
            bloglistlink = document.createElement("a");
            bloglistlink.href = "/WSOA3028A_1830290/blogs/index.html";
            bloglistlink.innerHTML = "&#11206";
            bloglistlink.style = "text-align: center";
            dropdownContainer.appendChild(bloglistlink);
            item.className += " dropdown";
            item.appendChild(dropdownContainer);

        }

        nav.appendChild(item);
    }
    document.getElementById("navbar").appendChild(nav);
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cards = JSON.parse(this.responseText);

            insertHeader();
            generateNav(active);
            refreshBlogContents(active, isBlog);
            insertFooter();
        }
    };
    xmlhttp.open("GET", "/WSOA3028A_1830290/blogs/contents.json", true);
    xmlhttp.send();

    //if (active == 2) getCards(active, isBlog);
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
