import { ref, get, update } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"
import { db } from "./modules/firebase.js"


let productsArray = []
let productsNameArray = []

async function getProducts() {
    const firebaseProducts = await get(ref(db, '/products/'))
    for (let i = 0; i < firebaseProducts.val().length; i++) {
        productsArray.push(firebaseProducts.val()[i])
        productsNameArray.push(firebaseProducts.val()[i].name)
    }
}

getProducts()


let totalSum = 0
let cartArray = []
let cartNameArray = []

checkCart()
function checkCart() {
    if (localStorage.getItem("cartArray") === null) {
        const totalContainer = document.getElementById('total-container')
        const showTotal = document.createElement('p')
        showTotal.innerText = 'The cart is empty'
        totalContainer.append(showTotal)
    }

    else {
        cartArray = JSON.parse(localStorage.getItem("cartArray"))
        for (let i = 0; i < cartArray.length; i++) {
            cartNameArray.push(cartArray[i].name)

        }
        showCart()
    }
}


function showCart() {
    for (let i = 0; i < cartArray.length; i++) {
        const cartContainer = document.getElementById('cart-container')
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        cartContainer.append(cartItem)

        const imgContainer = document.createElement('div')
        imgContainer.classList.add('img-container')
        cartItem.append(imgContainer)

        const productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = cartArray[i].imgUrl
        imgContainer.append(productImg)

        const productName = document.createElement('h3')
        productName.innerText = cartArray[i].name + ', ' + cartArray[i].price + ':-/item';

        const AmountInput = document.createElement('input')
        AmountInput.type = 'number'
        AmountInput.min = "1";
        AmountInput.value = cartArray[i].amount
        
        const itemTotal = document.createElement('h3')
        const itemTotalSum = cartArray[i].price * cartArray[i].amount
        itemTotal.innerHTML = 'Total: ' + itemTotalSum + ' :-'

        const removeItemBtn = document.createElement('button')
        removeItemBtn.setAttribute('class', 'btn btn-danger mt-2 btn-round ')
        removeItemBtn.innerHTML = 'Remove item'
        cartItem.append(productName, AmountInput, itemTotal, removeItemBtn)
        totalSum = totalSum + itemTotalSum
    }

//Summeringsraden i carten och köp-knapp
const totalContainer = document.getElementById('total-container')
const showTotal = document.createElement('h1')
showTotal.innerText = 'Total: ' + totalSum + ' :-'
totalContainer.append(showTotal)
const buyBtn = document.getElementById('buy-button')
buyBtn.addEventListener('click', buyFunction)

}

//Ändrar lagervärde i Firebase
function changeInStock(index, newStock) {
    update(ref(db, 'products/' + index + '/'), {
        inStock: newStock
    });
}

//Köp function
function buyFunction() {
    for (let i = 0; i < cartArray.length; i++) {
        const firebaseIndex = cartArray[i].index
        const newStock = productsArray[firebaseIndex].inStock - cartArray[i].amount
        productsArray[firebaseIndex].inStock = newStock
        changeInStock(cartArray[i].index, newStock)

    }

    cartArray = []
    localStorage.removeItem("cartArray",)
    alert('The vegetables are on their way to your house!')
    location.reload()

}

//Ta bort produkt ur carten
const buttons = document.querySelectorAll('button')
buttons.forEach((button, index) => {
    button.addEventListener('click', function () {
        cartArray.splice(index, 1)
        if (cartArray.length == 0) {
            localStorage.removeItem("cartArray")
            location.reload()
        }
        else {
            localStorage.setItem("cartArray", JSON.stringify(cartArray))
            location.reload()
        }
    })
});

//Ändra produktantal i carten
const inputs = document.querySelectorAll('input')
inputs.forEach((input, index) => {
    input.addEventListener('change', function () {
        cartArray[index].amount = input.value
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
        location.reload()

    })
});









