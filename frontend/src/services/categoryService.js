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

export async function createCategoryRequest(newCategory) {
    console.log(`logging inside createCategory`)
    console.log(newCategory)
    let res = await axios.post(`http://localhost:8080/api/products/category/add`, newCategory);
    return res;
}

export async function editCategoryRequest(updatedCategory) {
    console.log(`logging inside editCategory`)
    console.log(updatedCategory)
    let res = await axios.put(`http://localhost:8080/api/products/category/edit`, updatedCategory);
    return res;
}