namespace Farm {

    export class Animals {
        name: string;
        sound: string;
        food: string;
        amount: number;

        constructor(_name: string, _sound: string, _food: string, _amount: number) {
            this.name = _name;
            this.sound = _sound;
            this.food = _food;
            this.amount = _amount;
        }
    

        songoutput(): void {
        console.log("Old MacDonald had a farm Ee-i-ee-i-o \n" + "And on his farm he had some " + this.name + " Ee-i-ee-i-o\n" + "With a " + this.sound + " here and a " + this.sound + " there\nHere a " + this.sound + " there a " + this.sound + " everywhere a " + this.sound + "-" + this.sound);
                }

        eatoutput(): void {
            console.log("The " + this.name + " eats " + this.amount + " " + this.food + ".");
        }
    }
}