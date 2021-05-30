namespace L09_BlumenwieseClasses {

    export class Cloud {
    
        posX: number;
        posY: number;
    
        velX: number = Math.random() * 2 + 1;
        velY: number = Math.random() * 0.3 + 0.1;
    
        constructor (_posY: number, _posX: number) {
            this.posY = _posY;
            this.posX = _posX;
                      
        }
    
    
        draw(): void {

            let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;
            crc2.save();
            crc2.translate(this.posX, this.posY);
            
            let radius: number = 40;
        
            crc2.fillStyle = "aliceblue";
        
            let centerx: number = 0;
            let centery: number = 0;
        
            crc2.beginPath();
            crc2.arc(centerx, centery, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
        
            let radius2: number = radius * 0.5;
            let centerx2: number = centerx + 3 * radius;
        
            crc2.beginPath();
            crc2.arc(centerx2, centery + radius - radius2, radius2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
        
            crc2.beginPath();
            crc2.moveTo(centerx, centery + radius);
            crc2.lineTo(centerx2, centery + radius);
            crc2.lineTo(centerx2, centery +  radius - 2 * radius2);
            crc2.lineTo(centerx, centery +  radius - 2 * radius2);
            crc2.closePath();
            crc2.fill();
        
            crc2.restore();  
        }
        
        
        move(): void {

            // Wenn die Wolke out of bounds fliegt dreht sie um
        
            if (this.posY > crc2.canvas.height * 0.40 || this.posY < 100) {
                this.velY = -this.velY;
            }

            this.posY += this.velY;

            if (this.posX > crc2.canvas.width || this.posX < 0) {
                this.velX = -this.velX;
            }
        
            this.posX += this.velX;
            
            
            this.draw();
        }
    }
        
    }