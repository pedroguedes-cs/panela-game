export class Word
{
    #value = '';
    #teamIndex = null;
    #playerIndex = null;
    #guessed = false;

    constructor(value = '', teamIndex = null, playerIndex = null)
    {
        this.#value = value;
        this.#teamIndex = teamIndex;
        this.#playerIndex = playerIndex;
    }

    getValue()
    {
        return this.#value;
    }
    getStatus()
    {
        return this.#guessed;
    }
    setValue(value)
    {
        this.#value = value;
    }
    guessed()
    {
        this.#guessed = true;
    }
    unguessed()
    {
        this.#guessed = false;
    }

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            value: this.#value,
            teamIndex: this.#teamIndex,
            playerIndex: this.#playerIndex
        }
    }
    static fromJSON(json)
    {
        return new Word(json.value, json.teamIndex, json.playerIndex);
    }
} 