import { GameState } from './core/GameState.js';
import { GameController } from './core/GameController.js';
import { initMenu } from './screens/menuScreen.js';
import { initHomeScreen } from './screens/homeScreen.js';
import { initSettingsScreen } from './screens/settingsScreen.js';


export const gameEvents = new EventTarget();
export const gameState = GameState.loadGameState();
export const gameController = new GameController(gameState);

initMenu();
initHomeScreen();
initSettingsScreen();

gameController.initScreen();