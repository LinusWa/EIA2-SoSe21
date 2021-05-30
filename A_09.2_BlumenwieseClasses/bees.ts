namespace L09_BlumenwieseClasses {

    export class Bee {

        posX: number;
        posY: number;
    
        velX: number;
        velY: number;
               
        constructor(_posX: number, _posY: number, _velX: number, _velY: number) {
            this.posX = _posX;
            this.posY = _posY;
            this.velX = _velX;
            this.velY = _velY;
            
        }
    
        draw(): void {
    
            crc2.save();
            crc2.translate(this.posX, this.posY);            
     
            // Body

            crc2.beginPath();
            crc2.fillStyle = "yellow";
            crc2.ellipse(100, 100, 25, 15, 0, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();

            // Wings
    
            crc2.fillStyle = "ghostwhite";
    
            crc2.beginPath();
            crc2.ellipse(100, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
    
            crc2.beginPath();
            crc2.ellipse(100 + 10, 100 - 10, 5, 10, 0, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();

            // Eye
    
            crc2.fillStyle = "maroon";
            crc2.beginPath();
            crc2.arc(100 - 20, 100 - 5, 2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
        
            crc2.restore();
           
        }
     
        move(): void {

            // Wenn die Biene out of bounds fliegt dreht sie um
            if (this.posY > crc2.canvas.height * 0.9 || this.posY < crc2.canvas.height * 0.30) {
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