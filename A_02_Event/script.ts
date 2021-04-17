window.addEventListener("load", handleLoad);

var button: HTMLElement = document.querySelector("button")!;

function handleLoad(_event: Event): void {

    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("click", logInfo);
    document.addEventListener("keyup", logInfo);
    document.addEventListener("riseup", ConsoleOutput);
    button.addEventListener("click", DOMrise);

}

function setInfoBox(_event: MouseEvent): void {
    
    let x: number = _event.pageX;
    let y: number = _event.pageY;

    var span: HTMLElement = <HTMLElement> document.querySelector("span");

    let pos: HTMLElement = span;

    pos.style.top = (y + 10) + "px";
    pos.style.left = (x + 7) + "px";
    pos.textContent = "X = " + x + " | Y = " + y + " | " + _event.target;

}

function logInfo (_event: Event): void {

    console.log(_event.target);
    console.log(_event.type);
    console.log(_event.currentTarget);
    console.log(_event);

}

var buttonClickEvent: CustomEvent = new CustomEvent("dom", {
    detail: null
});

function DOMrise(_event: Event): void {
    document.dispatchEvent(buttonClickEvent);
}

function ConsoleOutput(_event: Event): void {
    console.log(_event);
   }
