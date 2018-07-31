
$(document).ready(function () {
    console.log("ready!");
   

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

    

    function decodeToken(token) {
        let payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('username',  payload.username);
        localStorage.setItem('user_id', payload.id);
    };

    if(localStorage.getItem('username')){
        $('.username').html('Welcome ' + localStorage.getItem('username')).show();
        $('.sign_in_or_sign_out').text('Sign Out');
        let userId = localStorage.getItem('user_id');
        $('.user_id').val(userId);
        $('.view_recipes_link').attr('href', `/user_recipes/${userId}/user`);
        $('.create_recipe_link').attr('href', `/user_recipes/create`);
    }

    if ($('.sign_in_or_sign_out').text() === 'Sign Out'){
        $('.sign_in_or_sign_out').attr('href', '/recipes');
    }

    $('.sign_in_or_sign_out').click(()=>{
        if ($('.sign_in_or_sign_out').text() === 'Sign Out'){
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');
        }
        
    })


    const sendFormData = (url)=>{
        $.post(url, $('.form').serialize())
            .done((data) => {
                decodeToken(data.token)
                $(location).attr('href', '/recipes')
            })
            .catch(err => {
                if (err.responseJSON.message === 'Username taken'){
                    $('.invalid').html('Username taken!!')
                }
                $('.invalid').show();
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

    $('.view_recipes_nav').click(()=>{
        if (!localStorage.getItem('username')){
            $('.username').css('color', 'red');
            $('.username').html('You Have Not Signed In !!').show().fadeOut(2500);
        }
    })

    $('.create_recipe_nav').click(() => {
        if (!localStorage.getItem('username')) {
            $('.username').css('color', 'red');
            $('.username').html('You Have Not Signed In !!').show().fadeOut(2500);
        }
    });

    $('.recipe-card').hover((e)=>{
        let target = e.currentTarget;       
        $(target).toggleClass('shadow');
    })

    $('.list-group .ingredients').click(()=>{
        setTimeout(() => {
            $('.recipe-ingredients').fadeIn(500);
        }, 400);
        
        $('.recipe-description').fadeOut(500);
        $('.recipe-instructions').fadeOut(500);
        $('.recipe-nutrition').fadeOut(500);
        $('.list-group .ingredients').addClass('active');
        $('.list-group .description').removeClass('active');
        $('.list-group .instructions').removeClass('active');
        $('.list-group .nutrition').removeClass('active');
    });

    $('.list-group .description').click(() => {
        $('.recipe-ingredients').fadeOut(500);
        $('.recipe-instructions').fadeOut(500);
        $('.recipe-nutrition').fadeOut(500);
        setTimeout(() => {
            $('.recipe-description').fadeIn(500);
        }, 400);
        
        $('.list-group .ingredients').removeClass('active');
        $('.list-group .instructions').removeClass('active');
        $('.list-group .nutrition').removeClass('active');
        $('.list-group .description').addClass('active');
    });

    $('.list-group .instructions').click(() => {
        setTimeout(() => {
            $('.recipe-instructions').fadeIn(500);
        }, 400);
       
        $('.recipe-ingredients').fadeOut(500);
        $('.recipe-description').fadeOut(500);
        $('.recipe-nutrition').fadeOut(500);
        $('.list-group .description').removeClass('active');
        $('.list-group .ingredients').removeClass('active');
        $('.list-group .nutrition').removeClass('active');
        $('.list-group .instructions').addClass('active');
    });

    $('.list-group .nutrition').click(() => {
        setTimeout(() => {
            $('.recipe-nutrition').fadeIn(500);
        }, 400);

        $('.recipe-ingredients').fadeOut(500);
        $('.recipe-description').fadeOut(500);
        $('.recipe-instructions').fadeOut(500);
        $('.list-group .description').removeClass('active');
        $('.list-group .ingredients').removeClass('active');
        $('.list-group .instructions').removeClass('active');
        $('.list-group .nutrition').addClass('active');
    });


});