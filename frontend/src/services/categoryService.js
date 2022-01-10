const axios = require('axios')

export async function getCategoriesRequest() {
    let res = await axios.get(`http://localhost:8080/api/products/category/all`)
    return res
}

export async function createCategoryRequest(newCategory) {
    let res = await axios.post(`http://localhost:8080/api/products/category/add`, newCategory);
    return res;
}

export async function editCategoryRequest(updatedCategory) {
    let res = await axios.put(`http://localhost:8080/api/products/category/edit`, updatedCategory);
    return res;
}