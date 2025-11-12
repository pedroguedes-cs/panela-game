export class WordBank
{
    #words = [];
    #topIndex = 0;
    #bottomIndex = 0;

    constructor(words = [])
    {
        this.#words = words;
        
        if (words.length != 0)
        {
            this.#topIndex = words.length - 1;
        }
    }

    /* GETTERS */
    getWord()
    {
        if (this.#words.length === 0)
        {
            console.warn('Empty wordBank');
            return null;
        }

        return this.#words[this.#topIndex];
    }
    getWordsCount()
    {
        return this.#topIndex - this.#bottomIndex + 1;
    }

    /* SETTERS */
    markAsGuessed()
    {
        if (this.#bottomIndex > this.#topIndex)
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

    /* HELPERS */
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
    isEmpty()
    {
        return (this.#bottomIndex > this.#topIndex);
    }
}