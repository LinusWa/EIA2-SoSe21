"use strict";
var L11_BlumenwieseAdvanced;
(function (L11_BlumenwieseAdvanced) {
    class Bee extends L11_BlumenwieseAdvanced.Moving {
        constructor(_posX, _posY, _velX, _velY) {
            super(_posX, _posY, _velX, _velY);
        }
        draw() {
            L11_BlumenwieseAdvanced.crc2.save();
            L11_BlumenwieseAdvanced.crc2.translate(this.posX, this.posY);
            // Body
            L11_BlumenwieseAdvanced.crc2.beginPath();
            L11_BlumenwieseAdvanced.crc2.fillStyle = "yellow";
            L11_BlumenwieseAdvanced.crc2.ellipse(100, 100, 25, 15, 0, 0, 2 * Math.PI);
            L11_BlumenwieseAdvanced.crc2.closePath();
            L11_BlumenwieseAdvanced.crc2.fill();
            // Wings
            L11_BlumenwieseAdvanced.crc2.fillStyle = "ghostwhite";
            L11_BlumenwieseAdvanced.crc2.beginPath();
            L11_BlumenwieseAdvanced.crc2.ellipse(100, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            L11_BlumenwieseAdvanced.crc2.closePath();
            L11_BlumenwieseAdvanced.crc2.fill();
            L11_BlumenwieseAdvanced.crc2.beginPath();
            L11_BlumenwieseAdvanced.crc2.ellipse(100 + 10, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            L11_BlumenwieseAdvanced.crc2.closePath();
            L11_BlumenwieseAdvanced.crc2.fill();
            // Eye
            L11_BlumenwieseAdvanced.crc2.fillStyle = "maroon";
            L11_BlumenwieseAdvanced.crc2.beginPath();
            L11_BlumenwieseAdvanced.crc2.arc(100 - 20, 100 - 5, 2, 0, 2 * Math.PI);
            L11_BlumenwieseAdvanced.crc2.closePath();
            L11_BlumenwieseAdvanced.crc2.fill();
            L11_BlumenwieseAdvanced.crc2.restore();
        }
        move() {
            // Wenn die Biene out of bounds fliegt dreht sie um
            if (this.posY > L11_BlumenwieseAdvanced.crc2.canvas.height * 0.9 || this.posY < L11_BlumenwieseAdvanced.crc2.canvas.height * 0.30) {
                this.velY = -this.velY;
            }
            this.posY += this.velY;
            if (this.posX > L11_BlumenwieseAdvanced.crc2.canvas.width || this.posX < 0) {
                this.velX = -this.velX;
            }
            this.posX += this.velX;
            this.draw();
        }
    }
    L11_BlumenwieseAdvanced.Bee = Bee;
})(L11_BlumenwieseAdvanced || (L11_BlumenwieseAdvanced = {}));
//# sourceMappingURL=bees.js.map