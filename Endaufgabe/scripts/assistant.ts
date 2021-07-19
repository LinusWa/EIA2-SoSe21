namespace Endabgabe {
    export class Assistant extends Movable {

        // Ziel des Linienrichters
        private targetFn: () => Vector;
        public setTargetFn(cb: () => Vector): void {
            this.targetFn = cb;
        }

        public getTargetFn(): Vector {
            return this.targetFn();
        }

        // per Canvas gemalt
        public draw(): void {
            crc2.save();

            crc2.fillStyle = "#ccff00";
            crc2.lineWidth = 3 / 7 * scale;
            crc2.strokeStyle = "black";

            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.getRadius() , 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.stroke();
            crc2.restore();
        }
    }
}
