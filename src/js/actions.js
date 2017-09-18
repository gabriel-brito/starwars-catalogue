searchButton.addEventListener('mouseover', ()=>{
	let audio = new Audio();
	audio.src = '../src/js/sounds/open.mp4';
	audio.play();
	setTimeout(() => {
	  searchButton.innerText = `Power! Unlimited power!`;
	}, 700)
});
searchButton.addEventListener('mouseout', ()=>{
	let audio = new Audio();
	audio.src = '../src/js/sounds/Close.mp4';
	audio.play();
	setTimeout(() => {
	  searchButton.innerText = `Go, Jedi !`;
	}, 700)
});

window.addEventListener('load', ()=>{
	let audio = new Audio();
	audio.src = '../src/js/sounds/opening.mp3';
	audio.play();
	audio.volume = 0.5;
	setTimeout(() => {
	  audio.pause();
	}, 16800)
});

function goToHomePage(){
	window.location.href = '/';
}