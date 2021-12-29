const axios = require('axios')

export async function getProductsRequest() {
    console.log('in get products request')
    const config = {
        method: 'GET',
        url: 'http://localhost:8080/api/products/all'
    }

    let res = await axios(config)
    console.log(res.status);
    return res
}