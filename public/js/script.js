$(document).ready(function () {
    console.log("ready!");
    
    // $('.add_ingredient').click(() => {     //add items to the listbox
    //     if ($('.ingredient').val()) {     //if textbox is not empty, add value to listbox
    //         $('.ingredients').append(`<option>${$('.ingredient').val()}</option>`);
    //         $('.ingredient').val('');
    //     }

    // });
    $('.create_ingredient').click((e)=>{
        e.preventDefault();
        $('.ingredient_modal').css('display', 'flex');
    });

    $('.close_ingredient_modal').click(()=>{
        $('.ingredient_modal').hide();
    })

    $('.add_ingredient').click(() => {  
        let ingredient = $('.ingredient').val();
        if(ingredient){
            let ingredientContainer = $(`<div></div>`)
            let ingredientTextBox = $('<input class="hide" type="text" name="ingredients">');
            ingredientTextBox.val(ingredient);
            let paragraph = $('<p class="ingredient_name"></p>');
            paragraph.append(ingredient);
            ingredientContainer.append(paragraph);
            ingredientContainer.append('<span>&nbsp &nbsp</span>');

            let removeButton = $('<button class="remove_ingredient" type="button">Remove</button>');
            ingredientContainer.append(removeButton);
            ingredientContainer.append(ingredientTextBox);

            $('.list_of_ingredients').append(ingredientContainer);
            removeButton.click(()=>{
                ingredientContainer.remove();
            })
            
            $('.ingredient').val('');
        }

        $('.ingredient_modal').hide();
    });

    // $('.remove_ingredient').click((e) => {     //remove items from the listbox
    //     console.log(e)
    // });

    // $('.createRecipeButton').click(() => {
    //     $('.ingredients option').attr('selected', true);       //select all listbox items before post

    //     $.post('/user_recipes', $('.createRecipeForm').serialize());

    // });

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