const blue = 'blue'
        const yellow = 'yellow'
        const grid = document.getElementById('grid')
        const cells = document.querySelectorAll('.cell');
        const combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7,],
        [2,5,8], [0,4,8], [2,4,6], [0,4,8], [2,4,6] ];
        const winMessage = document.querySelector(".winMessage")
        const winBox = document.querySelector(".win")
        const playAgainbtn = document.querySelector('.resetBtn')
        const randomBtn = document.querySelector('.randomBtn')
        let gameState = ["", "", "", "", "", "", "", "", ""];
        let turn


        startTurn();

        playAgainbtn.addEventListener('click', startTurn)

        function startTurn(){
            turn = false;
            cells.forEach(cell => {
            cell.classList.remove(blue)
            cell.classList.remove(yellow)
            gameState = ["", "", "", "", "", "", "", "", ""];
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick)
        });
        hoverBoard()
        winBox.classList.remove('active')
        }


        

        function handleClick(e){
            const cellTarget = e.target;
            const playerTurn = turn ? yellow : blue
            const indexTarget = parseInt(cellTarget.getAttribute('data-id'));
            if(gameState[indexTarget] !== ""){
               return alert("error");
            }
            gameState[indexTarget] = turn
            cellTarget.classList.add(playerTurn)
            if(checkPlayerWin(playerTurn)){
                gameOver(false);
            } else if(playersTie()){
                gameOver(true)
            } else{
                switchTurns()
                hoverBoard()
            }
        }


        function gameOver(draw){
            if(draw){
                winMessage.innerText = "Draw!"

            } else {
                winMessage.innerText = `${turn ? "yellow" : "blue" } Wins!`
            }

            winBox.classList.add('active')
        }



        function playersTie (){
            return [...cells].every(cell=> {
                return cell.classList.contains(yellow) || cell.classList.contains(blue)
            })
        }




        function switchTurns (){
            turn = !turn
        }

        function hoverBoard(){
            grid.classList.remove(blue);
            grid.classList.remove(yellow);
            if(turn){
                grid.classList.add(yellow)
            } else {
                grid.classList.add(blue)
            }

        }

        function checkPlayerWin(playerTurn){
            return combinations.some(combo =>{
                return combo.every(index =>{
                    return cells[index].classList.contains(playerTurn)
                    //checking the cells 
                })
            })
        }

        function tweetCurrentPage()
    { 
        window.open("https://twitter.com/share?url="+ encodeURIComponent(window.location.href)+"&text="+document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false; }



