namespace Endabgabe {

    export class Referee extends Movable {
        constructor(_position: Vector) {
            super(
                new Vector(_position.X, _position.Y)
            );
            this.target = new Vector(_position.X, _position.Y);
        }

        public draw(): void {
            crc2.save();

            crc2.fillStyle = "#ccff00";
            crc2.lineWidth = 3 / 7 * scale;
            crc2.strokeStyle = "black";

            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.stroke();
            
            crc2.restore();
        }
    }
}
