const api_key = "DBmiFytdnw3xtgrhGwkOCr4LH8wt5S6X8W6nvlzZ"; // you need to change in the case whit the time for this api is finish

const base_url = "https://api.nasa.gov/";

const apod_endpoint = "planetary/apod";

try {
    // Create the url to do a fetch to give all data for this api
    let url = `${base_url}${apod_endpoint}?api_key=${api_key}`

    fetch(url)

    .then((response) => 
        response.json() //Convert to json the data
    )

    .then ((data) =>{ 
        console.log(data)

        const title = data.title
        const imageUrl = data.url

        //Dom manipulation create element and get the div whit print the title and the image
        const resultContainer = document.getElementById('result-container')
        const titleElement = document.createElement("h2")
        titleElement.textContent = title

        const imageElement = document.createElement("img")
        imageElement.src = imageUrl

        resultContainer.appendChild(titleElement)
        resultContainer.appendChild(imageElement)


        //Convoque the funtions
        saveurlimage(imageUrl)
        loadLocalStorage()

    })

    .catch((error) => { 
        console.error("Error en la solicitud:", error)
    })

} catch (error) {
    console.error("Error en la solicitud:", error);
}

//Funtion arrow to save the url image if the api send
const saveurlimage = (url_image) =>{
    localStorage.setItem('image',JSON.stringify(url_image))
}
//Funtion arrow to print de url of the image in the local storage 
const loadLocalStorage = () =>{
    const respuesta = localStorage.getItem('image') ? JSON.parse(localStorage.getItem("image")) :"No hay url"
    console.log(respuesta)
}



