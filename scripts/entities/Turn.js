export class Turn 
{
    #round = null;
    #score = 0;

    constructor(round, score)
    {
        this.#round = round;
        this.#score = score;
    }

    getRound()
    {
        return this.#round;
    }
    getScore()
    {
        return this.#score;
    }
    setRound(round)
    {
        if (round < 0)
        {
            return false;
        }

        this.#round = round;
        return true;
    }
    setScore(score)
    {
        if (score < 0)
        {
            return false;
        }

        this.#score = score;
        return true;
    }
    incrementScore()
    {
        this.#score++;
    }

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            round: this.#round,
            score: this.#score
        }
    }
    static fromJSON(json)
    {
        return new Turn(json.round, json.score);
    }
}