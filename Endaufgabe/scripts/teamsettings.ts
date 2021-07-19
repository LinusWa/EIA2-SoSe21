namespace Endabgabe {
    export interface ICellOptions {
        rowspan?: number;
        th?: boolean;
    }
    
    export class Teamsettings {
        public static pickteamcolors(): string[] {

            let homecolor: FormDataEntryValue | null;
            let awaycolor: FormDataEntryValue | null;
            let homestring: string;
            let awaystring: string;
            let colors: string[] = [];
            
            let formData: FormData = new FormData(document.forms[0]); 

            homecolor = formData.get("Heim");
            awaycolor = formData.get("Auswärts");
            homestring = homecolor?.toString()!;
            awaystring = awaycolor?.toString()!;

            colors.push(homestring, awaystring);

            return colors;
        }

        // createRow und createCell erstellen je Reihen und Zellen für die Tabelle in der sich die Auswechselspieler befinden.
        
        private static createRow(...cells: HTMLTableCellElement[]): HTMLTableRowElement {
            const tr: HTMLTableRowElement = document.createElement("tr");
            cells.forEach((c) => {
                tr.appendChild(c);
            });
            return tr;
        }

        private static createCell(element: HTMLElement, options: ICellOptions = {
            rowspan: 1,
            th: false
        }): HTMLTableCellElement {
            const td: HTMLTableCellElement = document.createElement(options?.th ? "th" : "td");
            td.appendChild(element);
            if (options) {
                const r: number | "" = options?.rowspan || "";
                td.setAttribute("rowspan", r?.toString());
            }
            return td;
        }

        public homesubs(players: Player[]): void {
            const body: HTMLElement | null = document.getElementById("homesubs");
            if (!body) { return; }

            body.innerHTML = "";
            const homeSubstitutes: Player[] = players.filter((p) => p.getTeam() === 1 && !p.isPlaying());
            // Aus allen Spielern werden die gefiltert, die im Heimteam sind und nicht Spielen

            const rowCount: number = homeSubstitutes.length;
            const rows: HTMLTableRowElement[] = [];
            // Auswechselspieler werden in Tabelle angezeigt

            for (let i: number = 0; i < rowCount; i++) {
                const row: HTMLTableRowElement = Teamsettings.createRow(
                    Teamsettings.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 1), homeSubstitutes[i], () => this.homesubs(players)))
                );
                rows.push(row);
                body.appendChild(row);
                // Für jeden Spieler wird eine neue Reihe erstellt
            }
        }
        
        public awaysubs(players: Player[]): void {
            const body: HTMLElement | null = document.getElementById("awaysubs");
            if (!body) { return; }

            body.innerHTML = "";
            const awaySubstitutes: Player[] = players.filter((p) => p.getTeam() === 2 && !p.isPlaying());

            const rowCount: number = awaySubstitutes.length;
            const rows: HTMLTableRowElement[] = [];

            for (let i: number = 0; i < rowCount; i++) {
                const row: HTMLTableRowElement = Teamsettings.createRow(
                    Teamsettings.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 2), awaySubstitutes[i], () => this.awaysubs(players)))
                );
                rows.push(row);
                body.appendChild(row);
            }
        }
        

      
        private createDraggableElement(players: Player[], player: Player, cb: () => void): HTMLSpanElement {
            const s: HTMLSpanElement = document.createElement("span");
            s.style.width = `${2 * player.getRadius()}px`;
            s.style.height = `${2 * player.getRadius()}px`;
            s.classList.add("sub");
            s.innerHTML = player?.getPlayerNumber().toString();

            s.style.background = Teamsettings.pickteamcolors()[player.getTeam() - 1];
            // Farbaktualisierung der Auswechselspieler

            // HTML Elemente bekommen Attribut draggable
            s.setAttribute("draggable", "true");

            // Eventlistener triggert wenn Spieler auf anderen Spieler gedragt wird
            s.addEventListener("dragend", (e: DragEvent) => {

                // Mausposition wird ermittelt u. verglichen, wenn Maus innerhalb des Radius des Spielers liegt wird true ausgegeben
                const p: Player | undefined = players.filter((p) => p.isPlaying()).find((p) => {
                    const v: Vector = new Vector(
                        canvas.getBoundingClientRect().x + p.getPosition().X,
                        canvas.getBoundingClientRect().y + p.getPosition().Y
                    );
                    return distance(v, new Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0;
                });

                // Wenn p = true dann wird Getauscht
                if (p) {
                    
                    p.setPlaying(false);
                    player.setPlaying(true);

                    // Neuer Spieler bekommt (taktische) Position des gewechselten 
                    player.setSpawn(new Vector(p.getSpawn().X, p.getSpawn().Y));

                    // Neuer Spieler bekommt aktuelle Position
                    player.setPosition(new Vector(p.getPosition().X, p.getPosition().Y));

                    cb();
                }
            });
            return s;
            
        }
        
    }
}