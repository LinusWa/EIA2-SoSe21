"use strict";
window.addEventListener("load", handleLoading);
var stepper = document.getElementById("stepper");
var slider = document.getElementById("slider");
var backgroundColor = document.getElementById("backgroundColor");
var backColor = document.getElementById("cardColor");
var fontColor = document.getElementById("fontColor");
var radioButton1 = document.getElementById("radio1");
var radioButton2 = document.getElementById("radio2");
var radioButton3 = document.getElementById("radio3");
var button = document.getElementById("startButton");
var formElement = document.getElementById("formElement");
function handleLoading() {
    button.addEventListener("click", startMemory);
}
function startMemory() {
    formElement.style.visibility = "hidden";
    var settings = userSettings();
    var cardNumber = settings.cardamount;
    let board = document.createElement("div");
    board.id = "board";
    board.classList.add("board");
    document.body.appendChild(board);
    var cards = [
        {
            back: "black",
            front: "A"
        },
        {
            back: "black",
            front: "B"
        },
        {
            back: "black",
            front: "C"
        },
        {
            back: "black",
            front: "D"
        },
        {
            back: "black",
            front: "E"
        },
        {
            back: "black",
            front: "F"
        },
        {
            back: "black",
            front: "G"
        },
        {
            back: "black",
            front: "H"
        },
        {
            back: "black",
            front: "I"
        },
        {
            back: "black",
            front: "J"
        },
        {
            back: "black",
            front: "K"
        },
        {
            back: "black",
            front: "L"
        },
        {
            back: "black",
            front: "M"
        },
        {
            back: "black",
            front: "N"
        },
        {
            back: "black",
            front: "O"
        },
        {
            back: "black",
            front: "P"
        },
        {
            back: "black",
            front: "Q"
        },
        {
            back: "black",
            front: "R"
        },
        {
            back: "black",
            front: "S"
        },
        {
            back: "black",
            front: "T"
        },
        {
            back: "black",
            front: "U"
        },
        {
            back: "black",
            front: "V"
        },
        {
            back: "black",
            front: "W"
        },
        {
            back: "black",
            front: "X"
        },
        {
            back: "black",
            front: "Y"
        },
        {
            back: "black",
            front: "Z"
        }
    ];
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    function userSettings() {
        let formData = new FormData(document.forms[0]);
        let settings = {
            cardamount: 5,
            cardsize: 10,
            cardbackcolor: "black",
            cardcolor: "white",
            cardtextcolor: "black",
            cardfont: "Arial"
        };
        for (let entry of formData) {
            console.log(entry);
            var cardamount = formData.get("Stepper");
            settings.cardamount = parseInt(cardamount.toString());
            var cardsize = formData.get("Slider");
            settings.cardsize = parseInt(cardsize.toString());
            var cardbackcolor = formData.get("background");
            settings.cardbackcolor = cardbackcolor.toString();
            var cardcolor = formData.get("cardback");
            settings.cardcolor = cardcolor.toString();
            var cardtextcolor = formData.get("fontcolor");
            settings.cardtextcolor = cardtextcolor.toString();
            var cardfont = formData.get("Radio1");
            settings.cardfont = cardfont.toString();
        }
        return settings;
    }
    var cardStorage = [];
    for (let i = 0; i < cardNumber; i++) {
        cardStorage.push(cards[i]);
        cardStorage.push(cards[i]);
    }
    shuffle(cardStorage);
    for (let i = 0; i < cardStorage.length; i++) {
        createCard(cardStorage[i], settings.cardsize, settings.cardbackcolor, settings.cardcolor, settings.cardtextcolor, settings.cardfont);
    }
}
let clickedCards = [];
var playingCards = [];
let clickable = true;
function createCard(_card, _cardSize, _backgroundColor, _cardColor, _fontColor, _fontType) {
    let board = document.getElementById("board");
    board.style.backgroundColor = _backgroundColor;
    let front = document.createElement("div");
    front.classList.add("front");
    front.innerHTML = _card.front;
    front.style.color = _fontColor;
    front.style.fontFamily = _fontType;
    front.style.width = _cardSize + "px";
    front.style.height = _cardSize + "px";
    board.appendChild(front);
    let back = document.createElement("div");
    backColor.classList.add("back");
    back.style.backgroundColor = _cardColor;
    back.style.width = _cardSize + "px";
    back.style.height = _cardSize + "px";
    board.appendChild(back);
    playingCards.push({
        front: front,
        back: back
    });
    let card = {
        front: front,
        back: back
    };
    playingCards.push(card);
    back.addEventListener("click", function () {
        if (clickable == false) {
            return;
        }
        back.style.display = "none";
        front.style.display = "block";
        clickedCards.push(card);
        if (clickedCards.length == 1) {
            return;
        }
        var card1 = clickedCards[0];
        var card2 = clickedCards[1];
        if (clickedCards.length == 2) {
            clickable = false;
            var checkPairs = checkPair(clickedCards[0], clickedCards[1]);
            if (checkPairs == true) {
                setTimeout(function () {
                    card1.front.style.display = "none";
                    card2.front.style.display = "none";
                    card1.back.style.display = "none";
                    card2.back.style.display = "none";
                    playingCards.splice(playingCards.indexOf(card1), 1);
                    playingCards.splice(playingCards.indexOf(card2), 1);
                    clickable = true;
                }, 2000);
            }
            if (checkPairs == false) {
                setTimeout(function () {
                    card1.back.style.display = "block";
                    card2.back.style.display = "block";
                    card1.front.style.display = "none";
                    card2.front.style.display = "none";
                    clickable = true;
                }, 2000);
            }
            clickedCards = [];
        }
    });
}
function checkPair(first, second) {
    return first.front.innerHTML === second.front.innerHTML;
}
//# sourceMappingURL=script.js.map