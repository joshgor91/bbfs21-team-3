const axios = require('axios')

export async function editUserRequest(userToEdit) {

    let res = await axios.put('http://localhost:8080/api/users/edit', userToEdit)

    return res
}

export async function deleteUserRequest(userId) {
    // console.log(userId, 'in delete user request')
    let res = await axios.delete(`http://localhost:8080/api/users/delete/${userId}`)
    // console.log(res)
    return res
}