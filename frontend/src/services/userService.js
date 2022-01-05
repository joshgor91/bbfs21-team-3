const axios = require('axios')

export async function editUserRequest(userToEdit) {
    console.log(userToEdit, 'in edit userRequest')
    let res = await axios.put('http://localhost:8080/api/users/edit', userToEdit)
    console.log(res.data)
    return res
}