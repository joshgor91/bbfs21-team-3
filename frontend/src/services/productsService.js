const axios = require('axios')

export async function getProductsRequest() {
    const config = {
        method: 'GET',
        url: 'http://localhost:8080/api/products/all'
    }
    let res = await axios(config)
    return res
}

export async function getProductRequest(productId) {
    const config = {
        method: 'GET',
        url: `http://localhost:8080/api/products/getById/${productId}`
    }
    let res = await axios(config)
    console.log(res.status)
    console.log(res)
    return res

}