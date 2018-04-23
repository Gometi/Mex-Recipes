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


    // $('.enter').click(()=>{
        // alert('fetching');
        // fetch('https://www.themealdb.com/api/json/v1/1/latest.php')
        // .then((response) =>{
        //     alert(response);
        //     return response.json();
        // })
        // .then((data)=>{
        //     alert(data);
        //     console.log(data);
        // })
        // .catch((err) =>{
        //     console.log(err);
        // })

    //     async function getData() {
    //         let response = await fetch('https://www.themealdb.com/api/json/v1/1/latest.php');
    //         let data = await response.json();
    //         return data;
    //     }

    //     getData()
    //     .then(data => alert(data))
    //     .catch(err => console.log(err.message))
    // })
});