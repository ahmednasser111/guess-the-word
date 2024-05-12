const gameName = "Guess The Word";
const trials = 5;
let hints = 3;
const WORDS = [
	"Purple",
	"Garden",
	"Coffee",
	"Singer",
	"Forest",
	"Rocket",
	"Castle",
	"Spirit",
	"Window",
	"Basket",
	"Pocket",
	"Guitar",
	"Doctor",
	"Banana",
	"Cheese",
	"School",
	"wonder",
	"zombie",
	"Elephant",
	"Laptop",
	"Ocean",
	"Mountain",
	"Sunshine",
	"Happiness",
	"Rainbow",
	"Butterfly",
	"Chocolate",
	"Telephone",
	"Elephant",
	"Butterfly",
	"Dolphin",
	"Fireworks",
	"Universe",
	"Adventure",
	"Journey",
	"Mystery",
	"Starlight",
	"Waterfall",
	"Cupcake",
	"Snowflake",
	"Volcano",
	"Whale",
	"Paradise",
	"Fantasy",
	"Miracle",
	"Sunflower",
	"Infinity",
	"Harmony",
	"Media",
	"Width",
];
const randomWord =
	WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
const n = randomWord.length;
const inputsContainer = document.querySelector(".inputs");
const message = document.querySelector(".message");
const checkButton = document.querySelector("#check");
const hintButton = document.querySelector("#hint");

let activeTrial = 1;

document.querySelector("h1").textContent = gameName;
document.querySelector(
	"footer"
).innerHTML = `${gameName} &copy;${new Date().getFullYear()}`;

function createTry() {
	let tryElement = document.createElement("div");
	tryElement.classList.add(`try-word`);
	tryElement.classList.add(`try-${activeTrial}`);
	tryElement.innerHTML = `Try ${activeTrial}:&nbsp;&nbsp;`;
	if (activeTrial != 1) {
		tryElement.classList.add(`disabled`);
	}

	for (let j = 0; j < n; j++) {
		let tryLetter = document.createElement("input");
		tryLetter.classList.add("try-letter");
		tryLetter.setAttribute("maxlength", "1");
		if (tryElement.classList.contains("disabled")) tryLetter.disabled = true;
		tryLetter.oninput = function () {
			tryLetter.value = tryLetter.value.toUpperCase();
			if (tryLetter.value.length > 0) {
				if (tryLetter.nextSibling) {
					tryLetter.nextSibling.focus();
				}
			}
		};
		tryLetter.onkeydown = function (e) {
			if (e.key == "ArrowRight") {
				if (tryLetter.nextElementSibling) {
					tryLetter.nextSibling.focus();
				}
			} else if (e.key == "ArrowLeft") {
				if (tryLetter.previousElementSibling) {
					tryLetter.previousSibling.focus();
				}
			} else if (e.key == "Enter") checkButton.click();
			else if (e.key == "Backspace") {
				if (tryLetter.value == "") {
					if (tryLetter.previousElementSibling) {
						tryLetter.previousSibling.focus();
						tryLetter.previousSibling.value = "";
					}
				} else {
					tryLetter.value = "";
				}
			}
		};
		tryElement.appendChild(tryLetter);
	}
	inputsContainer.appendChild(tryElement);
}
function generateInput() {
	createTry();
	inputsContainer.children[0].firstElementChild.focus();
}
checkButton.addEventListener("click", checkGuessing);

console.log(randomWord);
function checkGuessing() {
	let currentTry = document.querySelectorAll(`.try-${activeTrial} .try-letter`);
	let success = true;
	currentTry.forEach((e, i) => {
		console.log(randomWord.includes(e.value));
		if (randomWord.includes(e.value) && e.value !== "") {
			if (randomWord[i] == e.value) e.classList.add("in-place");
			else {
				e.classList.add("not-in-place");
				success = false;
			}
		} else {
			e.classList.add("not-found");
			success = false;
		}
	});
	if (success) {
		message.innerHTML = `You win. the word is <span>${randomWord}</span>`;
		document
			.querySelectorAll(".inputs > div")
			.forEach((e) => e.classList.add("disabled"));
		checkButton.disabled = true;
		hintButton.disabled = true;
	} else {
		if (activeTrial == trials) {
			message.innerHTML = `You lose. the word is <span>${randomWord}</span>`;
			document
				.querySelectorAll(".inputs > div")
				.forEach((e) => e.classList.add("disabled"));
			checkButton.disabled = true;
			hintButton.disabled = true;
		} else {
			activeTrial++;
			createTry();
			let current = document.querySelector(`.try-${activeTrial - 1}`);
			current.nextSibling.classList.remove("disabled");
			Array.from(current.nextSibling.children).forEach((e) => {
				e.disabled = false;
			});
			current.nextSibling.firstElementChild.focus();
		}
	}
}
hintButton.querySelector("span").innerHTML = hints;
hintButton.addEventListener("click", getHint);

function getHint() {
	let currentTry = Array.from(
		document.querySelectorAll(`.try-${activeTrial} .try-letter`)
	).filter((e) => e.value == "");
	if (currentTry.length > 0) {
		if (hints > 0) {
			hintButton.querySelector("span").innerHTML = --hints;
		}
		randomIndex = Math.floor(Math.random() * currentTry.length);
		currentTry[randomIndex].value =
			randomWord[
				Array.from(
					document.querySelector(`.try-${activeTrial}`).children
				).indexOf(currentTry[randomIndex])
			];
		if (hints == 0) {
			hintButton.disabled = true;
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	generateInput();
});
