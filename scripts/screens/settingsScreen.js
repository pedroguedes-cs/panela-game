import { EVENTS } from "../core/Events.js";
import { gameController, gameEvents } from "../main.js";
import { SCREENS } from "../core/Screens.js";


/*=====[HTML ELEMENTS]=====*/
let settingsBackButton;
let timerInput;
let wordsPerPlayerInput;
let settingsContinueButton;

/*=====[INIT]=====*/
export function initSettingsScreen()
{
    getElementsSettingsScreen();
    addListenersSettingsScreen();
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
    settingsBackButton.addEventListener('click', onGoBackHome);
    timerInput.addEventListener('change', onTimerChange);
    wordsPerPlayerInput.addEventListener('change', onWordsPerPlayerChange);
    settingsContinueButton.addEventListener('click', onContinue);

    gameEvents.addEventListener(EVENTS.SHOW_SCREEN, (event) => {onShowScreen(event.detail.screenId)})
}

/*=====[EVENT HANDLERS]=====*/
function onGoBackHome()
{
    gameController.tryGoBackHome();
}
function onTimerChange()
{
    gameController.trySetTurnTime(timerInput.value);
}
function onWordsPerPlayerChange()
{
    gameController.trySetWordsPerPlayer(wordsPerPlayerInput.value);
}
function onContinue()
{
    gameController.tryGoWordsInput();
}
function onShowScreen(screenId)
{
    if (screenId === SCREENS.SETTINGS)
    {
        renderSettingsScreen();
    }
}

/*=====[RENDER]=====*/
function renderSettingsScreen()
{
    const settingsInfo = gameController.getSettingsInfo();

    timerInput.value = settingsInfo.turnTime;
    wordsPerPlayerInput.value = settingsInfo.wordsPerPlayer;
}