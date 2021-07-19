"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Score {
        constructor() {
            this.homeScore = 0;
            this.awayScore = 0;
        }
        getHomeScore() {
            return this.homeScore;
        }
        setHomeScore(homeScore) {
            this.homeScore = homeScore;
            this.updateScore();
        }
        getAwayScore() {
            return this.awayScore;
        }
        setAwayScore(awayScore) {
            this.awayScore = awayScore;
            this.updateScore();
        }
        createTimer(score, time) {
            // Zeit wird als Span dem Dokument angehängt.
            let timeElement = document.getElementById("time");
            if (!timeElement) {
                timeElement = document.createElement("span");
                timeElement.setAttribute("id", "time");
                score.appendChild(timeElement);
            }
            // Umwandlung der Zeit in Minuten u. Sekunden
            const minutes = Math.floor(time / (1000 * 60)); // In Minuten umgerechnet und gerundet
            const minutesRest = time % (1000 * 60); // Restbetrag
            const seconds = Math.floor(minutesRest / 1000); // In Sekunden
            // Ausgabe im innerHTML
            timeElement.innerHTML = `${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${seconds.toString().length < 2 ? `0${seconds}` : seconds}`;
        }
        updateScore() {
            // Wie bei Zeit wird der Score als Span angehängt
            const score = document.getElementById("upper-ui");
            let scoreElement = document.getElementById("score");
            if (!scoreElement) {
                scoreElement = document.createElement("span");
                scoreElement.setAttribute("id", "score");
                score.appendChild(scoreElement);
            }
            // Ausgabe im innerHTML
            scoreElement.innerHTML = `${this.getHomeScore()} : ${this.getAwayScore()}`;
        }
        draw(time) {
            const score = document.getElementById("upper-ui");
            this.createTimer(score, time);
        }
    }
    Endabgabe.Score = Score;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=score.js.map