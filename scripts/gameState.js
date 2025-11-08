let gameState = JSON.parse(localStorage.getItem('gameState'));

if (!gameState)
{
    gameState = 
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

function saveGameState()
{
    localStorage.setItem('gameState', JSON.stringify(gameState));
}
