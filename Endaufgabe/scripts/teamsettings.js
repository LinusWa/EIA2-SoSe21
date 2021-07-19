"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Teamsettings {
        static pickteamcolors() {
            let homecolor;
            let awaycolor;
            let homestring;
            let awaystring;
            let colors = [];
            let formData = new FormData(document.forms[0]);
            homecolor = formData.get("Heim");
            awaycolor = formData.get("Auswärts");
            homestring = homecolor?.toString();
            awaystring = awaycolor?.toString();
            colors.push(homestring, awaystring);
            return colors;
        }
        // createRow und createCell erstellen je Reihen und Zellen für die Tabelle in der sich die Auswechselspieler befinden.
        static createRow(...cells) {
            const tr = document.createElement("tr");
            cells.forEach((c) => {
                tr.appendChild(c);
            });
            return tr;
        }
        static createCell(element, options = {
            rowspan: 1,
            th: false
        }) {
            const td = document.createElement(options?.th ? "th" : "td");
            td.appendChild(element);
            if (options) {
                const r = options?.rowspan || "";
                td.setAttribute("rowspan", r?.toString());
            }
            return td;
        }
        homesubs(players) {
            const body = document.getElementById("homesubs");
            if (!body) {
                return;
            }
            body.innerHTML = "";
            const homeSubstitutes = players.filter((p) => p.getTeam() === 1 && !p.isPlaying());
            // Aus allen Spielern werden die gefiltert, die im Heimteam sind und nicht Spielen
            const rowCount = homeSubstitutes.length;
            const rows = [];
            // Auswechselspieler werden in Tabelle angezeigt
            for (let i = 0; i < rowCount; i++) {
                const row = Teamsettings.createRow(Teamsettings.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 1), homeSubstitutes[i], () => this.homesubs(players))));
                rows.push(row);
                body.appendChild(row);
                // Für jeden Spieler wird eine neue Reihe erstellt
            }
        }
        awaysubs(players) {
            const body = document.getElementById("awaysubs");
            if (!body) {
                return;
            }
            body.innerHTML = "";
            const awaySubstitutes = players.filter((p) => p.getTeam() === 2 && !p.isPlaying());
            const rowCount = awaySubstitutes.length;
            const rows = [];
            for (let i = 0; i < rowCount; i++) {
                const row = Teamsettings.createRow(Teamsettings.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 2), awaySubstitutes[i], () => this.awaysubs(players))));
                rows.push(row);
                body.appendChild(row);
            }
        }
        createDraggableElement(players, player, cb) {
            const s = document.createElement("span");
            s.style.width = `${2 * player.getRadius()}px`;
            s.style.height = `${2 * player.getRadius()}px`;
            s.classList.add("sub");
            s.innerHTML = player?.getPlayerNumber().toString();
            s.style.background = Teamsettings.pickteamcolors()[player.getTeam() - 1];
            // Farbaktualisierung der Auswechselspieler
            // HTML Elemente bekommen Attribut draggable
            s.setAttribute("draggable", "true");
            // Eventlistener triggert wenn Spieler auf anderen Spieler gedragt wird
            s.addEventListener("dragend", (e) => {
                // Mausposition wird ermittelt u. verglichen, wenn Maus innerhalb des Radius des Spielers liegt wird true ausgegeben
                const p = players.filter((p) => p.isPlaying()).find((p) => {
                    const v = new Endabgabe.Vector(Endabgabe.canvas.getBoundingClientRect().x + p.getPosition().X, Endabgabe.canvas.getBoundingClientRect().y + p.getPosition().Y);
                    return Endabgabe.distance(v, new Endabgabe.Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0;
                });
                // Wenn p = true dann wird Getauscht
                if (p) {
                    p.setPlaying(false);
                    player.setPlaying(true);
                    // Neuer Spieler bekommt (taktische) Position des gewechselten 
                    player.setSpawn(new Endabgabe.Vector(p.getSpawn().X, p.getSpawn().Y));
                    // Neuer Spieler bekommt aktuelle Position
                    player.setPosition(new Endabgabe.Vector(p.getPosition().X, p.getPosition().Y));
                    cb();
                }
            });
            return s;
        }
    }
    Endabgabe.Teamsettings = Teamsettings;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=teamsettings.js.map