let now = new Date()
let currentPrice = 0
let currentSale = 0
let saleAndPrice = 0
let minAdvPrice = 0

export function minAdPrice(product) {
    // console.log(product)
    product.mininumAdvertisedPrice?.map(minAdPr => {
        if (new Date(minAdPr.effectiveDate) - now < 0) {
            minAdvPrice = minAdPr.price
        }
    })
    // console.log(minAdvPrice)
    return minAdvPrice
}

export function sellPrice(product) {
    product.scheduledPrices?.map(prices => {
        if (new Date(prices.effectiveDate) - now < 0) {
            return currentPrice = prices.price
        }
    })
    return currentPrice
}

export function discountPrice(product) {
    if (product.sales?.length === 0) {
        currentSale = 0
        saleAndPrice = 0
    } else {
        product.sales?.map(sales => {
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
    let couponAmount = 0

    cart?.forEach(cartItem => {
        for (let item of cartItem.scheduledPrices) {
            if (new Date(item.effectiveDate) - now < 0) {
                itemPrice = item.price
            }

        }
        originalPrice += itemPrice * cartItem.quantity
    })

    cart?.forEach(cartItem => {
        for (let sale of cartItem.sales) {
            if (new Date(sale.saleStartDate) - now < 0 && new Date(sale.saleEndDate) - now > 0) {
                discount = sale.discount
                console.log(discount)
            }
        }
        // check scheduled price
        for (let scheduledPrice of cartItem.scheduledPrices) {
            console.log(scheduledPrice)
            if (new Date(scheduledPrice.effectiveDate) - now < 0) {
                salePrice = scheduledPrice.price
            }
        }
        if (discount) {
            discountPrice += Math.round(salePrice) * discount * cartItem.quantity
        }

        totalSavings = discountPrice
        discount = 0
    })

    total = originalPrice - totalSavings

    return {
        originalPrice: originalPrice,
        totalSavings: totalSavings,
        total: total.toFixed(2)
    }
}
