import { Player } from "./Player.js";
import { Turn } from "./Turn.js";


export class Team 
{
    #players = [];
    #score = [];
    #currentPlayerIndex = 0;

    constructor(players = [], score = [], currentPlayerIndex = 0)
    {
        this.#players = players;
        this.#score = score;
        this.#currentPlayerIndex = currentPlayerIndex;
    }

    /* GETTERS */
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

    /* LOGIC */
    addPlayer(player)
    {
        this.#players.push(player);
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
    setCurrentPlayerIndex(index)
    {
        if (index < 0 || index >= this.#players.length)
        {
            return false;
        }

        this.#currentPlayerIndex = index;
        return true;
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

    /* HELPERS */
    isValidTeam()
    {
        const size = this.#players.length;
        if (size < LIMITS.MIN_PLAYERS_PER_TEAM || size > MAX_PLAYERS_PER_TEAM)
        {
            console.log('team size invalid');
            return false;
        }

        const hasEmptyPlayers = this.#players.some((player) => {return player.getName() === ''})
        if (hasEmptyPlayers)
        {
            console.log('team has empty player name');
            return false;   
        }

        return true;
    }

    /* LOCAL STORAGE */
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