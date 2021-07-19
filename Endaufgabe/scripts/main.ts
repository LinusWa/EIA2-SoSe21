namespace Endabgabe {

    export let scale: number = 7;

    export function randomNumber(min: number, max: number): number {
        // (Gerundete) Zufallszahl für Positionen etc.
        return Math.round(Math.random() * (max - min) + min);
    }

    export function distance(u: Vector, v: Vector): number {
        // Distanz zwischen zwei Punkten mit Skalarprodukt)
        let d: number = Math.sqrt(Math.pow(v.X - u.X, 2) +
            Math.pow(v.Y - u.Y, 2));
        return d;
    }
    
    window.addEventListener("load", handleload);

    export let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    export let crc2: CanvasRenderingContext2D;

    let scores: Score;
    let gameRunning: boolean = false;
    let time: number = 0;
    let prevTime: Date;
    let movables: Movable[] = [];
    let field: Pitch;
    let ball: Ball;
    let mousePos: Vector;
    let chasingBall: Player[] = [];
    let teamsettingsUI: Teamsettings;
    let teamcolors: string[] = [];


    function refreshSubs(): void {

        // Aktualisiert die Spieler auf der Ersatzbank, um z.B. Farbänderungen darzustellen

        teamsettingsUI.homesubs(movables.filter((l) => l instanceof Player) as Player[]);
        teamsettingsUI.awaysubs(movables.filter((l) => l instanceof Player) as Player[]);
    }


    function getCursorPos(cursor: MouseEvent): Vector {

        // Aktuelle Mausposition im Bezug Canvas wird in einem Vektor gespeichert

        var rect: DOMRect = canvas.getBoundingClientRect();
        return new Vector(
            (cursor.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            (cursor.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        );
    }


    function handleload(): void {

        // Neues Feld
        field = new Pitch();

        // Canvas wird so groß wie das Feld plus auf jeder Seite Rand
        canvas.width = field.getWidth() + (2 * field.getPadding());
        canvas.height = field.getHeight() + (2 * field.getPadding());

        // UI für Farbe und Ersatzbank
        teamsettingsUI = new Teamsettings();


        // Bei Mausbewegung wird der Vektor aktualisiert
        canvas.addEventListener("mousemove", (e) => {
            mousePos = getCursorPos(e);
        });

        // Slider für Spielerattribute werden aktualisiert, damit die Zahl sofort angezeigt werden.
        Slider.shootingLeft();
        Slider.shootingRight();
        Slider.paceLeft();
        Slider.paceRight();
        Slider.powerLeft();
        Slider.powerRight();


        // Mit Leertaste wird das Spiel gestartet
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Space") {
                continueAnimation();
            }
        });
        

        crc2 = canvas.getContext("2d")!;
        scores = new Score();

        // Spielstände werden auf 0 gesetzt.
        scores.setHomeScore(0);
        scores.setAwayScore(0);

        // Timer wird gestartet
        startClock();

        // Spiel wird erstellt
        startGame();

        // Anzeige sagt Anpfiff
        (<HTMLElement>document.getElementById("currentplayer")).innerHTML = "Anpfiff!";

        window.requestAnimationFrame(updateAnimation);

        // Startknopf statt Leertaste
        document.getElementById("start")?.addEventListener("click", () => {
            continueAnimation();
        });

        // Ersatzbank wird aktualisiert
        refreshSubs();

        // Wenn auf den Canvas geklickt wird wird der Ball gepasst
        canvas.addEventListener("click", () => {
            // Ein Spieler muss am Ball sein
            if (chasingBall?.length === 0) { return; }

            // Innerhalb des Radius bestimmt durch Genauigkeit des Spielers wird eine neue Position für den Ball bestimmt
            const randomX: number = randomNumber(-playerPrecision(), playerPrecision());
            const randomY: number = randomNumber(-playerPrecision(), playerPrecision());

            // Zu der Mausposition wird die Zufällige Zahl innerhalb des Radius gerechnet und die exakte Zielposition festgelegt.
            ball.setTarget(new Vector(mousePos.X + randomX, mousePos.Y + randomY));
        
            // Je nach Schussstärke des Spielers bekommt der Ball seine Geschwindigkeit
            ball.setPace(chasingBall[0].getPower());

            // Animation geht weiter
            continueAnimation();
        });


    }
    
    // Ungenauigkeit Basierend auf dem Genauigkeitswert des Spielers
    function playerPrecision(): number {
        return (100 - chasingBall[0].getShooting()) * scale * 0.1;
    }


    function startClock(): void {

        prevTime = new Date();
        setInterval(() => {
            // Spieluhr, läuft nur wenn die Animation nicht pausiert ist
            if (gameRunning) {
                time += new Date().getTime() - (prevTime?.getTime());
            }
            prevTime = new Date();
        },          100);
    }


    function resetBall(randomBallPosition: boolean = false): void {
        movables.forEach((p: Movable) => {
            // Im Array wird nach Ball gesucht.
            if (p instanceof Ball) {
                // Ball bekommt zufällige position
                p.setPosition(new Vector(
                    randomBallPosition ? randomNumber(field.getPadding(), field.getPadding() + field.getWidth()) : field.getPadding() + field.getWidth() / 2,
                    randomBallPosition ? randomNumber(field.getPadding(), field.getPadding() + field.getHeight()) : field.getPadding() + field.getHeight() / 2 
                ));
                // Ball wird an neue Position gesetzt
                p.setTarget(new Vector(p.getPosition().X, p.getPosition().Y));
            }
        });
        // Spiel geht weiter
        continueAnimation();
    }


    function startGame(): void {

        // Array aller Bewegenden Objekte
        movables = [];

        // Neuer Ball wird erstellt
        ball = new Ball(new Vector(field.getPadding() + (field.getWidth() / 2), field.getPadding() + (field.getHeight() / 2)));
        movables.push(ball);

        // Teams erhalten Farbe, werden erstellt
        teamcolors = Teamsettings.pickteamcolors();
        createPlayers();
        // Schieds- und Linienrichter werden erstellt.
        createReferees();

    }


    function stopAnimation(): void {
        gameRunning = false;
    }

    function continueAnimation(): void {
        gameRunning = true;
    }

    function createPlayers(): void {
        // Spieler werden zunächst nach je nach Team ins array unterteilt, damit das Array am Ende sortiert ist.
        let hometeam: Player[] = [];
        let awayteam: Player[] = [];

        // Spielfeld wird aufgeteilt, um Spielern leichter Positionen zuzuweisen
        const quarterX: number = field.getWidth() / 8;
        const quarterY: number = field.getHeight() / 8;

        // Jeder Spieler bekommt Namen, Position je nach Aufstellung, Zufällige Werte im Rahmen der Slider für Schusskraft, Genauigkeit und Geschwindigkeit, Sowie Farbe, Teamnummer und Rückennummer
        const hgk: Player = new Player("Torwart der Gastgeber", new Vector (field.getPadding(), field.getPadding() + 0.5 * field.getHeight()), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[0], 1, 1);
        hometeam.push(hgk);

        for (let i: number = 1; i <= 4; i++) {
            hometeam.push(new Player("Verteidiger der Gastgeber", new Vector (field.getWidth() + field.getPadding() - quarterX * 6.5, quarterY * i * 1.6 + field.getPadding() ), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[0], 1, 1 + i));
        }

        for (let i: number = 1; i <= 4; i++) {
            hometeam.push(new Player("Mittelfeldspieler der Gastgeber", new Vector (quarterX * 3.5 + field.getPadding(), quarterY * i * 1.6 + field.getPadding() ), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[0], 1, 5 + i));
        }

        for (let i: number = 1; i <= 2; i++) {
            hometeam.push(new Player("Angreifer der Gastgeber", new Vector (field.getWidth() + field.getPadding() - quarterX * 1, quarterY * i * 2.7 + field.getPadding()), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[0], 1, 9 + i));
        }
        for (let i: number = 1; i <= 6; i++) {
            let ptemp: Player = (new Player("Auswechselspieler der Gastgeber", new Vector (0, 0), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(30, 90), teamcolors[0], 1, 30 + i));
            ptemp.setPlaying(false);
            hometeam.push(ptemp);
        }

        const agk: Player = new Player("Torwart der Gäste", new Vector (field.getPadding() + field.getWidth(), field.getPadding() + 0.5 * field.getHeight()), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[1], 2, 27);
        awayteam.push(agk);

        for (let i: number = 1; i <= 4; i++) {
            awayteam.push(new Player("Verteidiger der Gäste", new Vector (quarterX * 6.5 + field.getPadding(), quarterY * i * 1.6 + field.getPadding() ), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[1], 2, 11 + i));
        }

        for (let i: number = 1; i <= 4; i++) {
            awayteam.push(new Player("Mittelfeldspieler der Gäste", new Vector (field.getWidth() + field.getPadding() - quarterX * 3.5, quarterY * i * 1.6 + field.getPadding() ), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[1], 2, 15 + i));
        }

        for (let i: number = 1; i <= 2; i++) {
            awayteam.push(new Player("Angreifer der Gäste", new Vector (quarterX * 1 + field.getPadding(), quarterY * i * 2.7 + field.getPadding()), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[1], 2, 19 + i));
        }

        for (let i: number = 1; i <= 6; i++) {
            let ptemp: Player = (new Player("Auswechselspieler der Gäste", new Vector (0, 0), randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]), randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]), randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]), teamcolors[1], 2, 30 + i));
            ptemp.setPlaying(false);
            awayteam.push(ptemp);
        }

        for (let i: number = 0; i < hometeam.length; i++) {
        movables.push(hometeam[i]);
        }

        for (let i: number = 0; i < awayteam.length; i++) {
            movables.push(awayteam[i]);
        }
    }
    
    function createReferees(): void {

        // Schiedsrichter mit zufälliger Position
        const ref: Referee = new Referee(new Vector(
            randomNumber(field.getPadding(), field.getPadding() + field.getWidth()),
            randomNumber(field.getPadding(), field.getPadding() + field.getHeight())
        ));

        ref.setPace(70);


        // Linienrichter oben
        const assistant1: Assistant = new Assistant(new Vector(
            randomNumber(field.getPadding(), field.getPadding() + field.getWidth() / 2),
            field.getPadding()
        ));
        assistant1.setPace(70);

        // Linienrichter folgt dem Ball, Bleibt aber auf der Linie
        assistant1.setTargetFn(() => {
            const x: number = movables[0].getPosition().X;
            return new Vector(
                x,
                assistant1.getPosition().Y
            );
        });

        // Linienrichter unten
        const assistant2: Assistant = new Assistant(new Vector(
            randomNumber(field.getPadding() + field.getWidth() / 2, field.getPadding() + field.getWidth()),
            field.getPadding() + field.getHeight()
        ));
        assistant2.setPace(70);

        
        assistant2.setTargetFn(() => {
            const x: number = movables[0].getPosition().X;
            return new Vector(
                x,
                assistant2.getPosition().Y
            );
        });

        // Schiedsrichter und Linienrichter werden ebenfalls dem Array hinzugefügt.
        movables.push(ref, assistant1, assistant2);

    }

    function updateAnimation(): void {

        // Zunächst werden Spielfeld und Ersatzbank aktualisiert
        refreshSubs();
        field.draw();


        // Für jedes Objekt auf dem Spielfeld wird die aktualisierung durchlaufen
        for (let movable of movables) {
            
            if (movable instanceof Player) {

                // Farbe wird aktualisiert
                movable.setColor(Teamsettings.pickteamcolors()[movable.getTeam() - 1 ]);

                // Wenn die Attribute des Spielers außerhalb des Bereiches liegen bekommt er zufällig neue Attribute, die im Wertebereich liegen.
                if (movable.getShooting() < Slider.getShootingRange()[0] || movable.getShooting() > Slider.getShootingRange()[1]) {
                movable.setShooting(randomNumber(Slider.getShootingRange()[0], Slider.getShootingRange()[1]));
                }

                if (movable.getPace() < Slider.getPaceRange()[0] || movable.getPace() > Slider.getPaceRange()[1])
                movable.setPace(randomNumber(Slider.getPaceRange()[0], Slider.getPaceRange()[1]));

                if (movable.getPower() < Slider.getPowerRange()[0] || movable.getPower() > Slider.getPowerRange()[1])
                movable.setPower(randomNumber(Slider.getPowerRange()[0], Slider.getPowerRange()[1]));
                
                // Distanz zwischen Spieler und Ball
                const d: number = distance(movable.getPosition(), ball.getPosition()) - movable.getRadius() - ball.getRadius();
                const p: Player = movable;

                // Der Index des Spielers aus allen Spielern die den Ball jagen wird gespeichert
                const closesttoBall: number = chasingBall.findIndex((l) => l.getPlayerNumber() === p.getPlayerNumber());

                
                if (closesttoBall >= 0 && d > 0) {

                    // Wenn der Spieler nicht am Ball ist wird er aus dem Array gestrichen
                    chasingBall.splice(closesttoBall);
                } 

                // Wenn ein Spieler am Ball ist
                if (d <= 0 && closesttoBall === -1) {

                    // Und der aktuelle Spieler der Spieler am Ball ist
                    if (!(chasingBall.length > 0 && movable?.getPlayerNumber() === chasingBall[0].getPlayerNumber())) {
                        
                        // Wird er dem Array hinzugefügt (um später den Schusswert abzurufen)
                        chasingBall.push(movable);
                    }

                    // Animation stoppt, es wird angezeigt wer am Ball ist
                    stopAnimation();
                    (<HTMLElement>document.getElementById("currentplayer")).innerHTML = "Im Ballbesitz: " + movable.getName();

                    
                    // Wenn der Spieler nicht am Ball ist, aber der Ball sich in seinem Radius befindet und das Spiel läuft bewegt er sich auf den Ball zu
                } else if (d <= movable.getActionRadius() && gameRunning) {
                    movable.move(ball.getPosition());

                } else if (gameRunning) {
                    // Wenn der Spieler zu weit vom Ball entfernt ist bewegt er sich zu seiner Startposition zurück
                    movable.move(movable.getSpawn());
                }

                // Nur Spieler auf dem Feld werden gemalt
                if (movable.isPlaying()) {
                    movable.draw();
                }
            }
            else if (movable instanceof Ball) {

                if (ball.getTarget() && gameRunning) {


                    // Wenn das Spiel läuft, ermittelt der Ball die Distanz zwischen sich und seinem Ziel
                    const d: number = distance(movable.getPosition(), ball.getTarget());
                    
                    if (d > 0) {
                        // Solange die Distanz über 0 liegt bewegt er sich
                        movable.move(ball.getTarget());

                        if (field.team2Goal(movable)) {
                            
                            // Wenn Ball im Tor ist wird das Tor angezeigt und der Spielstand aktualisiert
                            (<HTMLElement>document.getElementById("currentplayer")).innerHTML = "Tor für die Gastgeber!";

                            scores.setHomeScore(scores.getHomeScore() + 1);

                            // Die Animation wird gestoppt und die Spieler auf ihre Ursprungsposition zurückgesetzt
                            stopAnimation();
                            startGame();

                        } else if (field.team1Goal(movable)) {
                            (<HTMLElement>document.getElementById("currentplayer")).innerHTML = "Tor für die Gäste!";

                            scores.setAwayScore(scores.getAwayScore() + 1);

                            stopAnimation();
                            startGame();

                        } else if (field.ballOut(movable)) {

                            // Wenn Ball im Aus ist wird das angezeigt und der Ball bekommt eine Zufällige neue Position
                            (<HTMLElement>document.getElementById("currentplayer")).innerHTML = "Ball im Aus! Einwurf!";
                            
                            stopAnimation();
                            resetBall(true);
                        }
                    }
                }
                movable.draw();
            } 
            else if (movable instanceof Assistant) {
                if (gameRunning) {
                    movable.move(movable.getTargetFn());
                }
                // Linienrichter bewegt sich zu seinem Ziel (Richtung Ball) und wird neu gemalt.
                movable.draw();

            } else if (movable instanceof Referee) {
                if (gameRunning) {
                    if (Math.random() <= 0.005) {
                        movable.setTarget(new Vector(
                            randomNumber(field.getPadding(), field.getPadding() + field.getWidth()),
                            randomNumber(field.getPadding(), field.getPadding() + field.getHeight())
                        ));
                    }
                    // Schiedsrichter bewegt sich nur wenn eine 0.5% Chance erreicht wurde, dann bekommt er eine neue Zufällige Position auf dem Spielfeld auf die er sich zubewegt.
                    movable.move(movable.getTarget());
                }
                movable.draw();
            } 
        }
        scores.draw(time);
        window.requestAnimationFrame(updateAnimation);
    }

} 