# Bidder-App
Bidder is a full-stack web application that allows users to bid on local art pieces in Houston, TX. Built using the Node.js and
the MVC artchectirual scheme, this application is built to ensure ease of use and scalability. 

## Getting Started
<p>A live and fully functioning deployment of the application can be found <a href="https://bidder-houston.herokuapp.com/login">
here</a>

<p><a href="https://imgflip.com/gif/28yo57" ><img src="https://i.imgflip.com/28yo57.gif" title="made at imgflip.com"/></a></p>
<p align="center"> <a href="https://www.dropbox.com/s/j6c6bbujv5ow60x/bidderAppWalkthrough.mov?dl=0" ><h4> Click here to view full video walkthrough </h4></a></p>


## Key Technologies
 * HTML
 * CSS
 * Bootstrap
 * JavaScript
 * jQuery
 * Handlebars
 * Node.js
 * Express.js
 * PostgreSQL
 * Pg-Promise
 * Stripe API
 * Socket.io


# Roles and Responsibilities:

 ## Database Architecture and Design - Erin Thigpen
 In building this app the team's first order was to create a scalable structure for the database. 
 Erin Thigpen took ownership of this process and led the implemntation of the data model from initial planning and visualization all the way to testing and live deployment.  
 
 <img src="https://i.imgur.com/nLkmUcY.png" width="60%" align="left">
 <img src="https://i.imgur.com/tZFeLC9.png" width="60%" align="center">
 
 
 ## Stripe API Integration and Bid Processing - Kristen Baldwin
 After creating a working database structure our team split to take on specific areas of responsibility. 
 Kristen Baldwin took the lead on creating the interface between our application and the Stripe API in order to allow our users to easily, and most importantly, safely submit bids and make payments for their selected art piece.  
 
 <img src="https://i.imgur.com/bar5JZO.png" width="60%" align="center">
 <img src="https://i.imgur.com/hwpyb78.png" width="60%" align="center">

## User Creation, Authentication, and Verification - Christian Lowe
In order to maintain legitimate auctions and keep track of buyer actions Christian Lowe took charge of user creation and authentication. By implmenting a flow of registration, email verification, and session creation, the application's user functionality makes the process of acessing bid information and payment options simple, secure, and enjoyable.

<img src="https://i.imgur.com/CTtX3lh.png" width="60%" align="center">
<img src="https://i.imgur.com/6WwKH1a.png" width="60%" align="center">
 
## User Interface and Interactivity via Socket.io - Andy Tang
Not satisfied with mediocrity, Andy Tang envisioned a web application that invoked in the user the excited feeling of being at a real life auction house. As such, Andy took responsibility for developing with Socket.io to provide real time updates to the application's auction interface much like real life auctionneer.

