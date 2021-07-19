"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Pitch {
        constructor() {
            this.goalWidth = 15 * Endabgabe.scale;
            this.penaltyArea = 16 * Endabgabe.scale;
            this.thickness = 3 / 7 * Endabgabe.scale;
            this.setPadding(10);
        }
        // Canvas Zeichnung des Spielfelds
        draw() {
            Endabgabe.crc2.save();
            // Ganzes Feld
            Endabgabe.crc2.fillStyle = "green";
            Endabgabe.crc2.strokeStyle = "white";
            Endabgabe.crc2.lineWidth = this.thickness;
            Endabgabe.crc2.fillRect(0, 0, Endabgabe.crc2.canvas.width, Endabgabe.crc2.canvas.height);
            // Außenlinie
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.rect(this.getPadding(), this.getPadding(), this.getWidth(), this.getHeight());
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.stroke();
            // Mittellinie u. Kreis
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.moveTo((this.getWidth() * 0.5) + this.getPadding(), this.getPadding());
            Endabgabe.crc2.lineTo((this.getWidth() * 0.5) + this.getPadding(), this.getPadding() + this.getHeight());
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.arc(this.getWidth() * 0.5 + this.getPadding(), this.getHeight() * 0.5 + this.getPadding(), 10 * Endabgabe.scale, 0, 2 * Math.PI);
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.stroke();
            // Strafraum u. Tor rechts
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.rect(this.getWidth() + this.getPadding() - this.penaltyArea, this.getPadding() + this.getHeight() * 0.5 - this.penaltyArea, this.penaltyArea, this.penaltyArea * 2);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.rect(this.getWidth() + this.getPadding(), this.getPadding() + this.getHeight() * 0.5 - this.goalWidth * 0.5, this.goalWidth * 0.5, this.goalWidth);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.closePath();
            // Strafraum u. Tor links
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.rect(this.getPadding(), this.getPadding() + this.getHeight() * 0.5 - this.penaltyArea, this.penaltyArea, this.penaltyArea * 2);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.rect(this.getPadding() - this.goalWidth * 0.5, this.getPadding() + this.getHeight() * 0.5 - this.goalWidth * 0.5, this.goalWidth * 0.5, this.goalWidth);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.restore();
        }
        // Torüberprüfung
        team1Goal(ball) {
            if (ball.getPosition().X < this.getPadding() && ball.getPosition().Y > this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2) && ball.getPosition().Y < this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2)) {
                return true;
            }
            else
                return false;
        }
        team2Goal(ball) {
            if (ball.getPosition().X > this.getPadding() + this.getWidth() && ball.getPosition().Y > this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2) && ball.getPosition().Y < this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2)) {
                return true;
            }
            else
                return false;
        }
        // Überprüft ob der Ball im Aus ist
        ballOut(ball) {
            if (ball.getPosition().X < this.getPadding() || ball.getPosition().X > this.getPadding() + this.getWidth() || ball.getPosition().Y < this.getPadding() || ball.getPosition().Y > this.getPadding() + this.getHeight()) {
                return true;
            }
            else
                return false;
        }
        setPadding(padding) {
            this.padding = padding;
        }
        getPadding() {
            return this.padding * Endabgabe.scale;
        }
        getWidth() {
            return ((window.innerWidth - this.getPadding()) * 0.5);
        }
        getHeight() {
            return ((window.innerHeight - this.getPadding()) * 0.45);
        }
    }
    Endabgabe.Pitch = Pitch;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=pitch.js.map