Live url: <a href="https://endearing-kitsune-f81089.netlify.app/">Tapedeck App</a>

# Application Tapedeck app
The Tapedeck application provides a user-friendly interface for exploring and filtering a collection of audio cassettes. 
I used a Retro design, inspiring myself to an analog tapedeck for the filtering and a cassette rack for the results.

The main components of the app are:


## 1 Filter Section

The Filter Section empowers users to refine their search for audio cassettes based on brand name, color, playtime, and type. Filters can be combined for a more precise search experience. A visual enhancement includes a dynamic circle that mimics a radio light, providing a clear indication when a filter is selected.

Future improvement: 
- Dynamic adjustment of other filters to indicate available settings based on the selected filter.
- Enhanced color filtering with a broader color palette.
- Time filtering between specified "from" and "to" times.
- Support for selecting multiple options for the same filter.

<img width="594" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/0659409d-a727-4cd6-973b-1c181cbe7c35">



## 2 PAGINATION

The Pagination component enables users to navigate through different pages of the cassette collection. It provides options to move to the first and last pages for convenient exploration.

<img width="594" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/790f5b3a-de19-4613-afbb-026d91f4a39e">



## 3 TAPELIST

The Tapelist component shows the list of cassettes and it mirrors the style of a cassette rack.

<img width="594" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/ff2a2836-505a-4625-ab7e-aa29c0942d4a">


Clicking on a cassette triggers an engaging sliding animation, revealing the cassette's image.

<img width="594" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/787f4cbd-2b0b-4630-88c3-41b94c6b9d55">




## 4 OTHER FEATURES

In addition to the main components, the Tapedeck app includes:
- **Items per Page**: An input field allowing users to adjust the number of visible items per page. Changes dynamically update the list and pagination.
- **Total Cassettes Found**: Displays the total number of cassettes found, which adjusts dynamically when applying filters. Also, shows the number of cassettes visible on the current page.

  <img width="594" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/ea7c53cc-e9c7-4344-8747-97baa416e7de">
  
- **Loading Spinner**: A visual indicator in the form of a loading SVG appears while waiting for the API response.
- **Error Message**: In the event of an API call error, a clear error message is displayed instead of the cassette list.



### FONTS

Fonts have been chosen to represent the area when cassettes are from to similate the tapedeck and cassette rack

- Monoton: main title
- Michroma: labels and results


### TESTING

Testing file Tapedeck.test.tsx
it has been set up to use Jest.

### API

Calling the API only once per session, then saving the data in session and using those instead when reloading the page until the Session end.

