             
var quantidade = document.getElementById('quantidade');
quantidade.addEventListener('keyup',()=>{
pegaPokemons(quantidade.value);
})

pegaPokemons(6);

function pegaPokemons(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+ quantidade)
    .then(response => response.json())
    .then(allpokemon => {

        var pokemons = [];

        allpokemon.results.map((val)=>{
            
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({nome:val.name,imagem:pokemonSingle.sprites.front_default});
                

                if(pokemons.length == quantidade){
                    //Finalizamos nossas requisições.

                    var pokemonBoxes = document.querySelector('.pokemon-boxes');
                    pokemonBoxes.innerHTML = "";

                    pokemons.map(function(val){
                    pokemonBoxes.innerHTML+=`
                    
                        <div class="pokemon-box mg-thumbnail">
                            <img class="mx-auto d-block img-fluid rounded-circle" src="`+val.imagem+`" />
                            <p class="name-poke">`+val.nome+`</p>
                        </div>          
                    `;
    
                    })
                }
            })
        })    
    })
}