"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Assistant extends Endabgabe.Movable {
        setTargetFn(cb) {
            this.targetFn = cb;
        }
        getTargetFn() {
            return this.targetFn();
        }
        // per Canvas gemalt
        draw() {
            Endabgabe.crc2.save();
            Endabgabe.crc2.fillStyle = "#ccff00";
            Endabgabe.crc2.lineWidth = 3 / 7 * Endabgabe.scale;
            Endabgabe.crc2.strokeStyle = "black";
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe.crc2.fill();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.restore();
        }
    }
    Endabgabe.Assistant = Assistant;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=assistant.js.map