import { Player } from "./Player.js";


export class Team 
{
    #players = [];
    #score = [];
    #currentPlayerIndex = 0;

    constructor(playersInstances = [], score = [], currentPlayerIndex = 0)
    {
        this.#players = playersInstances;
        this.#score = score;
        this.#currentPlayerIndex = currentPlayerIndex;

        if (playersInstances.length === 0)
        {
            this.addPlayer();
        }
    }

    /*=====[GETTERS]=====*/
    getPlayers()
    {
        return this.#players;
    }
    getScore()
    {
        let teamTotalPoints = this.#score.reduce((acumulator, score) => {return acumulator += score}, 0)

        return {
            teamMembers: this.#players.map((player) => {return player.getName()}),
            pointsPerRound: [...this.#score],
            pointsTotal: teamTotalPoints
        }
    }
    getCurrentPlayerIndex()
    {
        return this.#currentPlayerIndex;
    }
    getCurrentPlayer()
    {
        return this.#players[this.#currentPlayerIndex];
    }

    /*=====[LOGIC]=====*/
    addPlayer(playerName = '')
    {
        const newPlayer = new Player(playerName);
        this.#players.push(newPlayer);
    }
    deletePlayer(index)
    {
        if (index < 0 || index >= this.#players.length)
        {
            console.warn(`getPlayer index out of bounds`);
            return false;
        }

        this.#players.splice(index, 1);
    }
    incrementCurrentPlayerIndex()
    {
        if (this.#players.length === 0)
        {
            return false;
        }

        this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % this.#players.length;
        return true;
    }

    /*=====[LOCAL STORAGE]=====*/
    toJSON()
    {
        return {
            players: this.#players.map((player) => {return player.toJSON()}),
            score: this.#score,
            currentPlayerIndex: this.#currentPlayerIndex
        }
    }
    static fromJSON(json)
    {
        if (!json)
        {
            return new Team();
        }

        const playersFromJSON = json.players.map((player) => {return Player.fromJSON(player)});
        return new Team(playersFromJSON, json.score, json.currentPlayerIndex);
    }
}