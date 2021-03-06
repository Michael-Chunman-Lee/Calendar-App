# README

Note: Heroku date time is different since Heroku servers are US and Europe based.  
The deployed app is available at https://calendar-app-csc309.herokuapp.com/
Two accounts have been pre-created on the deployed website for testing purposes:

The user can login using the following credentials:
username: user
password: user

If the user wants to login as the admin, they will need to enter the following credentials:
username: admin
password: admin


### Running Locally: 
To use the app will require the user install the correct dependencies by running 'npm run setup' from the main directory. This command will also create a mongo-data directory where the local database will be stored.

To run the app the user will need to first start the local database server by running 'mongod --dbpath mongo-data' from the main directory (make sure you've run the setup first!)
Then, in a separate terminal, execute 'npm build-run' from the main directory. The app will be running on localhost:5000
Notice that when running locally, unlike when using the deployed site, there will be initially no accounts in the database until created manually by signing up in the app.
For security reasons, the app has no built-in way of creating the admin account. 
To create an admin account on a local instance of the app, you will have to manually edit the database.
You can do this by:
- Going to https://www.mongodb.com/download-center/compass (Links to an external site.) and installing MongoDB Compass
- Making sure your local database instance is running (instructions above) 
- Inserting the following string for a new connection: mongodb://localhost:27017
- Clicking 'Connect' to connect to your database server.
- Clicking the edit button for the desired user document in the users collection and setting the isAdmin field to true, and clicking "update" to save the change.



The app will start up at the login page. Here, a user may log in to an existing account by entering the username and password and clicking "done".
The user can also reset their account's password by clicking "reset password" and filling in the form.
The user may create a new account by clicking "Not yet a user? Sign Up here" from the login page and then filling out the form.
Alternatively, the user can also press enter to submit the form.


### USING APP AS A REGULAR USER: 
For the user view of the site the user can access the following features:
- Upon login, the user will land on the home page. Here, they will see a list of all the posts on the site.
This list is sorted by "Top" by default (sorted by number of views).
The "Top" and "New" buttons may be used to toggle the list of posts to be sorted by view count and sorted by upload date, respectively.
On the right side of the home page, there are several "tags" toggle buttons.
Toggling on tags will hide all posts on the home page that don't have one of the selected tags as their tag.
Tags can be toggled off by clicking the toggle button again.
The search bar at the top may also be used to filter the list of posts.
Typing in the search bar will hide all posts that don't contain the search bar text in either the title of the post or the username of the post's creator.
The search bar filters the list of posts as the user enters and removes text from the search bar, in real time. 
The user may return to the home page at any point by clicking the home button at the top right of the screen on the nav bar.
The user may also log out by clicking the logout button at the top right of the navbar. Logging out will redirect the user back to the login page. 

A user may interact with a post in the list of posts in the following ways:
-View the post's schedule by navigating through the calendar using calendar scroll bar and the "today", "back", "next", "month", "week", "day", and "agenda" buttons.
-Clicking on the white area of the post (but not inside the calendar) to view that post's specific post page.
-Clicking on the username at the top left of the post to visit the post creator's user profile page.
-User's can delete their own posts from the home page using the "X" button on their own posts in the list.

A specific post page for a post shows the post at the top of the page, and a list of the ratings for the post underneath.
A user can also leave their own rating for the post by hovering over and then clicking the amount of stars they wish to give for each of the criteria, and then typing their note in the textbox and clicking "RATE IT!"
A user can delete their own ratings off of specific posts's by using the "X" button on the rating.

A user can visit another user's profile page by clicking their username on any post or rating they've made.
A user profile page behaves the same as a the home page accept the user's profile image is visible on the right side of the page and only posts that have been made by the user will be visible in the list.
Clicking posts from a user profile page will still take the user to that post's specific post page, where the ratings can be seen.
A user can visit their own profile page by clicking their own username on a post or rating, or by using the profile button at the top right of the screen on the nav bar.
When a user is on their own profile page, they can change their own profile picture by first uploading a new picture by clicking or dragging it into the indicated region on the right side of the screen, and then clicking the "CHANGE PROFILE PIC" button.
A user can also create a new post from their own profile page by clicking on the "CREATE NEW SCHEDULE" button. Doing this will lead to the post creation page.

At the post creation page, a user must select a tag for their post using the dropdown menu at the top left.
They may also give their post a title by entering it in the title bar.
Then they must upload their .ics calendar file by clicking or dragging and dropping it into the indicated region.
The user may then submit their post to the website by clicking the "POST" button, or 
cancel their post creation by clicking the "CANCEL" button.

The main objective of the app is to allow users to gather opinions about their schedules by sharing them on the site and having other users view them on the home page and leaving ratings and feedback.
Users can then go to their profile to view their own posts, and see the ratings and feedback provided by other users.


### USING THE APP AS THE ADMIN: 
The admin uses the app exact same way as regular users, although they have additional permissions and features available to them.
The purpose of the admin account is to allow for management and moderation of the website, for example by removing inappropriate posts or deleting
users.

The admin has the ability to delete any other user's ratings or posts instead of only their own.
The admin also has access to the admin dashboard by clicking the shield button at the top right of the navbar.
On the admin dashboard, the admin will see a list of all the users on the website.
The admin may filter the list of users by username using the search bar on the navbar.
The admin may go to a user's profile by clicking on the user in the list.
The admin may delete any user (except the admin account itself) by clicking the "X" button on the user in the list of users.
Deleting a user will remove their account and all posts and ratings they've made on the app.



### OVERVIEW OF EXPRESS ROUTES: 
POST "/users/login": 
Find the appropriate user in the database to update that user's session cookies to the retrieved user's
fields. The request would return an object containing the current user's username, the isAdmin flag and the userID of the
now logged in user. If there is an error processing the request, the request will return status 404 with 
the error.  
Request body expects:  
{  
        "username": `<username>`,  
        "password": `<password>`  
}  

GET "/users/logout":
Clears the current user's session cookies. Simply return status 200 on success, otherwise the request
will return status 404 with the error.

GET "/users/check-session":
Check the session cookies to see if the user is logged in or not. Returns an object
with the current user's username, the isAdmin flag and the user's userID. On failure,
the request returns a status 401.

POST "/users":
Creates the user using information from the request body, saving that user into the database and
returning the new user document on success. On failure, the statusMessage is set and returns
a status 404 with the error.  
Request body expects:  
{  
        "email": `<email>`,  
        "username": `<username>`,  
        "password": `<password>`,  
}  

PATCH "/users/:username":
Given the username parameter and appropriate request body, the server will
change the specified user's password, returning the modified user document on 
success. On failure, returns the status 404 with the error.  
Request body expects:  
{  
        "oldPassword": `<user's old password>`,  
        "newPassword": `<user's new password>`  
}  

DELETE "/users/:id":
Given the user's document id, delete the specified user along with all his posts and ratings.
On success, return the deleted user's document and on failure return a status 400 with the error.

GET "/users:
Retrieves all the users, sending these users on success or a status 500 with the error on failure.

GET "/posts":
Retrieves all the posts, sending these posts on success or a status 500 with the error on failure.

GET "/posts/id/:id":
Given a post's document id as the parameter, find that specified post and return it upon success
or otherwise return status 404 if the id is not valid or the post is not found and status 500 with
the error if the request fails for any other reason.

POST "/posts":
Given the appropriate request body, create the new post, sending the new post's document
on success or otherwise set the statusMessage and return the status 400 with the error on failure.  
Request body expects (with an example of a request body below):  
{  
        "username": `<poster's username>`,  
        "tag": `<A valid tag (i.e. "Fitness", "School", "Gaming", "Work")>`,  
        "icsRawText": `<ics file dump in a proper javascript string format (i.e. all \ changed to \\ and all new lines changed to \n)>  `  
}  

PATCH "/posts/increment/:id":
Given the post's document id as the parameter, increment the post's current view count fields
and save the updated post. Returns the updated document on success, status 404 when the id is not
valid or the post is not found, or status 400 with the error on other general errors.

DELETE "/posts/delete-rating/:id":
Given the appropriate request body and the post's document id as the parameter, delete the
specified rating. Return the modified post document on success, return status
404 when the id is not valid or the result is not found or status 400 on other general errors.  
Request body expects:  
{  
       "username": `<poster's username>`,  
       "additionalComment": `<comment text>`,  
        "criteriaLabels": `["Workload", "Interest", "Timing"]`,  
       "criteriaRatings": `[<Workload rating from 1 to 5>, <Interest rating from 1 to 5>, <Timing rating from 1 to 5>]`  
}  

POST "/posts/add-rating/:id":
Given the appropriate request body and the post's document id as the parameter, create the new
rating. Return the modified post document on success, return status
404 when the id is not valid or the result is not found or status 400 on other general errors.
Request body expects:  
{  
        "username": `<poster's username>`,  
       "additionalComment": `<comment text>`,  
       "criteriaLabels": `["Workload", "Interest", "Timing"]`,  
       "criteriaRatings": `[<Workload rating from 1 to 5>, <Interest rating from 1 to 5>, <Timing rating from 1 to 5>]  `  
}   

GET "/posts/username/:username":
Given the username, get all posts associated with that username. On success, returns all the user's posts,
or otherwise returns status 500 with the error on failure.

DELETE "/posts/:id":
Given the post's document ID and appropriate body, delete the post. Note the user must itself
must be an admin or the poster to delete the post (checks by the user's document id or isAdmin field).  
Simply returns status 200 on success, returns status 404 if the user is not the admin or the poster
or returns status 500 on general errors.  
Request body expects:  
{  
        `"_id": <User's document id> `   
}  

POST "/images":
Given the appropriate body, uploads the image to cloudinary as well as saves thhe result's 
fields from cloudinary to the database with an associated username. Returns the new document
on success or otherwise returns status 400 with the error on failure.  
Request body expects:    
{  
       "username": `<user's username">`,  
       "curFile": `<the image's data url>`  
}  

GET "/images/:username":
Given the username as the parameter, returns the user's associated image document on success
or on failure, returns a status 404.

PATCH "/images/:imageID":
Given the appropriate body and the image's cloudinary public id (i.e. the image_id field in the document), 
delete the old image and upload the new image to cloudinary, setting the new fields with the result's
from the upload. Returns the modified document on success, or otherwise returns a status 400 with the
error on failure.  
Request body expects:  
{  
      "username": `<user's username">`,  
      "curFile": `<the image's data url>`  
}  

DELETE "/images/:imageID":
Given the image's cloudinary public id (i.e. the image_id field in the document), delete
the associated image document and return the deleted image's document.

Example of a valid request body for a post:  
{  
    "username": "s123",
    "tag": "Fitness",
    "title": "Workout schedule",
    "icsRawText":"BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Zap Calendar 1.0//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nBEGIN:VEVENT\nSUMMARY:Abraham Lincoln \nUID:c7614cff-3549-4a00-9152-d25cc1fe077d\nSEQUENCE:0\nSTATUS:CONFIRMED\nTRANSP:TRANSPARENT\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=2;BYMONTHDAY=12\nDTSTART:20080212\nDTEND:20080213\nDTSTAMP:20150421T141403\nCATEGORIES:U.S. Presidents,Civil War People\nLOCATION:Hodgenville\\, Kentucky\nGEO:37.5739497;-85.7399606\nDESCRIPTION:Born February 12\\, 1809\nSixteenth President (1861-1865)\n\n\n\nhttp://AmericanHistoryCalendar.com\nURL:http://americanhistorycalendar.com/peoplecalendar/1,328-abraham-lincoln\nEND:VEVENT\nEND:VCALENDAR"  
}  