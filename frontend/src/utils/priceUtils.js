let now = new Date()
let currentPrice = 0
let currentSale = 0
let saleAndPrice = 0
let itemPrice1 = 0
let itemPrice2 = 0
let itemPrice3 = 0
let itemPrice4 = 0
let itemPrice5 = 0
let itemPrice6 = 0
let originalPrice = 0
let totalSavings = 0
let total = 0

export function sellPrice(product) {
    console.log(product)
    product.scheduledPrices.map(prices => {
        if (new Date(prices.effectiveDate) - now < 0) {
            currentPrice = prices.price
        }
    })
    console.log(currentPrice)
    return currentPrice
}

export function discountPrice(product) {
    console.log(product)
    product.Sales.map(sales => {
        if (new Date(sales.saleStartDate) - now < 0 && new Date(sales.saleEndDate) - now > 0) {
            currentSale = Math.round(currentPrice) * sales.discount
            saleAndPrice = currentPrice - currentSale
        }
    })
    console.log({currentSale: currentSale, discountPrice: saleAndPrice})
    return {currentSale: currentSale, discountPrice: saleAndPrice}
}

export function cartSummery(cart) {
    if (cart.length === 1) {
        let quantity1 = cart[0].quantity
        cart[0].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice1 = result * quantity1
            }
        })
        originalPrice = itemPrice1
    } else if (cart.length === 2) {
        let quantity1 = cart[0].quantity
        let quantity2 = cart[1].quantity
        cart[0].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice1 = result * quantity1
            }
        })
        cart[1].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice2 = result * quantity2
            }
        })
        originalPrice = itemPrice1 + itemPrice2
    } else if (cart.length === 3) {
        let quantity1 = cart[0].quantity
        let quantity2 = cart[1].quantity
        let quantity3 = cart[2].quantity
        cart[0].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice1 = result * quantity1
            }
        })
        cart[1].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice2 = result * quantity2
            }
        })
        cart[2].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice3 = result * quantity3
            }
        })
        originalPrice = itemPrice1 + itemPrice2 + itemPrice3
    } else if (cart.length === 4) {
        let quantity1 = cart[0].quantity
        let quantity2 = cart[1].quantity
        let quantity3 = cart[2].quantity
        let quantity4 = cart[3].quantity
        cart[0].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice1 = result * quantity1
            }
        })
        cart[1].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice2 = result * quantity2
            }
        })
        cart[2].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice3 = result * quantity3
            }
        })
        cart[3].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice4 = result * quantity4
            }
        })
        originalPrice = itemPrice1 + itemPrice2 + itemPrice3 + itemPrice4
    } else if (cart.length === 4) {
        let quantity1 = cart[0].quantity
        let quantity2 = cart[1].quantity
        let quantity3 = cart[2].quantity
        let quantity4 = cart[3].quantity
        let quantity5 = cart[3].quantity
        cart[0].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice1 = result * quantity1
            }
        })
        cart[1].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice2 = result * quantity2
            }
        })
        cart[2].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice3 = result * quantity3
            }
        })
        cart[3].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice4 = result * quantity4
            }
        })
        cart[4].scheduledPrices.map(cartItem => {
            if (new Date(cartItem.effectiveDate) - now < 0) {
                let result = cartItem.price
                return itemPrice5 = result * quantity5
            }
        })
        originalPrice = itemPrice1 + itemPrice2 + itemPrice3 + itemPrice4 + itemPrice5
    }


    console.log(originalPrice)
    return {
        originalPrice: originalPrice
    }
}
