// const checkNS = (a, b) => {
//     let correctNS = [];
//     for (let i = 0; i < b.length; i++) {
//         for (let j = 0; j < a.length; j++){
//             if(b[i] === a[j]) {
//                 correctNS.push(b[i]);
//             }
//         }
//     }
//     if (correctNS.length > 0) {
//         console.log("Using our NS");
//         nameServer.setAttribute('id', 'correctNS')
//         nameServer.textContent = `Name Servers: ${b}`
//         // nameServer.textContent.fontcolor("green")
//     } else {
//         console.log("Not using our NS");
//         nameServer.setAttribute('id','incorrectNS')
//         nameServer.textContent = `Name Servrers: ${b} `
//         // nameServer.textContent.fontcolor("red")
//     }
// }

export const checkNS = (a, b) => {
    let correctNS = [];
    for (let i = 0; i < b.length; i++){
        for (let j = 0; j < a.length; j++){
            if(b[i] === a[j]) {
                correctNS.push(b[i]);
            }
        }
    }
    if (correctNS.length > 0) {
        nameServer.setAttribute('id', 'correctNS');
        nameServer.textContent = `Name Servers: ${b}`;
    } else {
        nameServer.setAttribute('id', 'incorrectNS');
        nameServer.textContent = `Name Servers: ${b}`;
    }
}