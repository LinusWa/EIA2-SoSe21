namespace L11_BlumenwieseAdvanced {

    export abstract class Flower  { 

        protected centerx: number;
        protected centery: number;
        protected radius: number;
        protected nectar: number = 0;

        constructor(_centerx: number, _centery: number, _radius: number) {
        this.centerx = _centerx;
        this.centery = _centery;
        this.radius = _radius;
        }

        flowerstem(centerx: number, centery: number): void {
            let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!; 
            crc2.fillStyle = "darkgreen"; 
            crc2.beginPath();
            crc2.moveTo(centerx - 5, centery);
    
            if (this.coinflip() == true)
            crc2.lineTo(centerx + Math.random() * 20, centery - 50 * Math.random() + 150);
            else
            crc2.lineTo(centerx - Math.random() * 20, centery - 50 * Math.random() + 150);
    
    
            crc2.lineTo(centerx + 5, centery);
            crc2.closePath();
            crc2.fill();
        }

        coinflip(): boolean {
            let flip: number = Math.random();
            let result: boolean;
            if (flip >= 0.5)
                result = true;
            else
                result = false;
    
            return result;
        }

        getRandomColor(): string { // Colorgenerator von Stackoverflow, hätte ich aber auch selbst hinbekommen.
        
            let letters: string = "0123456789ABCDEF";
            let color: string = "#";
            
            for (let i: number = 0; i < 6; i++) {
    
              color += letters[Math.floor(Math.random() * 16)];
            
            }
    
            return color;
        }
        increaseNectar(): void {
            // console.log(this.nectar);
            crc2.fillStyle = "darkgray";
            crc2.fillRect(20, 20, 100, 20);

            crc2.fillStyle = "orange";
            crc2.fillRect(20, 20, this.nectar, 20);
                   
            this.nectar += 0.02;
            if (this.nectar >= 100)
            this.nectar = 100;


        }
        roundflower(): void {
            //
        }

        tulip(): void {
            //
        }
         
    }

    export class Roundflower extends Flower {
        constructor(_centerx: number, _centery: number, _radius: number) {
        super(_centerx, _centery, _radius);
        }

        roundflower(): void {
            let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;

            crc2.save();
    
            let centerx: number = Math.random() * crc2.canvas.width;
            let centery: number = Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height;
            let radius: number = 5 * Math.random() + 5;
            this.flowerstem(centerx, centery);
    
            crc2.fillStyle = this.getRandomColor();
    
            crc2.beginPath();
            crc2.arc(centerx + radius, centery + radius, radius * 2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
    
            crc2.beginPath();
            crc2.arc(centerx + radius, centery - radius, radius * 2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
    
            crc2.beginPath();
            crc2.arc(centerx - radius, centery + radius, radius * 2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
    
            crc2.beginPath();
            crc2.arc(centerx - radius, centery - radius, radius * 2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
    
            crc2.fillStyle = this.getRandomColor();
            crc2.beginPath();
            crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();

            crc2.restore();

        }
    }

    export class Tulip extends Flower {
        constructor(_centerx: number, _centery: number, _radius: number) {
        super(_centerx, _centery, _radius);
        }

        tulip(): void {

            let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;

            crc2.save();

    
            let centerx: number = Math.random() * crc2.canvas.width;
            let centery: number = Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height;
            let radius: number = 10 * Math.random() + 10;
    
            this.flowerstem(centerx, centery);
    
            crc2.fillStyle = this.getRandomColor();
            crc2.beginPath();
            crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
    
            crc2.moveTo(centerx - radius, centery);
            crc2.lineTo(centerx - radius, centery - radius * 2);
            crc2.lineTo(centerx, centery - radius);
            crc2.lineTo(centerx + radius, centery - radius * 2);
            crc2.lineTo(centerx + radius, centery);
            crc2.closePath();
            crc2.fill();
            
            crc2.restore();

        }

    }
}