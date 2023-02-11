let turnCount = 0;
let pointsX = 0;
let pointsO = 0;
let player = "X";

const winningPos = [
    [0,4,8],
    [4,8,12],
    [8,12,16],
    [1,5,9],
    [5,9,13],
    [9,13,17],
    [2,6,10],
    [6,10,14],
    [10,14,18],
    [3,7,11],
    [7,11,15],
    [11,15,19],
    [0,1,2],
    [1,2,3],
    [4,5,6],
    [5,6,7],
    [8,9,10],
    [9,10,11],
    [12,13,14],
    [13,14,15],
    [16,17,18],
    [17,18,19],
    [0,5,10],
    [4,9,14],
    [8,13,18],
    [1,6,11],
    [5,10,15],
    [9,14,19],
    [8,5,2],
    [12,9,6],
    [16,13,10],
    [9,6,3],
    [13,10,7],
    [17,14,11]
]

const insert = (index) => {
    let field = document.querySelector(`[data-index="${index}"]`);
    if(field.dataset.status=='active') {
        // console.log('bruh');
        field.dataset.status = `inactive${player}`;
        field.innerHTML += `<p style="position:absolute; z-index: 123;">${player}</p>`;
        turnCount++;
        // console.log(turnCount);
        checkRoundWin();
        playerSwitch();
    } else {
        // console.log('skill issue');
    }
}

const checkRoundWin = () => {
    winningPos.forEach((element) => {
        // console.log(element[0], element[1], element[2])
        if(document.querySelector(`[data-index="${element[0]}"]`).dataset.status==`inactive${player}` 
        && document.querySelector(`[data-index="${element[1]}"]`).dataset.status==`inactive${player}` 
        && document.querySelector(`[data-index="${element[2]}"]`).dataset.status==`inactive${player}`) {
                alert(`${player} wygrywa rundę`)
            roundWin(player);    
        } else if(turnCount==20) {
            draw();
        }
    })
} 

const playerSwitch = () => {
    if(player=="X") player = "O";
    else if(player=="O") player = "X";
}

const roundWin = (player) => {
    if(player == "X") pointsX++;
    else pointsO++;
    
    document.querySelector("#playerXcount").innerHTML = `Punkty X: ${pointsX}`;
    document.querySelector("#playerOcount").innerHTML = `Punkty O: ${pointsO}`;

    const playingField = document.querySelectorAll(".playingField");
    playingField.forEach((element) => {
        turnCount = 0;
        element.innerHTML = `<div class="fieldContent"></div>`;
        element.dataset.status = "active";
    })
    setTimeout(() => {
        checkWin();
    }, 100);
}

const draw = () => {
    playerSwitch();
    turnCount = 0;
    alert("REMIS");
    const playingField = document.querySelectorAll(".playingField");
    playingField.forEach((element) => {
        setTimeout(() => {
            turnCount = 0;
            element.innerHTML = `<div class="fieldContent"></div>`;
            element.dataset.status = "active";
        }, 100);
    })
}

const checkWin = () => {
    if(pointsX > 1) {
        alert("Gracz X wygrywa!")
        location.reload();
    } else if(pointsO > 1) {
        alert("Gracz O wygrywa!");
        location.reload();
    }
}

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for(const card of document.querySelectorAll(".playingField")) {
    card.onmousemove = e => handleOnMouseMove(e)
}