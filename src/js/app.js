const url = 'https://swapi.co/api/people/1';
let p = document.querySelector('p');
myButton.onclick = ()=>{
	fetch(url)
		.then(data => data.json())
		.then((data,err) => {
			let name = data;
			if(name){
				p.innerText = data.name;
			} else {
				console.log('something is wrong.');
			}
		})
}