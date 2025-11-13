import { GameEvents } from "../core/GameEvents.js";


/*=====[HTML ELEMENTS]=====*/


/*=====[INIT]=====*/
function initSettingsScreen()
{

}

/*=====[SETUP]=====*/
function getElementsSettingsScreen()
{

}
function addListenersSettingsScreen()
{

}

/*=====[EVENT HANDLERS]=====*/
function onTimeChange()
{
    
}
function onWordsPerPlayerChange()
{

}
function onBackToTeams()
{

}
function onContinue()
{

}

/*=====[RENDER]=====*/
function renderSettingsScreen()
{

}





/* html elements 
const settingsBackButton = document.querySelector('.settings-screen-back-button');
const timerInput = document.getElementById('timer-input');
const wordsPerPlayerInput = document.getElementById('words-per-player-input');

/* event listeners 
timerInput.addEventListener('change', () => {
    gameState.settings.turnDuration = timerInput.value;
    saveGameState();
})

wordsPerPlayerInput.addEventListener('change', () => {
    gameState.settings.wordsPerPlayer = wordsPerPlayerInput.value;
    saveGameState();
})

/* LOAD 
function loadSettings()
{
    timerInput.value = gameState.settings.turnDuration;
    wordsPerPlayerInput.value = gameState.settings.wordsPerPlayer;
}


/* SCREEN MANIPULATION 
settingsBackButton.addEventListener('click', () => {showScreen('home-screen')});

/* CALLS 
loadSettings();*/