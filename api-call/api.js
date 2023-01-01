import axios from "axios"

async function getData(_id) {
    const userData = await axios.get(`https://jsonplaceholder.typicode.com/users/${_id}`)
    const postData = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${_id}`) 
    userData.data.posts = postData.data
    return userData.data
}

export default getData