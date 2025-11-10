import { showScreen } from "./screenManager.js";


/* html elements */
const settingsBackButton = document.querySelector('.settings-screen-back-button');




settingsBackButton.addEventListener('click', () => {showScreen('home-screen')});