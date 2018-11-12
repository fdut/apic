// module urlopen
var url = require('urlopen');

// Load the header-metadata API
var hm = require('header-metadata');

// Declare Third Party Endpoint
var thirdpartyEndpoint = "https://www.googleapis.com/oauth2/v3/tokeninfo";

// use TLS profile that contains the certificate (Google public certificate : CA & CA Chain)
var customSSLProfile = apim.getTLSProfileObjName('tlsgoogle');

// Set the headers
hm.current.set('Content-Type', 'application/x-www-form-urlencoded');

// define the https options to invoke bbva API
var options = {
    method: 'get',
    headers: hm.current.headers
};

// set the SSL Client Profile in the urlopen options
if (customSSLProfile !== undefined && customSSLProfile.indexOf('client:') == 0) {
    options.sslClientProfile = customSSLProfile.substr(7);
} else {
    options.sslProxyProfile = customSSLProfile;
}


apim.readInputAsBuffer(function (error, buffer) {

    if (error) {
        apim.setvariable('message.status.code', 500);
    } else {
        var theinput = buffer.toString();

        //Sample of value for theinput : token=GlxPBgmFxNpUcaje0JxsKT3GK_Hsa2wrhXe5Q8EfiPn3RivyNw9u6zkAhpZ5N60cv8A12aaQWcUVXdl4iNouDMqzbfTMYd1Rsic-e1xvmLzHO53QS06F3yud6Sdn_A&token_type_hint=access_token&client_id=74af2806-e5bb-4f28-8faa-1019266a44af

        var reqauth = theinput.split('&');

        //Retrieve token
        var rtoken = (reqauth[0].split('='))[1] || '';
        //Retrieve token_type
        var rtoken_type_hint = (reqauth[1].split('='))[1] || '';
        //Retrieve clientid
        var rclientid = (reqauth[2].split('='))[1] || '';

        options.target = thirdpartyEndpoint + '?access_token=' + rtoken;

        url.open(options, function (err, resp) {

            if (err) throw err;

            // Read the response data and parse into a JSON object
            resp.readAsJSON(function (err, jsonResponse) {

                if (err) throw err;

                if (jsonResponse.expires_in !== undefined) {
                    // very important 
                    // reponse must containt { "active": true }, if not 401 is interpreted by introspect
                    var response = {
                        "active": true
                    };
                    done(response, 200);
                } else {
                    done({
                        "error": "Invalid Value"
                    }, 400);
                }

            });
        });
    }
});

function done(body, status) {
    console.error("In done ...");
    session.output.write(body);
    apim.output('application/json');
    apim.setvariable('message.status.code', status);
}