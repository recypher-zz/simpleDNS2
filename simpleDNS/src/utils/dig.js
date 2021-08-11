const dig = require('node-dig-dns')

const digDNS = (domain) => {
    dig([domain])
}

// dig([req.query.domain, 'A']).then((result) => {
//     res.send(result.answer[0].value)
// }).catch((err) => {
//     res.send('Error: ', err)
// })
module.exports = digDNS