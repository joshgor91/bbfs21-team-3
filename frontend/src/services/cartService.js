const axios = require('axios')

export async function getCartItemsRequest(userId) {
    console.log(userId, 'in get Cart request')
    const config = {
        method: 'GET',
        url: `http://localhost:8080/api/cart/viewCart/${userId}`
    }
    let res = await axios(config)
    console.log(res);
    return res
}

export async function addCartItemRequest(productToAdd) {
    console.log(productToAdd, 'in add item request')
    const cartItemInfo = ''
    let res = await axios.post(`http://localhost:8080/api/products/add`, productToAdd);
    console.log(res);
    return res;
}