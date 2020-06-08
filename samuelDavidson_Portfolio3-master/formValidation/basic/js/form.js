//Update title
let title = document.querySelector('h2');
title.innerHTML = '<h2><strong> Contact</strong> the Nerds</h2>';

//update background
let bgImage = 'https://images.unsplash.com/photo-1421757295538-9c80958e75b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80';
document.querySelector('body').style.backgroundImage = "url('" + bgImage + "')";

let description = document.querySelector("p");
description.innerHTML = '<p>Have any new Nerd News? Want to tell us how terribly we rated your favorite game? We welcome you to contact our team directly!</p>';

//disable button
const button = document.querySelector('[type=submit]');
button.classList.add('disabled');


let placeHolderData = [
    "Username",
    "Email",
    "WhatsApp Number"
];
//update placeholders
const requiredField = document.querySelectorAll('.required');

for(let i = 0; i < requiredField.length; i++){
    requiredField[i].placeholder = placeHolderData[i];
}


function validateForm(event){
    event.preventDefault();//stop button submission

    let valid = true;
    for (let i = 0; i = requiredField.length; i++){

        //if the field is valid, remove disabled class on submit button
        if(valid == true){
            button.removeAttribute('class');
        }
        //verify field has content
        if (!requiredField[i].value){
            valid = false;
        }
    }
}

    function validateFields(event){
        let target = event.target;
        let parent = target.parentElement;
        //error message
        let error = '<label class="error"> This is a required field! </label>';

        if(!target.value.length){
            if(!parent.querySelector('.error')){
                parent.insertAdjacentHTML('beforeend', error);
            } 
        } else{
            parent.removeChild(parent.querySelector('.error'))
        }
    }

    for(let i = 0; i < requiredField.length; i++){
        requiredField[i].addEventListener('input', validateForm);
        requiredField[i].addEventListener('blur', validateFields);
    }

    function send(event){
        //Stop button default
        event.preventDefault();
        let form = document.querySelector('form');
        let message = '<h2>Thank you!</h2><p>We will get back to you on the next death break!</p>';
        
        let target = event.target;
        let disabled = target.classList.contains('disabled');

        if(disabled === false){
            form.innerHTML = message;
        }
    }

    button.addEventListener('click', send);