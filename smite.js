$(function() {
teamList();
afficherTeam("NRG Esports");
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
              .append($('<a class="nav-link" href="index.html">')
              .append($("<img src='"+equipe[i].logo+"' class='fa fa-fw fa-dashboard'>"))
              .append($("<span class='nav-link-text'>").text("  "+equipe[i].nom))))

          }
        }
        });


  }
  function afficherTeam(nom){
    document.getElementById('liste').innerHTML = "";
        document.getElementById('logo-nom').innerHTML = "";
    document.getElementById('info-joueur').innerHTML = "";
    document.getElementById('palmares').innerHTML = "";
    $.ajax({
      url:"http://localhost:3000/equipe",
      type: "GET",
      dataType: "json",
      success: function(equipe){
        $('#logo-nom').append($("<img src='"+equipe[nom].logo+"'"))
      }
    });
  }
});
