/* TOGGLE MENU */
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const openButton = document.querySelector('.hamburguer-menu-icon-wrapper');
const closeButton = document.querySelector('.close-menu-icon-wrapper');

openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);

function openSidebar()
{
    openButton.classList.add('hamburguer-menu-icon-wrapper-hidden');
    sidebar.classList.add('sidebar-open');
    overlay.classList.add('overlay-show');
}

function closeSidebar()
{
    openButton.classList.remove('hamburguer-menu-icon-wrapper-hidden');
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('overlay-show');
}


/* CLICK OUTSIDE TO CLOSE */
document.addEventListener('click', (event) =>
{
    const clickInside = sidebar.contains(event.target) || openButton.contains(event.target);

    if (!clickInside)
    {
        closeSidebar();
    }
})


/* SHOW DESCRIPTION */
const howToPlayButton = document.querySelector('.sidebar-how-to-play-button');
const newGameButton = document.querySelector('.sidebar-new-game-button');
const aboutButton = document.querySelector('.sidebar-about-button');


howToPlayButton.addEventListener('click', (event) => {toggleDescription(event.target)});
newGameButton.addEventListener('click', (event) => {toggleDescription(event.target)});
aboutButton.addEventListener('click', (event) => {toggleDescription(event.target)});

function getDescription(button)
{
    const description = document.createElement('div');
    description.classList.add('sidebar-item-description');

    if (button === 'howToPlay')
    {
        description.classList.add('sidebar-how-to-play-description');

        /* RULES */
        const rulesList = document.createElement('ol');
        rulesList.classList.add('sidebar-how-to-play-rules');

        const rulesArray = [
            '2-5 teams, 1-3 players each.', 
            'Set the timer and words per player', 
            'Enter all words for the game', 
            'Teams take turns: one speaker helps their team guess', 
            'A round ends when all words are used'
        ];

        rulesArray.forEach((rule) => {
            const rulesItem = document.createElement('li');
            rulesItem.classList.add('sidebar-how-to-play-rules-item');
            rulesItem.textContent = rule;
            rulesList.append(rulesItem);
        })

        /* ROUNDS */
        const rounds = document.createElement('div');
        rounds.classList.add('sidebar-how-to-play-rounds');

        const roundsHeader = document.createElement('p');
        roundsHeader.classList.add('sidebar-how-to-play-rounds-header');
        roundsHeader.textContent = 'Rounds';

        const roundsList = document.createElement('ul');
        roundsList.classList.add('sidebar-how-to-play-rounds-list');

        const roundsArray = [
            'Round 1: Explain freely (not the word itself)',
            'Round 2: Use only one word',
            'Round 3: Use only charades'
        ];

        roundsArray.forEach((round) => {
            const roundsItem = document.createElement('li');
            roundsItem.classList.add('sidebar-how-to-play-rounds-item');
            roundsItem.textContent = round;
            roundsList.append(roundsItem);
        })

        rounds.append(roundsHeader, roundsList);

        /* GOAL */
        const goal = document.createElement('p');
        goal.classList.add('sidebar-how-to-play-goal');
        goal.textContent = 'The team that guesses the most words wins!';

        /* APPEND */
        description.append(rulesList, rounds, goal);
    }
    else if (button === 'newGame')
    {

    }
    else if (button === 'about')
    {

    }

    return description;
}

function toggleDescription(target)
{
    let parameter = '';

    if (target.classList.contains('sidebar-how-to-play-button'))
    {
        parameter = 'howToPlay';
    }
    else if (target.classList.contains('sidebar-new-game-button'))
    {
        parameter = 'newGame';
    }
    else if (target.classList.contains('sidebar-about-button'))
    {
        parameter = 'about';
    }

    console.log(parameter);


    let targetDescription = target.querySelector('.sidebar-item-description');

    if (targetDescription)
    {
        console.log('on');
        targetDescription.remove();
    }
    else
    {
        console.log('off');
        target.appendChild(getDescription(parameter));
    }
}