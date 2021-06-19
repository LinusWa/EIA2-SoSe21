namespace L11_BlumenwieseAdvanced {
    
    export abstract class Moving {
        protected posX: number;
        protected posY: number;

        protected velX: number;
        protected velY: number;

        constructor(_posX: number, _posY: number, _velX: number, _velY: number) {
            this.posX = _posX;
            this.posY = _posY;
            this.velX = _velX;
            this.velY = _velY;
            
        }

        draw(): void {
            //
        }

        move(): void {
            // 
        }
    }
}