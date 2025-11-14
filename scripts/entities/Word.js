export class Word
{
    #value = '';
    #guessed = false;

    constructor(value = '', guessed = false)
    {
        this.#value = value;
        this.#guessed = guessed;
    }

    /*=====[GETTERS]=====*/
    getValue()
    {
        return this.#value;
    }
    getStatus()
    {
        return this.#guessed;
    }

    /*=====[SETTERS]=====*/
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

    /*=====[LOCAL STORAGE]=====*/
    toJSON()
    {
        return {
            value: this.#value,
            guessed: this.#guessed
        }
    }
    static fromJSON(json)
    {
        if (!json)
        {
            return new Word();
        }
        return new Word(json.value, json.guessed);
    }
} 