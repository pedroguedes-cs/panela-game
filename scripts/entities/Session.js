import { Screen } from "../core/Screen.js"

export class Session
{
    #screenId = Screen.HOME;
    #round = 0;
    #teamIndex = 0;
    #playerIndex = 0;
    #remainingTurnTime = 0;

    constructor(screenId = Screen.HOME, round = 0, teamIndex = 0, playerIndex = 0, remainingTurnTime = 0)
    {
        this.#screenId = screenId;
        this.#round = Math.max(0, round);
        this.#teamIndex = Math.max(0, teamIndex);
        this.#playerIndex = Math.max(0, playerIndex);
        this.#remainingTurnTime = Math.max(0, remainingTurnTime);
    }

    /*=====[GETTERS]=====*/
    getScreenId()
    {
        return this.#screenId;
    }
    getRound()
    {
        return this.#round;
    }
    getTeamIndex()
    {
        return this.#teamIndex;
    }
    getPlayerIndex()
    {
        return this.#playerIndex;
    }
    getRemainingTurnTime()
    {
        return this.#remainingTurnTime;
    }

    /*=====[SETTERS]=====*/
    setScreenId(screenId)
    {
        this.#screenId = screenId;
    }
    setRound(round)
    {
        if (round < 0)
        {
            console.warn('Cant set a negative value to setRound');
            return false;
        }

        this.#round = round;
        return true
    }
    setTeamIndex(teamIndex)
    {
        if (teamIndex < 0)
        {
            console.warn('Cant set a negative value to setTeamIndex');
            return false;
        }

        this.#teamIndex = teamIndex;
        return true
    }
    setPlayerIndex(playerIndex)
    {
        if (playerIndex < 0)
        {
            console.warn('Cant set a negative value to setPlayerIndex');
            return false;
        }

        this.#playerIndex = playerIndex;
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

    /*=====[LOCAL STORAGE]=====*/
    toJSON()
    {
        return {
            screenId: this.#screenId,
            round: this.#round,
            teamIndex: this.#teamIndex,
            playerIndex: this.#playerIndex,
            remainingTurnTime: this.#remainingTurnTime
        }
    }
    static fromJSON(json)
    {
        if (!json)
        {
            return new Session();
        }

        return new Session(json.screenId, json.round, json.teamIndex, json.playerIndex, json.remainingTurnTime);
    }
}