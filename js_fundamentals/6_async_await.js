const axios = require("axios");

const fetchData = async () => {
    try {
        const data = await axios.get("https://swapi.dev/api/people/1/");  
        console.log(data)
    }
    catch (err) {
        console.log("Error " + err)
    }
    finally {
        console.log("Finally")
    }
}

fetchData()