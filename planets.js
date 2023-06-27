let nameH1;
let climateSpan;
let waterSpan;
let diameterSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  characterUl= document.querySelector('#characters>ul');
  filmsUl = document.querySelector('#films>ul');
  climateSpan = document.querySelector('span#climate');
  waterSpan = document.querySelector('span#water');
  diameterSpan = document.querySelector('span#diameter');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.characters = await fetchCharacters(planet)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderPlanet(character);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  waterSpan.textContent = planet?.surface_water;
  diameterSpan.textContent = planet?.diameter;
  const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
  charactersUl.innerHTML = charactersLis.join("");
}
