export let gameState = loadGameState();

export function saveGameState()
{
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState()
{
    let saved = JSON.parse(localStorage.getItem('gameState'));

    if (!saved)
    {
        saved = 
        {
            teams: [],
            allWords: [],
            settings: 
            {
                turnDuration: 60,
                wordsPerPlayer: 4
            },
            session:
            {
                screenId: 'home',
                roundNumber: 1,
                remainingWords: [],
                currentTurn:
                {
                    teamIndex: 0,
                    playerIndex: 0,
                    remainingTime: 0
                }
            }
        }
    }

    return saved;
}
