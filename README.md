## What's It Worth

This is an application developed using ReactJS and NodeJS, designed to help flippers/resellers to quickly find the value of their items.

The application takes keywords and queries the Ebay developer API to find **sold** listings with matching keywords. The data is then filtered, statistics are taken, and visualizations are displayed to give a more informed look at what the value of the item has been historically. 

### Usage

1. An ebay developer API key is necessary to run this application. This can be obtained from [the ebay developer page](https://developer.ebay.com/).

2. Create a `.env` file in the repos main directory, which will be empty except for `REACT_APP_API_KEY=` followed by your api key.

3. In the terminal, run `npm start` to start the nodejs server.

4. In another terminal window, run `npm run-script react` to begin the development server.

5. Navigate your browser to [http://localhost:3000/](http://localhost:3000/) where the react project will be running.

6. Find out what it's worth!