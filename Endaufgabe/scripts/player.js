"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Player extends Endabgabe.Movable {
        constructor(_name, _position, _power, _shooting, _pace, _color, _team, _playerNumber) {
            super(new Endabgabe.Vector(_position.X, _position.Y));
            this.pace = 99;
            this.shooting = 99;
            this.power = 99;
            this.name = "";
            this.actionRadius = 20;
            this.spawn = new Endabgabe.Vector(0, 0);
            this.name = _name;
            this.color = _color;
            this.pace = _pace;
            this.shooting = _shooting;
            this.power = _power;
            this.team = _team;
            this.playerNumber = _playerNumber;
            this.playing = true;
            this.spawn = new Endabgabe.Vector(_position.X, _position.Y);
        }
        // Getter und Setter für Bestimmen und Verändern von Attributen der Spieler
        getPlayerNumber() {
            return this.playerNumber;
        }
        setPlayerNumber(playerNumber) {
            this.playerNumber = playerNumber;
        }
        isPlaying() {
            return this.playing;
        }
        setPlaying(playing) {
            this.playing = playing;
        }
        getTeam() {
            return this.team;
        }
        setTeam(team) {
            this.team = team;
        }
        getColor() {
            return this.color;
        }
        setColor(color) {
            this.color = color;
        }
        setPower(power) {
            this.power = power;
        }
        setShooting(shooting) {
            this.shooting = shooting;
        }
        getShooting() {
            return this.shooting;
        }
        getPower() {
            return this.power;
        }
        getName() {
            return this.name;
        }
        setName(name) {
            this.name = name;
        }
        getActionRadius() {
            return this.actionRadius * Endabgabe.scale;
        }
        getSpawn() {
            return this.spawn;
        }
        setSpawn(spawn) {
            this.spawn = spawn;
        }
        getPosition() {
            return this.position;
        }
        // Spieler wird auf den Canvas gemalt
        draw() {
            Endabgabe.crc2.save();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.lineWidth = 3 / 7 * Endabgabe.scale;
            Endabgabe.crc2.strokeStyle = "black";
            Endabgabe.crc2.textBaseline = "middle";
            Endabgabe.crc2.textAlign = "center";
            Endabgabe.crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe.crc2.fillStyle = this.color;
            Endabgabe.crc2.fill();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.fillStyle = "white";
            Endabgabe.crc2.fillText(this.getPlayerNumber().toString(), this.position.X, this.position.Y);
            Endabgabe.crc2.restore();
        }
    }
    Endabgabe.Player = Player;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=player.js.map