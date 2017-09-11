myButton.addEventListener('mouseover', ()=>{
	let audio = new Audio();
	audio.src = '../src/js/sounds/open.mp4';
	audio.play();
	setTimeout(() => {
	  myButton.innerText = `Don't ever become a sith!`;
	}, 700)
});
myButton.addEventListener('mouseout', ()=>{
	let audio = new Audio();
	audio.src = '../src/js/sounds/Close.mp4';
	audio.play();
	setTimeout(() => {
	  myButton.innerText = `Go, Jedi !`;
	}, 700)
});