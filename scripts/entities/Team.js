import { LIMITS } from "../core/constants.js";
import { Player } from "./Player.js";


export class Team 
{
    #players = [];
    #playsStack = [];
    #score = [];

    constructor(players = [], playStack = [], score = [])
    {
        if (players.length > LIMITS.MAX_PLAYERS_PER_TEAM)
        {
            console.warn(`cant assing ${players.length} players to a team`);

            for (let i = 0; i < LIMITS.MAX_PLAYERS_PER_TEAM; i++)
            {
                this.#players.push(players[i]);
            }
        }
        else
        {
            this.#players = players;
        }

        this.#playsStack = playStack;

        this.#score = score
    }

    /* COPIES */
    getPlayersCopy()
    {
        return [...this.#players];
    }
    getPlaysCopy()
    {
        return [...this.#playsStack];
    }
    getScoreCopy()
    {
        return [...this.#score];
    }

    /* GETTERS */
    getPlayer(index)
    {
        if (index < 0 || index >= this.#players.length)
        {
            console.warn(`getPlayer index out of bounds`);
            return false;
        }

        return this.#players[index];
    }
    getPlay(index)
    {
        if (index < 0 || index >= this.#playsStack.length)
        {
            console.warn(`getPlay index out of bounds`);
            return false;
        } 

        return this.#playsStack[index];
    }
    getScore(index)
    {
        if (index < 0 || index >= this.#score.length)
        {
            console.warn(`getScore index out of bounds`);
            return false;
        } 

        return this.#score[index];
    }
    getTotalScore()
    {
        let totalScore = 0;

        this.#score.forEach((roundScore) => {
            totalScore += roundScore;
        })

        return totalScore;
    }
    getBestPlay()
    {
        if (this.#playsStack.length === 0)
        {
            return false;
        }

        let bestPlay;

        this.#playsStack.forEach((play, index) => {
            if (index === 0 || play.getPoints() > bestPlay.getPoints())
            {
                bestPlay = play;
            }
        })

        return bestPlay.getDataCopy();
    }

    /* SETTERS */

    /* COUNT GETTERS */
    getPlayersCount()
    {
        return this.#players.length;
    }
    getPlaysStackCount()
    {
        return this.#playsStack.length;
    }
    getScoreCount()
    {
        return this.#score.length;
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
}