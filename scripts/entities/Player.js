export class Player
{
    #name = '';
    #words = [];
    #speakerPoints = 0;

    constructor(playerName = '', playerWords = [], speakerPoints = 0)
    {
        this.#name = playerName;
        this.#words = playerWords;
        this.#speakerPoints = Math.max(0, speakerPoints);
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

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            name: this.#name,
            words: this.#words.map((word) => {return word.toJSON()}),
            speakerPoints: this.#speakerPoints
        }
    }
    static fromJSON(json)
    {
        const wordsFromJSON = json.words.map((word) => {return Word.fromJSON(word)});
        return new Player(json.name, wordsFromJSON, json.speakerPoints);
    }
}