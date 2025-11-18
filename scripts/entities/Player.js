import { Word } from "./Word.js";

export class Player
{
    #name = '';
    #words = [];

    constructor(playerName = '', wordsInstances = [])
    {
        this.#name = playerName;
        this.#words = wordsInstances;
    }

    /*=====[GETTERS]=====*/
    getName()
    {
        return this.#name;
    }
    getWords()
    {
        return this.#words;
    }

    /*=====[SETTERS]=====*/
    setName(newName)
    {
        this.#name = newName;
    }
    setWordsSize(size)
    {
        if (size < 0)
        {
            return false;
        }

        this.clearWords();
        
        for (let i = 0; i < size; i++)
        {
            this.#words.push(new Word());
        }

        return true;
    }
    setWordValue(value, index)
    {
        if (index < 0 || index >= this.#words.length)
        {
            console.warn(`setWord index out of bounds`);
            return false;
        }

        this.#words[index].setValue(value);
        return true;
    }

    /*=====[HELPERS]=====*/
    clearWords()
    {
        this.#words = [];
    }
    hasEmptyWords()
    {
        return this.#words.some((word) => {return word.getValue() === ''})
    }

    /*=====[LOCAL STORAGE]=====*/
    toJSON()
    {
        return {
            name: this.#name,
            words: this.#words.map((word) => {return word.toJSON()})
        }
    }
    static fromJSON(json)
    {
        if (!json)
        {
            return new Player();
        }

        const wordsFromJSON = json.words.map((word) => {return Word.fromJSON(word)})

        return new Player(json.name, wordsFromJSON);
    }
}