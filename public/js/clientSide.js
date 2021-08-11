"use strict";

//Get UI Elements
const domainForm = document.querySelector('form');
const search = document.querySelector('input');
const ipAddress = document.querySelector('#ipAddress');
const domainStatus = document.querySelector('#domainStatus');
const registrar = document.querySelector('#registrar');
const nameServer = document.querySelector('#nameServer');
const creationDate = document.querySelector('#creationDate');
const expirationDate = document.querySelector('#expirationDate');
const withUs = document.querySelector('#withUs');
const txt = document.querySelector('#txtRecords');
const mx = document.querySelector('#mxRecords');
const cname = document.querySelector('#cnameRecords');

//Setup domain for fetch
const hostingDomain = 'https://simpledns.niemergk.com/simpleDNS';

//IMH Nameserver array for comparison
const imhNS = ['ns.inmotionhosting.com', 'ns1.inmotionhosting.com', 'ns2.inmotionhosting.com', 'ns.servconfig.com', 'ns1.servconfig.com', 'ns2.servconfig.com', 'ns1.webhostinghub.com', 'ns2.webhostinghub.com', 'ns.webhostinghub.com'];

// Check if any of the nameservers returned from the API match in the imhNS array, if so, push them to this array as they are valid and can be confirmed. 

const checkNS = (a, b) => {
    let correctNS = [];
    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < a.length; j++){
            if(b[i] === a[j]) {
                correctNS.push(b[i]);
            }
        }
    }
    if (correctNS.length > 0) {
        nameServer.setAttribute('id', 'correct');
        nameServer.textContent = `👍 Name Servers: ${b} ← Using our Name Servers`;
    } else {
        nameServer.setAttribute('id','incorrect');
        nameServer.textContent = `🔥 Name Servrers: ${b} ← Not using our Name Servers`;
    }
};

//Check if domain is expired from WHOIS array

const checkExpiry = (domainDate) => {
    var today = new Date();

    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    domainDate = domainDate.slice(0, 10);

    if(domainDate > date) {
        expirationDate.setAttribute('id', 'correct');
        expirationDate.textContent = '👍 Expiration Date: ' + domainDate + ' ← Not expired!';
    } else{
        expirationDate.setAttribute('id', 'incorrect');
        expirationDate.textContent = '🔥 Expiration Date: ' + domainDate + ' ← Is expired!'
    }
}



domainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const domain = search.value;
    
    fetch( hostingDomain + '/dig?domain=' + domain).then((response) => {
        response.json().then((data) => {
            if (data.error){
		ipAddress.textContent = data.error
                //console.log(data.error)
            }else{
                //console.log(data.answer[0].value)
                //Registrar info
                registrar.textContent = `Registrar: ${data[3].registrar}`;
                nameServer.textContent = `Name Servers: data[3].nameServer`;

                let nsArray = [];
                nsArray = data[3].nameServer.toString();
                nsArray = nsArray.split(" ");
                checkNS(imhNS, nsArray);

                domainStatus.textContent = `Domain Status: ${data[3].domainStatus}`;
                creationDate.textContent = `Creation Date: ${data[3].creationDate}`;
                checkExpiry(data[3].registrarRegistrationExpirationDate);
                
                //DNS Info
                let ipArray = [];
		        data[2].answer.forEach(element => ipArray.push(element.value));
		        ipAddress.textContent = `IP Address(s): ${ipArray}`;

                let txtArray = [];
                data[0].answer.forEach(element => txtArray.push(element.value));
		        txt.textContent = `TXT Records: ${txtArray}`;

		        let mxArray = [];
		        data[1].answer.forEach(element => mxArray.push(element.value));
		        mx.textContent = `MX Records: ${mxArray}`;
            };
        });
    });
});
