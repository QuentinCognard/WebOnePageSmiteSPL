$(function() {
teamList();

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
              .append($("<span class='nav-link-text'>").text(equipe[i].nom))))

          }
        }
        });


  }
});
