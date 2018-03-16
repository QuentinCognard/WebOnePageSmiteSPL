$(function() {
teamList();
// afficherTeam("NRG Esports");
    function teamList(){
      $.ajax({
        url: "http://localhost:3000/equipe",
        type: "GET",
        dataType : "json",
        success: function(equipe) {
          for(var i=0;i<equipe.length;i++){
              $('#exampleAccordion')
              .append($('<li class="nav-item" data-toggle="tooltip" data-placement="right" >')
              .append($('<a class="nav-link">').on("click", equipe[i], details)
              .append($("<img src='"+equipe[i].logo+"' class='fa fa-fw fa-dashboard'>"))
              .append($("<span class='nav-link-text'>").text("  "+equipe[i].nom))));

          }
          $.ajax({
            url: "http://localhost:3000/match",
            type: "GET",
            dataType: "json",
            success: function(match){
                console.log("jesuisla");
                $('#exampleAccordion').append($("<a href='index.html'> <input type='Submit'value='Prochains matchs'></a>").on("click",matches(match,equipe)));
            }
          });
        }
        });
  }

  function matches(match,equipe){
    $("#big").empty();
          console.log("jesuisBIG1");
    for(var i=0;i<1;i++){
      console.log(equipe);

      $("#big")
      .append($("<section id='"+i+"'>")
      .append($("<img src='"+equipe[match[i].equipe1-1].logo+"'>"))
      .append($("<i id='"+match[i].equipe1+"'class='glyphicon glyphicon-plus'> + </i>"))
      .append($("<p id='pourcentage"+match[i].equipe1+"'>"+match[i].pronostic1+"</p>"))
      .append($("<p id='pourcentage"+match[i].equipe2+"'>"+match[i].pronostic2+"</p>"))
      .append($("<i id='"+match[i].equipe2+"'class='glyphicon glyphicon-plus'> + </i>"))
      .append($("<img src='"+equipe[match[i].equipe2-1].logo+"'>")));
      console.log("jesuisBIG3");
    }
  }

  function details(event){
    $("#big").empty();
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
      $("#big")
        .append($("<section id='principale'>")
        .append($("<section id='listejoueurs'>"))
        .append($("<section id='infojoueur'>")))
        .append($("<section id='palmares'>"));
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
      $("#prenom").text("Prenom : "+t.prenom);
      $("#nom").text("Nom : "+t.nom);
      $("#anniversaire").text("Data naissance : "+t.anniversaire);
      $("#role").text("Rôle : "+t.role);
      $("#originejoueur").text("Origine : "+t.originejoueur);


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
