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
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let turn


    

ticTacToeGame.init = function() {
    // reset the game
    startTurn();

    playAgainbtn.addEventListener('click', startTurn)
    tweetLink.addEventListener('click', tweetCurrentPage)
    facebookLink.addEventListener('click', fbshareCurrentPage)


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
        messageContainer.classList.remove('active')
        }


        

    function playerClick(e){
        const cellTarget = e.target;
        // when player clicks they will target the cell
        const playerTurn = turn ? yellow : blue
        // getting the id of each cell so if a player clicks on a cell that has been clicked before then they would get an alert 
        const indexTarget = parseInt(cellTarget.getAttribute('data-id'));
        // if cell has been filled and user clicks then there would be an error 
        if(gameState[indexTarget] !== ""){
            return alert("Error. Spot has been filled.");
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
        // if condition is false this means current player won
        } else {
            message.innerHTML = `${turn ? "Yellow" : "Blue" } Wins!`
        }
        // winbox appears when players either win or finish the game
        messageContainer.classList.add('active')
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

function tweetCurrentPage(){ 
    window.open("https://twitter.com/share?url="+ encodeURIComponent(window.location.href)+"&text="+document.title, '', 
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false; 
}

function fbshareCurrentPage()
{window.location.href="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)+"&t="+document.title }



//Document Initialized
    ticTacToeGame.init();








