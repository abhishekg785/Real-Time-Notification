Tech Stack Used :

  Node .js and Express at the server side
  Socket.io for creating Socket connections for real time stuff
  MongoDB and Mongoose for the database
  HTML and CSS for the front end part


Things to have installed for the project:

  1) Node.js installed v > 4.x
  2) MongoDB installed and running
  3) npm installed (node package manager)


Steps to run the project:

  Unzip the project or clone the project from my Github Repo : https://github.com/abhishekg785/Real-Time-Notification.git

  In case of Zip File:
  1) Unzip the file.
  2) cd into the project.
  3) Do "node bin/www" to run the project.
  4) The project will be running on port 3000, no go into the browser and type the url => localhost:3000


  In case of the Github Clone:
  1) cd into the project and do " sudo npm install " to install all the dependencies.
  2) Run MongoDB.
  3) Now use command " node bin/www " to run the app.
  4) The project will be running on port 3000, no go into the browser and type the url => localhost:3000.


-----------------------------------------------NOTE----------------------------------------------------------
If the project takes a lot time in creating random notification, just decrease the time factor variable, "timeFactor"
in the file socket_module.js

I have created the notification system keeping a single user in mind. i.e i have not maintained the
user session for different user in the backend to differentiate the user's read/unread notification.

I can do the same if you want me to do so.
I will use redis-server and express-session for the purpose and i have done the similar kind of thing
in my project "Schmooze", an open source project created by me.
Link : 139.59.7.137:3000.

I have made the code modular by creating modules for different sections such as DB connection, models, app.js etc.
