"use strict";
var L09_BlumenwieseClasses;
(function (L09_BlumenwieseClasses) {
    class Cloud {
        constructor(_posY, _posX) {
            this.velX = Math.random() * 2 + 1;
            this.velY = Math.random() * 0.3 + 0.1;
            this.posY = _posY;
            this.posX = _posX;
        }
        draw() {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            crc2.save();
            crc2.translate(this.posX, this.posY);
            let radius = 40;
            crc2.fillStyle = "aliceblue";
            let centerx = 0;
            let centery = 0;
            crc2.beginPath();
            crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            let radius2 = radius * 0.5;
            let centerx2 = centerx + 3 * radius;
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
            crc2.restore();
        }
        move() {
            // Wenn die Biene out of bounds fliegt dreht sie um
            if (this.posY > L09_BlumenwieseClasses.crc2.canvas.height * 0.40 || this.posY < 100) {
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
    L09_BlumenwieseClasses.Cloud = Cloud;
})(L09_BlumenwieseClasses || (L09_BlumenwieseClasses = {}));
//# sourceMappingURL=clouds.js.map