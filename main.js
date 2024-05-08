const gameName = "Guess The Word"
document.querySelector('h1').textContent = gameName
document.querySelector('footer').innerHTML = `${gameName} &copy;${new Date().getFullYear()}`