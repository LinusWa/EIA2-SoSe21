namespace Endabgabe {
    export class Slider {
        // Wertenbereich von den drei Attributen der Spieler.
        public static getShootingRange(): number[] {
            var minShooting: string = (<HTMLInputElement>document.getElementById("input-left-shooting")).value;
            var maxShooting: string = (<HTMLInputElement>document.getElementById("input-right-shooting")).value;
            var shooting: number[] = [];
            
            let min: number = parseInt(minShooting);
            let max: number = parseInt(maxShooting);
            // Werte aus Slider


            (<HTMLInputElement>document.getElementById("input-right-shooting")).addEventListener("input", Slider.shootingRight);
            (<HTMLInputElement>document.getElementById("input-left-shooting")).addEventListener("input", Slider.shootingLeft);
            // Da Zwei Slider übereinander liegen müssen die Werte in einen künstlichen Slider übertragen werden, der das ganze anzeigt und steuert.


            shooting.push(min, max);
            // Array speichert Minimum und Maximum, für Zufallsgenerator
            return shooting;
        }

        public static shootingLeft(): void {
            var thumbLeft: HTMLElement = (<HTMLElement>document.querySelector(".shooting-slider > .thumb.left"));
            var range: HTMLElement = (<HTMLElement>document.querySelector(".shooting-slider > .range"));

            let allowedvalues: number = Math.min(Slider.getShootingRange()[0], Slider.getShootingRange()[1] - 1);
            // Linker Knopf darf nicht über den rechten hinaus

            thumbLeft.innerHTML = allowedvalues.toString();
            // Werte werden in den Knopf reingeschrieben

            thumbLeft.style.left = allowedvalues + "%";
            range.style.left = allowedvalues + "%";
            // Range und Knopf werden dem Wert des tatsächlichen Sliders angepasst

        }
        public static shootingRight(): void {
            var thumbRight: HTMLElement = (<HTMLElement>document.querySelector(".shooting-slider > .thumb.right"));
            var range: HTMLElement = (<HTMLElement>document.querySelector(".shooting-slider > .range"));

            let allowedvalues: number = Math.max(Slider.getShootingRange()[1], Slider.getShootingRange()[0] + 1);
            thumbRight.innerHTML = allowedvalues.toString();
            // Rechte Knopf darf nicht über linken hinaus

            thumbRight.style.right = 100 - allowedvalues + "%";
            range.style.right = 100 - allowedvalues + "%";


        }
        public static getPaceRange(): number[] {
            var minPace: string = (<HTMLInputElement>document.getElementById("input-left-pace")).value;
            var maxPace: string = (<HTMLInputElement>document.getElementById("input-right-pace")).value;
            var pace: number[] = [];
            
            let min: number = parseInt(minPace);
            let max: number = parseInt(maxPace);


            (<HTMLInputElement>document.getElementById("input-right-pace")).addEventListener("input", Slider.paceRight);
            (<HTMLInputElement>document.getElementById("input-left-pace")).addEventListener("input", Slider.paceLeft);


            pace.push(min, max);
            return pace;
        }

        public static paceLeft(): void {
            var thumbLeft: HTMLElement = (<HTMLElement>document.querySelector(".pace-slider > .thumb.left"));
            var range: HTMLElement = (<HTMLElement>document.querySelector(".pace-slider > .range"));

            let allowedvalues: number = Math.min(Slider.getPaceRange()[0], Slider.getPaceRange()[1] - 1);
            thumbLeft.innerHTML = allowedvalues.toString();

            thumbLeft.style.left = allowedvalues + "%";
            range.style.left = allowedvalues + "%";

        }
        public static paceRight(): void {
            var thumbRight: HTMLElement = (<HTMLElement>document.querySelector(".pace-slider > .thumb.right"));
            var range: HTMLElement = (<HTMLElement>document.querySelector(".pace-slider > .range"));

            let allowedvalues: number = Math.max(Slider.getPaceRange()[1], Slider.getPaceRange()[0] + 1);
            thumbRight.innerHTML = allowedvalues.toString();

            thumbRight.style.right = 100 - allowedvalues + "%";
            range.style.right = 100 - allowedvalues + "%";


        }
        
        public static getPowerRange(): number[] {
            var minPower: string = (<HTMLInputElement>document.getElementById("input-left-power")).value;
            var maxPower: string = (<HTMLInputElement>document.getElementById("input-right-power")).value;
            var power: number[] = [];
            
            let min: number = parseInt(minPower);
            let max: number = parseInt(maxPower);


            (<HTMLInputElement>document.getElementById("input-right-power")).addEventListener("input", Slider.powerRight);
            (<HTMLInputElement>document.getElementById("input-left-power")).addEventListener("input", Slider.powerLeft);


            power.push(min, max);
            return power;
        }

        public static powerLeft(): void {
            var thumbLeft: HTMLElement = (<HTMLElement>document.querySelector(".power-slider > .thumb.left"));
            var range: HTMLElement = (<HTMLElement>document.querySelector(".power-slider > .range"));

            let allowedvalues: number = Math.min(Slider.getPowerRange()[0], Slider.getPowerRange()[1] - 1);
            thumbLeft.innerHTML = allowedvalues.toString();

            thumbLeft.style.left = allowedvalues + "%";
            range.style.left = allowedvalues + "%";

        }
        public static powerRight(): void {
            var thumbRight: HTMLElement = (<HTMLElement>document.querySelector(".power-slider > .thumb.right"));
            var range: HTMLElement = (<HTMLElement>document.querySelector(".power-slider > .range"));

            let allowedvalues: number = Math.max(Slider.getPowerRange()[1], Slider.getPowerRange()[0] + 1);
            thumbRight.innerHTML = allowedvalues.toString();

            thumbRight.style.right = 100 - allowedvalues + "%";
            range.style.right = 100 - allowedvalues + "%";


        }



    }
}

