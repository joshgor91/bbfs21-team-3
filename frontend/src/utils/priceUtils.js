let now = new Date()
let currentPrice = 0
let currentSale = 0
let saleAndPrice = 0


export function sellPrice(product) {
    product.scheduledPrices.map(prices => {
        if (new Date(prices.effectiveDate) - now < 0) {
            return currentPrice = prices.price
        }
    })
    return currentPrice
}

export function discountPrice(product) {
    if (product.Sales?.length === 0) {
        currentSale = 0
        saleAndPrice = 0
    } else {
        product.Sales.map(sales => {
            if (new Date(sales.saleStartDate) - now < 0 && new Date(sales.saleEndDate) - now > 0) {
                currentSale = Math.round(currentPrice) * sales.discount
                return saleAndPrice = currentPrice - currentSale
            }
        })
    }
    return {currentSale: currentSale, discountPrice: saleAndPrice}
}


export function cartSummery(cart) {
    let itemPrice = 0
    let originalPrice = 0
    let discountPrice = 0
    let salePrice = 0
    let discount = 0
    let totalSavings = 0
    let total = 0

    cart.forEach(cartItem => {
        for (let item of cartItem.scheduledPrices) {
            if (new Date(item.effectiveDate) - now < 0) {
                itemPrice = item.price
            }
            return originalPrice += itemPrice * cartItem.quantity
        }
    })

    cart.forEach(cartItem => {
        if (cartItem.Sales?.length > 0) {
            for (let item of cartItem.Sales) {
                if (new Date(item.saleStartDate) - now < 0 && new Date(item.saleEndDate) - now > 0) {
                    discount = item.discount
                    // console.log(cartItem.id, discount)
                }
                for (let itemPrice of cartItem.scheduledPrices) {
                    console.log(itemPrice)
                    if (new Date(itemPrice.effectiveDate) - now < 0) {
                        console.log(itemPrice.price)
                        salePrice = itemPrice.price
                        discountPrice = Math.round(salePrice) * discount
                        console.log(discount)
                        console.log(discountPrice)
                        return totalSavings += discountPrice * cartItem.quantity
                    }
                }

            }
        }
    })
        console.log(totalSavings)
        return {
            originalPrice: originalPrice
        }
    }
