const axios = require('axios')

export async function getCartItemsRequest(userId) {
    const config = {
        method: 'GET',
        url: `http://localhost:8080/api/cart/${userId}`
    }
    let res = await axios(config)
    console.log(res);
    return res
}

export async function addCartItemRequest(productToAdd) {
    let res = await axios.post(`http://localhost:8080/api/products/add`, productToAdd);
    console.log(res);
    return res;
}