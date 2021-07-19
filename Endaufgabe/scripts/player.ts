namespace Endabgabe {

    export class Player extends Movable {

        // Spieler ist Unterklasse von Movable und hat verschieden Attribute

        protected color: string;
        protected pace: number = 99;
        protected shooting: number = 99;
        protected power: number = 99;
        protected name: string = "";
        private actionRadius: number = 20;
        private playerNumber: number;
        private team: number;
        private playing: boolean;
        private spawn: Vector = new Vector(0, 0);

        

        constructor(_name: string, _position: Vector, _power: number, _shooting: number, _pace: number, _color: string, _team: number, _playerNumber: number) {
            super(
                new Vector(_position.X, _position.Y)
            );
            this.name = _name;
            this.color = _color;
            this.pace = _pace;
            this.shooting = _shooting;
            this.power = _power;
            this.team = _team;
            this.playerNumber = _playerNumber;
            this.playing = true;


            this.spawn = new Vector(_position.X, _position.Y);
        }

        // Getter und Setter für Bestimmen und Verändern von Attributen der Spieler

        public getPlayerNumber(): number {
            return this.playerNumber;
        }

        public setPlayerNumber(playerNumber: number): void {
            this.playerNumber = playerNumber;
        }

        public isPlaying(): boolean {
            return this.playing;
        }

        public setPlaying(playing: boolean): void {
            this.playing = playing;
        }

        public getTeam(): number {
            return this.team;
        }

        public setTeam(team: number): void {
            this.team = team;
        }

        public getColor(): string {
            return this.color;
        }

        public setColor(color: string): void {
            this.color = color;
        }

        public setPower(power: number): void {
            this.power = power;
        }

        public setShooting(shooting: number): void {
            this.shooting = shooting;
        }

        public getShooting(): number {
            return this.shooting;
        }

        public getPower(): number {
            return this.power;
        }

        public getName(): string {
            return this.name;
        }

        public setName(name: string): void {
            this.name = name;
        }

        public getActionRadius(): number {
            return this.actionRadius * scale;
        }

        public getSpawn(): Vector {
            return this.spawn;
        }

        public setSpawn(spawn: Vector): void {
            this.spawn = spawn;
        }
        getPosition(): Vector {
            return this.position;            
        }



        // Spieler wird auf den Canvas gemalt
        public draw(): void {
            crc2.save();

            crc2.beginPath();

            crc2.lineWidth = 3 / 7 * scale;
            crc2.strokeStyle = "black";
            crc2.textBaseline = "middle";
            crc2.textAlign = "center";

            crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.stroke();
            crc2.fillStyle = "white";
            crc2.fillText(this.getPlayerNumber().toString(), this.position.X, this.position.Y);

            crc2.restore();
        }


    }
}
