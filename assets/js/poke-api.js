
const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()

    //SimpleInfo
    const id = pokeDetail.id
    pokemon.pokemonId = String(id).padStart(3,0)
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    //About
    pokemon.weight = (pokeDetail.height * 0.1).toFixed(2)
    pokemon.height = (pokeDetail.weight * 0.1).toFixed(1)

    const moves = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.moves = moves

    //BaseSTATS
    const data_base = pokeDetail.stats.map((statType) => statType.base_stat)

    const[hp,attack,defense,specialAttack,specialDefense,speed] = data_base
    
    pokemon.hp = hp
    pokemon.attack = attack
    pokemon.defense = defense
    pokemon.specialAttack = specialAttack
    pokemon.specialDefense = specialDefense
    pokemon.speed = speed

    return pokemon
}

pokeAPI.getPokemonDetail = (pokemon) => {//sobre o resultado
    return fetch(pokemon.url)
            .then((response) => response.json())//pega o resultado e le só as url e passa o retorno pra json
            .then(convertPokeApiDetailToPokemon)//pega os detalhes e define para cada pokemon
}

pokeAPI.getPokemons = (offset = 0, limit = 20) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)//busca a lista
        .then((response) => response.json())//passa o retorno pra json
        .then((jsonBody) => jsonBody.results)//pega a json e me passa só o resultado
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))//formata os urls para serem lidos
        .then((detailRequests) => Promise.all(detailRequests))//leia cada um dos urls
        .then((pokemonDetails) => pokemonDetails//esse é o resultado
    )
}