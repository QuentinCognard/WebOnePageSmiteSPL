$(function() {
teamList();
// afficherTeam("NRG Esports");
    function teamList(){
      $.ajax({
        url: "http://localhost:3000/equipe",
        type: "GET",
        dataType : "json",
        success: function(equipe) {
          console.log(JSON.stringify(equipe));
          for(var i=0;i<equipe.length;i++){
              console.log(equipe[i]);
              $('#exampleAccordion')
              .append($('<li class="nav-item" data-toggle="tooltip" data-placement="right" >')
              .append($('<a class="nav-link">').on("click", equipe[i], details)
              .append($("<img src='"+equipe[i].logo+"' class='fa fa-fw fa-dashboard'>"))
              .append($("<span class='nav-link-text'>").text("  "+equipe[i].nom))));


          }
        }
        });
  }

  function details(event){
      $("#listejoueurs").empty();
      $("#palmares").empty();
      formEquipe();
      fillFormEquipe(event.data);
      console.log("event");
      }

    function detailsJoueur(event){
        $("#infojoueur").empty();
        formJoueur();
        fillFormJoueur(event.data);
        }

    function formJoueur(){
        $("#infojoueur")
          .append($("<img id='logojoueur'>"))
          .append($('<h1 id="nomjoueure"></h1>'))
          .append($("<p id='prenom'>"))
          .append($("<p id='nom'>"))
          .append($("<p id='anniversaire'>"))
          .append($("<p id='role'>"))
          .append($("<p id='originejoueur'>"));


        }

  function formEquipe(){
      $("#listejoueurs")
        .append($("<section id='logo-nom'>")
        .append($("<img id='logoteam'>"))
        .append($('<h1 id="nomteam"></h1>')))
        .append($("<section id='secliste'>")
        .append($("<ul id='liste'>")));
      $("#palmares")
        .append($("<ul id='listepalma'>"));
      }

    function fillFormJoueur(t){
      $("#logojoueur").attr('src',t.image);
      $("#nomjoueure").text(t.pseudo);
      $("#prenom").text(t.prenom);
      $("#nom").text(t.nom);
      $("#anniversaire").text(t.anniversaire);
      $("#role").text(t.role);
      $("#originejoueur").text(t.originejoueur);


    }

      function fillFormEquipe(t){
        $("#nomteam").text(t.nom);
        $("#logoteam").attr('src',t.logo);
        for (var i=0;i<t.joueurs.length;i++){
          $("#liste")
          .append($("<li> <a id='"+t.joueurs[i].id+"'>"+t.joueurs[i].pseudo+"</a></li>").on("click", t.joueurs[i], detailsJoueur));
        }
        for (var i=0;i<t.palmares.length;i++){
          $("#listepalma")
          .append($("<li>"+t.palmares[i].date+" | "+t.palmares[i].place+" | "+t.palmares[i].nomEvent+"</li>"));
        }

      }


  // function afficherTeam(nom){
  //   document.getElementById('liste').innerHTML = "";
  //       document.getElementById('logo-nom').innerHTML = "";
  //   document.getElementById('info-joueur').innerHTML = "";
  //   document.getElementById('palmares').innerHTML = "";
  //   $.ajax({
  //     url:"http://localhost:3000/equipe",
  //     type: "GET",
  //     dataType: "json",
  //     success: function(equipe){
  //       $('#logo-nom').append($("<img src='"+equipe[nom].logo+"'"))
  //     }
  //   });
  // }



});
