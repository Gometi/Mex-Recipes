$(document).ready(function () {
    console.log("ready!");


    $('.add_ingredient').click(()=>{
        if ($('.ingredient').val()){
            $('.ingredients').append(`<option>${$('.ingredient').val()}</option>`);
            $('.ingredient').val('');
        }
        
    });

$('.remove_ingredient').click(()=>{
    $('.ingredients option:selected').remove();
});

    $('.createRecipeButton').click(()=>{
    $('.ingredients option').attr('selected', true);
   
        $.post('/create', $('.createRecipeForm').serialize());
  
    });
});