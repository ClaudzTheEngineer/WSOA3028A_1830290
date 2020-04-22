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
        ("blog1.html",
            "../images/Vannevar_Bush_portrait.jpg",
            "Portrait of Vannevar Bush",
            "As we may retroactively think",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog2.html",
            "../images/Arpanet_logical_map.png",
            "Logical Map of Arpanet circa 1977",
            "The Internet's First Hello World",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog3.html",
            "../images/dadWithGun.jpg",
            "Giovanni at War",
            "cout &lt;&lt; \"Hello World\";",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog4.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Semantics of Semantic Markup",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog5.html",
            "../images/Henry-Cat2.jpg",
            "Henry the Cat",
            "Meta Meta-data blog post",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog6.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Communication Ideas - Speculation",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog7.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog8.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog9.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
            "Lorem ipsum blah blah fish paste..."),
    new Card
        ("blog10.html",
            "../images/PlaceHolder.png",
            "Placeholder",
            "Placeholder",
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