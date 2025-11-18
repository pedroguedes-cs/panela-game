import { Word } from "./Word.js";

export class WordBank
{
    #words = [];
    #topIndex = 0;
    #bottomIndex = 0;

    constructor(wordsFromJSON = [], bottomIndex = 0)
    {
        this.#words = wordsFromJSON;

        this.#topIndex = wordsFromJSON.length - 1;

        if (bottomIndex >= wordsFromJSON.length || bottomIndex < 0)
        {
            this.#bottomIndex = 0;
        }
        else
        {
            this.#bottomIndex = bottomIndex;
        }
    }

    /*=====[LOGIC]=====*/
    addWord(wordValue)
    {
        const newWord = new Word(wordValue)
        this.#words.push(newWord);
        this.#topIndex++;
    }
    pickWord()
    {
        if (this.allWordsGuessed())
        {
            console.warn('All guessed wordBank');
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

    /*=====[HELPERS]=====*/
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

    /*=====[LOCAL STORAGE]=====*/
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