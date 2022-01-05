const axios = require('axios')

export async function getCategoriesRequest() {
    console.log('In get categories request')
    const config = {
        method: 'GET',
        url: 'http://localhost:8080/api/products/category/all'
    }
    let res = await axios(config)
    console.log(res)
    return res
}