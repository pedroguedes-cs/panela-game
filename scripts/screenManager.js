import { gameState, saveGameState } from "./gameState.js";

export function showScreen(screenName)
{
    document.querySelectorAll('section:not(.section-hidden)').forEach((section) => {
        section.classList.add('section-hidden');
    })

    const currentScreen = document.getElementById(screenName);

    if (currentScreen)
    {
        currentScreen.classList.remove('section-hidden');
        gameState.session.screenId = screenName;
        saveGameState();
    }
    else
    {
        console.log(`couldnt change to screen ${screenName}`);
    }
}

/*

SECTION IDs:

1) home-screen
2) settings-screen

*/