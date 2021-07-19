"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Ball extends Endabgabe.Movable {
        constructor(_spawn) {
            super(_spawn);
            this.pace = 0;
            this.paceLevel = 10;
            this.slowDown = true;
            this.radius = 1.5;
        }
        draw() {
            Endabgabe.crc2.save();
            Endabgabe.crc2.fillStyle = "white";
            Endabgabe.crc2.lineWidth = 1;
            Endabgabe.crc2.strokeStyle = "black";
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe.crc2.fill();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.restore();
        }
    }
    Endabgabe.Ball = Ball;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=ball.js.map