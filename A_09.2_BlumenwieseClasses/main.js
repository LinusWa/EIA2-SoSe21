"use strict";
/*
In dieser Aufgabe bin ich auf relativ viele Probleme gestoßen. Habe mir relativ viele verschiedene
Abgaben von Kommolitonen angeschaut, und versucht deren Code nachzuvollziehen und dann meine eigene
Lösung zusammenzubasteln. Die meiner Ansicht nach beste Lösung hab ich bei Huu Thien gefunden, und mich
daran orientiert.

Das erstellen und bewegen der Bienen und Wolken hat relativ problemlos geklappt, aber das tatsächliche
animieren auf dem Canvas habe ich nicht hinbekommen. Ich habe dann Huu Thien gefragt, mit seiner animate
Funktion hats dann funktioniert.

*/
var L09_BlumenwieseClasses;
(function (L09_BlumenwieseClasses) {
    window.addEventListener("load", handleLoad);
    let bees = [];
    let clouds = [];
    let imageData;
    function handleLoad() {
        L09_BlumenwieseClasses.canvas = document.querySelector("canvas");
        L09_BlumenwieseClasses.crc2 = L09_BlumenwieseClasses.canvas.getContext("2d");
        flowercanvas();
    }
    function flowercanvas() {
        if (coinflip() == true)
            daytime();
        else
            nighttime();
        mountainsandgrass();
        for (let i = 0; i < 75; i++) {
            roundflower();
            tulip();
            if (i % 10 == 0)
                newCloud();
        }
        newBee();
        imageData = L09_BlumenwieseClasses.crc2.getImageData(0, 0, window.innerWidth, window.innerHeight);
        animate();
    }
    function daytime() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        // Sky
        crc2.canvas.width = window.innerWidth;
        crc2.canvas.height = window.innerHeight;
        crc2.fillStyle = "deepskyblue";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        // Sun
        crc2.fillStyle = "khaki";
        crc2.beginPath();
        crc2.arc(Math.random() * crc2.canvas.width, Math.random() * 0.25 * crc2.canvas.height, Math.random() * 50 + 50, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function nighttime() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        // Sky
        crc2.canvas.width = window.innerWidth;
        crc2.canvas.height = window.innerHeight;
        crc2.fillStyle = "midnightblue";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        // Stars
        crc2.fillStyle = "white";
        for (let i = 0; i < Math.random() * 100 + 50; i++) {
            crc2.beginPath();
            crc2.arc(Math.random() * crc2.canvas.width, Math.random() * 0.5 * crc2.canvas.height, Math.random() * 5 + 1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
        }
        // Moon
        crc2.fillStyle = "lightyellow";
        crc2.beginPath();
        crc2.arc(Math.random() * crc2.canvas.width, Math.random() * 0.25 * crc2.canvas.height, Math.random() * 50 + 50, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function mountainsandgrass() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        // grass
        crc2.fillStyle = "limegreen";
        crc2.fillRect(0, 0.5 * crc2.canvas.height, crc2.canvas.width, crc2.canvas.height);
        // mountains
        crc2.fillStyle = "lightsteelblue";
        for (let i = 0; i < 2000; i += 200) {
            crc2.beginPath();
            crc2.moveTo(i, 0.5 * crc2.canvas.height + 15);
            crc2.lineTo(i + 125, i * 0.1 * Math.random() + 0.25 * crc2.canvas.height);
            crc2.lineTo(i + 250, 0.5 * crc2.canvas.height + 15);
            crc2.closePath();
            crc2.fill();
        }
    }
    function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function roundflower() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let centerx = Math.random() * crc2.canvas.width;
        let centery = Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height;
        let radius = 5 * Math.random() + 5;
        flowerstem(centerx, centery);
        crc2.fillStyle = getRandomColor();
        crc2.beginPath();
        crc2.arc(centerx + radius, centery + radius, radius * 2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.arc(centerx + radius, centery - radius, radius * 2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.arc(centerx - radius, centery + radius, radius * 2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.arc(centerx - radius, centery - radius, radius * 2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = getRandomColor();
        crc2.beginPath();
        crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function coinflip() {
        let flip = Math.random();
        let result;
        if (flip >= 0.5)
            result = true;
        else
            result = false;
        return result;
    }
    function flowerstem(centerx, centery) {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        crc2.fillStyle = "darkgreen";
        crc2.beginPath();
        crc2.moveTo(centerx - 5, centery);
        if (coinflip() == true)
            crc2.lineTo(centerx + Math.random() * 20, centery - 50 * Math.random() + 150);
        else
            crc2.lineTo(centerx - Math.random() * 20, centery - 50 * Math.random() + 150);
        crc2.lineTo(centerx + 5, centery);
        crc2.closePath();
        crc2.fill();
    }
    function tulip() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let centerx = Math.random() * crc2.canvas.width;
        let centery = Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height;
        let radius = 10 * Math.random() + 10;
        flowerstem(centerx, centery);
        crc2.fillStyle = getRandomColor();
        crc2.beginPath();
        crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.moveTo(centerx - radius, centery);
        crc2.lineTo(centerx - radius, centery - radius * 2);
        crc2.lineTo(centerx, centery - radius);
        crc2.lineTo(centerx + radius, centery - radius * 2);
        crc2.lineTo(centerx + radius, centery);
        crc2.closePath();
        crc2.fill();
    }
    function newBee() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        for (let index = 0; index < 20; index++) {
            let velX = Math.random() * 3;
            if (coinflip() == true)
                velX = -velX;
            let velY = Math.random() * 3;
            bees.push(new L09_BlumenwieseClasses.Bee(crc2.canvas.width / 2, crc2.canvas.height / 2, velX, velY));
        }
    }
    function newCloud() {
        clouds.push(new L09_BlumenwieseClasses.Cloud(100, 100));
    }
    /*
    Diese Funktion habe ich von Huu Thien.
    */
    function animate() {
        requestAnimationFrame(animate);
        L09_BlumenwieseClasses.crc2.clearRect(0, 0, L09_BlumenwieseClasses.crc2.canvas.width, L09_BlumenwieseClasses.crc2.canvas.height);
        L09_BlumenwieseClasses.crc2.putImageData(imageData, 0, 0);
        for (let index = 0; index < bees.length; index++) {
            bees[index].move();
        }
        for (let index = 0; index < clouds.length; index++) {
            clouds[index].move();
        }
    }
})(L09_BlumenwieseClasses || (L09_BlumenwieseClasses = {}));
//# sourceMappingURL=main.js.map