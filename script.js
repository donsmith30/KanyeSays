const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

//global vars
let limit = 1;
let shuffledArray = [];
let triviaArray = [];
let setNum = 0;
let quote = [];
let playerPoints = 0;

let kanyeQuote = "";
let famousQuote = "";
let userChoice = "";

async function getQuotes(url) {
  const response = await fetch(url);
  const loadApi = await response.json();
  quote = await loadApi;
}

async function getFamousQuotes() {
  url = `https://type.fit/api/quotes`;
  const result = await getQuotes(url);
  for (var i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * (quote.length - 1) + 1);
    userChoice = await quote[randomNum].text;
    triviaArray.push(userChoice);
  }
}

async function kanyeQuotes() {
  url = `https://api.kanye.rest/`;
  const result = await getQuotes(url);
  kanyeQuote = await quote.quote;
  triviaArray.push(kanyeQuote);
}

async function getResponseSet() {
  console.log("check this");
}

async function buildResponseArray() {
  result = await getFamousQuotes();
  result = await kanyeQuotes();

  shuffledArray = triviaArray.sort((a, b) => 0.5 - Math.random());
  //correctAnswer = kanyeQuote
}

async function buildQuestion() {
  triviaQ = `What did Kanye say?`;
}

async function buildTrivia() {
  const game = document.createElement("div");
  document.getElementById("game_container").appendChild(game);

  const question = document.createElement("p");
  question.innerText = triviaQ;
  game.appendChild(question);

  const triviaResponseForm = document.createElement("form");
  game.appendChild(triviaResponseForm);

  const triviaResponseSubmit1 = document.createElement("input");
  triviaResponseSubmit1.setAttribute("type", "button");
  triviaResponseSubmit1.classList.add("response");
  triviaResponseSubmit1.setAttribute("value", shuffledArray[0]);
  triviaResponseForm.appendChild(triviaResponseSubmit1);

  const triviaResponseSubmit2 = document.createElement("input");
  triviaResponseSubmit2.setAttribute("type", "button");
  triviaResponseSubmit2.classList.add("response");
  triviaResponseSubmit2.setAttribute("value", shuffledArray[1]);
  triviaResponseForm.appendChild(triviaResponseSubmit2);

  const triviaResponseSubmit3 = document.createElement("input");
  triviaResponseSubmit3.setAttribute("type", "button");
  triviaResponseSubmit3.classList.add("response");
  triviaResponseSubmit3.setAttribute("value", shuffledArray[2]);
  triviaResponseForm.appendChild(triviaResponseSubmit3);

  const triviaResponseSubmit4 = document.createElement("input");
  triviaResponseSubmit4.setAttribute("type", "button");
  triviaResponseSubmit4.classList.add("response");
  triviaResponseSubmit4.setAttribute("value", shuffledArray[3]);
  triviaResponseForm.appendChild(triviaResponseSubmit4);
}

async function playGame() {
  const result = await getResponseSet();
  newRound();
}

document.getElementById("newGame").addEventListener("click", () => {
  ninjaToggle();
});

async function newRound() {
  if (setNum < limit) {
    await buildResponseArray();
    await buildQuestion();
    await buildTrivia();
    setNum++;
  } else {
    var winPercent = (playerPoints / limit) * 100;
    if (winPercent >= 70) {
      alert(`${winPercent}% right! GOOD GAME!`);
    } else {
      alert(`${winPercent}% right! Bad GAME!`);
    }
    setNum = 0;
    playerPoints = 0;
  }
}

document.getElementById("game_container").addEventListener("click", (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.classList.contains("response")) {
    const userChoice = clickedElement.getAttribute("value");
    if (userChoice === kanyeQuote) {
      alert("winner");
      playerPoints++;
      //load up more qs
    } else {
      alert(`you are wrong, it was ${kanyeQuote}`);
    }
    document.getElementById("game_container").firstChild.remove();
    triviaArray = [];
    newRound();
  }
});

document
  .getElementById("settings_container")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    ninjaToggle();
    limit = document.getElementById("setLimit").value;

    alert(`You picked ${limit} rounds! Let's go!`);
    playGame();
  });

function ninjaToggle() {
  document.getElementById("settings_container").classList.toggle("ninja");
}
