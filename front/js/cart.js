

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











