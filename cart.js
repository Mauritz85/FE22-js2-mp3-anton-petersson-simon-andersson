const cartArray = JSON.parse(localStorage.getItem("cartArray"));

console.log(cartArray);


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
        productName.innerHTML = cartArray[i].name
        const productPrice = document.createElement('p')
        productPrice.innerHTML = cartArray[i].price
        const productAmount = document.createElement('p')
        productAmount.innerHTML = cartArray[i].amount
        const itemTotal = document.createElement('h3')
        itemTotal.innerHTML = cartArray[i].price * cartArray[i].amount


        const removeItem = document.createElement('button')
        removeItem.innerHTML = 'Remove item'
        cartItem.append(productName, productPrice, productAmount, itemTotal, removeItem)

    }

    const showTotal = document.createElement('h1')


}

showCart()

