const gameName = "Guess The Word"
const trials = 5
const n = 6
const WORDS = ["Purple", "Garden", "Coffee", "Singer", "Forest", "Rocket", "Castle", "Spirit", "Window", "Basket", "Pocket", "Guitar", "Doctor", "Banana", "Cheese", "School", "jugate", "wonder", "zombie"]
const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
const inputsContainer = document.querySelector('.inputs')

let activeTrial = 1;

document.querySelector('h1').textContent = gameName
document.querySelector('footer').innerHTML = `${gameName} &copy;${new Date().getFullYear()}`


function generateInput(n){
	for (let i = 1; i <= trials; i++){
		let tryElement = document.createElement('div');
		tryElement.classList.add(`try-word`);
		tryElement.classList.add(`try-${i}`);
		tryElement.innerHTML = `Try ${i}:&nbsp;&nbsp;`;
		if (i != 1){
			tryElement.classList.add(`disabled`);
		}
		
		
		for (let j = 0; j < n; j++) {
			let tryLetter = document.createElement('input');
			tryLetter.classList.add('try-letter');
			tryLetter.setAttribute('maxlength', '1');
			if (tryElement.classList.contains('disabled'))
				tryLetter.disabled = true;
			tryLetter.oninput = function () {
				tryLetter.value = tryLetter.value.toUpperCase();
				if (tryLetter.value.length > 0) {
					if (tryLetter.nextSibling){
						// if (tryLetter.parentElement.nextSibling){
						// 	tryLetter.parentElement.nextSibling.classList.remove('disabled');
						// 	Array.from(tryLetter.parentElement.nextSibling.children).forEach((e) => {
						// 		e.disabled = false;
						// 	});
						// 	tryLetter.parentElement.nextSibling.firstElementChild.focus();
						// }
						tryLetter.nextSibling.focus();
					}
				}
			}
			tryLetter.onkeydown = function (e) {
				if (e.key == 'ArrowRight'){
					if (tryLetter.nextElementSibling){
						// if (tryLetter.parentElement.nextSibling){
						// 	tryLetter.parentElement.nextSibling.classList.remove('disabled');
						// 	Array.from(tryLetter.parentElement.nextSibling.children).forEach((e) => {
						// 		e.disabled = false;
						// 	});
						// 	tryLetter.parentElement.nextSibling.firstElementChild.focus();
						// }
						tryLetter.nextSibling.focus();
					}
				}
				else if (e.key == 'ArrowLeft'){
					if (tryLetter.previousElementSibling){
						tryLetter.previousSibling.focus();
					}
				}
			}
			tryElement.appendChild(tryLetter);

		}
		inputsContainer.appendChild(tryElement);

	}
	inputsContainer.children[0].firstElementChild.focus();


}
document.getElementById("check").addEventListener("click", checkGuessing);

console.log(randomWord);
function checkGuessing(){
	let currentTry = document.querySelectorAll(`.try-${activeTrial} .try-letter`);
	currentTry.forEach((e, i) => {
		if (e.value){
			if(randomWord.includes(e.value))
			{
				if (i == randomWord.indexOf(e.value))
				e.classList.add('in-place');
				else
				e.classList.add('not-in-place');
			}
			else
			e.classList.add('not-found');
		}
	});
	activeTrial++;
}


window.onload = () => generateInput(n);

