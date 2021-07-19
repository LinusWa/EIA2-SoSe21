namespace Endabgabe {
    export class Score {
        private homeScore: number = 0;

        private awayScore: number = 0;

        public getHomeScore(): number {
            return this.homeScore;
        }

        public setHomeScore(homeScore: number): void {
            this.homeScore = homeScore;
            this.updateScore();
        }

        public getAwayScore(): number {
            return this.awayScore;
        }

        public setAwayScore(awayScore: number): void {
            this.awayScore = awayScore;
            this.updateScore();
        }

        public createTimer(score: HTMLElement, time: number): void {

            // Zeit wird als Span dem Dokument angehängt.
            let timeElement: HTMLSpanElement = document.getElementById("time")!;
            if (!timeElement) {
                timeElement = document.createElement("span");
                timeElement.setAttribute("id", "time");
                score.appendChild(timeElement);
            }

            // Umwandlung der Zeit in Minuten u. Sekunden

            const minutes: number = Math.floor(time / (1000 * 60)); // In Minuten umgerechnet und gerundet
            const minutesRest: number = time % (1000 * 60); // Restbetrag
            const seconds: number = Math.floor(minutesRest / 1000); // In Sekunden

            // Ausgabe im innerHTML
            timeElement.innerHTML = `${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${seconds.toString().length < 2 ? `0${seconds}` : seconds}`;
        }

        public updateScore(): void {

            // Wie bei Zeit wird der Score als Span angehängt
            const score: HTMLElement = document.getElementById("upper-ui")!;
            let scoreElement: HTMLSpanElement | null = document.getElementById("score");
            if (!scoreElement) {
                scoreElement = document.createElement("span");
                scoreElement.setAttribute("id", "score");
                score.appendChild(scoreElement);
            }

            // Ausgabe im innerHTML
            scoreElement.innerHTML = `${this.getHomeScore()} : ${this.getAwayScore()}`;
        }



        public draw(time: number): void {
            const score: HTMLElement = document.getElementById("upper-ui")!;
            this.createTimer(score, time);
        }


    }
}