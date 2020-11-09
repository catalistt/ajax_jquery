$(document).ready(function() {
  $("#next").on("click", function() {
      var url = $(this).data("url");
      getPokemons(url);
  });

  $(".pokemons").delegate(".poke-info", "click", function() {
      var pokeInfoUrl = $(this).data("poke-url");
      $.ajax({
          url: pokeInfoUrl,
          success: function(result) {
              var pokeName = result.name,
                  pokeTypes = result.types,
                  pokeAbilities = result.abilities,
                  pokeMoves = result.moves.splice(5);
                  $("#poke-types").empty();
                  $("#poke-abilities").empty();
                  $("#poke-moves").empty();
                  $("#poke-types").append('Type:');
                  $("#poke-abilities").append('Abilities:');
                  $("#poke-moves").append('Moves:');
              $("#poke-name").text(pokeName.toUpperCase())
              for (pokeType of pokeTypes) {
                  $("#poke-types").append('<li class="list-group-item">' + pokeType.type.name + '</li>');
              }
              for (pokeAbility of pokeAbilities) {
                  $("#poke-abilities").append('<li class="list-group-item">' + pokeAbility.ability.name + '</li>');
              }
              pokeMoves.forEach(function(pokeMove, index) {
                if (index < 5) {
                  $("#poke-moves").append('<li class="list-group-item">' + pokeMove.move.name + '</li>');
                }
            })
              $("#poke-modal").modal('show');

          }


      });
  })
});

function getPokemons(pokeUrl) {
  $.ajax({
      url: pokeUrl,
      success: function(result) {
          var nextUrl = result.next;
          var pokemons = result.results;
          for (pokemon of pokemons) {
              var card = '<div class="col-3 mb-3"><div class="card"><div class="card-header"><h5 class="card-title">' + pokemon.name + '</h5></div><div class="card-body"><p class="card-text">Texto</p><button class="btn btn-warning poke-info" data-poke-url="' + pokemon.url + '">Show me more info!</button></div></div></div>';
              $(".pokemons").append(card);

          }
          $("#next").data("url", nextUrl);
      }
  });
}