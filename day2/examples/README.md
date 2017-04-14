# Express + Postman Self Directed Examples

- **All videos have the password `horizonites`**
- Before you jump in
- Keep [lesson slides](http://lessons.horizonsbootcamp.com/lessons/week03/day2.html)
  open in your browser. Lesson slides contain code samples and links to
  essential documentation.
- You can write all your solutions in the same project. You don't need to
  create a new React Native project for each secion.
- Ask for help early and often! 🙋

### Disclaimer

In terminal navigate to the `/week03/day2/examples/` folder and run the command `npm install`.

### [Watch me: Express Introduction](https://vimeo.com/212322872)
### [Watch me: HTTP Introduction + Postman](https://vimeo.com/212950789)

Open `/week03/day2/examples/routes.js` in your favourite text editor and follow these steps:

1. require the `express` library
1. initiaize your express app instance (`var app = express()`)
1. create the following routes:
    - __`GET /`__: Send the string `"The Horizons Poet API v1.0"`.
	- __`GET /api/*`__: Send the string `"We couldn’t find any routes matching this endpoint"`.
	    - `*` denotes any string (i.e. `/api/anything`, `/api/unicorn`, /api/p/r/a/t/h`, etc.)
		- you will need to use `app.use()` for this
	- __`GET /api/poem`__: Send the text from the file `/week03/day2/examples/poem.txt`
	    - use the following code to read `poem.txt`
		    ```js
			var fs = require('fs');
			var poem = fs.readFileSync('./poem.txt', 'utf8');
			```
	- __`POST /api/success`__: Send the json `{success: true}` using [`res.json()`](http://expressjs.com/en/api.html#res.json)
1. listen on port __3000__

__TESTING:__ Use Postman to test your solution!

### [Watch me: HTTP Queries and Parameters](https://vimeo.com/212995568)
### [Watch me: Status Codes](https://vimeo.com/213017476)
