import { LIMITS } from "../core/constants.js";

export class Player
{
    #name = '';
    #words = [];
    #speakerPoints = 0;

    constructor(playerName = '', playerWords = [], speakerPoints = 0)
    {
        this.#name = playerName;

        if (playerWords.length > LIMITS.MAX_WORDS_PER_PLAYER)
        {
            console.warn(`cant assing ${playerWords.length} words to a player`);
            this.#words = [];
        }
        else
        {
            this.#words = playerWords;
        }

        if (speakerPoints < 0)
        {
            this.#speakerPoints = 0;
        }
        else 
        {
            this.#speakerPoints = speakerPoints
        }
    }

    /* COPIES */
    getWordsCopy()
    {
        return [...this.#words];
    }

    /* GETTERS */
    getName()
    {
        return this.#name;
    }
    getWord(index)
    {
        if (index < 0 || index >= this.#words.length)
        {
            console.warn(`getWord index out of bounds`);
            return false;
        }

        return this.#words[index];
    }
    getSpeakerPoints()
    {
        return this.#speakerPoints;
    }

    /* SETTERS */
    setName(newName)
    {
        this.#name = newName;
    }
    setWordsSize(size)
    {
        if (size < LIMITS.MIN_WORDS_PER_PLAYER || size > LIMITS.MAX_WORDS_PER_PLAYER)
        {
            console.warn(`invalid words per player resizing: ${size}`);
            return false;
        }

        this.clearWords();
        
        for (let i = 0; i < size; i++)
        {
            this.#words.push('');
        }

        return true;
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

    /* COUNT GETTERS */
    getWordsCount()
    {
        return this.#words.length;
    }

    /* HELPERS */
    clearWords()
    {
        this.#words = [];
    }
    hasEmptyWords()
    {
        return this.#words.some((word) => {return word === ''})
    }
    incrementSpeakerPoint()
    {
        this.#speakerPoints++;
    }
}