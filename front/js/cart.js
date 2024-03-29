

const itemsList = document.querySelector('#cart__items'); // element where I wanan show the items
const totalQuantity = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');



const updateQty = (e) => {

    const itemId = Number(e.path[4].dataset.id); //identify an especifit id from local storage

    cartItems = cartItems.map((item, cartId) => { //identify an especifit product to update his quantity with cart index


        if(cartId === itemId) return {...item, qty: e.target.valueAsNumber }
        else return item;
    })


    calculateTotals(cartItems)

    localStorage.setItem('cart', JSON.stringify(cartItems)) //include items to the local storage


    console.log({cartItems})

    
}
// this code delete an item from cart
const deleteItem = (e) => {


    const itemId = Number(e.path[4].dataset.id);

    cartItems = cartItems.filter((item, cartId) => {
        console.log({cartId, itemId})
        return cartId !== itemId
    })

    displayItems(cartItems) //update ot renderizw dom or list
    calculateTotals(cartItems)

    localStorage.setItem('cart', JSON.stringify(cartItems))

    
}

const displayItems = (items) => {

    let output = ``; //empty list 


    let count = 0;
    for (const item of items) { //show all items from product page save in the local storage

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

    itemsList.innerHTML = output //new list

    //Update the new list and its quantity  
    document.querySelectorAll('.itemQuantity').forEach(input => input.addEventListener('change', updateQty));
    document.querySelectorAll('.deleteItem').forEach(input => input.addEventListener('click', deleteItem));

}

const calculateTotals = (items) => {
    let orderItems = 0;
    let orderTotal = 0;


    //calculate total order
    for (const item of items) {
        orderItems += item.qty //line 70
        orderTotal += item.qty * item.price    
    }
    
    //show items quantity and order total in cart page
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

// Regular expressions


const formValidate = (input) =>{

    const hasNumber = (myString) => /\d/.test(myString); //validating some field to prevent numbers into
    const hasSpecialChars = (myString) => /^[A-Za-zÀ-ÿ0-9]+$/.test(myString); //validating some field to prevent special characters into
    const isEmail = (myString) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myString.toLowerCase());
    


    switch (input.name){
        
        case "firstName":

            const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

            if(!input.value) { //validating the field is not empty
                firstNameErrorMsg.innerHTML = 'This field cannot be blank';
                firstName.style.border = '1px solid red';
                
               return;
            }

            if(hasNumber(input.value)) {
                firstNameErrorMsg.innerHTML = 'This field cannot contain numbers';
                firstName.style.border = '1px solid red';
                return;
         
            }
            
            if(!hasSpecialChars(input.value)) {
                firstNameErrorMsg.innerHTML = 'This field cannot contain special characters';
                firstName.style.border = '1px solid red';
                return;
            }

            firstNameErrorMsg.innerHTML = '';
            firstName.style.border = '1.5px solid green';

            break;

        case "lastName":

            const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
            
            if(!input.value) {
                lastNameErrorMsg.innerHTML = 'This field cannot be blank';
                lastName.style.border = '1px solid red';
               return;
            }

            if(hasNumber(input.value)) {
                lastNameErrorMsg.innerHTML = 'This field cannot contain numbers';
                lastName.style.border = '1px solid red';
                return;
            }
            
            if(!hasSpecialChars(input.value)) {
                lastNameErrorMsg.innerHTML = 'This field cannot contain special characters';
                lastName.style.border = '1px solid red';
                return;
            }

            lastNameErrorMsg.innerHTML = '';
            lastName.style.border = '1.5px solid green';
            
            break;

        case "address":
            if(!input.value) {
                document.querySelector('#addressErrorMsg').innerHTML = 'This field cannot be blank';
                address.style.border = '1px solid red';
               return;
            }

            document.querySelector('#addressErrorMsg').innerHTML = '';
            address.style.border = '1.5px solid green';

            break;

        case "city":
            const cityErrorMsg = document.querySelector('#cityErrorMsg')
            
            if(!input.value) {
                cityErrorMsg.innerHTML = 'This field cannot be blank';
                city.style.border = '1px solid red';
               return;
            }

            if(hasNumber(input.value)) {
                cityErrorMsg.innerHTML = 'This field cannot contain numbers';
                city.style.border = '1px solid red';
                return;
            }
            
            if(!hasSpecialChars(input.value)) {
                cityErrorMsg.innerHTML = 'This field cannot contain special characters';
                city.style.border = '1px solid red';
                return;
            }

            cityErrorMsg.innerHTML = '';
            city.style.border = '1.5px solid green';
            break;


        case "email":

        console.log({isEmail: isEmail(input.value), email: input.value})

            if(!input.value) {
                document.querySelector('#emailErrorMsg').innerHTML = 'This field cannot be blank';
                email.style.border = '1px solid red';
               return;
            }

            if(!isEmail(input.value)){
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

   // validate data in each field
    input.addEventListener('blur', (e) => formValidate(e.target));
});

//Prevent prevent submitting incomplete form

cartForm.addEventListener('submit',async  (e) =>{
    e.preventDefault();
    const contact = {};
    entries.forEach((input) => {
        
        formValidate(input)
        if(!input.value) {
            input.nextElementSibling.innerHTML = 'This field cannot be blank'
            return;
        };

        if(input.name) contact[input.name] = input.value;
    });

    const products = JSON.parse(localStorage.getItem('cart'));

    const productIds = products.map(p => p.productId) //return an item each time it finds one

    //information to send to the back-end
    let res = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify({contact,products: productIds}), // send the information to the back-en or server
        headers: {
            'Content-Type': 'application/json'
        }
    })

    res = await res.json(); //convert server response to json format

    if(res.orderId) { //redirect the page to the confirmation page

        localStorage.removeItem('cart') //clining the caert content from local storage

        window.location.href = `/front/html/confirmation.html?orderId=${res.orderId}`
    }

   // console.log({res})
    
});




