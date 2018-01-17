// Sample of lookup with https request


// module urlopen
var urlopen = require('urlopen');

// Load the header-metadata API
var hm = require('header-metadata');

var env_target = apim.getvariable('env_target');

var apikey = apim.getvariable(env_target + 'apikey');

hm.current.set('x-ibm-client-id', apikey );
hm.current.set('Content-Type', 'application/json');

// get data from the accounts variables ('accounts.body')
var jsonData = apim.getvariable('listDoc.body');

// get the lookupKeys array
var lookupKeys = jsonData.body.lookupKeys;

var targetUrl = apim.getvariable('api.endpoint.hostname') + '/' + apim.getvariable('api.org.name') + '/' + apim.getvariable('env.path') ;

// define the https options to invoke mockup API
var options = {
    method: 'post',
    headers: hm.current.headers,
    target: 'https://' + targetUrl + '/v2/mock/listeDetail'
};

// define tls used for SSL request
var customSSLProfile = apim.getTLSProfileObjName('tlscommon');

// set the SLL Client Profile in the urlopen options
if (customSSLProfile !== undefined && customSSLProfile.indexOf('client:') == 0) {
    options.sslClientProfile = customSSLProfile.substr(7);
} else {
    options.sslProxyProfile = customSSLProfile;
}

// define message.body to post for each request
var messagebody = "";

// define Max Doc in request
var maxDoc = 50;

var DetailsArray = [];

// Used for loop
var i,j,temparray;

// Number of request to do
var count = lookupKeys.length/maxDoc;

for (i=0, j=lookupKeys.length; i<j; i+=maxDoc) {
   
    temparray = lookupKeys.slice(i,i+maxDoc);
    messagebody = "{\"lookupKeys\":" + JSON.stringify(temparray) + "," + selectAttribute + "}";

    // open connection to target
    options.data = messagebody;
    
    // call urlOpen
    getResourceData(options);
}

// Call url for ListeDetail for each maxDoc package
function getResourceData(current){

   urlopen.open (current, function (error, response) {
       
        if (error) {
            // an error occurred during reading the file
            session.output.write ("urlopen error: " + JSON.stringify(error));
        } else {

            response.readAsJSON(function(err, jsonResponse) {
                if (err) throw err;

                DetailsArray.push(jsonResponse);

                if (--count < 1) done();
            });
        }
    }); // end of urlopen.open()
}


// Write the combined result to the local output process
// policy context

function done () {
    //console.error("Finish ...");
    session.output.write(DetailsArray);
    apim.output('application/json');
    apim.setvariable('message.status.code', 200);
}

