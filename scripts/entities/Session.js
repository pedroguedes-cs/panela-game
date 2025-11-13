import { Screen } from "../core/Screen.js"

export class Session
{
    #screenId = Screen.HOME;
    #round = 1;
    #remainingTurnTime = 0;

    constructor(screenId = Screen.HOME, round = 1, remainingTurnTime = 0)
    {
        this.#screenId = screenId;
        this.#round = Math.max(1, round);
        this.#remainingTurnTime = Math.max(0, remainingTurnTime);
    }

    getScreenId()
    {
        return this.#screenId;
    }

    getRound()
    {
        return this.#round;
    }

    getRemainingTurnTime()
    {
        return this.#remainingTurnTime;
    }

    setScreenId(screenId)
    {
        this.#screenId = screenId;
    }

    setRound(round)
    {
        if (round <= 0)
        {
            console.warn('Cant set a non-positive value to setRound');
            return false;
        }

        this.#round = round;
        return true
    }

    setRemainingTurnTime(remainingTurnTime)
    {
        if (remainingTurnTime < 0)
        {
            console.warn('Cant set a negative value to setRemainingTurnTime');
            return false;
        }

        this.#remainingTurnTime = remainingTurnTime;
        return true;
    }

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            screenId: this.#screenId,
            round: this.#round,
            remainingTurnTime: this.#remainingTurnTime
        }
    }
    static fromJSON(json)
    {
        return new Session(json.screenId, json.round, json.remainingTurnTime);
    }
}