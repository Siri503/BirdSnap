const screens = document.querySelectorAll('.screen');
const choose_bird_btn = document.querySelectorAll('.choose-bird-btn');
const start_btn = document.getElementById("start-btn");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const game_container = document.getElementById("game-container");

let seconds = 0;
let score = 0;
let selected_bird = {};

let gameInterval; // Variable to hold the game interval

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up');
    startGame();
});

choose_bird_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_bird = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createBird, 1000);
    });
});

function startGame() {
    gameInterval = setInterval(() => {
        increaseTime();
        if (seconds >= 60) {
            clearInterval(gameInterval); // Stop the game after 1 minute
            endGame();
        }
    }, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createBird() {
    const bird = document.createElement('div');
    bird.classList.add('bird');
    const { x, y } = getRandomLocation();
    bird.style.top = `${y}px`;
    bird.style.left = `${x}px`;
    bird.innerHTML = `<img src="${selected_bird.src}" alt="${selected_bird.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    bird.addEventListener('click', catchBird);
    game_container.appendChild(bird);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchBird() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addBirds();
}

function addBirds() {
    setTimeout(createBird, 1000);
    setTimeout(createBird, 1500);
}

function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}

function endGame() {
    message.innerHTML = `Game Over! Your Score: ${score} <br> Quit?`;
    message.innerHTML += `<button class="btn" id="quit-btn">Quit</button>`;
    message.classList.add('visible');   
    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', () => {
        alert('Thank you for playing!');
    });
}

function resetGame() {
    clearInterval(gameInterval);
    seconds = 0;
    score = 0;
    selected_bird = {};
    game_container.innerHTML = '';
    timeEl.innerHTML = 'Time: 00:00';
    scoreEl.innerHTML = 'Score: 0';
    message.innerHTML = '';
    message.classList.remove('visible');
}