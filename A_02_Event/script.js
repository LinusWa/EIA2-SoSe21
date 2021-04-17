"use strict";
window.addEventListener("load", handleLoad);
var button = document.querySelector("button");
function handleLoad(_event) {
    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("click", logInfo);
    document.addEventListener("keyup", logInfo);
    document.addEventListener("riseup", ConsoleOutput);
    button.addEventListener("click", DOMrise);
}
function setInfoBox(_event) {
    let x = _event.pageX;
    let y = _event.pageY;
    var span = document.querySelector("span");
    let pos = span;
    pos.style.top = (y + 10) + "px";
    pos.style.left = (x + 7) + "px";
    pos.textContent = "X = " + x + " | Y = " + y + " | " + _event.target;
}
function logInfo(_event) {
    console.log(_event.target);
    console.log(_event.type);
    console.log(_event.currentTarget);
    console.log(_event);
}
var buttonClickEvent = new CustomEvent("dom", {
    detail: null
});
function DOMrise(_event) {
    document.dispatchEvent(buttonClickEvent);
}
function ConsoleOutput(_event) {
    console.log(_event);
}
//# sourceMappingURL=script.js.map