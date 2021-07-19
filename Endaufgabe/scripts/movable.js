"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Movable {
        constructor(_position) {
            this.position = _position;
            this.pace = 1;
            this.paceLevel = 1;
            this.slowDown = false;
            this.radius = 2;
        }
        // Getter und Setter
        setColor(color) {
            this.color = color;
        }
        getRadius() {
            return this.radius * Endabgabe.scale;
        }
        setRadius(radius) {
            this.radius = radius;
        }
        setTarget(target) {
            this.target = target;
        }
        getTarget() {
            return this.target;
        }
        getPosition() {
            return this.position;
        }
        setPosition(position) {
            this.position = position;
        }
        getPace() {
            return this.pace;
        }
        setPace(pace) {
            this.pace = pace;
        }
        move(target) {
            // Funktion für die Bewegung der Figuren
            const dif = new Endabgabe.Vector(target.X - this.position.X, target.Y - this.position.Y);
            // Skalarprodukt für Bewegung in alle Richtungen
            const vectorLength = Math.sqrt(Math.pow(dif.X, 2) + Math.pow(dif.Y, 2));
            if (vectorLength === 0) {
                return;
            }
            const paceLevel = this.paceLevel * (this.pace / 100);
            // Bei Klassen die langsamer Werden (Ball) wird hier verlangsamt.
            const pace = this.slowDown ? paceLevel * (vectorLength / 100) : paceLevel;
            const scaleFactor = pace / vectorLength;
            dif.scale(scaleFactor);
            this.position.add(dif);
        }
    }
    Endabgabe.Movable = Movable;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=movable.js.map