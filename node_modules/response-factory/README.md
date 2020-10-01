# Response factory

## List code
```
200: success
401: failure
402: unauthorized
```

### Build success response 
```
const responseFactory = require('response-factory');

const data = {} // return to client

const success = responseFactory.success({data});
res.json(success);
```

### Build failure response
Failure response code can defined by passing `code` attribute. Failure code is start by number 2 

`eg: responseFactory.buildFailure({code: 23});`

```
const responseFactory = require('response-factory');

const failure = responseFactory.fail({reason: 'Missing value of email'});
res.json(failure);
```

### Build unauthorized response 
```
const responseFactory = require('response-factory');

const unauthorized = responseFactory.authenticationFail();
res.json(unauthorized);
```