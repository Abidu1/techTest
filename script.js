    const ticTacToeGame = {}
    const blue = 'blue'
    const yellow = 'yellow'
    const grid = document.getElementById('grid')
    const cells = document.querySelectorAll('.cell');
    const combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7,],
    [2,5,8], [0,4,8], [2,4,6], [0,4,8], [2,4,6] ];
    const message = document.querySelector(".message")
    const messageContainer = document.querySelector(".messageContainer")
    const playAgainbtn = document.querySelector('.resetBtn')
    const tweetLink = document.querySelector('.tweet')
    const facebookLink = document.querySelector('.facebook')
    const errorBoxContainer = document.querySelector('.errorBoxContainer')
    const errorBoxBtn = document.querySelector('.errorBoxBtn')
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let turn


    

ticTacToeGame.init = function() {
    // reset the game
    startTurn();

    playAgainbtn.addEventListener('click', startTurn)
    tweetLink.addEventListener('click', tweetCurrentPage)
    facebookLink.addEventListener('click', fbshareCurrentPage)
    errorBoxBtn.addEventListener('click', removeErrorMessage)


    function startTurn(){
        turn = false;
        cells.forEach(cell => {
            // removing blue and yellow variables from the board
            cell.classList.remove(blue)
            cell.classList.remove(yellow)
            // clearing all the cells in the array if they were clicked before from the previous game
            gameState = ["", "", "", "", "", "", "", "", ""];
            // removing the event listeners that were fired from the previous round
            cell.removeEventListener('click', playerClick);
            // when player clicks on a cell the event listener fires 
            cell.addEventListener('click', playerClick)
            });
        hoverBoard()
        //removing the winmessage from the before
        messageContainer.classList.toggle('active')
        }




    function playerClick(e){
        const cellTarget = e.target;
        // when player clicks they will target the cell
        const playerTurn = turn ? yellow : blue
        // getting the id of each cell so if a player clicks on a cell that has been clicked before then they would get an alert 
        const indexTarget = parseInt(cellTarget.getAttribute('data-id'));
        // if cell has been filled and user clicks then there would be an error since in the gameState the cell has already been used
        if(gameState[indexTarget] !== ""){
            // shows errormessage when user clicks twice on the same spot 
            return errorMessage();
        }
        gameState[indexTarget] = turn
        cellTarget.classList.add(playerTurn)
        if(winCombo(playerTurn)){
            finishGame(false);
            } else if(playersTie()){
                finishGame(true)
            } else{
                switchTurns()
                hoverBoard()
            }
        }


    function finishGame(draw){
        // if there is a draw a message will show up with draw  
        if(draw){
            message.innerHTML = "Draw!"
            tweetLink.removeEventListener('click', tweetCurrentPage)
            facebookLink.removeEventListener('click', fbshareCurrentPage)
            // adding the active class to not display the twitter and facebook button when there is a draw
            tweetLink.classList.add('active')
            facebookLink.classList.add('active')

        // if condition is false this means current player won
        } else {
            message.innerHTML = `${turn ? "Yellow" : "Blue" } Wins!`
            // removing the display-none property called 'active' on both the twitter and facebook button so that player can post when they win
            tweetLink.classList.remove('active')
            facebookLink.classList.remove('active')
            tweetLink.addEventListener('click', tweetCurrentPage)
            facebookLink.addEventListener('click', fbshareCurrentPage)

        }
        // winbox appears when players either win or finish the game
        messageContainer.classList.add('active')
    }

    // adding class active so that errorBox pops up
    function errorMessage(){
        return errorBoxContainer.classList.add('active')
    
    }

    // toggling error message which can be removed when user clicks on error box button
    function removeErrorMessage(){
        return errorBoxContainer.classList.toggle('active')
    }


    function playersTie (){
        // if every cell is clicked and there is no winning combo 
        return [...cells].every(cell=> {
            return cell.classList.contains(yellow) || cell.classList.contains(blue)
        })
    }





    function switchTurns (){
        // switches turns for players
            turn = !turn
    }

    function hoverBoard(){
        // removing blue and yellow from board
        grid.classList.remove(blue);
        grid.classList.remove(yellow);
        // depending on the current player the grid will hover either blue or yellow
        if(turn){
            grid.classList.add(yellow)
        } else {
            grid.classList.add(blue)
        }

    }

   function winCombo(playerTurn){
       // if current player has any combo which will be true then check for combo in the array using the every method and if its true then current player wins
        return combinations.some(combo =>{
            return combo.every(index =>{
                return cells[index].classList.contains(playerTurn)
                    //checking the cells if current play has any of the combos 
            })
        })
    }

} 
//social media shares 
function tweetCurrentPage(){ 
    window.open("https://twitter.com/share?url="+ encodeURIComponent(window.location.href)+"&text="+"Just won a game of TicTacToe!", '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false; 
}

function fbshareCurrentPage()
{window.location.href="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)+"&t="+"Just won a game of TicTacToe!" }



//Document Initialized
    ticTacToeGame.init();








