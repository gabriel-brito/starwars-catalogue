const url = 'https://swapi.co/api/people/';
const searchButton = document.querySelector("#searchButton");
const searchResultsTable = document.querySelector("#itemlist");
const resultsResults = document.querySelector("#searchResults");
let data = null;

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
		});
}

const renderPersonDetails = (keyMapElement, searchResultsContainer) => {
	let keysMap = document.querySelectorAll(keyMapElement);
	for (key in keysMap) {
		keysMap[key].onclick = function(e) {
			e.preventDefault();
			let path = this.href;
			let planet = null;
			fetch(path)
				.then(data => data.json())
				.then(data => {
						let {name, birth_year, gender, homeworld} = data;
						fetch(homeworld)
							.then(data => data.json())
							.then(data=> {
								 planet = data.name;
								 searchResultsContainer.innerHTML = 
			 						`<tr class="search-result___content-item">
											<td class="search-result">
												<h2>${name}</h2>
												<p>Birth Year: ${birth_year}</p>
												<p>Gender: ${gender}</p>
												<p>Planet: ${planet}</p>
												<p>cuzões: </p>
											</td>
										</tr>`;
							});
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
	  searchButton.innerText = `Don't ever become a sith!`;
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