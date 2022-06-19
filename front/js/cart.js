

const itemsList = document.querySelector('#cart__items');
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');



const updateQty = (e) => {

    const itemId = Number(e.path[4].dataset.id);

    cartItems = cartItems.map((item, cartId) => {

        if(cartId === itemId) return {...item, qty: e.target.valueAsNumber }
        else return item;
    })


    calculateTotals(cartItems)

    localStorage.setItem('cart', JSON.stringify(cartItems))


    console.log({cartItems})

    
}

const deleteItem = (e) => {


    const itemId = Number(e.path[4].dataset.id);

    cartItems = cartItems.filter((item, cartId) => {
        console.log({cartId, itemId})
        return cartId !== itemId
    })

    displayItems(cartItems)
    calculateTotals(cartItems)

    localStorage.setItem('cart', JSON.stringify(cartItems))

    
}

const displayItems = (items) => {

    let output = ``;


    let count = 0;
    for (const item of items) {

        output += `
        <article class="cart__item" data-id="${count}" data-color="${item.color}">
            <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="${item.name}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>€${item.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Delete</p>
                    </div>
                </div>
            </div>
        </article>
    `


    count++;
    }

    itemsList.innerHTML = output

    document.querySelectorAll('.itemQuantity').forEach(input => input.addEventListener('change', updateQty));
    document.querySelectorAll('.deleteItem').forEach(input => input.addEventListener('click', deleteItem));

}

const calculateTotals = (items) => {
    let orderItems = 0;
    let orderTotal = 0;


    //calculate total order
    for (const item of items) {
        orderItems += item.qty
        orderTotal += item.qty * item.price    
    }
    
    totalQuantity.innerHTML = orderItems;
    totalPrice.innerHTML = orderTotal;

}

let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

displayItems(cartItems)
calculateTotals(cartItems)

// validating form code input and sending.

//accessing to form
const formFields = document.getElementsByClassName('cart__order__form');
const entries = document.querySelectorAll('.cart__order input');


const fieldInput = {
	
	//nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    first_Name: /^[a-zA-ZÀ-ÿ\s]/,
    last_Name: /^[a-zA-ZÀ-ÿ\s]/,
    cities: /^[a-zA-ZÀ-ÿ\s]/,
	e_mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

}

// validating Form fields


const formValidate = (e) =>{
    switch (e.target.name){
        
        case "firstName":
            if(fieldInput.first_Name.test(e.target.value)){
               document.querySelector('#firstNameErrorMsg').innerHTML = '';
            } else {
                document.querySelector('#firstNameErrorMsg').innerHTML = 'No numbers or special characters are allowed in this field';
               document.getElementById("firstName").focus();
             
         
            }
            break;

        case "lastName":
            if(fieldInput.last_Name.test(e.target.value)){
                document.querySelector('#lastNameErrorMsg').innerHTML = '';
            } else {
              document.querySelector('#lastNameErrorMsg').innerHTML = 'No numbers or special characters are allowed in this field';
              document.getElementById("lastName").focus();
            }
            break;

        case "address":
            break;

        case "city":
            if(fieldInput.cities.test(e.target.value)){
                document.querySelector('#cityErrorMsg').innerHTML = '';
            } else {
              document.querySelector('#cityErrorMsg').innerHTML = 'No numbers or special characters are allowed in this field';
              document.getElementById("city").focus();
            }
            break;


        case "email":
            if(fieldInput.e_mail.test(e.target.value)){
                document.querySelector('#emailErrorMsg').innerHTML = '';
            } else {
              document.querySelector('#emailErrorMsg').innerHTML = 'No numbers or special characters are allowed in this field';
              document.getElementById("city").focus();
            }
            break;
       
    }
}

entries.forEach((input) => {
    //input.addEventListener('keyup', formValidate);
    input.addEventListener('blur', formValidate);
});


/*formFields.addEventListener('submit', (e) =>{
    e.preventDefault();
});*/



/*document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("cart__order__form").addEventListener('cart__order__form__submit',validateForm);
});



function validateForm(event){
    event.preventDefault();
    let userName = document.getElementById('firstName').value;
    //if(userName.length ==0){
    if(userName === 5){
        alert('Numbers not permitted');
        return;
    }
}*/









