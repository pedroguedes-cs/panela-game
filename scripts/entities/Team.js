import { Player } from "./Player.js";


export class Team 
{
    #players = [];
    #turnsStack = [];
    #score = [];

    constructor(players = [], turnsStack = [], score = [])
    {
        this.#players = players;
        this.#turnsStack = turnsStack;
        this.#score = score
    }

    /* COPIES */
    getPlayersCopy()
    {
        return [...this.#players];
    }
    getPlaysCopy()
    {
        return [...this.#turnsStack];
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
    getTurn(index)
    {
        if (index < 0 || index >= this.#turnsStack.length)
        {
            console.warn(`getTurn index out of bounds`);
            return false;
        } 

        return this.#turnsStack[index];
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
    getBestTurn()
    {
        if (this.#turnsStack.length === 0)
        {
            return false;
        }

        let bestTurn;

        this.#turnsStack.forEach((turn, index) => {
            if (index === 0 || turn.getPoints() > bestTurn.getPoints())
            {
                bestTurn = turn;
            }
        })

        return bestTurn.getDataCopy();
    }

    /* SETTERS */
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
    addTurn(turn)
    {
        this.#turnsStack.push(turn);
    }

    /* COUNT GETTERS */
    getPlayersCount()
    {
        return this.#players.length;
    }
    getTurnsStackCount()
    {
        return this.#turnsStack.length;
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


    /* LOCAL STORAGE */
    toJSON()
    {
        
    }
    static fromJSON(json)
    {
        
    }
}