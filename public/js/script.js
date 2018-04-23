$(document).ready(function () {
    console.log("ready!");
    $('.add_ingredient').click(() => {
        if ($('.ingredient').val()) {
            $('.ingredients').append(`<option>${$('.ingredient').val()}</option>`);
            $('.ingredient').val('');
        }

    });

    $('.remove_ingredient').click(() => {
        $('.ingredients option:selected').remove();
    });

    $('.createRecipeButton').click(() => {
        $('.ingredients option').attr('selected', true);

        $.post('/user_recipes', $('.createRecipeForm').serialize());

    });

    $('.editRecipe').click(()=>{
        $('.ingredients option').attr('selected', true);
        $('.recipe_id').attr('disabled', false);
        $.post(`/user_recipes/${$('.recipe_id').val()}`, $('.updateRecipeForm').serialize());
        alert('recipe Updated');
    });
   

    $('.deleteButton').click(()=>{
        alert('Recipe Deleted');
    })

    // $('.fetch').click(()=>{
       
    //     alert('fetching');
    //     fetch('https://www.themealdb.com/api/json/v1/1/latest.php')
    //     .then((response) =>{
    //         console.log(response);
    //         return response.json();
    //     })
    //     .then((data)=>{
    //         console.log(data);
    //     })
    //     .catch((err) =>{
    //         console.log(err);
    //     })
    // })
});