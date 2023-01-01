import getData from "./api.js"

(async() => {
    const result = await getData(1)
    console.log(result)
})()