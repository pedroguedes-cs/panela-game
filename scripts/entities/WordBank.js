import { Word } from "./Word.js";

export class WordBank
{
    #words = [];
    #topIndex = 0;
    #bottomIndex = 0;

    constructor(words = [], bottomIndex = 0)
    {
        this.#words = words;

        this.#topIndex = words.length;

        if (bottomIndex >= words.length || bottomIndex < 0)
        {
            this.#bottomIndex = 0;
        }
        else
        {
            this.#bottomIndex = bottomIndex;
        }
    }

    /* LOGIC */
    pickWord()
    {
        if (this.isEmpty() || this.allWordsGuessed())
        {
            console.warn('Empty/all guessed wordBank');
            return null;
        }

        return this.#words[this.#topIndex];
    }
    getRemainingWordsCount()
    {
        return this.#topIndex - this.#bottomIndex + 1;
    }
    getGuessedWordsCount()
    {
        return this.#bottomIndex;
    }
    markAsGuessed()
    {
        if (this.allWordsGuessed())
        {
            return false;
        }

        this.#words[this.#topIndex].guessed();

        /* swap values */
        [this.#words[this.#topIndex], this.#words[this.#bottomIndex]] = [this.#words[this.#bottomIndex], this.#words[this.#topIndex]];

        this.#bottomIndex++;
    }
    resetAllGuessedFlags()
    {
        this.#words.forEach((word) => {
            word.unguessed();
        })

        this.#bottomIndex = 0;
    }
    addWord(word)
    {
        this.#words.push(word);
        this.#topIndex++;
    }
    shuffleWords()
    {
        const size = this.#topIndex - this.#bottomIndex + 1;

        for (let i = size - 1; i > 0; i--)
        {
            let currentIndex = this.#bottomIndex + i;
            let randomIndex = this.#bottomIndex + Math.floor(Math.random() * (i + 1));

            [this.#words[currentIndex], this.#words[randomIndex]] = [this.#words[randomIndex], this.#words[currentIndex]];
        }
    }
    allWordsGuessed()
    {
        return (this.#bottomIndex > this.#topIndex);
    }
    isEmpty()
    {
        return (this.#words.length === 0);
    }

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            words: this.#words.map((word) => {return word.toJSON()}),
            bottomIndex: this.#bottomIndex
        }
    }
    static fromJSON(json)
    {
        if (!json)
        {
            return new WordBank();
        }

        const wordsFromJSON = json.words.map((word) => {return Word.fromJSON(word)});
        return new WordBank(wordsFromJSON, json.bottomIndex);
    }
}