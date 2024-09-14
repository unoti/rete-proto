# Interactive Diagrams Prototype
Prototype/POC for using interactive diagrams to control workflows


## Running in dev mode
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Using the web app
If you go to localhost:3000, you get the default template, code at `default.ts`.

If you go to `localhost:3000/?template=customization` you will be running the code at `customization.ts`.


### Code tour
* NodeEditor - core of the editor. See example initialization in default.ts.


## Testing
`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Building
`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

