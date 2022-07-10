

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
const cartForm = document.querySelector('.cart__order__form');
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

    const hasNumber = (myString) => /\d/.test(myString);
    const hasSpecialChars = (myString) => /^[A-Za-zÀ-ÿ0-9]+$/.test(myString);
    const isEmail = (myString) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myString.toLowerCase());
    


    switch (e.target.name){
        
        case "firstName":

            const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

            if(!e.target.value) {
                firstNameErrorMsg.innerHTML = 'This field cannot be blank';
                lastName.style.border = '1px solid red';
                
               return;
            }

            if(hasNumber(e.target.value)) {
                firstNameErrorMsg.innerHTML = 'This field cannot contain numbers';
                firstName.style.border = '1px solid red';
                return;
         
            }
            
            if(!hasSpecialChars(e.target.value)) {
                firstNameErrorMsg.innerHTML = 'This field cannot contain special characters';
                firstName.style.border = '1px solid red';
                return;
            }

            firstNameErrorMsg.innerHTML = '';
            firstName.style.border = '1.5px solid green';

            break;

        case "lastName":

            const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
            
            if(!e.target.value) {
                lastNameErrorMsg.innerHTML = 'This field cannot be blank';
                lastName.style.border = '1px solid red';
               return;
            }

            if(hasNumber(e.target.value)) {
                lastNameErrorMsg.innerHTML = 'This field cannot contain numbers';
                lastName.style.border = '1px solid red';
                return;
            }
            
            if(!hasSpecialChars(e.target.value)) {
                lastNameErrorMsg.innerHTML = 'This field cannot contain special characters';
                lastName.style.border = '1px solid red';
                return;
            }

            lastNameErrorMsg.innerHTML = '';
            lastName.style.border = '1.5px solid green';
            
            break;

        case "address":
            if(!e.target.value) {
                document.querySelector('#addressErrorMsg').innerHTML = 'This field cannot be blank';
                address.style.border = '1px solid red';
               return;
            }

            document.querySelector('#addressErrorMsg').innerHTML = '';
            address.style.border = '1.5px solid green';

            break;

        case "city":
            const cityErrorMsg = document.querySelector('#cityErrorMsg')
            
            if(!e.target.value) {
                cityErrorMsg.innerHTML = 'This field cannot be blank';
                city.style.border = '1px solid red';
               return;
            }

            if(hasNumber(e.target.value)) {
                cityErrorMsg.innerHTML = 'This field cannot contain numbers';
                city.style.border = '1px solid red';
                return;
            }
            
            if(!hasSpecialChars(e.target.value)) {
                cityErrorMsg.innerHTML = 'This field cannot contain special characters';
                city.style.border = '1px solid red';
                return;
            }

            cityErrorMsg.innerHTML = '';
            city.style.border = '1.5px solid green';
            break;


        case "email":

            if(!e.target.value) {
                document.querySelector('#emailErrorMsg').innerHTML = 'This field cannot be blank';
                email.style.border = '1px solid red';
               return;
            }

            if(!isEmail(e.target.value)){
                document.querySelector('#emailErrorMsg').innerHTML = 'Invalid email';
                email.style.border = '1px solid red';
                return;
            }

            //document.querySelector('#emailErrorMsg').innerHTML = '';
            emailErrorMsg.innerHTML = '';
            email.style.border = '1.5px solid green';

            break;
       
    }
}

entries.forEach((input) => {
    if(input.name === 'firstName') input.focus(); 

    input.required = false
    //input.addEventListener('keyup', formValidate);
    input.addEventListener('blur', formValidate);
});

//Sending Form 

cartForm.addEventListener('submit',async  (e) =>{
    e.preventDefault();
    const contact = {};
    entries.forEach((input) => {

        if(!input.value) {
            input.nextElementSibling.innerHTML = 'This field cannot be blank'
            return;
        };

        if(input.name) contact[input.name] = input.value;
    });

    const products = JSON.parse(localStorage.getItem('cart'));

    const productIds = products.map(p => p.productId)


    let res = await fetch('http://localhost:3000/api/products/order', {
        // mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({contact,products: productIds}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    res = await res.json();

    if(res.orderId) {
        window.location.href = `/front/html/confirmation.html?orderId=${res.orderId}`
    }

    console.log({res})
    
});




