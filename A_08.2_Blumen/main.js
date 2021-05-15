"use strict";
// Wenn ich auf Probleme gestoßen bin, habe ich im Internet oder bei Kommilitonen nachgeschaut, um meine eigene Fehlerquellen zu identifizieren. :)
var Blumencanvas;
(function (Blumencanvas) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
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
                clouds();
        }
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
    function clouds() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let radius = 20 * Math.random() + 30;
        crc2.fillStyle = "aliceblue";
        let centerx = Math.random() * crc2.canvas.width;
        let centery = Math.random() * 0.4 * crc2.canvas.height;
        crc2.beginPath();
        crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        let radius2 = radius * 0.2 * Math.random() + 0.5 * radius;
        let centerx2 = centerx + 2 * Math.random() * radius + 2 * radius;
        crc2.beginPath();
        crc2.arc(centerx2, centery + radius - radius2, radius2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.moveTo(centerx, centery + radius);
        crc2.lineTo(centerx2, centery + radius);
        crc2.lineTo(centerx2, centery + radius - 2 * radius2);
        crc2.lineTo(centerx, centery + radius - 2 * radius2);
        crc2.closePath();
        crc2.fill();
    }
})(Blumencanvas || (Blumencanvas = {}));
//# sourceMappingURL=main.js.map