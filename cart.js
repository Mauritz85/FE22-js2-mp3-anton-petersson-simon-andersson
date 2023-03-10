import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getDatabase, push, ref, onValue, set, update, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"


const firebaseConfig = {

    apiKey: "AIzaSyCsOpI3Ws8F_1BfQV4qspnjwsuDI0XavZw",
    authDomain: "store-27853.firebaseapp.com",
    databaseURL: "https://store-27853-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "store-27853",
    storageBucket: "store-27853.appspot.com",
    messagingSenderId: "1043701083439",
    appId: "1:1043701083439:web:fb04134c5441ec912d45da"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let productsArray = []
let productsNameArray = []

async function getProducts() {
    const firebaseProducts = await get(ref(db, '/products/'))
    for (let i = 0; i < firebaseProducts.val().length; i++) {
        productsArray.push(firebaseProducts.val()[i])
        productsNameArray.push(firebaseProducts.val()[i].name)
    }

    console.log(productsArray[0])

}

getProducts()


let totalSum = 0
let cartArray = []
let cartNameArray = []

checkCart()
function checkCart() {
    if (localStorage.getItem("cartArray") === null) {
        alert('Cart is empty')
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
        productName.innerText = cartArray[i].name + ', ' + cartArray[i].price + '.-';
        // const productPrice = document.createElement('p')
        // productPrice.innerText = cartArray[i].price
        const AmountInput = document.createElement('input')
        AmountInput.type = 'number'
        AmountInput.min = "1";
        AmountInput.value = cartArray[i].amount
        const itemTotal = document.createElement('h3')
        const itemTotalSum = cartArray[i].price * cartArray[i].amount
        itemTotal.innerHTML = 'Sum: ' + cartArray[i].price * cartArray[i].amount + ' kr'

        const removeItemBtn = document.createElement('button')
        removeItemBtn.setAttribute('class', 'btn btn-danger mt-2 btn-round ')
        removeItemBtn.innerHTML = 'Remove item'
        cartItem.append(productName,
            //  productPrice,
              AmountInput, itemTotal, removeItemBtn)
        totalSum = totalSum + itemTotalSum


    }


}

console.log('cartArrayIndex ' + cartArray[0].index)


const totalContainer = document.getElementById('total-container')
const showTotal = document.createElement('h1')
showTotal.innerText = 'Total: ' + totalSum + ' kr'
totalContainer.append(showTotal)


const buyBtn = document.getElementById('buy-button')
buyBtn.addEventListener('click', buyFunction)

function changeInStock(index, newStock) {
    update(ref(db, 'products/' + index + '/'), {
        inStock: newStock
    });
}

function buyFunction() {
    for (let i = 0; i < cartArray.length; i++) {
        console.log(productsArray[i].inStock)
        const firebaseIndex = cartArray[i].index
        const newStock = productsArray[firebaseIndex].inStock - cartArray[i].amount
        productsArray[firebaseIndex].inStock = newStock
        changeInStock(cartArray[i].index, newStock)

    }

    cartArray = []
    localStorage.removeItem("cartArray",)
    location.reload()

}


const buttons = document.querySelectorAll('button')
buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
        cartArray.splice(index, 1)
        console.log(cartArray)
        if(cartArray.length == 0){
            localStorage.removeItem("cartArray")
            location.reload()
        }
        else{
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
        location.reload()}
    })

    

});

const inputs = document.querySelectorAll('input')
inputs.forEach((input, index) => {
    input.addEventListener('click', function() {
        cartArray[index].amount = input.value
        console.log(cartArray)
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
        location.reload()
    
    })

    

});









