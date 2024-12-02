const pokemonList = document.getElementById('PokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecord = 151;
const limit = 20;
let offset = 0;



function loadPokemonItems(offset, limit){
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => 
            `<li class="pokemon  ${pokemon.type}">
                <span class="number">#${pokemon.pokemonId}</span>
                <h1 class="name">${pokemon.name}</h1>
    
                <div class="detail">
                    <img class="photo" src="${pokemon.photo}"alt="${pokemon.name}">

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <h2 class="T${pokemon.type}">About</h2>


                    <ol class="about">
                        <ol class="weight">
                            <ul>
                                <li><img src="./assets/icon2.png" class="icon" alt="weight">${pokemon.weight}kg</li>
                            </ul>
                            <h3 class="info">Weight</h3>
                        </ol>

                        <ol class="height divbord">
                            <ul>
                                <li><img src="./assets/icon1.png" class="icon" alt="height">${pokemon.height}m</li>
                            </ul>
                            <h3 class="info">Height</´p>
                        </ol>

                        <ol class="moves">
                            <ul>
                                ${pokemon.moves.map((move) => `<li>${move}</li>`).join('')}
                            </ul>
                            <h3 class="info">Moves</h3>
                        </ol>
                    </ol>
                    
                    <h2 class="T${pokemon.type}">Base Stats</h2>

                    <ol class="base-stats">
                        <li class="stat"><h3 class="T${pokemon.type}">hp</h3> <p>${pokemon.hp}</p></li>
                        <li class="stat"><h3 class="T${pokemon.type}">atk</h3> <p>${pokemon.attack}</p></li>
                        <li class="stat"><h3 class="T${pokemon.type}">def</h3> <p>${pokemon.defense}</p></li>
                        <li class="stat"><h3 class="T${pokemon.type}">satk</h3> <p>${pokemon.specialAttack}</p></li>
                        <li class="stat"><h3 class="T${pokemon.type}">sdef</h3> <p>${pokemon.specialDefense}</p></li>
                        <li class="stat"><h3 class="T${pokemon.type}">spd</h3> <p>${pokemon.speed}</p></li>
                    </ol>
                </div>
            </li>
        `).join("")
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItems(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const nextRecords = offset + limit;

    if(nextRecords >= maxRecord){
        const NewLimit = maxRecord - offset
        loadPokemonItems(offset, NewLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{

        return loadPokemonItems(offset, limit)
    }
})