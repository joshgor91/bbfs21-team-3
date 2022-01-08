export function calculateGuestTotal() {
    let value = 0.0
    let cartItems = JSON.parse(window.localStorage.getItem('cartItems'))

    if (Array.isArray(cartItems))
    cartItems.forEach(item => {
        value += item.salePrice * item.quantity
    })

    return value
}