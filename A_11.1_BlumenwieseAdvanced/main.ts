namespace L11_BlumenwieseAdvanced {

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement;

    window.addEventListener("load", handleLoad);
    

    // let bees: Bee[] = [];
    // let clouds: Cloud[] = [];
    let moving: Moving[] = [];
    let imageData: ImageData;
    let flowers: Flower[] = [];

    function handleLoad(): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    
        flowercanvas();

    }

    function flowercanvas(): void {

        
        if (coinflip() == true)
        daytime();
        else
        nighttime();

        mountainsandgrass();
        for (let i: number = 0; i < 75; i++) {
        let roundflower: Flower = <Flower> new Roundflower(Math.random() * crc2.canvas.width, Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height, 5 * Math.random() + 5);
        let tulip: Flower = <Flower> new Tulip(Math.random() * crc2.canvas.width, Math.random() * 0.5 * crc2.canvas.height + 0.5 * crc2.canvas.height, 10 * Math.random() + 10);
        roundflower.roundflower();
        tulip.tulip();
        flowers.push(roundflower, tulip);
        
        if (i % 10 == 0)
        newCloud(); 
        }

        newBee();

        imageData =  crc2.getImageData(0, 0, window.innerWidth, window.innerHeight);
        animate();

   
        
    }

    function daytime(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;
        
        // Sky

        crc2.canvas.width = window.innerWidth;
        crc2.canvas.height = window.innerHeight;
        crc2.fillStyle = "deepskyblue";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        // Sun

        crc2.fillStyle = "khaki";
        crc2.beginPath();
        crc2.arc(Math.random() * crc2.canvas.width, Math.random() * 0.25 * crc2.canvas.height, Math.random() * 50 + 50, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();

    }

    function nighttime(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;
        
        // Sky

        crc2.canvas.width = window.innerWidth;
        crc2.canvas.height = window.innerHeight;
        crc2.fillStyle = "midnightblue";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        // Stars

        crc2.fillStyle = "white";
        for (let i: number = 0; i < Math.random() * 100 + 50; i++) {
            crc2.beginPath();
            crc2.arc(Math.random() * crc2.canvas.width, Math.random() * 0.5 * crc2.canvas.height, Math.random() * 5 + 1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
        }

        // Moon

        crc2.fillStyle = "lightyellow";
        crc2.beginPath();
        crc2.arc(Math.random() * crc2.canvas.width, Math.random() * 0.25 * crc2.canvas.height, Math.random() * 50 + 50, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();

    }

    function mountainsandgrass(): void {

        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;
        
        // grass

        crc2.fillStyle = "limegreen";
        crc2.fillRect(0, 0.5 * crc2.canvas.height, crc2.canvas.width, crc2.canvas.height);

        // mountains

        crc2.fillStyle = "lightsteelblue";

        for (let i: number = 0; i < 2000; i += 200) {

        crc2.beginPath();
        crc2.moveTo(i, 0.5 * crc2.canvas.height + 15);
        crc2.lineTo(i + 125, i * 0.1 * Math.random() + 0.25 * crc2.canvas.height);
        crc2.lineTo(i + 250, 0.5 * crc2.canvas.height + 15);
        crc2.closePath();
        crc2.fill();

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


    function newBee(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;

        for (let index: number = 0; index < 20; index ++) {

            let velX: number = Math.random() * 3;
            if (coinflip() == true)
            velX = -velX;
            let velY: number = Math.random() * 3;
          
            moving.push(<Moving> new Bee(crc2.canvas.width / 2, crc2.canvas.height / 2, velX, velY));
        }
    }

    function newCloud(): void {
   
        moving.push(<Moving> new Cloud(100, 100, Math.random() * 2 + 1, Math.random() * 0.3 + 0.1));

    }

/*
Diese Funktion hatte ich in 09.2 von Huu Thien. 
*/
    function animate(): void {
        requestAnimationFrame(animate);
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imageData, 0, 0);
        for (let index: number = 0; index < moving.length; index ++) {
            moving[index].move();
            
        }
        for (let index: number = 0; index < flowers.length; index++) {
            flowers[index].increaseNectar();
        }

        /* for (let index: number = 0; index < clouds.length; index ++) {
            clouds[index].move();
        } */
    }
}