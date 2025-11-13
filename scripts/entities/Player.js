import { Word } from "./Word.js";

export class Player
{
    #name = '';
    #words = [];

    constructor(playerName = '', playerWords = [])
    {
        this.#name = playerName;
        this.#words = playerWords;
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
            this.#words.push('');
        }

        return true;
    }
    setWords(words)
    {
        this.#words = words;
    }
    setWord(word, index)
    {
        if (index < 0 || index >= this.#words.length)
        {
            console.warn(`setWord index out of bounds`);
            return false;
        }

        this.#words[index] = word;
        return true;
    }

    /*=====[HELPERS]=====*/
    clearWords()
    {
        this.#words = [];
    }
    hasEmptyWords()
    {
        return this.#words.some((word) => {return word === ''})
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

        const wordsFromJSON = json.words.map((word) => {return Word.fromJSON(word)});
        return new Player(json.name, wordsFromJSON);
    }
}