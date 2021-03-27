"use strict";
var Poem;
(function (Poem) {
    let names = ["Tim", "Tom", "Tina", "Thomas", "Theresa", "Tanja"];
    let verbs = ["verabscheut", "vergöttert", "verspeist", "vergisst", "vernachlässigt", "verliert"];
    let objects = ["Aprikosen", "Spirituosen", "Fruktosen", "Turnhosen", "Matrosen", "Steckdosen"];
    function forloop(_arrayName) {
        for (let i = _arrayName.length; i >= 1; i--) {
            let verse = getVerse(names, verbs, objects);
            console.log(verse);
        }
    }
    forloop(names);
    forloop(verbs);
    forloop(objects);
    function getVerse(names1, verbs1, objects1) {
        let randomSubject = Math.floor(Math.random() * names1.length);
        let randomVerb = Math.floor(Math.random() * verbs1.length);
        let randomObject = Math.floor(Math.random() * objects1.length);
        let verse = names1[randomSubject] + " " + verbs1[randomVerb] + " " + objects1[randomObject] + ".";
        names1.splice(randomSubject, 1);
        verbs1.splice(randomVerb, 1);
        objects1.splice(randomObject, 1);
        return verse;
    }
})(Poem || (Poem = {}));
//# sourceMappingURL=script.js.map