"use strict";
var L09_BlumenwieseClasses;
(function (L09_BlumenwieseClasses) {
    class Bee {
        constructor(_posX, _posY, _velX, _velY) {
            this.posX = _posX;
            this.posY = _posY;
            this.velX = _velX;
            this.velY = _velY;
        }
        draw() {
            L09_BlumenwieseClasses.crc2.save();
            L09_BlumenwieseClasses.crc2.translate(this.posX, this.posY);
            // Body
            L09_BlumenwieseClasses.crc2.beginPath();
            L09_BlumenwieseClasses.crc2.fillStyle = "yellow";
            L09_BlumenwieseClasses.crc2.ellipse(100, 100, 25, 15, 0, 0, 2 * Math.PI);
            L09_BlumenwieseClasses.crc2.closePath();
            L09_BlumenwieseClasses.crc2.fill();
            // Wings
            L09_BlumenwieseClasses.crc2.fillStyle = "ghostwhite";
            L09_BlumenwieseClasses.crc2.beginPath();
            L09_BlumenwieseClasses.crc2.ellipse(100, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            L09_BlumenwieseClasses.crc2.closePath();
            L09_BlumenwieseClasses.crc2.fill();
            L09_BlumenwieseClasses.crc2.beginPath();
            L09_BlumenwieseClasses.crc2.ellipse(100 + 10, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            L09_BlumenwieseClasses.crc2.closePath();
            L09_BlumenwieseClasses.crc2.fill();
            // Eye
            L09_BlumenwieseClasses.crc2.fillStyle = "maroon";
            L09_BlumenwieseClasses.crc2.beginPath();
            L09_BlumenwieseClasses.crc2.arc(100 - 20, 100 - 5, 2, 0, 2 * Math.PI);
            L09_BlumenwieseClasses.crc2.closePath();
            L09_BlumenwieseClasses.crc2.fill();
            L09_BlumenwieseClasses.crc2.restore();
        }
        move() {
            // Wenn die Biene out of bounds fliegt dreht sie um
            if (this.posY > L09_BlumenwieseClasses.crc2.canvas.height * 0.9 || this.posY < L09_BlumenwieseClasses.crc2.canvas.height * 0.30) {
                this.velY = -this.velY;
            }
            this.posY += this.velY;
            if (this.posX > L09_BlumenwieseClasses.crc2.canvas.width || this.posX < 0) {
                this.velX = -this.velX;
            }
            this.posX += this.velX;
            this.draw();
        }
    }
    L09_BlumenwieseClasses.Bee = Bee;
})(L09_BlumenwieseClasses || (L09_BlumenwieseClasses = {}));
//# sourceMappingURL=bees.js.map