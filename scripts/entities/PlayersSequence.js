import { Player } from "./Player.js";

export class PlayersSequence
{
    #playersInOrder = [];
    #currentPlayerIndex = 0;

    constructor(playersInOrder = [], currentPlayerIndex = 0)
    {
        this.#playersInOrder = playersInOrder;

        if (currentPlayerIndex < 0 || currentPlayerIndex >= playersInOrder.length)
        {
            this.#currentPlayerIndex = 0;
        }
        else
        {
            this.#currentPlayerIndex = currentPlayerIndex;
        }
    }

    getCurrentPlayer()
    {
        if (this.isEmpty())
        {
            return null;
        }

        return this.#playersInOrder[this.#currentPlayerIndex];
    }
    addPlayer(player)
    {
        this.#playersInOrder.push(player);
    }
    incrementPlayerIndex()
    {
        if (this.isEmpty())
        {
            return false;
        }

        if (this.#currentPlayerIndex >= this.#playersInOrder.length - 1)
        {
            this.#currentPlayerIndex = 0;
            return true;
        }

        this.#currentPlayerIndex++;
        return true;
    }
    clearPlayers()
    {
        this.#playersInOrder = [];
        this.#currentPlayerIndex = 0;
    }
    getPlayersCount()
    {
        return this.#playersInOrder.length;
    }
    isEmpty()
    {
        return (this.#playersInOrder.length === 0);
    }

    /* LOCAL STORAGE */
    toJSON()
    {
        return {
            playersInOrder: this.#playersInOrder.map((player) => {return player.toJSON()}),
            currentPlayerIndex: this.#currentPlayerIndex
        }
    }
    static fromJSON(json)
    {
        const playersInOrderFromJSON = json.playersInOrder.map((player) => {return Player.fromJSON(player)});
        return new PlayersSequence(playersInOrderFromJSON, json.currentPlayerIndex);
    }
}