function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav(active) {
    let links = ["", "about/", "blogs/", "contact/", "services/", "construction/"];
    let linkName = ["Home", "About", "Blogs", "Contact Us", "Services", "Construction Zone"];

    document.getElementById("navbar").setAttribute('class', 'navbar navbar-expand-lg sticky-top bg-light navbar-light');

    //Brand
    let brand = document.createElement("a");
    brand.setAttribute('class', 'navbar-brand');
    brand.href = "#";
    let logo = document.createElement("img");
    logo.src = "/WSOA3028A_1830290/images/Trimmed-Logo.png";
    logo.alt = "Logo";
    logo.setAttribute('style', 'height:3rem');
    brand.appendChild(logo);
    document.getElementById("navbar").appendChild(brand);

    //Button to Collapse
    let button = document.createElement("button");
    button.setAttribute('class', 'navbar-toggler');
    button.type = "button";
    button.setAttribute('data-toggle', 'collapse');
    button.setAttribute('data-target', '#navbarSupportedContent');
    button.setAttribute('aria-controls', 'navbarSupportedContent');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Toggle Navigation');

    let icon = document.createElement("span");
    icon.setAttribute('class', 'navbar-toggler-icon');
    button.appendChild(icon);
    document.getElementById("navbar").appendChild(button);


    //<div>
    let navbarContainer = document.createElement('div');

    navbarContainer.setAttribute('class', 'collapse navbar-collapse');
    navbarContainer.id = "navbarSupportedContent";

    //<ul>
    let list = document.createElement('ul');
    list.setAttribute('class', 'navbar-nav mr-auto');

    //links <li>

    for (let index = 0; index < links.length; index++) {
        if (index == 2) {//Blogs
            let item = document.createElement('li');
            item.setAttribute('class', (index == active) ? 'nav-item active dropdown' : 'nav-item dropdown');

            let dropdownToggle = document.createElement('a');
            dropdownToggle.setAttribute('class', 'nav-link dropdown-toggle');
            dropdownToggle.href = '#';
            dropdownToggle.id = "navbarDropdown";
            dropdownToggle.setAttribute('role', 'button');
            dropdownToggle.setAttribute('data-toggle', 'dropdown');
            dropdownToggle.setAttribute('aria-haspopup', 'true');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            dropdownToggle.innerText = linkName[index];

            item.appendChild(dropdownToggle);

            let dropdownMenu = document.createElement('div');
            dropdownMenu.setAttribute('class', 'dropdown-menu');
            dropdownMenu.setAttribute('aria-labelledby', 'navbarDropdown');

            //Top 6 blogs
            for (let blogIndex = 0; blogIndex < 6; blogIndex++) {
                let link = document.createElement('a');
                link.setAttribute('class', 'dropdown-item');
                link.href = "/WSOA3028A_1830290/blogs/" + cards[blogIndex].link;
                link.innerText = cards[blogIndex].title;
                dropdownMenu.appendChild(link);
            }
            //Divider
            let divider = document.createElement('div');
            divider.setAttribute('class', 'dropdown-divider');
            dropdownMenu.appendChild(divider);

            let mainLink = document.createElement('a');
            mainLink.setAttribute('class', 'dropdown-item');
            mainLink.href = "/WSOA3028A_1830290/" + links[index] + "index.html";
            mainLink.innerText = 'See more...';
            dropdownMenu.appendChild(mainLink);

            item.appendChild(dropdownMenu);
            list.appendChild(item);


            list.appendChild(item);
        } else {
            let item = document.createElement('li');
            item.setAttribute('class', (index == active) ? 'nav-item active' : 'nav-item');
            let link = document.createElement('a');
            link.setAttribute('class', 'nav-link');
            link.href = "/WSOA3028A_1830290/" + links[index] + "index.html";;
            link.innerText = linkName[index];
            if (index == active) {
                let activeSpan = document.createElement('span');
                activeSpan.setAttribute('class', 'sr-only');
                activeSpan.innerText = "(current)"
                link.appendChild(activeSpan);
            }
            item.appendChild(link);
            list.appendChild(item);

        }

    }


    navbarContainer.appendChild(list);
    document.getElementById("navbar").appendChild(navbarContainer);
}

function insertFooter() {
    document.getElementsByTagName("footer")[0].innerHTML +=
        '<p>Copyright &copy; 2020 Suzzi Inc. Ltd.</p>';
}

function insertBlogNav() {

    let path = window.location.pathname;
    let blogNum = path.substring(path.lastIndexOf('/') + 5);
    blogNum = parseInt(blogNum.substring(0, blogNum.lastIndexOf('.')));

    let blogNav = document.getElementsByClassName("blogNav")[0];


    /*
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

    
    */
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
    return `
    <a class="card" style="width: 18rem;" href = "`+ card.link + `">
        <img class="card-img-top" src="`+ card.image + `" alt="` + card.imageAlt + `">
        <div class="card-body">
            <h5 class="card-title">`+ card.title + `</h5>
            <p class="card-text">`+ card.text + `</p>
        </div>
    </a>`
    /*
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
        */
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