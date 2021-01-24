# week-07-weather-dashboard-homework <br>

## Aim of the Homework <br>
Using the open weather API's, to create a page that would search for the current weather and 5 day forecast for city, display it on a page, along with all recent searches, and for those searches to remain on page refresh. <br>

## How I went about this <br>
I broke this homework down into various elements:
*creating the basic html and css for the aspects of the page that are static;
*creating the API calls;
*creating the dynamic elements of the page;
*ensuring all required data was in local storage. <br>

## Styling <br>
I find it alot easier to work out how things are going to work when I have a skeleton of a page to work with. So this was my first port of call.  Using some aspects of bootstrap along with some standard html and css.  Although I knew that the generation of the search history was going to have to be generated dynamically, so I left this until later, so that I could check the functionality of it.  <br>

## API calls <br>
Looking at Open Weather API's it soon became apparent that there was no one API that would do everything I required.  There was a the onecall API that would return all the data required, but it would only take latitude and longitude coordinates to retrieve the data. Therefore an API call was required prior to the one call, so that when the user entered the city they were searching for, the required coordinates could be found, and inputted into the OneCall API.  <br>

Initially it was one massive piece of code, which was rather unweildy, and meant that to retrieve data from previous searches one had to go through the whole process again, ie make two API calls.  And whilst this is how the code actually ended up being written, there is the scope for making it more efficient if the latitude and longitude coordinates could be stored in local storage too, so that when the call is sent again, it goes directly to the second API call and retrieves the necessary data. To do this I split the two API calls into two seperate functions.  By using variables to store the data required for creating the url for the API call I was able to construct the url using template literals. <br>

## Dynamic Creation of Elements <br>
Once the data was retrieved I needed to be able to display it on the page.  This was straightforward with the static elements, but there were also elements that needed to be dynamic in nature, such as the displaying of the search history, as well as the changing of the background of the UV Index to show whether it was mild, moderate or severe.  I also needed to be able to interact with how the search history was displayed so that it could be updated.  Dynamically creating buttons allowed this to happen, along with some dynamic css for the UV index.  <br>

## Local Storage <br>
The final element of the homework was creating the local storage, and this changed as to how I would approach it as I went through it.  Initially, storing each town/city as the key, and the lat/lon as the value, which worked well for the search history, but did not work for how to display the last searched for data.  So a change of approach was needed, I then decided to create an array, which would have each search added to the beginning of the array.  Stringifying the array to store it in local storage, and then using the index of 0 to take the name of the last searched town/city to create an API call and display the data.  <br>

## Learning points
There were a couple of points that seemed to be particular areas of learning in this homework.  The first being that, I have seen the benefit of having many functions for small bits of code, which means that when the approach that you are using changes, it is easier to refactor the code.  Secondly, seeing ways to make the code more efficient and data driven by working out how to store more data in local storage such as using array objects.  <br>

 
## The Finished Work <br>
The live site is found at [GitHubPages]: (https://clairemdavies.github.io/week-07-weather-dashboard-homework/)

Screenshots of the page are shown below:<br>
![weather-dashboard.png](assets/weather-dashboard.png)<br>
![weather-dashboard-02.png](assets/weather-dashboard-02.png)<br>
