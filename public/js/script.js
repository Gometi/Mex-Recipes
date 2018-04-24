$(document).ready(function () {
    console.log("ready!");
    
    $('.add_ingredient').click(() => {     //add items to the listbox
        if ($('.ingredient').val()) {     //if textbox is not empty, add value to listbox
            $('.ingredients').append(`<option>${$('.ingredient').val()}</option>`);
            $('.ingredient').val('');
        }

    });

    $('.remove_ingredient').click(() => {     //remove items from the listbox
        $('.ingredients option:selected').remove();
    });

    $('.createRecipeButton').click(() => {
        $('.ingredients option').attr('selected', true);       //select all listbox items before post

        $.post('/user_recipes', $('.createRecipeForm').serialize());

    });

    $('.editRecipe').click(()=>{
        $('.ingredients option').attr('selected', true);         //select all listbox items before post
        $('.recipe_id').attr('disabled', false);
        $.post(`/user_recipes/${$('.recipe_id').val()}`, $('.updateRecipeForm').serialize());
        alert('recipe Updated');
    });
   

    $('.deleteButton').click(()=>{
        alert('Recipe Deleted');
    })

   
});