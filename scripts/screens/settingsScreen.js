import { GameEvents } from "../core/GameEvents.js";


/*=====[HTML ELEMENTS]=====*/
let settingsBackButton;
let timerInput;
let wordsPerPlayerInput;
let settingsContinueButton;

/*=====[INIT]=====*/
function initSettingsScreen()
{
    getElementsSettingsScreen();
}

/*=====[SETUP]=====*/
function getElementsSettingsScreen()
{
    settingsBackButton = document.querySelector('.settings-screen-back-button');
    timerInput = document.getElementById('timer-input');
    wordsPerPlayerInput = document.getElementById('words-per-player-input');
    settingsContinueButton = document.querySelector('.settings-screen-continue-button');
}
function addListenersSettingsScreen()
{
    settingsBackButton.addEventListener('click', onBackToTeams);
    timerInput.addEventListener('change', onTimerChange);
    wordsPerPlayerInput.addEventListener('change', onWordsPerPlayerChange);
    settingsContinueButton.addEventListener('click', onContinue);
}

/*=====[EVENT HANDLERS]=====*/
function onBackToTeams()
{

}
function onTimerChange()
{
    
}
function onWordsPerPlayerChange()
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