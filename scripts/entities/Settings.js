import { GAME_CONSTANTS } from "../core/GameConstants.js"

export class Settings
{
    #turnTime = GAME_CONSTANTS.TURN_TIME_DEFAULT;
    #wordsPerPlayer = GAME_CONSTANTS.WORDS_PER_PLAYER_DEFAULT;

    constructor(turnTime = GAME_CONSTANTS.TURN_TIME_DEFAULT, wordsPerPlayer = GAME_CONSTANTS.WORDS_PER_PLAYER_DEFAULT)
    {
        this.#turnTime = Math.max(1, turnTime);
        this.#wordsPerPlayer = Math.max(1, wordsPerPlayer);
    }

    /* GETTERS */
    getTurnTime()
    {
        return this.#turnTime;
    }
    getWordsPerPlayer()
    {
        return this.#wordsPerPlayer;
    }

    /* SETTERS */
    setTurnTime(turnTime)
    {
        turnTime = Number(turnTime);

        if (turnTime <= 0)
        {
            console.warn('Cant set a non-positive value to turnTime')
            return false;
        }

        this.#turnTime = turnTime;
        return true;
    }
    setWordsPerPlayer(wordsPerPlayer)
    {
        wordsPerPlayer = Number(wordsPerPlayer);

        if (wordsPerPlayer <= 0)
        {
            console.warn('Cant set a non-positive value to wordsPerPlayer')
            return false;
        }

        this.#wordsPerPlayer = wordsPerPlayer;
        return true;
    }

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            turnTime: this.#turnTime,
            wordsPerPlayer: this.#wordsPerPlayer
        }
    }
    static fromJSON(json)
    {
        if (!json)
        {
            return new Settings();
        }

        return new Settings(json.turnTime, json.wordsPerPlayer);
    }
}