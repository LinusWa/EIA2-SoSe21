window.addEventListener("load", handleLoading);

var stepper: HTMLElement = document.getElementById("stepper")!;
var slider: HTMLElement = document.getElementById("slider")!;

var backgroundColor: HTMLElement = document.getElementById("backgroundColor")!;
var backColor: HTMLElement = document.getElementById("cardColor")!;
var fontColor: HTMLElement = document.getElementById("fontColor")!;

var radioButton1: HTMLElement = document.getElementById("radio1")!;
var radioButton2: HTMLElement = document.getElementById("radio2")!;
var radioButton3: HTMLElement = document.getElementById("radio3")!;

var button: HTMLElement = document.getElementById("startButton")!;

var formElement: any = document.getElementById("formElement");

function handleLoading(): void {   
    button.addEventListener("click", startMemory);
}

interface UserSettings {
    cardamount: number;
    cardsize: number;

    cardbackcolor: string;
    cardcolor: string;
    cardtextcolor: string;

    cardfont: string;

}

interface Card {
    back: string;
    front: string;
}

interface ClickedCards {
    front: HTMLElement;
    back: HTMLElement;
}
function startMemory(): void {

    formElement.style.visibility = "hidden";
    
    var settings: UserSettings = userSettings();

    var cardNumber: number = settings.cardamount;


    let board: HTMLElement = document.createElement("div");
    board.id = "board";
    board.classList.add("board");
    document.body.appendChild(board);

    var cards: Card [] = [
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

    function shuffle<T>(a: T[]): T[] {
    for (let i: number = a.length - 1; i > 0; i--) {
        let j: number = Math.floor(Math.random() * (i + 1));
        let x: T = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

    function userSettings(): UserSettings {
    let formData: FormData = new FormData(document.forms[0]);
    let settings: UserSettings = {
        cardamount: 5,
        cardsize: 10,

        cardbackcolor: "black",
        cardcolor: "white",
        cardtextcolor: "black",
        cardfont: "Arial"
    };
    
    for (let entry of formData) {

        console.log(entry);

        var cardamount: FormDataEntryValue = formData.get("Stepper")!;
        settings.cardamount = parseInt(cardamount.toString());
       
        var cardsize: FormDataEntryValue = formData.get("Slider")!;
        settings.cardsize = parseInt(cardsize.toString());
        
        var cardbackcolor: FormDataEntryValue = formData.get("background")!;
        settings.cardbackcolor = cardbackcolor.toString();
        var cardcolor: FormDataEntryValue = formData.get("cardback")!;
        settings.cardcolor = cardcolor.toString();
        var cardtextcolor: FormDataEntryValue = formData.get("fontcolor")!;
        settings.cardtextcolor = cardtextcolor.toString();

        var cardfont: FormDataEntryValue = formData.get("Radio1")!;
        settings.cardfont = cardfont.toString();
    }

    return settings;
}



    var cardStorage: Card [] = [];

    for (let i: number = 0; i < cardNumber; i++) {
        cardStorage.push(cards[i]);
        cardStorage.push(cards[i]);
    }
    shuffle(cardStorage);

    for (let i: number = 0; i < cardStorage.length; i++) {
        createCard(cardStorage[i], settings.cardsize, settings.cardbackcolor, settings.cardcolor, settings.cardtextcolor, settings.cardfont);
    }
}

let clickedCards: ClickedCards [] = [];

var playingCards: ClickedCards [] = [];

let clickable: boolean = true;

function createCard (_card: Card, _cardSize: Number, _backgroundColor: string, _cardColor: string, _fontColor: string, _fontType: string): void {

    let board: HTMLElement = document.getElementById("board")!;
    board.style.backgroundColor = _backgroundColor;

    let front: HTMLElement = document.createElement("div");
    front.classList.add("front");

    front.innerHTML = _card.front;
    front.style.color = _fontColor;
    front.style.fontFamily = _fontType;
    front.style.width = _cardSize + "px";
    front.style.height = _cardSize + "px";
    
    board.appendChild(front);

    let back: HTMLElement = document.createElement("div");
    backColor.classList.add("back");
    back.style.backgroundColor = _cardColor;

    back.style.width = _cardSize + "px";
    back.style.height = _cardSize + "px";

    board.appendChild(back);

    playingCards.push({
        front: front,
        back: back
    });

    let card: ClickedCards = {
        front: front,
        back: back
    };
    playingCards.push(card);

    back.addEventListener("click", function(): void {

        if (clickable == false) {
            return;
        }

        back.style.display = "none";
        front.style.display = "block";

        clickedCards.push(card);

        if (clickedCards.length == 1) {
            return;
        }

        var card1: ClickedCards = clickedCards[0];
        var card2: ClickedCards = clickedCards[1];

        if (clickedCards.length == 2) {

            clickable = false;

            var checkPairs: boolean = checkPair(clickedCards[0], clickedCards[1]);


            if (checkPairs == true) {

                setTimeout(function(): void {
                    card1.front.style.display = "none";
                    card2.front.style.display = "none";
                    card1.back.style.display = "none";
                    card2.back.style.display = "none";


                    playingCards.splice(playingCards.indexOf(card1), 1);
                    playingCards.splice(playingCards.indexOf(card2), 1);
                    clickable = true;

                },         2000);
            }

            if (checkPairs == false) {
                setTimeout(function(): void {
                    card1.back.style.display = "block";
                    card2.back.style.display = "block";
                    card1.front.style.display = "none";
                    card2.front.style.display = "none";
                    clickable = true;
                },         2000);

            }

            clickedCards = [];
        }
    });
}

function checkPair(first: ClickedCards, second: ClickedCards): boolean {
    return first.front.innerHTML === second.front.innerHTML;
}