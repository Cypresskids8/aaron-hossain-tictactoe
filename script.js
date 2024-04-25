let currentTurn = 0; 
let gameOver = false; 

//Player turns: 0, 2, 4, 6, 8...
//AI turns: 1, 3, 5, 7, 9...

const button1 = document.getElementById("sq0");
const button2 = document.getElementById("sq1");
const button3 = document.getElementById("sq2");
const button4 = document.getElementById("sq3");
const button5 = document.getElementById("sq4");
const button6 = document.getElementById("sq5");
const button7 = document.getElementById("sq6");
const button8 = document.getElementById("sq7");
const button9 = document.getElementById("sq8");

const box = document.querySelector(".box"); 

let buttonList = [  //array
    button1, button2, button3, button4, button5, button6, button7, button8, button9
];

gameplay();     //function call

function gameplay(){    //function definition
    buttonList.forEach(button => {  //arrow function
        button.onclick = () => {
            let pTag = button.children[0]; 
            if(currentTurn % 2 == 0){
                currentTurn++; //iterator, adds 1
                pTag.innerHTML = "X"; //changes the text
                button.disabled = true; 
                buttonList.splice(buttonList.indexOf(button),1);
                checkWin(); 
                if(gameOver == false){
                    AITurn(buttonList);
                }
            }
        }; 
    });
}

function AITurn(list){
    if(list.length > 0){
        let random = Math.floor(Math.random() * list.length);
        let aiChoice = list[random]; 
        aiChoice.disabled = true;
        list.splice(buttonList.indexOf(aiChoice),1); 
        let pTag = aiChoice.children[0];
        pTag.innerHTML = "O";
        currentTurn++; 
        checkWin();
    }
}

function checkWin(){
    if(
        button1.textContent.trim() == "X" && button2.textContent.trim() == "X" && button3.textContent.trim() == "X" || //X Horizontal
        button4.textContent.trim() == "X" && button5.textContent.trim() == "X" && button6.textContent.trim() == "X" || //x Horizontal
        button7.textContent.trim() == "X" && button8.textContent.trim() == "X" && button9.textContent.trim() == "X" || //X Horizontal

        button1.textContent.trim() == "X" && button4.textContent.trim() == "X" && button7.textContent.trim() == "X" || //X Vertical
        button2.textContent.trim() == "X" && button5.textContent.trim() == "X" && button8.textContent.trim() == "X" || //X Vertical
        button3.textContent.trim() == "X" && button6.textContent.trim() == "X" && button9.textContent.trim() == "X" || //X Vertical
        
        button1.textContent.trim() == "X" && button5.textContent.trim() == "X" && button9.textContent.trim() == "X" || //X Diagnol
        button3.textContent.trim() == "X" && button5.textContent.trim() == "X" && button7.textContent.trim() == "X"  //X Diagnol
    ){
       gameOver = true;
       endofGame("You have");
    }
    if(
        button1.textContent.trim() == "O" && button2.textContent.trim() == "O" && button3.textContent.trim() == "O" || //X Horizontal
        button4.textContent.trim() == "O" && button5.textContent.trim() == "O" && button6.textContent.trim() == "O" || //x Horizontal
        button7.textContent.trim() == "O" && button8.textContent.trim() == "O" && button9.textContent.trim() == "O" || //X Horizontal

        button1.textContent.trim() == "O" && button4.textContent.trim() == "O" && button7.textContent.trim() == "O" || //X Vertical
        button2.textContent.trim() == "O" && button5.textContent.trim() == "O" && button8.textContent.trim() == "O" || //X Vertical
        button3.textContent.trim() == "O" && button6.textContent.trim() == "O" && button9.textContent.trim() == "O" || //X Vertical
        
        button1.textContent.trim() == "O" && button5.textContent.trim() == "O" && button9.textContent.trim() == "O" || //X Diagnol
        button3.textContent.trim() == "O" && button5.textContent.trim() == "O" && button7.textContent.trim() == "O"  //X Diagnol
    ){
           gameOver = true;
           endofGame("ai has");
    }
}

function endofGame(winner){
 buttonList.forEach(button => {
    button.disabled = true;
});

const word = document.createElement('h1');///create h1 element
word.classList.add("winner-text")
word.innerHTML = winner + "won!";
box.appendChild(word);

const reset = document.createElement('button');///create button element
reset.classList.add("reset-button");
reset.innerHTML = "Play again?";
box.appendChild(reset);

reset.onclick = () => {
    currentTurn = 0;
    gameOver = false;
    buttonList.splice(0, buttonList.length)
    buttonList = [button1, button2, button3, button4, button5, button6, button7, button8, button9]
    box.removeChild(reset);
    box.removeChild(word);

    buttonList.forEach(element => {
        element.children[0].innerHTML = "";
        element.disabled = false;
  });
  gameplay();
}
}