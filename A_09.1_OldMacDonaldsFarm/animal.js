"use strict";
var Farm;
(function (Farm) {
    class Animals {
        constructor(_name, _sound, _food, _amount) {
            this.name = _name;
            this.sound = _sound;
            this.food = _food;
            this.amount = _amount;
        }
        songoutput() {
            console.log("Old MacDonald had a farm Ee-i-ee-i-o \n" + "And on his farm he had some " + this.name + " Ee-i-ee-i-o\n" + "With a " + this.sound + " here and a " + this.sound + " there\nHere a " + this.sound + " there a " + this.sound + " everywhere a " + this.sound + "-" + this.sound);
        }
        eatoutput() {
            console.log("The " + this.name + " eats " + this.amount + " " + this.food + ".");
        }
    }
    Farm.Animals = Animals;
})(Farm || (Farm = {}));
//# sourceMappingURL=animal.js.map