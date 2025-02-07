// Example 1

const myFunc = new Promise((resolve, reject) => {
    var name = "Maxim";
    if (name == "Maxim"){
        resolve("Name is Maxim.");
    }
    else {
        reject("Name is not Maxim.")
    }
});

myFunc
    .then((msg) => {
        console.log(msg)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        console.log("Every name is cool.")
    })


// Example 2

const axios = require("axios");

const data = axios.get("https://swapi.dev/api/people/2/");

// console.log(data) -> this won't work because it prints before the result is returned

data
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        console.log("Promise resolved.")
    })
