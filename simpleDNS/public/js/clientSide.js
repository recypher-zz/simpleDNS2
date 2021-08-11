const domainForm = document.querySelector('form')
const search = document.querySelector('input')
const ipAddress = document.querySelector('#ipAddress')
const domainStatus = document.querySelector('#domainStatus')
const registrar = document.querySelector('#registrar')
const nameServer = document.querySelector('#nameServer')
const creationDate = document.querySelector('#creationDate')
const expirationDate = document.querySelector('#expirationDate')
const withUs = document.querySelector('#withUs')
const txt = document.querySelector('#txtRecords')
const mx = document.querySelector('#mxRecords')
const cname = document.querySelector('#cnameRecords')

const hostingDomain = 'https://simpledns.niemergk.com/simpleDNS'

const imhNameServers = ['ns.inmotionhosting.com', 'ns1.inmotionhosting.com', 'ns2.inmotionhosting.com', 'ns.servconfig.com', 'ns1.servconfig.com', 'ns2.servconfig.com']

domainForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const domain = search.value
    
    fetch( hostingDomain + '/dig?domain=' + domain).then((response) => {
        response.json().then((data) => {
            if (data.error){
		        ipAddress.textContent = data.error
            }else{
                registrar.textContent = 'Registrar: ' + data[3].registrar
                nameServer.textContent = 'Name Servers: ' + data[3].nameServer
                domainStatus.textContent = `Domain Status: ${domainStat[0]}`
                creationDate.textContent = 'Creation Date: ' + data[3].creationDate
                expirationDate.textContent = 'Expiration Date: ' + data[3].registrarRegistrationExpirationDate
                
                //DNS Info
                let ipArray = []
		        data[2].answer.forEach(element => ipArray.push(element.value))
		        ipAddress.textContent = `IP Address(s): ${ipArray}`
                let txtArray = []
                data[0].answer.forEach(element => txtArray.push(element.value))
		        txt.textContent = `TXT Records: ${txtArray}`
		        let mxArray = []
		        data[1].answer.forEach(element => mxArray.push(element.value))
		        mx.textContent = `MX Records: ${mxArray}`
            }
        })
    })
})
