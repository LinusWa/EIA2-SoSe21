"use strict";
var Endabgabe;
(function (Endabgabe) {
    Endabgabe.scale = 7;
    function randomNumber(min, max) {
        // (Gerundete) Zufallszahl für Positionen etc.
        return Math.round(Math.random() * (max - min) + min);
    }
    Endabgabe.randomNumber = randomNumber;
    function distance(u, v) {
        // Distanz zwischen zwei Punkten mit Skalarprodukt)
        let d = Math.sqrt(Math.pow(v.X - u.X, 2) +
            Math.pow(v.Y - u.Y, 2));
        return d;
    }
    Endabgabe.distance = distance;
    window.addEventListener("load", handleload);
    Endabgabe.canvas = document.querySelector("canvas");
    let scores;
    let gameRunning = false;
    let time = 0;
    let prevTime;
    let movables = [];
    let field;
    let ball;
    let mousePos;
    let chasingBall = [];
    let teamsettingsUI;
    let teamcolors = [];
    function refreshSubs() {
        // Aktualisiert die Spieler auf der Ersatzbank, um z.B. Farbänderungen darzustellen
        teamsettingsUI.homesubs(movables.filter((l) => l instanceof Endabgabe.Player));
        teamsettingsUI.awaysubs(movables.filter((l) => l instanceof Endabgabe.Player));
    }
    function getCursorPos(cursor) {
        // Aktuelle Mausposition im Bezug Canvas wird in einem Vektor gespeichert
        var rect = Endabgabe.canvas.getBoundingClientRect();
        return new Endabgabe.Vector((cursor.clientX - rect.left) / (rect.right - rect.left) * Endabgabe.canvas.width, (cursor.clientY - rect.top) / (rect.bottom - rect.top) * Endabgabe.canvas.height);
    }
    function handleload() {
        // Neues Feld
        field = new Endabgabe.Pitch();
        // Canvas wird so groß wie das Feld plus auf jeder Seite Rand
        Endabgabe.canvas.width = field.getWidth() + (2 * field.getPadding());
        Endabgabe.canvas.height = field.getHeight() + (2 * field.getPadding());
        // UI für Farbe und Ersatzbank
        teamsettingsUI = new Endabgabe.Teamsettings();
        // Bei Mausbewegung wird der Vektor aktualisiert
        Endabgabe.canvas.addEventListener("mousemove", (e) => {
            mousePos = getCursorPos(e);
        });
        // Slider für Spielerattribute werden aktualisiert, damit die Zahl sofort angezeigt werden.
        Endabgabe.Slider.shootingLeft();
        Endabgabe.Slider.shootingRight();
        Endabgabe.Slider.paceLeft();
        Endabgabe.Slider.paceRight();
        Endabgabe.Slider.powerLeft();
        Endabgabe.Slider.powerRight();
        // Mit Leertaste wird das Spiel gestartet
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                continueAnimation();
            }
        });
        Endabgabe.crc2 = Endabgabe.canvas.getContext("2d");
        scores = new Endabgabe.Score();
        // Spielstände werden auf 0 gesetzt.
        scores.setHomeScore(0);
        scores.setAwayScore(0);
        // Timer wird gestartet
        startClock();
        // Spiel wird erstellt
        startGame();
        // Anzeige sagt Anpfiff
        document.getElementById("currentplayer").innerHTML = "Anpfiff!";
        window.requestAnimationFrame(updateAnimation);
        // Startknopf statt Leertaste
        document.getElementById("start")?.addEventListener("click", () => {
            continueAnimation();
        });
        // Ersatzbank wird aktualisiert
        refreshSubs();
        // Wenn auf den Canvas geklickt wird wird der Ball gepasst
        Endabgabe.canvas.addEventListener("click", () => {
            // Ein Spieler muss am Ball sein
            if (chasingBall?.length === 0) {
                return;
            }
            // Innerhalb des Radius bestimmt durch Genauigkeit des Spielers wird eine neue Position für den Ball bestimmt
            const randomX = randomNumber(-playerPrecision(), playerPrecision());
            const randomY = randomNumber(-playerPrecision(), playerPrecision());
            // Zu der Mausposition wird die Zufällige Zahl innerhalb des Radius gerechnet und die exakte Zielposition festgelegt.
            ball.setTarget(new Endabgabe.Vector(mousePos.X + randomX, mousePos.Y + randomY));
            // Je nach Schussstärke des Spielers bekommt der Ball seine Geschwindigkeit
            ball.setPace(chasingBall[0].getPower());
            // Animation geht weiter
            continueAnimation();
        });
    }
    // Ungenauigkeit Basierend auf dem Genauigkeitswert des Spielers
    function playerPrecision() {
        return (100 - chasingBall[0].getShooting()) * Endabgabe.scale * 0.1;
    }
    function startClock() {
        prevTime = new Date();
        setInterval(() => {
            // Spieluhr, läuft nur wenn die Animation nicht pausiert ist
            if (gameRunning) {
                time += new Date().getTime() - (prevTime?.getTime());
            }
            prevTime = new Date();
        }, 100);
    }
    function resetBall(randomBallPosition = false) {
        movables.forEach((p) => {
            // Im Array wird nach Ball gesucht.
            if (p instanceof Endabgabe.Ball) {
                // Ball bekommt zufällige position
                p.setPosition(new Endabgabe.Vector(randomBallPosition ? randomNumber(field.getPadding(), field.getPadding() + field.getWidth()) : field.getPadding() + field.getWidth() / 2, randomBallPosition ? randomNumber(field.getPadding(), field.getPadding() + field.getHeight()) : field.getPadding() + field.getHeight() / 2));
                // Ball wird an neue Position gesetzt
                p.setTarget(new Endabgabe.Vector(p.getPosition().X, p.getPosition().Y));
            }
        });
        // Spiel geht weiter
        continueAnimation();
    }
    function startGame() {
        // Array aller Bewegenden Objekte
        movables = [];
        // Neuer Ball wird erstellt
        ball = new Endabgabe.Ball(new Endabgabe.Vector(field.getPadding() + (field.getWidth() / 2), field.getPadding() + (field.getHeight() / 2)));
        movables.push(ball);
        // Teams erhalten Farbe, werden erstellt
        teamcolors = Endabgabe.Teamsettings.pickteamcolors();
        createPlayers();
        // Schieds- und Linienrichter werden erstellt.
        createReferees();
    }
    function stopAnimation() {
        gameRunning = false;
    }
    function continueAnimation() {
        gameRunning = true;
    }
    function createPlayers() {
        // Spieler werden zunächst nach je nach Team ins array unterteilt, damit das Array am Ende sortiert ist.
        let hometeam = [];
        let awayteam = [];
        // Spielfeld wird aufgeteilt, um Spielern leichter Positionen zuzuweisen
        const quarterX = field.getWidth() / 8;
        const quarterY = field.getHeight() / 8;
        // Jeder Spieler bekommt Namen, Position je nach Aufstellung, Zufällige Werte im Rahmen der Slider für Schusskraft, Genauigkeit und Geschwindigkeit, Sowie Farbe, Teamnummer und Rückennummer
        const hgk = new Endabgabe.Player("Torwart der Gastgeber", new Endabgabe.Vector(field.getPadding(), field.getPadding() + 0.5 * field.getHeight()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[0], 1, 1);
        hometeam.push(hgk);
        for (let i = 1; i <= 4; i++) {
            hometeam.push(new Endabgabe.Player("Verteidiger der Gastgeber", new Endabgabe.Vector(field.getWidth() + field.getPadding() - quarterX * 6.5, quarterY * i * 1.6 + field.getPadding()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[0], 1, 1 + i));
        }
        for (let i = 1; i <= 4; i++) {
            hometeam.push(new Endabgabe.Player("Mittelfeldspieler der Gastgeber", new Endabgabe.Vector(quarterX * 3.5 + field.getPadding(), quarterY * i * 1.6 + field.getPadding()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[0], 1, 5 + i));
        }
        for (let i = 1; i <= 2; i++) {
            hometeam.push(new Endabgabe.Player("Angreifer der Gastgeber", new Endabgabe.Vector(field.getWidth() + field.getPadding() - quarterX * 1, quarterY * i * 2.7 + field.getPadding()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[0], 1, 9 + i));
        }
        for (let i = 1; i <= 6; i++) {
            let ptemp = (new Endabgabe.Player("Auswechselspieler der Gastgeber", new Endabgabe.Vector(0, 0), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(30, 90), teamcolors[0], 1, 30 + i));
            ptemp.setPlaying(false);
            hometeam.push(ptemp);
        }
        const agk = new Endabgabe.Player("Torwart der Gäste", new Endabgabe.Vector(field.getPadding() + field.getWidth(), field.getPadding() + 0.5 * field.getHeight()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[1], 2, 27);
        awayteam.push(agk);
        for (let i = 1; i <= 4; i++) {
            awayteam.push(new Endabgabe.Player("Verteidiger der Gäste", new Endabgabe.Vector(quarterX * 6.5 + field.getPadding(), quarterY * i * 1.6 + field.getPadding()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[1], 2, 11 + i));
        }
        for (let i = 1; i <= 4; i++) {
            awayteam.push(new Endabgabe.Player("Mittelfeldspieler der Gäste", new Endabgabe.Vector(field.getWidth() + field.getPadding() - quarterX * 3.5, quarterY * i * 1.6 + field.getPadding()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[1], 2, 15 + i));
        }
        for (let i = 1; i <= 2; i++) {
            awayteam.push(new Endabgabe.Player("Angreifer der Gäste", new Endabgabe.Vector(quarterX * 1 + field.getPadding(), quarterY * i * 2.7 + field.getPadding()), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[1], 2, 19 + i));
        }
        for (let i = 1; i <= 6; i++) {
            let ptemp = (new Endabgabe.Player("Auswechselspieler der Gäste", new Endabgabe.Vector(0, 0), randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]), randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]), randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]), teamcolors[1], 2, 30 + i));
            ptemp.setPlaying(false);
            awayteam.push(ptemp);
        }
        for (let i = 0; i < hometeam.length; i++) {
            movables.push(hometeam[i]);
        }
        for (let i = 0; i < awayteam.length; i++) {
            movables.push(awayteam[i]);
        }
    }
    function createReferees() {
        // Schiedsrichter mit zufälliger Position
        const ref = new Endabgabe.Referee(new Endabgabe.Vector(randomNumber(field.getPadding(), field.getPadding() + field.getWidth()), randomNumber(field.getPadding(), field.getPadding() + field.getHeight())));
        ref.setPace(70);
        // Linienrichter oben
        const assistant1 = new Endabgabe.Assistant(new Endabgabe.Vector(randomNumber(field.getPadding(), field.getPadding() + field.getWidth() / 2), field.getPadding()));
        assistant1.setPace(70);
        // Linienrichter folgt dem Ball, Bleibt aber auf der Linie
        assistant1.setTargetFn(() => {
            const x = movables[0].getPosition().X;
            return new Endabgabe.Vector(x, assistant1.getPosition().Y);
        });
        // Linienrichter unten
        const assistant2 = new Endabgabe.Assistant(new Endabgabe.Vector(randomNumber(field.getPadding() + field.getWidth() / 2, field.getPadding() + field.getWidth()), field.getPadding() + field.getHeight()));
        assistant2.setPace(70);
        assistant2.setTargetFn(() => {
            const x = movables[0].getPosition().X;
            return new Endabgabe.Vector(x, assistant2.getPosition().Y);
        });
        // Schiedsrichter und Linienrichter werden ebenfalls dem Array hinzugefügt.
        movables.push(ref, assistant1, assistant2);
    }
    function updateAnimation() {
        // Zunächst werden Spielfeld und Ersatzbank aktualisiert
        refreshSubs();
        field.draw();
        // Für jedes Objekt auf dem Spielfeld wird die aktualisierung durchlaufen
        for (let movable of movables) {
            if (movable instanceof Endabgabe.Player) {
                // Farbe wird aktualisiert
                movable.setColor(Endabgabe.Teamsettings.pickteamcolors()[movable.getTeam() - 1]);
                // Wenn die Attribute des Spielers außerhalb des Bereiches liegen bekommt er zufällig neue Attribute, die im Wertebereich liegen.
                if (movable.getShooting() < Endabgabe.Slider.getShootingRange()[0] || movable.getShooting() > Endabgabe.Slider.getShootingRange()[1]) {
                    movable.setShooting(randomNumber(Endabgabe.Slider.getShootingRange()[0], Endabgabe.Slider.getShootingRange()[1]));
                }
                if (movable.getPace() < Endabgabe.Slider.getPaceRange()[0] || movable.getPace() > Endabgabe.Slider.getPaceRange()[1])
                    movable.setPace(randomNumber(Endabgabe.Slider.getPaceRange()[0], Endabgabe.Slider.getPaceRange()[1]));
                if (movable.getPower() < Endabgabe.Slider.getPowerRange()[0] || movable.getPower() > Endabgabe.Slider.getPowerRange()[1])
                    movable.setPower(randomNumber(Endabgabe.Slider.getPowerRange()[0], Endabgabe.Slider.getPowerRange()[1]));
                // Distanz zwischen Spieler und Ball
                const d = distance(movable.getPosition(), ball.getPosition()) - movable.getRadius() - ball.getRadius();
                const p = movable;
                // Der Index des Spielers aus allen Spielern die den Ball jagen wird gespeichert
                const closesttoBall = chasingBall.findIndex((l) => l.getPlayerNumber() === p.getPlayerNumber());
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
                    document.getElementById("currentplayer").innerHTML = "Im Ballbesitz: " + movable.getName();
                    // Wenn der Spieler nicht am Ball ist, aber der Ball sich in seinem Radius befindet und das Spiel läuft bewegt er sich auf den Ball zu
                }
                else if (d <= movable.getActionRadius() && gameRunning) {
                    movable.move(ball.getPosition());
                }
                else if (gameRunning) {
                    // Wenn der Spieler zu weit vom Ball entfernt ist bewegt er sich zu seiner Startposition zurück
                    movable.move(movable.getSpawn());
                }
                // Nur Spieler auf dem Feld werden gemalt
                if (movable.isPlaying()) {
                    movable.draw();
                }
            }
            else if (movable instanceof Endabgabe.Ball) {
                if (ball.getTarget() && gameRunning) {
                    // Wenn das Spiel läuft, ermittelt der Ball die Distanz zwischen sich und seinem Ziel
                    const d = distance(movable.getPosition(), ball.getTarget());
                    if (d > 0) {
                        // Solange die Distanz über 0 liegt bewegt er sich
                        movable.move(ball.getTarget());
                        if (field.team2Goal(movable)) {
                            // Wenn Ball im Tor ist wird das Tor angezeigt und der Spielstand aktualisiert
                            document.getElementById("currentplayer").innerHTML = "Tor für die Gastgeber!";
                            scores.setHomeScore(scores.getHomeScore() + 1);
                            // Die Animation wird gestoppt und die Spieler auf ihre Ursprungsposition zurückgesetzt
                            stopAnimation();
                            startGame();
                        }
                        else if (field.team1Goal(movable)) {
                            document.getElementById("currentplayer").innerHTML = "Tor für die Gäste!";
                            scores.setAwayScore(scores.getAwayScore() + 1);
                            stopAnimation();
                            startGame();
                        }
                        else if (field.ballOut(movable)) {
                            // Wenn Ball im Aus ist wird das angezeigt und der Ball bekommt eine Zufällige neue Position
                            document.getElementById("currentplayer").innerHTML = "Ball im Aus! Einwurf!";
                            stopAnimation();
                            resetBall(true);
                        }
                    }
                }
                movable.draw();
            }
            else if (movable instanceof Endabgabe.Assistant) {
                if (gameRunning) {
                    movable.move(movable.getTargetFn());
                }
                // Linienrichter bewegt sich zu seinem Ziel (Richtung Ball) und wird neu gemalt.
                movable.draw();
            }
            else if (movable instanceof Endabgabe.Referee) {
                if (gameRunning) {
                    if (Math.random() <= 0.005) {
                        movable.setTarget(new Endabgabe.Vector(randomNumber(field.getPadding(), field.getPadding() + field.getWidth()), randomNumber(field.getPadding(), field.getPadding() + field.getHeight())));
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
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=main.js.map