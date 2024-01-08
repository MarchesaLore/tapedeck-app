url: https://endearing-kitsune-f81089.netlify.app/

Application Tapedeck app

the Tapedeck componenet is divided in 3 main componenets:
- filterSection
- Pagination
- Tapelist


it also has other features like:
- items per page: input that will change the number of items visible for each page, when changed it will update the list and pagination
- total cassette found (changing with filtering) and the cassette visible in the page

  <img width="455" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/ea7c53cc-e9c7-4344-8747-97baa416e7de">



#API CALL

I am storing the data in a Session so that I don't have to call teh API every time I refresh the page, I doubt that the cassette will change that often if ever.


#Loading Spinner

while waiting for the API response there is a loading svg


#Error Message

when any error happens in the API call it will be displayed instead of the table


#Filter Section

it allows the user to filter audio cassettes on brand name, color, play time and type and the app must allow for these filters to be combined. 
I added a circle to imitate the radio light on when the filter is selected to improve the user experience.

Future improvement: when selecting a filter I could be adjusting the other filters to indicate which settings are available in the filtered cassette.

<img width="437" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/0659409d-a727-4cd6-973b-1c181cbe7c35">



#Pagination

Allows the user to change page and see different records.
It also allow to go to first and last page.

<img width="198" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/790f5b3a-de19-4613-afbb-026d91f4a39e">


#TAPELIST

I imitated the style of the cassette rack 
when clicking on the cassette the image of the cassette will be sliding up

<img width="467" alt="image" src="https://github.com/MarchesaLore/tapedeck-app/assets/22336407/b2db0b14-03af-4078-8802-10619f670095">
