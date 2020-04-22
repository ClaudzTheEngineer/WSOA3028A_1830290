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
    insertBlogNav(isBlog);
}