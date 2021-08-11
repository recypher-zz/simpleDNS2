const express = require('express')
const dig = require('node-dig-dns')
const hbs = require('hbs')
const path = require('path')
const whois = require('whois-json')
var dns = require('dns')
const host = require('./utils/host')

const app = express()

//Setting up public and views paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/simpleDNS', (req, res) => {
    res.render('index')
})



app.get('/simpleDNS/dig', async (req, res) => {

    // creating an empty array to store dig and whois values to a single JSON object
    var digArray = []

    // Query for dig data and whois data within this block, return it as digArray when data is found, helps to make everything a single fetch request in clientSide.js
    if (!req.query.domain) {
        res.send({
            error: 'You need to provide a domain please'
        })
    }else {
        await dig([req.query.domain, 'TXT']).then((digResult) => {
            digArray.push(digResult)
        }).catch((err) => {
            res.send('Error: ', err)
        })
        await dig([req.query.domain, 'MX']).then((digResult) => {
            digArray.push(digResult)
        }).catch((err) => {
            res.send('Error: ', err)
        })
        await dig([req.query.domain, 'A']).then((digResult) => {
            digArray.push(digResult)
        }).catch((err) => {
            res.send('Error: ', err)
        })
        
        const result = await whois(req.query.domain);
        digArray.push(result);

        res.send(digArray)
    }
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
