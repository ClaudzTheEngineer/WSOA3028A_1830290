function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML +=
        '<img src="/WSOA3028A_1830290/images/Logo128.png" alt="Logo" style="width:100px;height:100px;"></img>';
}

function generateNav() {
    document.getElementsByTagName("nav")[0].innerHTML +=
        `<ul>
            <li><a href="../index.html">Home</a></li>
            <li><a href="index.html">About</a></li>
            <li class="active"><a href="../blogs/index.html">Blogs</a></li>
            <li><a href="../contact/index.html">Contact Me</a></li>
            <li><a href="../construction/index.html">Construction Zone</a></li>
        </ul>`;
    console.log(window.location.pathname);
}


function insertElements() {
    insertHeader();
    generateNav();
}