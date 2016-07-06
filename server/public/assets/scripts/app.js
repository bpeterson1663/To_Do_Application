$(document).ready(function(){
  $("input[type='text']").hide();
  //getTasks();
  //check off specific to dos
  $("ul").on("click","li", function(){
    $(this).toggleClass("completed");

    // var id = $(this).data('id');
    // var completeStatus = $(this).data('completed');
    // var taskCompleted = {};
    //
    // taskCompleted.id = id;
    // taskCompleted.completed = completeStatus;
    //
    // if(completeStatus == false){
    //     taskCompleted.completed = true;
    //     $.ajax({
    //       type: 'PUT',
    //       url: '/updateTask',
    //       data: taskCompleted,
    //       success: getTasks
    //     });
    // }else if(completeStatus == true){
    //   taskCompleted.completed = false;
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/updateTask',
    //     data: taskCompleted,
    //     success: getTasks
    //   });
    // }
  });

  //click the delete X
  $("ul").on("click","span", function(event){
    var deleteTask = $(this).parent().data('id');//id of task to be completed;
    $(this).parent().fadeOut(500, function(){
      $(this).remove();
    });
    event.stopPropagation();
    // var taskDeleted = {};
    // taskDeleted.id = deleteTask;
    // //make ajax call
    // console.log('Task Deleted', taskDeleted);
    // $.ajax({
    //   type: 'PUT',
    //   url: '/deleteTask',
    //   data: taskDeleted
    // });
  });

  $("input[type='text']").keypress(function(event){
    //checks for enter key
    if(event.which === 13){
      var newTaskObject = {};
       newTaskObject.completed = false;
       newTaskObject.task = $(this).val();
       $('ul').append('<li><span><i class="fa fa-trash"></i></span> '+newTaskObject.task+'</li>');
       $("input[type='text']").val('');
      // $.ajax({
      //   type: 'POST',
      //   url: '/addTask',
      //   data: newTaskObject,
      //   success: function(response){
      //     console.log(response);
      //     $('ul').append('<li data-id="'+response[0].id+'" data-completed="'+response[0].completed+'"><span><i class="fa fa-trash"></i></span> '+newTaskObject.task+'</li>');
      //
      //   }
      //
      // });
    }
  });

  $('.fa-plus').on('click', function(){
    $("input[type='text']").fadeToggle();
  });
});

function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: displayTasks
  });
}

function displayTasks(response){
  for(var i = 0; i < response.length; i++){
    if(response[i].completed == true){
      $('ul').append('<li class="completed" data-id="'+response[i].id+'" data-completed="'+response[i].completed+'"><span><i class="fa fa-trash"></i></span> '+response[i].task+'</li>');
    }else if(response[i].completed == false){
      $('ul').append('<li data-id="'+response[i].id+'" data-completed="'+response[i].completed+'"><span><i class="fa fa-trash"></i></span> '+response[i].task+'</li>');
    }
  }
}
