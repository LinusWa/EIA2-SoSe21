// Wenn ich auf Probleme gestoßen bin, habe ich im Internet oder bei Kommilitonen nachgeschaut, um meine eigene Fehlerquellen zu identifizieren. :)

namespace Canvas {

    let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!; // ! heißt, kann nicht null sein (für compiler)

    window.addEventListener("load", handleLoad);


    function handleLoad(): void {
    
        crc2.canvas.width = 1280;
        crc2.canvas.height = 720;
        let primarycolor: string = "black";
        crc2.fillStyle = primarycolor;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        makeArt();

    }

   
    function makeArt(): void {

        // Background: 

        randomSquares();
        arcStuff();
        randomSquares();
  
        // Main:

        let radis: number[] = centerEllipse();
        centerTriangles(radis);
    }

   
    function randomSquares(): void {

        for (let i: number = 0; i < Math.random() * 100 + 20; i++) {
            
            let width1: number = Math.random() * crc2.canvas.width;
            let width2: number = Math.random() * width1;
        
            let height1: number = Math.random() * crc2.canvas.height;
            let height2: number = Math.random() * height1;
            
            crc2.fillStyle = getRandomColor();
            crc2.fillRect(width1, height1, width2, height2);
        }
    }

    
    function getRandomColor(): string { // Colorgenerator von Stackoverflow, hätte ich aber auch selbst hinbekommen.
        
        let letters: string = "0123456789ABCDEF";
        let color: string = "#";
        
        for (let i: number = 0; i < 6; i++) {

          color += letters[Math.floor(Math.random() * 16)];
        
        }

        return color;
    }
    
    
    function arcStuff(): void {
        
        for (let i: number = 0; i < 100; i++) {
            
            crc2.fillStyle = getRandomColor();
            crc2.strokeStyle = "white";
            crc2.beginPath();
            
            crc2.arc(Math.random() * crc2.canvas.width, Math.random() * crc2.canvas.height, Math.random() * 100, 0, Math.random() * 2 * Math.PI);
            
            crc2.closePath();
            
            if (coinflip() == true)
                crc2.stroke();
            else
                crc2.fill();
        }
    }

    
    function centerEllipse(): number[] {

        let radiusX: number = Math.random() * 500 + 100;
        let radiusY: number = Math.random() * 200 + 100;
        let left: number = crc2.canvas.width / 2;
        let top: number = crc2.canvas.height / 2;
        
        let radis: number[] = [radiusX, radiusY];
      
        
        crc2.fillStyle = getRandomColor();
        crc2.ellipse(left, top, radiusX, radiusY, 0, 0, 360);
        crc2.fill();
        crc2.stroke();
        
        return radis;
    }

    
    function centerTriangles(_radi: number[]): void {

        for (let i: number = 0; i < 20; i++) {
            let minX: number = 640 - _radi[0] * 0.7 * Math.random();
            let maxX: number = 640 + _radi[0] * 0.7 * Math.random();
            let minY: number = 360 - _radi[1] * 0.7 * Math.random();
            let maxY: number = 360 + _radi[1] * 0.7 * Math.random();

            if (coinflip() == true) {
                crc2.beginPath();
                crc2.moveTo(minX, minY);
                crc2.lineTo(maxX, minY);
                crc2.lineTo(maxX, maxY);
                crc2.closePath();

                crc2.fillStyle = "white";
                crc2.fill();
            }

            else {
                crc2.beginPath();
                crc2.moveTo(minX, maxY);
                crc2.lineTo(maxX, maxY);
                crc2.lineTo(maxX, minY);
                crc2.closePath();

                crc2.fillStyle = getRandomColor();
                crc2.fill();

            }
        }
    }


    function coinflip(): boolean {
        let flip: number = Math.random();
        let result: boolean;
        if (flip >= 0.5)
            result = true;
        else
            result = false;

        return result;
    }

}