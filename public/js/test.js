// domainForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const domain = search.value
//     fetch('http://niemergk.com:3000/whois?domain=' + domain).then((response) => {

//         var nsArray = []

//         response.json().then((data) => {
//             if (data.error){
//                 console.log(data.error)
//             }else {
//              var testArray = 'ns.google.com ns2.google.com ns3.google.com ns4.google.com'
//              testArray = testArray.split(" ")
//              console.log(testArray)
//             }
//         })
//     })
// })
