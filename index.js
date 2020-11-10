document.addEventListener('DOMContentLoaded', function(event){
    var nextPokemonsBtn = document.querySelector("#next");
    nextPokemonsBtn.addEventListener("click", function(){
        var url = this.getAttribute("data-url");
        getPokemons(url);
    });

    document.addEventListener('click', function (event) {
        if (!event.target.matches('.poke-info')) return;
        var pokeSelector = document.querySelector(".poke-info");
        var pokeInfoUrl = pokeSelector.getAttribute("data-poke-url");     
        fetch(pokeInfoUrl)
        .then((resp) => resp.json())
        .then(function(result){
              var pokeName = result.name,
                  pokeTypes = result.types,
                  pokeAbilities = result.abilities,
                  pokeMoves = result.moves.splice(5);
                  name = document.querySelector("#poke-name");
                  name.innerHTML = pokeName.toUpperCase()
                  pokeTypeUl= document.querySelector("#poke-types");
                  pokeTypeUl.innerHTML = 'Type: '
                  pokeAbilityUl= document.querySelector("#poke-abilities");    
                  pokeAbilityUl.innerHTML = 'Abilities: '   
                  pokeMoveUl= document.querySelector("#poke-moves");            
                  pokeMoveUl.innerHTML = 'Moves: '

              for (pokeType of pokeTypes) {
                var li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = pokeType.type.name;
                pokeTypeUl.appendChild(li);
                }
              for (pokeAbility of pokeAbilities) {
                var li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = pokeAbility.ability.name;
                pokeAbilityUl.appendChild(li);
              }
              pokeMoves.forEach(function(pokeMove, index) {
                if (index < 5) {
                var li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = pokeMove.move.name;
                pokeMoveUl.appendChild(li);
              }})
              //No se cambia el modal porque bootstrap trabaja con jquery
              $("#poke-modal").modal('show');
              $("#type-modal").modal('show');
      });
    });
});

function getPokemons(pokeUrl) {
    fetch(pokeUrl)
    .then((resp) => resp.json())
    .then(function(result)
     {
          var nextUrl = result.next;
          var pokemons = result.results;
          for (pokemon of pokemons) {
            pokemones= document.querySelector(".pokemons");

            var pokemonUrl = pokemon.url;
            var a = document.createElement("a");
            a.href = pokemonUrl;

            var pokemonName = pokemon.name;
            const pokeName = document.createTextNode(pokemonName);
            
            var div1 = document.createElement("div");
            div1.classList.add("col-3", "mb-3");
            

            var div2 = document.createElement("div");
            div2.classList.add("card");
            
            var div3 = document.createElement("div");
            div3.classList.add("card-body");
            var parr = document.createElement("p");
            const texto = document.createTextNode("texto");
            parr.appendChild(texto);
            
            
            var h5 = document.createElement("h5");
            h5.classList.add("card-title");

            var div4 = document.createElement("div");
            div4.classList.add("card-header");

            var p1 = document.createElement("p");
            p1.classList.add("card-text");

            var button1 = document.createElement("button");
            button1.classList.add("btn", "btn-warning", "poke-info");
            button1.setAttribute('data-poke-url',a);
            const showMore = document.createTextNode("Show me more info!");

            div3.appendChild(parr);
            button1.appendChild(showMore);  
            button1.appendChild(a);
            div3.appendChild(button1);
            div2.appendChild(div4);
            h5.appendChild(pokeName);
            div4.appendChild(h5);
            div2.appendChild(div3);
            div1.appendChild(div2);
            pokemones.appendChild(div1);
        }
          var next_Url = document.querySelector("#next");
          next_Url.setAttribute('data-url', nextUrl);
      })
  };
