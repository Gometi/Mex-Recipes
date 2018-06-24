
$(document).ready(function () {
    console.log("ready!");
    // if($('.email').val() == 'mak@gmail.com'){
    //     $(location).attr('href', '/')
    // }
    // $('.add_ingredient').click(() => {     //add items to the listbox
    //     if ($('.ingredient').val()) {     //if textbox is not empty, add value to listbox
    //         $('.ingredients').append(`<option>${$('.ingredient').val()}</option>`);
    //         $('.ingredient').val('');
    //     }

    // });

    $('.create_ingredient').click((e) => {
        e.preventDefault();
        $('.ingredient_modal').css('display', 'flex');
    });

    $('.close_ingredient_modal').click(() => {
        $('.ingredient_modal').hide();
    })

    $('.add_ingredient1').click(() => {
        addIngredient('create_page');
    });

    $('.add_ingredient2').click(() => {
        addIngredient('edit_page');
    });



    let addIngredient = (page) => {
        let ingredient = $('.ingredient').val();
        if (ingredient) {
            let ingredientContainer = $(`<div></div>`);
            let ingredientTextBox;
            if (page === 'create_page') {
                ingredientTextBox = $('<input class="hide" type="text" name="ingredients">');
                let paragraph = $('<p class="ingredient_name"></p>');
                paragraph.append(ingredient);
                ingredientContainer.append(paragraph);
            }
            else {
                ingredientTextBox = $('<input type="text" name="ingredients">');
            }

            ingredientTextBox.val(ingredient);


            ingredientContainer.append('<span>&nbsp &nbsp</span>');

            let removeButton = $('<button class="remove_ingredient" type="button">Remove</button>');

            ingredientContainer.append(ingredientTextBox);
            ingredientContainer.append(removeButton);

            $('.list_of_ingredients').append(ingredientContainer);
            removeButton.click(() => {
                ingredientContainer.remove();
            })

            $('.ingredient').val('');
        }

        $('.ingredient_modal').hide();
    }

    $('.remove_ingredient').click((e) => {
        let target = $(e.target)
        target.parent().remove();
    });

    // $('.createRecipeButton').click(() => {
    //     $('.ingredients option').attr('selected', true);       //select all listbox items before post

    //     $.post('/user_recipes', $('.createRecipeForm').serialize());

    // });

    // $('.save').click((e)=>{
    //     e.preventDefault();
    //     $('.recipe_id').attr('disabled', false);
    //     $.post(`/user_recipes/${$('.recipe_id').val()}`, $('.updateRecipeForm').serialize());
    // });

    function decodeToken(token) {
        let playload = JSON.parse(atob(token.split('.')[1]));
        let username = 'Welcome ' + playload.username;
        localStorage.setItem('username', username);

    };

    if(localStorage.getItem('username')){
        $('.username').append(localStorage.getItem('username'));
        $('.sign_in_or_sign_out').text('Sign Out');
    }

    if ($('.sign_in_or_sign_out').text() === 'Sign Out'){
        $('.sign_in_or_sign_out').parent().attr('href', '/recipes');
    }

    $('.sign_in_or_sign_out').click(()=>{
        if ($('.sign_in_or_sign_out').text() === 'Sign Out'){
            localStorage.removeItem('username');
        }
        
    })


    const sendFormData = (url)=>{
        $.post(url, $('.form').serialize())
            .done((data) => {
                console.log(data)
                decodeToken(data.token)
                $(location).attr('href', '/recipes')
            })
            .catch(err => {
                console.log('error', err)
            })
    }

    $('.sign_in').click((e) => {
        e.preventDefault();
        sendFormData('/auth/sign_in');
    })

    $('.register').click((e) => {
        e.preventDefault();
        sendFormData('/auth/register');
    })


    $('.deleteButton').click(() => {
        alert('Recipe Deleted');
    })


});