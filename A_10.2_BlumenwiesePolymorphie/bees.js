"use strict";
var L10_2_BlumenwiesePolymorphie;
(function (L10_2_BlumenwiesePolymorphie) {
    class Bee extends L10_2_BlumenwiesePolymorphie.Moving {
        constructor(_posX, _posY, _velX, _velY) {
            super(_posX, _posY, _velX, _velY);
        }
        draw() {
            L10_2_BlumenwiesePolymorphie.crc2.save();
            L10_2_BlumenwiesePolymorphie.crc2.translate(this.posX, this.posY);
            // Body
            L10_2_BlumenwiesePolymorphie.crc2.beginPath();
            L10_2_BlumenwiesePolymorphie.crc2.fillStyle = "yellow";
            L10_2_BlumenwiesePolymorphie.crc2.ellipse(100, 100, 25, 15, 0, 0, 2 * Math.PI);
            L10_2_BlumenwiesePolymorphie.crc2.closePath();
            L10_2_BlumenwiesePolymorphie.crc2.fill();
            // Wings
            L10_2_BlumenwiesePolymorphie.crc2.fillStyle = "ghostwhite";
            L10_2_BlumenwiesePolymorphie.crc2.beginPath();
            L10_2_BlumenwiesePolymorphie.crc2.ellipse(100, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            L10_2_BlumenwiesePolymorphie.crc2.closePath();
            L10_2_BlumenwiesePolymorphie.crc2.fill();
            L10_2_BlumenwiesePolymorphie.crc2.beginPath();
            L10_2_BlumenwiesePolymorphie.crc2.ellipse(100 + 10, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            L10_2_BlumenwiesePolymorphie.crc2.closePath();
            L10_2_BlumenwiesePolymorphie.crc2.fill();
            // Eye
            L10_2_BlumenwiesePolymorphie.crc2.fillStyle = "maroon";
            L10_2_BlumenwiesePolymorphie.crc2.beginPath();
            L10_2_BlumenwiesePolymorphie.crc2.arc(100 - 20, 100 - 5, 2, 0, 2 * Math.PI);
            L10_2_BlumenwiesePolymorphie.crc2.closePath();
            L10_2_BlumenwiesePolymorphie.crc2.fill();
            L10_2_BlumenwiesePolymorphie.crc2.restore();
        }
        move() {
            // Wenn die Biene out of bounds fliegt dreht sie um
            if (this.posY > L10_2_BlumenwiesePolymorphie.crc2.canvas.height * 0.9 || this.posY < L10_2_BlumenwiesePolymorphie.crc2.canvas.height * 0.30) {
                this.velY = -this.velY;
            }
            this.posY += this.velY;
            if (this.posX > L10_2_BlumenwiesePolymorphie.crc2.canvas.width || this.posX < 0) {
                this.velX = -this.velX;
            }
            this.posX += this.velX;
            this.draw();
        }
    }
    L10_2_BlumenwiesePolymorphie.Bee = Bee;
})(L10_2_BlumenwiesePolymorphie || (L10_2_BlumenwiesePolymorphie = {}));
//# sourceMappingURL=bees.js.map