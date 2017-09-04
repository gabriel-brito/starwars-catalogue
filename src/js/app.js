const url = 'https://swapi.co/api/people/';
let p = document.querySelector('p');
let example;
myButton.onclick = ()=>{
	fetch(url)
		.then(data => data.json())
		.then(data=> {
			example = data.results.map(item=> item.name);
			console.log(example);
		});		
}
