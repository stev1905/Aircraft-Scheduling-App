Planning & Execution:
•	After reviewing the application requirements several times, I tried to fully understand all functional requirements needed. I found some of the requirements to be difficult to grasp at first, so I decided to start with the easier requirements and then planned out how to break the larger obstacles down into smaller ones.
•	First, I planned out how many functional components and containers I would need to build out the design and layout.
•	Next, I defined the pieces of state needed for the app. I also weighed whether to use React Hooks or lifecycle methods.
•	Due to the number of functional components used and state management architecture, I opted to use the traditional lifecycle methods.
•	To quickly style the user interface, I leveraged the Material UI library (Card design) and CSS Flexbox (element positioning).
•	Also, I pulled in a library called “React-paginate” to assist with the pagination functionality.
 
Assumptions:
•	Since the scheduler is not integrated with a backend database, I did not create the functionality to change the date. The date is static. With more time, I would consider integrating some caching / local storage features and adding the date as a part of my initial state requirements.
•	The API URL returns a max amount of 25 records. Since this is the case, after each time the user selects a flight, the selected flight destination is compared to a static list of the results. Then, the state is updated to display on the records which make sense (comparing the last destination to the next origin). This way the aircraft can’t teleport, and the user cannot select a flight time before the first flight select.
•	I assumed that most of the application’s use case was for the desktop screen. Therefore, I did not allocate time to add media queries for mobile-friendly viewing.
•	Since this is only one aircraft in the API data, the user is not requirement to select the aircraft and flight, it’s defaulted to that aircraft.

Areas of Focus:
•	Create a simple way for the user to add and edit the flight scheduler.
•	Create a simple and clean design.
•	Limit user error -The app is built to limit user error. Based on the user's flight selection, only flights that are physically possible to connect to are displayed.
Challenges / Areas of Improvement
•	Handling the “grounded flights at midnight” requirements was a difficult task. I think there was a better way to execute this functionality. I’m curious to any feedback for improvements.
•	Create a loading spinner component while API request is being executed. I didn't want to spend too much time on this so I created a loading component with the static message "loading..."
•	Add media queries to components for mobile-friendly viewing.
•	Flight Timeline Component - I brainstormed on how to create the timeline component. I considered using a bootstrap multi-progress bar and the state from the RotationData array. Ultimately, I spent too much time on this feature, and I decided to focus on other areas of the core functionality.
•	Testing – I did not get the opportunity to test a lot of edge cases. In a normal project setting, I would spend much more time on this action.

Conclusion
•	Overall, I enjoyed building this application. I think I covered most of the asking requirements and with more time I’m confident that I could have figured out areas that were missed. I’m curious to any feedback on how to improve or how I could’ve handled specific problems better. 
 
Thank you for the opportunity,
Christian Stevens



****************************************************************************************************************************************************

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
