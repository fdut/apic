var out = {"message":"Greeting! Hello World"};
out.context=apim.getContext();
session.output.write(JSON.stringify(out));
apim.output("application/json");