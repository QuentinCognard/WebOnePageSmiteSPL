$(function() {
teamList();
// afficherTeam("NRG Esports");
    function teamList(){
      $("#exampleAccordion").empty();
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
          $("#coucou").empty();
          $.ajax({
            url: "http://localhost:3000/match",
            type: "GET",
            dataType: "json",
            success: function(match){
                console.log("jesuisla");
                $('#coucou').append($("<a href='index.html'> <input type='Submit'value='Prochains matchs'></a>").on("click",matches(match,equipe)));
            }
          });
        }
        });
  }

  function matches(match,equipe){
    $("#big").empty();
          console.log("jesuisBIG1");
    for(var i=0;i<match.length;i++){
      console.log(equipe);
      $("#big")
      .append($("<section class='secmatch 'id='"+i+"'>")
      .append($("<img class='imgmatch' src='"+equipe[match[i].equipe1-1].logo+"'>"))
      .append($("<input type='button' name='vote' class='btn btn-info btn-lg' value='+' id='"+match[i].id+match[i].equipe1+"'> </input>").on("click",match[i],ajoutmatch))
      .append($("<p id='pourcentage"+match[i].equipe1+match[i].id+"'>"+match[i].pronostic1+"</p>"))
      .append($("<progress class='reverseprogress' id='reverseprogress"+match[i].equipe1+match[i].id+"' value="+match[i].pronostic1+" max="+(match[i].pronostic1+match[i].pronostic2)+">"+match[i].pronostic1+"</progress>"))
      .append($("<progress class='normalprogress' id='normalprogress"+match[i].equipe2+match[i].id+"' value="+match[i].pronostic2+" max="+(match[i].pronostic1+match[i].pronostic2)+">"+match[i].pronostic1+"</progress>"))
      .append($("<p id='pourcentage"+match[i].equipe2+match[i].id+"'>"+match[i].pronostic2+"</p>"))
      .append($("<input type='button' name='vote' class='btn btn-info btn-lg' value='+' id='"+match[i].id+match[i].equipe2+"'> </input>").on("click",match[i],ajoutmatch2))
      .append($("<img class='imgmatch' src='"+equipe[match[i].equipe2-1].logo+"'>")));
      var reversbarval= document.getElementById("reverseprogress"+match[i].equipe1+match[i].id);
      var normalbarval = document.getElementById("normalprogress"+match[i].equipe2+match[i].id);
      if (reversbarval.value>normalbarval.value){
        reversbarval.classList.add("plus");
        normalbarval.classList.add("moins");
      }
      else {
        reversbarval.classList.add("moins");
        normalbarval.classList.add("plus");

      }
      console.log(match[i]);
      console.log("jesuisBIG3");
    }
  }

  function newMatch(equipe1,equipe2,pronostic1,pronostic2,id,date,heure){
    this.equipe1=equipe1;
    this.equipe2=equipe2;
    this.pronostic1=pronostic1;
    this.pronostic2=pronostic2;
    this.id=id;
    this.date=date;
    this.uri = (this.uri==undefined)?"http://localhost:3000/match/"+id:this.uri;
    this.heure=heure;
  }

  function ajoutmatch(match){
    console.log("match1");
    var matche= new newMatch(
      match.data.equipe1,
      match.data.equipe2,
      match.data.pronostic1 + 1,
      match.data.pronostic2,
      match.data.id,
      match.data.date,
      match.data.heure
    );

    var buton=document.getElementById(""+matche.id+""+matche.equipe1).disabled=true;
    var buton=document.getElementById(""+matche.id+""+matche.equipe2).disabled=true;
    document.getElementById("pourcentage"+matche.equipe1+matche.id).innerHTML=match.data.pronostic1 + 1;
    document.getElementById("reverseprogress"+matche.equipe1+matche.id).value=match.data.pronostic1 + 1;
    document.getElementById("reverseprogress"+matche.equipe1+matche.id).max=(matche.pronostic1+matche.pronostic2);
    document.getElementById("normalprogress"+matche.equipe2+matche.id).max=(matche.pronostic1+matche.pronostic2);
    console.log("pourcentage"+matche.equipe1+matche.id);

    $.ajax({
      url: matche.uri,
      contentType:'application/json',
      type: "PUT",
      data: JSON.stringify(matche),
      dataType: "json",
      success: function(matche){
        // console.log("prono1");
        // var buton=document.getElementByName("vote");
        // buton.style.display='none';
      }
  });
  // teamList();
  // matches();
}

  function ajoutmatch2(match){
    console.log("match");
    var matche= new newMatch(
      match.data.equipe1,
      match.data.equipe2,
      match.data.pronostic1,
      match.data.pronostic2 +1,
      match.data.id,
      match.data.date,
      match.data.heure
    );
    console.log(""+matche.id+""+matche.equipe2);
    var buton=document.getElementById(""+matche.id+""+matche.equipe2).disabled=true;
    var buton=document.getElementById(""+matche.id+""+matche.equipe1).disabled=true
    var vote=document.getElementById("pourcentage"+matche.equipe2+matche.id).innerHTML=match.data.pronostic2 + 1;
    document.getElementById("normalprogress"+matche.equipe2+matche.id).value=match.data.pronostic1 + 1;
    document.getElementById("normalprogress"+matche.equipe2+matche.id).max=(matche.pronostic1+matche.pronostic2);
    document.getElementById("reverseprogress"+matche.equipe1+matche.id).max=(matche.pronostic1+matche.pronostic2);

    $.ajax({
      url: matche.uri,
      contentType:'application/json',
      type: "PUT",
      data: JSON.stringify(matche),
      dataType: "json",
      success: function(matche){
        // console.log("prono1");
        // var buton=document.getElementByName("vote");
        // buton.style.display='none';
      }
  });
  // teamList();
  // matches();
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
