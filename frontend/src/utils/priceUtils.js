let now = new Date()
let currentPrice = 0
let currentSale = 0
let saleAndPrice = 0

export function salePrice(product) {
    product.ScheduledPrices.map(prices => {
        if (new Date(prices.effectiveDate) - now < 0) {
            currentPrice = prices.price
        }
    })
    return currentPrice
}

export function discountPrice(product) {
    console.log(product)
    product.Sales.map(sales => {
        if (new Date(sales.saleStartDate) - now < 0 && new Date(sales.saleEndDate) - now > 0) {
            currentSale = Math.round(currentPrice) * sales.discount
            saleAndPrice = currentPrice - currentSale
            console.log(saleAndPrice, currentSale)
        }
    })
    return {currentSale: currentSale, discountedPrice: saleAndPrice}
}
