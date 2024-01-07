url: https://endearing-kitsune-f81089.netlify.app/

Application Tapedeck app

the Tapedeck componenet is divided in 3 main componenets:
- filterSection
- Pagination
- Tapelist


it also has other features like:
- items per page (that will make the paginatation and list recaltulate when changed)
- total results and result showing


#API CALL

I am storing the data in a Session so that I don't have to call teh API every time I refresh the page, I doubt that the cassette will change that often if ever.


#Loading Spinner

while waiting for the API response there is a loading svg


#Error Message

when any error happens in the API call it will be displayed instead of the table


#Filter Section

it allows the user to filter audio cassettes on brand name, color, play time and type and the app must allow for these filters to be combined. 


#Pagination

Allows the user to change page and see different records.
It also allow to go to first and last page.

