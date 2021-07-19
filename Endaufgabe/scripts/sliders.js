"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Slider {
        // Wertenbereich von den drei Attributen der Spieler.
        static getShootingRange() {
            var minShooting = document.getElementById("input-left-shooting").value;
            var maxShooting = document.getElementById("input-right-shooting").value;
            var shooting = [];
            let min = parseInt(minShooting);
            let max = parseInt(maxShooting);
            // Werte aus Slider
            document.getElementById("input-right-shooting").addEventListener("input", Slider.shootingRight);
            document.getElementById("input-left-shooting").addEventListener("input", Slider.shootingLeft);
            // Da Zwei Slider übereinander liegen müssen die Werte in einen künstlichen Slider übertragen werden, der das ganze anzeigt und steuert.
            shooting.push(min, max);
            // Array speichert Minimum und Maximum, für Zufallsgenerator
            return shooting;
        }
        static shootingLeft() {
            var thumbLeft = document.querySelector(".shooting-slider > .thumb.left");
            var range = document.querySelector(".shooting-slider > .range");
            let allowedvalues = Math.min(Slider.getShootingRange()[0], Slider.getShootingRange()[1] - 1);
            // Linker Knopf darf nicht über den rechten hinaus
            thumbLeft.innerHTML = allowedvalues.toString();
            // Werte werden in den Knopf reingeschrieben
            thumbLeft.style.left = allowedvalues + "%";
            range.style.left = allowedvalues + "%";
            // Range und Knopf werden dem Wert des tatsächlichen Sliders angepasst
        }
        static shootingRight() {
            var thumbRight = document.querySelector(".shooting-slider > .thumb.right");
            var range = document.querySelector(".shooting-slider > .range");
            let allowedvalues = Math.max(Slider.getShootingRange()[1], Slider.getShootingRange()[0] + 1);
            thumbRight.innerHTML = allowedvalues.toString();
            // Rechte Knopf darf nicht über linken hinaus
            thumbRight.style.right = 100 - allowedvalues + "%";
            range.style.right = 100 - allowedvalues + "%";
        }
        static getPaceRange() {
            var minPace = document.getElementById("input-left-pace").value;
            var maxPace = document.getElementById("input-right-pace").value;
            var pace = [];
            let min = parseInt(minPace);
            let max = parseInt(maxPace);
            document.getElementById("input-right-pace").addEventListener("input", Slider.paceRight);
            document.getElementById("input-left-pace").addEventListener("input", Slider.paceLeft);
            pace.push(min, max);
            return pace;
        }
        static paceLeft() {
            var thumbLeft = document.querySelector(".pace-slider > .thumb.left");
            var range = document.querySelector(".pace-slider > .range");
            let allowedvalues = Math.min(Slider.getPaceRange()[0], Slider.getPaceRange()[1] - 1);
            thumbLeft.innerHTML = allowedvalues.toString();
            thumbLeft.style.left = allowedvalues + "%";
            range.style.left = allowedvalues + "%";
        }
        static paceRight() {
            var thumbRight = document.querySelector(".pace-slider > .thumb.right");
            var range = document.querySelector(".pace-slider > .range");
            let allowedvalues = Math.max(Slider.getPaceRange()[1], Slider.getPaceRange()[0] + 1);
            thumbRight.innerHTML = allowedvalues.toString();
            thumbRight.style.right = 100 - allowedvalues + "%";
            range.style.right = 100 - allowedvalues + "%";
        }
        static getPowerRange() {
            var minPower = document.getElementById("input-left-power").value;
            var maxPower = document.getElementById("input-right-power").value;
            var power = [];
            let min = parseInt(minPower);
            let max = parseInt(maxPower);
            document.getElementById("input-right-power").addEventListener("input", Slider.powerRight);
            document.getElementById("input-left-power").addEventListener("input", Slider.powerLeft);
            power.push(min, max);
            return power;
        }
        static powerLeft() {
            var thumbLeft = document.querySelector(".power-slider > .thumb.left");
            var range = document.querySelector(".power-slider > .range");
            let allowedvalues = Math.min(Slider.getPowerRange()[0], Slider.getPowerRange()[1] - 1);
            thumbLeft.innerHTML = allowedvalues.toString();
            thumbLeft.style.left = allowedvalues + "%";
            range.style.left = allowedvalues + "%";
        }
        static powerRight() {
            var thumbRight = document.querySelector(".power-slider > .thumb.right");
            var range = document.querySelector(".power-slider > .range");
            let allowedvalues = Math.max(Slider.getPowerRange()[1], Slider.getPowerRange()[0] + 1);
            thumbRight.innerHTML = allowedvalues.toString();
            thumbRight.style.right = 100 - allowedvalues + "%";
            range.style.right = 100 - allowedvalues + "%";
        }
    }
    Endabgabe.Slider = Slider;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=sliders.js.map