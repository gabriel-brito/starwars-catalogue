const url = 'https://swapi.co/api/people/';
const searchButton = document.querySelector("#searchButton");
const searchResultsTable = document.querySelector("#itemlist");
const resultsResults = document.querySelector("#searchResults");
const kek = document.querySelector('#kappapride');
let data = null;
let planet = null;
let planetResidents = null;

const renderPersonsTable = (container, data) => {
	container.innerHTML = data.map((item, counter) => 
		`<tr class="search-result___content-item">
			<td class="search-result"><a href="${data[counter].url}">${data[counter].name}</a></td>
		</tr>`).join('');
}

const fetchPerson = (url) => {
	fetch(url)
		.then(data => data.json())
		.then(data=> {
			searchResultsTable.innerHTML = "";
			const result = data.results;
			renderPersonsTable(searchResultsTable, result);
			renderPersonDetails(".search-result a", searchResultsTable);
			renderResidents(planetResidents);
		});
}
const fetchPlanetResidents = (homeworld) => {
	fetch(homeworld)
		.then(data => data.json())
		.then(data=> {
			planetResidents = data.residents;
			planet = data.name;
		});
}

const renderResidents = (planetResidents) => {
	for(var key in planetResidents) {
	    if(planetResidents.hasOwnProperty(key)) {
	        console.log(planetResidents[key]);
	        fetch(planetResidents[key])
	        	.then(data => data.json())
	        	.then(data=> {
				//kek.innerHTML = 
			//	`<tr class="search-result___content-item">
			//		<td class="search-result"><a href="${planetResidents[key].url}">${planetResidents[key].name}</a></td>
			//	</tr>`;
	        	console.log(planetResidents[key].name);
	        	});
	    }
	}
}

const renderPersonDetails = (keyMapElement, searchResultsContainer) => {
	let keysMap = document.querySelectorAll(keyMapElement);
	for (key in keysMap) {
		keysMap[key].onclick = function(e) {
			e.preventDefault();
			let path = this.href;
			let renderPlanetResidents = null;
			fetch(path)
				.then(data => data.json())
				.then(data => {
					let {name, birth_year, gender, homeworld} = data;
					fetchPlanetResidents(homeworld);
					setTimeout(() => {
						searchResultsContainer.innerHTML = 
							`<tr class="search-result___content-item">
								<td class="search-result">
									<p>Name: ${name}</p>
									<p>Birth Year: ${birth_year}</p>
									<p>Gender: ${gender}</p>
									<p>Planet: ${planet}</p>
									<p>${planet} Residents: </p>
									<table id="kappapride">
									</table>
								</td>
							</tr>`;	
					}, 2000);		
				});
		}
	}
}


window.onload = fetchPerson(url);
searchButton.addEventListener('click', (e) => {
  fetchPerson(url);
});

searchButton.addEventListener('mouseover', ()=>{
	let audio = new Audio();
	audio.src = '../src/js/sounds/open.mp4';
	audio.play();
	setTimeout(() => {
	  searchButton.innerText = `Welcome to the dark side`;
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