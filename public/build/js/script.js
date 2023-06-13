// All javascript code in this project for now is just for demo DON'T RELY ON IT


const random = (max = 100) => {
  return Math.round(Math.random() * max) + 20
}

const randomData = () => {
  return [
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
  ]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const cssColors = (color) => {
  return getComputedStyle(document.documentElement).getPropertyValue(color)
}

const getColor = () => {
  return window.localStorage.getItem('color') ?? 'cyan'
}

const colors = {
  primary: cssColors(`--color-${getColor()}`),
  primaryLight: cssColors(`--color-${getColor()}-light`),
  primaryLighter: cssColors(`--color-${getColor()}-lighter`),
  primaryDark: cssColors(`--color-${getColor()}-dark`),
  primaryDarker: cssColors(`--color-${getColor()}-darker`),
}

// const barChart = new Chart(document.getElementById('barChart'), {
//   type: 'bar',
//   data: {
//     labels: months,
//     datasets: [
//       {
//         data: randomData(),
//         backgroundColor: colors.primary,
//         hoverBackgroundColor: colors.primaryDark,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           gridLines: false,
//           ticks: {
//             beginAtZero: true,
//             stepSize: 50,
//             fontSize: 12,
//             fontColor: '#97a4af',
//             fontFamily: 'Open Sans, sans-serif',
//             padding: 10,
//           },
//         },
//       ],
//       xAxes: [
//         {
//           gridLines: false,
//           ticks: {
//             fontSize: 12,
//             fontColor: '#97a4af',
//             fontFamily: 'Open Sans, sans-serif',
//             padding: 5,
//           },
//           categoryPercentage: 0.5,
//           maxBarThickness: '10',
//         },
//       ],
//     },
//     cornerRadius: 2,
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//   },
// })

// const doughnutChart = new Chart(document.getElementById('doughnutChart'), {
//   type: 'doughnut',
//   data: {
//     labels: ['Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         data: [random(), random(), random()],
//         backgroundColor: [colors.primary, colors.primaryLighter, colors.primaryLight],
//         hoverBackgroundColor: colors.primaryDark,
//         borderWidth: 0,
//         weight: 0.5,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     legend: {
//       position: 'bottom',
//     },

//     title: {
//       display: false,
//     },
//     animation: {
//       animateScale: true,
//       animateRotate: true,
//     },
//   },
// })

// const activeUsersChart = new Chart(document.getElementById('activeUsersChart'), {
//   type: 'bar',
//   data: {
//     labels: [...randomData(), ...randomData()],
//     datasets: [
//       {
//         data: [...randomData(), ...randomData()],
//         backgroundColor: colors.primary,
//         borderWidth: 0,
//         categoryPercentage: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           display: false,
//           gridLines: false,
//         },
//       ],
//       xAxes: [
//         {
//           display: false,
//           gridLines: false,
//         },
//       ],
//       ticks: {
//         padding: 10,
//       },
//     },
//     cornerRadius: 2,
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       prefix: 'Users',
//       bodySpacing: 4,
//       footerSpacing: 4,
//       hasIndicator: true,
//       mode: 'index',
//       intersect: true,
//     },
//     hover: {
//       mode: 'nearest',
//       intersect: true,
//     },
//   },
// })

// const lineChart = new Chart(document.getElementById('lineChart'), {
//   type: 'line',
//   data: {
//     labels: months,
//     datasets: [
//       {
//         data: randomData(),
//         fill: false,
//         borderColor: colors.primary,
//         borderWidth: 2,
//         pointRadius: 0,
//         pointHoverRadius: 0,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           gridLines: false,
//           ticks: {
//             beginAtZero: false,
//             stepSize: 50,
//             fontSize: 12,
//             fontColor: '#97a4af',
//             fontFamily: 'Open Sans, sans-serif',
//             padding: 20,
//           },
//         },
//       ],
//       xAxes: [
//         {
//           gridLines: false,
//         },
//       ],
//     },
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       hasIndicator: true,
//       intersect: false,
//     },
//   },
// })

// let randomUserCount = 0

// const usersCount = document.getElementById('usersCount')

// const fakeUsersCount = () => {
//   randomUserCount = random()
//   activeUsersChart.data.datasets[0].data.push(randomUserCount)
//   activeUsersChart.data.datasets[0].data.splice(0, 1)
//   activeUsersChart.update()
//   usersCount.innerText = randomUserCount
// }

// setInterval(() => {
//   fakeUsersCount()
// }, 1000)



document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input')
  const Coincidences = document.getElementById('Coincidenses')
  const Pertentage = document.getElementById('Percentage')
  const arrayContainer = document.getElementById('arrayContainer')
  const card_anime_new = document.getElementById('card-anime')
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const searchUrl = searchInput.value.trim()
      

      if (searchUrl === '') {
        alert('No hay nada en la búsqueda')
        return
      }
      fetch(`https://api.trace.moe/search?url=${searchUrl}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          const results = data.result

          let maxSimilarity = 0
          let mostSimilarResult = null
          
          let Titles_Anime_Coincidences = []

          for (const title of results){
            let modifiedFilename = title.filename.replace(/\(.*?\)|.mp4/g, '')
            let similitud = title.similarity.toFixed(2)
            Titles_Anime_Coincidences.push(modifiedFilename)
            Titles_Anime_Coincidences.push("Episodio: " +title.episode)
            Titles_Anime_Coincidences.push("Similitud: " +similitud + "%")
            Titles_Anime_Coincidences.push(title.video)
            
          }
          for (let i = 0; i < Titles_Anime_Coincidences.length; i+= 4) {

            //Creacion de etiquetas
            let url_video = document.createElement('a')
            let element = document.createElement('p')
            let element_span = document.createElement('span')
            let element_span2 = document.createElement('span')


            //Clases para el css
            url_video.classList.add("url-video")
            element.classList.add("Title-anime")
            element_span.classList.add("Episode-anime")
            element_span2.classList.add('Similarity-anime')

            //Asiganacion de que dato le corresponde del array

            element.textContent = Titles_Anime_Coincidences[i]
            element_span.textContent = Titles_Anime_Coincidences[i + 1 ]
            element_span2.textContent = Titles_Anime_Coincidences[i + 2 ]
            url_video.href = Titles_Anime_Coincidences[i + 3]
            
            //Creacion del contenedor
            arrayContainer.appendChild(url_video)
            url_video.appendChild(element)
            element.appendChild(element_span)
            element_span.appendChild(element_span2)
          }
          
          
          for (const result of results) {
            if (result.similarity > maxSimilarity) {
              maxSimilarity = result.similarity
              mostSimilarResult = result
            }
          }
          if (mostSimilarResult) {
            maxSimilarity = maxSimilarity.toFixed(2)
            Pertentage.textContent = maxSimilarity + '%'
          }
          
         
          Coincidences.textContent = data.result.length
        })
        .catch((reason) => alert(reason))
    }
  })

})

