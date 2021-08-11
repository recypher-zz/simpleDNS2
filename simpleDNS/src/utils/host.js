const dns = require('dns')

// const host = await dns.lookup(req.query.domain, (err, address, family) => {
//     console.log(address)
//     dns.reverse(address, (err, hostnames) => {
//         var hosts = JSON.stringify(hostnames)
//         console.log(hosts)
//     })
// })

const host = (domain) => {
    dns.lookup(req.query.domain, (err, address, family) => {
        console.log(address)
        dns.reverse(address, (err, hostnames) => {
            var hosts = JSON.stringify(hostnames)
            console.log(hosts)
        })
    })
}

module.exports = host