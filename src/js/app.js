const mainPage = document.querySelector('#main-page');
const loader = document.querySelector('.loader');

const url = 'https://swapi.co/api/people/';
const title = document.querySelector('h1');
const searchButton = document.querySelector("#searchButton");
const searchResultsTable = document.querySelector("#itemlist");
const resultsResults = document.querySelector("#searchResults");
const searchInput = document.querySelector('#search-input');


let data = null;
let planet = null;
let planetResidents = null;

const pageLoaded = ()=>{
	mainPage.style.display = 'block';
	loader.style.display = 'none';
}

const cleaningPersonResult = (container)=>{
	container.innerHTML = "";	
}

const searchFilter = ()=>{
	let filter = searchInput.value.toUpperCase();
	let row = Array.from(searchResultsTable.querySelectorAll('tr td'));
	row.map(item => {
		console.log(item);
		item.textContent.toUpperCase().indexOf(filter) === -1 ? 
		item.style.display = "none"
		: item.style.display = ""
	});
}

const renderPersonsTable = (container, data) => {
	container.innerHTML += data.map((item, counter) => 
		`<tr class="search-result___content-item">
			<td class="search-result">
				<a class="search-result__person-name" href="${data[counter].url}">
					${data[counter].name}
				</a>
			</td>
		</tr>`).join('');
}

const fetchPerson = (url) => {
	fetch(url)
		.then(data => data.json())
		.then(data=> {
			let result = data.results;
			renderPersonsTable(searchResultsTable, result);
			renderPersonDetails(".search-result a", searchResultsTable);
				if (data.next)
					fetchPerson(data.next);
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

const renderResidents = (container, planetResidents) => {
	for(var key in planetResidents) {
	    if(planetResidents.hasOwnProperty(key)) {
	        console.log(planetResidents[key]);
	        let eachResident = planetResidents[key];
	        fetch(eachResident)
	        	.then(data => data.json())
	        	.then(data=> {
	        		console.log(data.name);
	        		console.log(data.url);
				container.innerHTML += 
				`<tr class="search-result___content-item">
					<td class="search-result"><a class="search-result__person-name" href="${data.url}">${data.name}</a></td>
				</tr>`;
				renderPersonDetails(".search-result a", searchResultsTable);
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
									<table id="renderResidentsTable" class="search-result__residents-table">
									</table>
								</td>
							</tr>`;
							let kek = document.querySelector('#renderResidentsTable');
							renderResidents(kek, planetResidents);
					}, 2000);		
				});
		}
	}
}



searchButton.addEventListener('click', (e) => {
  if(searchInput.value){
  	searchFilter();
  } else {
  	cleaningPersonResult(searchResultsTable);
  	fetchPerson(url);
  }
});

window.onload =	()=>{
	fetchPerson(url);
	mainPage.style.display = 'none';
	setTimeout(() => {
	  pageLoaded();
	}, 6000);
}