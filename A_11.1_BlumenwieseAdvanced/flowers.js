"use strict";
var L11_BlumenwieseAdvanced;
(function (L11_BlumenwieseAdvanced) {
    class Flower {
        constructor(_centerx, _centery, _radius) {
            this.nectar = 0;
            this.centerx = _centerx;
            this.centery = _centery;
            this.radius = _radius;
        }
        flowerstem(centerx, centery) {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            crc2.fillStyle = "darkgreen";
            crc2.beginPath();
            crc2.moveTo(centerx - 5, centery);
            if (this.coinflip() == true)
                crc2.lineTo(centerx + Math.random() * 20, centery - 50 * Math.random() + 150);
            else
                crc2.lineTo(centerx - Math.random() * 20, centery - 50 * Math.random() + 150);
            crc2.lineTo(centerx + 5, centery);
            crc2.closePath();
            crc2.fill();
        }
        coinflip() {
            let flip = Math.random();
            let result;
            if (flip >= 0.5)
                result = true;
            else
                result = false;
            return result;
        }
        getRandomColor() {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        increaseNectar() {
            // console.log(this.nectar);
            L11_BlumenwieseAdvanced.crc2.fillStyle = "darkgray";
            L11_BlumenwieseAdvanced.crc2.fillRect(20, 20, 100, 20);
            L11_BlumenwieseAdvanced.crc2.fillStyle = "orange";
            L11_BlumenwieseAdvanced.crc2.fillRect(20, 20, this.nectar, 20);
            this.nectar += 0.02;
            if (this.nectar >= 100)
                this.nectar = 100;
        }
        roundflower() {
            //
        }
        tulip() {
            //
        }
    }
    L11_BlumenwieseAdvanced.Flower = Flower;
    class Roundflower extends Flower {
        constructor(_centerx, _centery, _radius) {
            super(_centerx, _centery, _radius);
        }
        roundflower() {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            crc2.save();
            let centerx = Math.random() * crc2.canvas.width;
            let centery = Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height;
            let radius = 5 * Math.random() + 5;
            this.flowerstem(centerx, centery);
            crc2.fillStyle = this.getRandomColor();
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
            crc2.fillStyle = this.getRandomColor();
            crc2.beginPath();
            crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
    L11_BlumenwieseAdvanced.Roundflower = Roundflower;
    class Tulip extends Flower {
        constructor(_centerx, _centery, _radius) {
            super(_centerx, _centery, _radius);
        }
        tulip() {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            crc2.save();
            let centerx = Math.random() * crc2.canvas.width;
            let centery = Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height;
            let radius = 10 * Math.random() + 10;
            this.flowerstem(centerx, centery);
            crc2.fillStyle = this.getRandomColor();
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
            crc2.restore();
        }
    }
    L11_BlumenwieseAdvanced.Tulip = Tulip;
})(L11_BlumenwieseAdvanced || (L11_BlumenwieseAdvanced = {}));
//# sourceMappingURL=flowers.js.map