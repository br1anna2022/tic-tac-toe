let p_Text = document.getElementById('p_Text');
let restart = document.getElementById('restart');//get all elements with the id 'restart'//
let boxes = Array.from(document.getElementsByClassName('box')); //create an array from an array like object//


const O_player ="O"; //creates the variable for X and O//
const X_player ="X";
let beginner = O_player;//begins the game with the letter O//
let spaces = Array(9).fill(null); //create an array with 9 indexes/spaces and fill those spaces with null, in order for the game to be tracked with the X and O//
let const_plays = 0 

const startGame = () => {
    boxes.forEach(box=>box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = parseInt(e.target.id); //Added parseInt to convert the id to an integer so that it can be used as an index in spaces.//

    if(!spaces[id] && const_plays <9){//if this index is equal to null which means that it hasn't been filled then we can continue//
        spaces[id] = beginner; //make array 0(the space) either equal to X or O, so it isn't empty anymore//
        e.target.innerText = beginner; //give feedback to the user//

        if (playerWon() !==false){
            p_Text.innerHTML = `${beginner} has won!`
            let winning_streak = playerWon()
            const_plays=10
            
            winning_streak.forEach(box => boxes[box].style.backgroundColor = '#9D8189');       
            return;
        }
        const_plays++//allows for the user to not click anymore after they have won the game//
        beginner = beginner === O_player ? X_player : O_player;
    }// if X is played then change it to O
    if (const_plays===9) {
        p_Text.innerHTML = 'Draw Game' 
        boxes.forEach(box=> box.style.color = '#F4ACB7') //if the game draws then it changes the color of the board//
    }
}

const comboWin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWon() {
    for(const conditon of comboWin) {
        let [a,b,c]= conditon//iteration of object 'forof'//

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false

}

restart.addEventListener('click', restart1)

function restart1() { //restarts the entire game//
    spaces.fill(null)
    const_plays = 0
    boxes.forEach(box=> {
        box.innerText=''
        box.style.backgroundColor=''
        box.style.color='black'
    })
    
    p_Text.innerHTML = 'Tic-Tac-Toe'
    beginner = O_player

}


startGame();

