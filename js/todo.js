$(function() {

    $("#button").click(refreshTaskList);

    function refreshTaskList(){
        $("#currenttask").empty();
        $.ajax({
            url: "http://localhost:3000/tasks",
            type: "GET",
            dataType : "json",
            success: function(tasks) {
                console.log(JSON.stringify(tasks));
                $('#taches').empty();
                $('#taches').append($('<ul>'));
                for(var i=0;i<tasks.length;i++){
                    console.log(tasks[i]);
                    $('#taches ul')
                    .append($('<li>')
                    .append($('<a>')
                        .text(tasks[i].title)
                        ).on("click", tasks[i], details)
                    );
                        }
                    },
            error: function(req, status, err) {
                        $("#taches").html("<b>Impossible de récupérer les taches à réaliser !</b>");
                        }
                        });
        }

    function details(event){
        $("#currenttask").empty();
        formTask();
        fillFormTask(event.data);
        }

    // Objet Task en JS
    function Task(title, description, done, uri){
        this.title = title;
        this.description = description;
        this.done = done;
        this.uri = uri;
        console.log(this.uri);
    }


    $("#tools #add").on("click", formTask);
    $('#tools #del').on('click', delTask);
    function formTask(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Titre<input type="text" id="titre"><br></span>'))
            .append($('<span>Description<input type="text" id="descr"><br></span>'))
            .append($('<span>Done<input type="checkbox" id="done"><br></span>'))
            .append($('<span><input type="hidden" id="turi"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save Task"><br></span>').on("click", saveNewTask)
                         :$('<span><input type="button" value="Modify Task"><br></span>').on("click", saveModifiedTask)
                );
        }

    function fillFormTask(t){
        $("#currenttask #titre").val(t.title);
        $("#currenttask #descr").val(t.description);
         t.uri=(t.uri == undefined)?"http://localhost:3000/tasks/"+t.id:t.uri;
         $("#currenttask #turi").val(t.uri);
        t.done?$("#currenttask #done").prop('checked', true):
        $("#currenttask #done").prop('checked', false);
    }

    function saveNewTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked')
            );
        console.log(JSON.stringify(task));
        $.ajax({
            url: "http://localhost:3000/tasks",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(task),
            dataType: 'json',
            success: function (msg) {
                alert('Save Success');
            },
            error: function (err){
                alert('Save Error');
            }
            });
        refreshTaskList();
    }

    function delTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked'),
            $("#currenttask #turi").val()
            );
        console.log(JSON.stringify(task));
        $.ajax({
            url: task.uri,
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(task),
            dataType: 'json',
            success: function (msg) {
                alert('Save Success');
            },
            error: function (err){
                alert('Save Error');
            }
            });
        refreshTaskList();
    }
    function saveModifiedTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked'),
            $("#currenttask #turi").val()
            );
        console.log(JSON.stringify(task));
        $.ajax({
            url: task.uri,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(task),
            dataType: 'json',
            success: function (msg) {
                alert('Save Success');
            },
            error: function (err){
                alert('Save Error');
            }
            });
        refreshTaskList();
    }



});
