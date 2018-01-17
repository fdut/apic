console.info("Starting urlopen Demo");

// Include the urlopen module
var url = require('urlopen');

// Load the header-metadata API
var hm = require('header-metadata');

// create a 'sslcert' TLS profile that contains self-signed certificate
var customSSLProfile = apim.getTLSProfileObjName('tlscommon');

// set options to call the bbva API to get iban codes
var bearer = { "Authorization" : hm.current.get("Authorization") };

var options = {
    target: 'https://api.eu-de.apiconnect.ibmcloud.com/fdutorg-dev/sb/oauth2/token',

    //headers: bearer, // proxy the Authorization (bearer) header
    method: 'get',
    //contentType: 'application/json',
    timeout: 600
};

// set the SLL Client Profile in the urlopen options
if (customSSLProfile !== undefined && customSSLProfile.indexOf('client:') == 0) {
    options.sslClientProfile = customSSLProfile.substr(7);
} else {
    options.sslProxyProfile = customSSLProfile;
}

url.open(options, function(err, resp) {
    if (err) throw err;

    // Only the HTTP headers have been read off the network at this point
    console.info(resp.headers);

    // Read the response data and parse into a JSON object
    resp.readAsJSON(function(err, json) {
        if (err) throw err;

        // Update the transactional payload to that just fetched
        session.output.write(json.body);
        apim.setvariable('message.body', json);
        console.info("Urlopen Demo Complete");
    });
});

console.info("Urlopen Demo Continuing...");