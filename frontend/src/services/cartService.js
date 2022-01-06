const axios = require('axios')

export async function getCartItemsRequest(userId) {
    const config = {
        method: 'GET',
        url: `http://localhost:8080/api/cart/viewCart/${userId}`
    }
    let res = await axios(config)
    return res
}

export async function getUserCartRequest(userId) {
    console.log('user cart request', userId)
    const header = {
        'userId': userId
    }
    let res = await axios.get(`http://localhost:8080/api/cart/usercart`, {
        headers: header
    })
    console.log(res)
    return res
}

export async function addCartItemRequest(productToAdd) {
    const cartItemInfo = ''
    let res = await axios.post(`http://localhost:8080/api/products/add`, productToAdd);
    return res;
}