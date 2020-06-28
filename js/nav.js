function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav(active) {
    let links = ["", "about/", "blogs/", "contact/", "services/", "construction/"];
    let linkName = ["Home", "About", "Blogs", "Contact Us", "Services", "Construction Zone"];
    let nav = document.createElement("ul");
    nav.id = "collapsible";

    let logo = document.createElement('img');
    logo.setAttribute('class', 'logo');
    logo.src = "/WSOA3028A_1830290/images/Trimmed-Logo.png";
    logo.alt = "logo";
    document.getElementById("navbar").appendChild(logo);

    let nav_collapse_link = document.createElement('a');
    nav_collapse_link.setAttribute('class', 'nav-collapser');
    nav_collapse_link.setAttribute('onclick', "toggleNav()");
    nav_collapse_link.href = "javascript: void(0) "
    nav_collapse_link.innerHTML = '&#9776;';
    document.getElementById("navbar").appendChild(nav_collapse_link);


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
            let divider = document.createElement('hr');
            divider.setAttribute('class', 'solid');
            dropdownContainer.appendChild(divider);

            let bloglistlink = document.createElement("a");
            bloglistlink.href = "/WSOA3028A_1830290/blogs/index.html";
            bloglistlink.innerText = "See more";
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

            //insertHeader();
            generateNav(active);
            refreshBlogContents(active, isBlog);
            insertFooter();
            if (active == 0) generateLatestBlog();
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

function generateLatestBlog() {
    element = document.getElementById("lastestBlog");
    para = document.createElement("p");
    para.innerText = "Latest Blog Post: ";


    link = document.createElement("a");
    link.href = "/WSOA3028A_1830290/blogs/" + cards[0].link;
    link.innerText = cards[0].title;
    para.appendChild(link);
    element.appendChild(para);
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


let expandedNav = false;
function toggleNav() {
    let navlist = document.getElementById("collapsible");

    navlist.style = (expandedNav && screen.width < 768) ? "" : "height:auto";
    expandedNav ^= true;
}
