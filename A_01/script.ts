namespace Poem {

    let names: string [] = ["Tim", "Tom", "Tina", "Thomas", "Theresa", "Tanja"];
    let verbs: string[] = ["verabscheut", "vergöttert", "verspeist", "vergisst", "vernachlässigt", "verliert"];
    let objects: string [] = ["Aprikosen", "Spirituosen", "Fruktosen", "Turnhosen", "Matrosen", "Steckdosen"];

    function forloop ( _arrayName: string []): void {
        for (let i: number = _arrayName.length; i >= 1; i--) {
            let verse: string = getVerse(names, verbs, objects);
            console.log(verse);
        }
    } 

    
    forloop(names);
    forloop(verbs); 
    forloop(objects);

    function getVerse (names1: string [], verbs1: string [], objects1: string []): string {

        let randomSubject: number = Math.floor(Math.random() * names1.length);
        let randomVerb: number = Math.floor(Math.random() * verbs1.length);
        let randomObject: number = Math.floor(Math.random() * objects1.length);

        let verse: string = names1[randomSubject] + " " +   verbs1[ randomVerb] + " " +  objects1[ randomObject] + ".";

        names1.splice(randomSubject, 1);
        verbs1.splice(randomVerb, 1);
        objects1.splice(randomObject, 1);
  
        return verse; 

    }

    
}

