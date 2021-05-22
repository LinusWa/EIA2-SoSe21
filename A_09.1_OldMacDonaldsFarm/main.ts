// Wenn ich auf Probleme gestoßen bin, habe ich im Internet oder bei Kommilitonen nachgeschaut, um meine eigene Fehlerquellen zu identifizieren. :)

/* 
Leider funktioniert das Skript nicht ohne defer, da sonst die Variablendeklaration nicht rechtzeitig stattfindet. Wenn ich die Variablen mit in handleLoad schreibe
sind sie allerdings nicht mehr global deklariert und die newday Funktion kennt diese nicht mehr. Wie würde ich dieses Problem lösen? Muss ich dann alle Variablen in der 
newday Funktion als Parameter deklarieren oder gibt's da eine einfachere Methode?
*/

namespace Farm {

    let nextdaybutton: HTMLButtonElement = document.querySelector("button")!;
    nextdaybutton.addEventListener("click", newday);

    let animal1: Animals =  new Animals("pig", "Oink", "corn", 2);
    let animal2: Animals =  new Animals("cow", "Moo", "grass", 5);
    let animal3: Animals =  new Animals("horse", "Hee-haw", "carrots", 3);
    let animal4: Animals =  new Animals("duck", "Quack", "seeds", 15);
    let animal5: Animals =  new Animals("cat", "Meow", "mice", 1);
    let day: number = 1;
    let corn: number = 20;
    let grass: number = 200;
    let carrot: number = 30;
    let seeds: number = 300;
    let mice: number = 15;

    window.addEventListener("load", handleLoad);



    function handleLoad(): void {

    newday();
    
    }

    function newday(): void {

        console.log("\n%cDay " + day + " begins...\n", "color: green");
    
        animal1.songoutput();
        corn = corn - animal1.amount;
        if (corn >= 0) {
            animal1.eatoutput();
            console.log("There are " + corn + " " + animal1.food + " left.");
        }
        else 
            console.log("Oh no! The " + animal1.name + " has nothing to eat!");


        animal2.songoutput();
        grass = grass - animal2.amount;
        if (grass >= 0) {
            animal2.eatoutput();
            console.log("There are " + grass + " " + animal2.food + " left.");
        }
        else 
            console.log("Oh no! The " + animal2.name + " has nothing to eat!");


        animal3.songoutput();
        carrot = carrot - animal3.amount;
        if (carrot >= 0) {
            animal3.eatoutput();
            console.log("There are " + carrot + " " + animal3.food + " left.");
        }
        else 
            console.log("Oh no! The " + animal3.name + " has nothing to eat!");


        animal4.songoutput();
        seeds = seeds - animal4.amount;
        if (seeds >= 0) {
            animal4.eatoutput();
            console.log("There are " + seeds + " " + animal4.food + " left.");
        }
        else 
            console.log("Oh no! The " + animal4.name + " has nothing to eat!");
    

        animal5.songoutput();
        mice = mice - animal5.amount;
        if (mice >= 0) {
            animal5.eatoutput();
            console.log("There are " + mice + " " + animal5.food + " left.");
        }
        else 
            console.log("Oh no! The " + animal5.name + " has nothing to eat!");

        day++;
    }   



}