namespace Endabgabe {

    export class Pitch {

        private padding: number;

        private goalWidth: number = 15 * scale;

        private penaltyArea: number = 16 * scale;

        private thickness: number = 3 / 7 * scale;

        constructor() {
            this.setPadding(10);
        }

        // Canvas Zeichnung des Spielfelds
        draw(): void {
            crc2.save();

            // Ganzes Feld
            crc2.fillStyle = "green";
            crc2.strokeStyle = "white";
            crc2.lineWidth = this.thickness;
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

            // Außenlinie
            crc2.beginPath();
            crc2.rect(this.getPadding(), this.getPadding(), this.getWidth(), this.getHeight());
            crc2.closePath();
            crc2.stroke();

            // Mittellinie u. Kreis
            crc2.beginPath();
            crc2.moveTo((this.getWidth() * 0.5) + this.getPadding(), this.getPadding());
            crc2.lineTo((this.getWidth() * 0.5) + this.getPadding(), this.getPadding() + this.getHeight());
            crc2.closePath();
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.getWidth() * 0.5 + this.getPadding(), this.getHeight() * 0.5 + this.getPadding(), 10 * scale, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.stroke();

            
            // Strafraum u. Tor rechts
            crc2.beginPath();
            crc2.rect(this.getWidth() + this.getPadding() - this.penaltyArea, this.getPadding() + this.getHeight() * 0.5 - this.penaltyArea, this.penaltyArea, this.penaltyArea * 2);
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.rect(this.getWidth() + this.getPadding(), this.getPadding() + this.getHeight() * 0.5 - this.goalWidth * 0.5, this.goalWidth * 0.5, this.goalWidth);
            crc2.stroke();
            crc2.closePath();

            // Strafraum u. Tor links
            crc2.beginPath();
            crc2.rect(this.getPadding(), this.getPadding() + this.getHeight() * 0.5 - this.penaltyArea, this.penaltyArea, this.penaltyArea * 2);
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.rect(this.getPadding() - this.goalWidth * 0.5, this.getPadding() + this.getHeight() * 0.5 - this.goalWidth * 0.5, this.goalWidth * 0.5, this.goalWidth);
            crc2.stroke();
            crc2.closePath();

            crc2.restore();
        }

        // Torüberprüfung

        team1Goal(ball: Ball): boolean {
            if (ball.getPosition().X < this.getPadding() && ball.getPosition().Y > this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2) && ball.getPosition().Y < this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2)) {
                return true;
            }
            else
            return false;
        }

        team2Goal(ball: Ball): boolean {
            if (ball.getPosition().X > this.getPadding() + this.getWidth() && ball.getPosition().Y > this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2) && ball.getPosition().Y < this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2)) {
                return true;
            }
            else
            return false;
        }
        
        
        // Überprüft ob der Ball im Aus ist
        ballOut(ball: Ball): boolean {
            if (ball.getPosition().X < this.getPadding() || ball.getPosition().X > this.getPadding() + this.getWidth() || ball.getPosition().Y < this.getPadding() || ball.getPosition().Y > this.getPadding() + this.getHeight()) {
                return true;
            }
            else
            return false;
        }


        public setPadding(padding: number): void {
            this.padding = padding;
        }

        public getPadding(): number {
            return this.padding * scale;
        }

        public getWidth(): number {
            return ((window.innerWidth - this.getPadding()) * 0.5);
        }

        public getHeight(): number {
            return ((window.innerHeight - this.getPadding()) * 0.45);
        }

    }
}