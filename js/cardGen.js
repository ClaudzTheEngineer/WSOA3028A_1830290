function generate(size) {


    let x = document.getElementsByClassName("gridContainer")[0];

    for (i = 1; i <= size; i++) {
        x.innerHTML +=
            `<a class="card" href="blog` + i + `.html">
            <img src="../images/PlaceHolder.png" alt="avatar">
            <div class="container">
                <h2>
                    Example Title
                </h2>
                <p>
                    Lorem ipsum blah blah fish paste...
                </p>
            </div>
        </a>`;
    }

}