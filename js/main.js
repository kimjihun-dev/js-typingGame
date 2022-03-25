const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay = document.querySelector("#time")
const messageDisplay = document.querySelector("#message")

const GAME_TIME = 5;

const API_URL = "https://random-word-api.herokuapp.com/word?number=100";

let words = ["banana", "django", "javascript", "react", "rails"];
let score = 0;
let time = 0;
let timeInterval;
let isPlaying  = false;
let isReady = false;


init()

// async await
async function init(){
    const res = await fetch(API_URL);
    const data = await res.json();

    let tmpData = data.filter(item=> {
        return item.length < 7
    })
    words = tmpData
    isReady = true;
}

// function init(){
//     const res = fetch(API_URL).then((res)=>{
//         return res.json().then((data)=>{ words = data })
//     });
//     console.log(res)
// }




wordInput.addEventListener("input", (e)=>{
    const typedText = e.target.value
    const currentText = currentWord.innerText;

    if (typedText.toUpperCase() === currentText.toUpperCase() && isReady){
        console.log("같습니다")
        addScore()
        setNewWord()
    }
})

// 게임종료
function gameover(){
    clearInterval(timeInterval)
    isPlaying = false;
    console.log("game over!!")
    timeInterval = null;
    messageDisplay.innerText = "GAME OVER!"
    score = 0;
}

// 시간 카운트다운
function countDown(){
    time = time - 1;
    timeDisplay.innerText = time;
    if (time === 0){
        gameover()
    }
}

function setNewWord(){
    // 시간 초기화
    time = GAME_TIME;

    wordInput.value = "";
    messageDisplay.innerText = "Now Playing!!!"
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord.innerText = words[randomIndex];

    if (!isPlaying) {
        timeInterval = setInterval(countDown, 1000)
        isPlaying = true;
    }

    
}

function addScore(){
    score = score + 1;
    console.log(score)
    scoreDisplay.innerText = score;
}