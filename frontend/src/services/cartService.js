import {editCategoryRequest} from "./categoryService";

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

export async function addCartItemRequest(productId, cartId, quantity, regularPrice, salePrice) {
    console.log('in add cart item request', productId, cartId, quantity)
    let data = {
        productId: productId,
        cartId: cartId,
        quantity: quantity,
        regularPrice:regularPrice,
        salePrice:salePrice
    }
    return await axios.post(`http://localhost:8080/api/cart/add`, data);

}

    export async function editCartRequest(productId, cartId, quantity) {
        console.log('in edit cart item request', productId, cartId, quantity)
        let data = {
            productId: productId,
            cartId: cartId,
            quantity: quantity,
        }
        return await axios.put(`http://localhost:8080/api/cart/edit`, data);

}