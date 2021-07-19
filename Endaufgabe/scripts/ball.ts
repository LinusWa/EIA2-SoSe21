namespace Endabgabe {
    
    export class Ball extends Movable {
        protected pace: number = 0;
        protected paceLevel: number = 10;

        constructor(_spawn: Vector) {
            super(_spawn);
            this.slowDown = true;
            this.radius = 1.5;
        }


        public draw(): void {
            crc2.save();

            crc2.fillStyle = "white";
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";

            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.stroke();

            crc2.restore();
        }
    }
}