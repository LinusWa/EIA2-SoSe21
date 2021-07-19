namespace Endabgabe {
    
    export abstract class Movable {

        // Movable enthält alle Attribute die Spieler, Ball, Linienrichter und Schiedrichter teilen
        protected position: Vector;
        protected pace: number;
        protected slowDown: boolean;
        protected paceLevel: number;
        protected target: Vector;
        protected color: string;
        protected radius: number;

        constructor(_position: Vector) {
            this.position = _position;
            this.pace = 1;
            this.paceLevel = 1;
            this.slowDown = false;
            this.radius = 2;
        }

        // Getter und Setter

        public setColor(color: string): void {
            this.color = color;
        }

        public getRadius(): number {
            return this.radius * scale;
        }

        public setRadius(radius: number): void {
            this.radius = radius;
        }

        public setTarget(target: Vector): void {
            this.target = target;
        }

        public getTarget(): Vector {
            return this.target;
        }

        public getPosition(): Vector {
            return this.position;
        }

        public setPosition(position: Vector): void {
            this.position = position;
        }


        public getPace(): number {
            return this.pace;
        }

        public setPace(pace: number): void {
            this.pace = pace;
        }

        public abstract draw(): void;


        public move(target: Vector): void {
            // Funktion für die Bewegung der Figuren
            const dif: Vector = new Vector(
                target.X - this.position.X,
                target.Y - this.position.Y
            );
            
            // Skalarprodukt für Bewegung in alle Richtungen

            const vectorLength: number = Math.sqrt(Math.pow(dif.X, 2) + Math.pow(dif.Y, 2));
            if (vectorLength === 0) { return; } 

        
            const paceLevel: number = this.paceLevel * (this.pace / 100);

            // Bei Klassen die langsamer Werden (Ball) wird hier verlangsamt.
            const pace: number = this.slowDown ? paceLevel * (vectorLength / 100) : paceLevel;

            const scaleFactor: number = pace / vectorLength;

            dif.scale(scaleFactor);

            this.position.add(dif);
        }

    }

}