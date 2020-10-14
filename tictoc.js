const xClass="x";
const oClass="o";
const board=document.getElementById("board");
let xTurn;
const winningM = document.getElementById("winningM");
const dataWinningMessageText = document.querySelector("[data-winnig-m-text]");
const restartButton = document.getElementById("restart-button");
const winCells=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];
restartButton.addEventListener("click",(event)=>startGame())
const cells=document.querySelectorAll("[data-cell]");
startGame();
function startGame(){
   xTurn=true
   cells.forEach(cell => {
      cell.classList.remove(xClass);
      cell.classList.remove(oClass);
      cell.addEventListener("click", handleClick, { once: true });
   })
   setBoard();
   winningM.classList.remove("winningM")
}


function handleClick(event){
   const cell=event.target;
   const currentClass=xTurn?xClass:oClass;
   placeMark(cell,currentClass);
   if (checkWin(currentClass)){
      endGame(false)
   }
   else if(isDraw()){
      endGame(true)
   }
   else{
      switchTurns();
      setBoard();
   }
   
}
function endGame(draw){
   if (draw){
      dataWinningMessageText.innerHTML = `Draw!`
   }else{
      dataWinningMessageText.innerHTML=`${xTurn? "x's":"o's"} win!`
   }
   winningM.classList.add("winningM")
}
function isDraw(){
   return [...cells].every(cell=>{
      return cell.classList.contains(xClass)||cell.classList.contains(oClass);
   })
}
function placeMark(cell,currentClass){
   cell.classList.add(currentClass);
}
function switchTurns(){
   xTurn=!xTurn;
}
function setBoard(){
   board.classList.remove(xClass);
   board.classList.remove(oClass);
   if(xTurn){
      board.classList.add(xClass);
   }
   else{
      board.classList.add(oClass);
   }
}
function checkWin(currentClass){
   return winCells.some(currentValue=>{
      return currentValue.every(value=>{
         return cells[value].classList.contains(currentClass);
      })
   })
}