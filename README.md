# _Humble Hectare Manager_

#### By _Seth Gonzales_

#### _Full stack application. C# / ASP.NET Core MVC backend using Entity Framework Core and MySQL. React with JavaScript frontend._

## Description

This is a full stack application built for the Humble Hectare in Corvallis, OR. The purpose of this application is to help in storing and visualizing data for yearly land management and crop processing. There was a need for data to be centrally located, efficient to record, and easy to visualize. This application aims to satisfy these needs and contribute to the success of the Humble Hectare.


## Developer Log

As a developer, my aim is to log my journey in building this application. This acts not only as a reference for myself, but as a demonstration of the creative process involved with such an endeavor.

### 1/18/24

- First day working on the HH Manager! I started by reiterating through the needs brought up through conversations with the owners of the HH. I built wire frames of potential designs of the application and mapped out database relationships. 
    - Idea: Upload an image of the property, create Regions and tag them on the image like you would a map. When you click on a Region, see the crops/varietals, as well as any related or tagged logging events.
![DB Schema](./img/db_schema.png)
![Initial Design](./img/initial_design.png)

- Looked through the notes I had for the purposes of HH data tracking to see how I could translate these into database relationships.
    - Identified the key information HH needed to record and how I could visualize that data.
- Following the relationships, I now have the following models.
    - Crops
        - Varietals
            - Events
            - Hectare Log Varietals
                - Hectare Logs
                    - Compost Events
            - Varietal Regions
                - Regions

### 2/21/24

- Started playing around with different database ideas.
- Went through the install process for Feathers.js along with sequelize and postgres. These setups were doing too much and required a lot of additional setup to use.
- Going forward, I will be using a different kind of database

### 2/22/24

- Restarted the database process using MySQL.
- Went through the documentation for setting up this database and creating the relationships I have planned out.
- Finished adding Crop and Varietal models. Tested with hard-coded data and using Swagger.

### 2/29/24

- Fixed a bug with JSON data serialization
- Tested all current crop and varietal endpoints for success.
    - Can now pull a list of related varietals for a crop, as well as full CRUD for varietals.


### 3/1/24

- Created the initial README for the overall project (API and Frontend specific to come later)

### 3/7/24

- Created the model and corresponding controller for Events. 
- I made a few refactors around where I wanted to store information like WaterEvery and FertilizeEvery. Originally I had these stored within events, but I ultimately decided these are best as properties of a crop varietal. 
- I added a front end! At first I used create react app, and started building using Ionic UI. But honestly, I wanted to challenge myself with a newer framework and a UI library that I haven't used before. So... welcome Vite and Mantine.
- I set up the basics of the app using Mantine, including the header, navbar, and routing system. I tested connecting to the db to make sure I was able to get all of the data I needed for Crops and Varietals using an axios connection. 
- Next up... More UI! I need to really map out the app and create a UI that I am happy with.

### 3/14/24

- After talking to J&B, the app users, I have started creating relational maps for adding attachments for events. 
- Created a data table for showing varietals for each crop. Crops are in accordions.
- Decided on some styling... Chose a logo and header color.
- Started working on the Crop modal for Edit and Delete. Need to build out the actual functionality but I spent al ot of time reading through the Mantine docs for their text input tools.

### 3/21/24

- Made a TON of updates today! 
- Now have full CRUD functionality with Crops. Had some fun remembering all of my API endpoints, as well as the syntax for using axois api calls.
- Had a few issues with making sure I was sending the right payload, but I tested with Swagger to double check.
- I incorporated checks for deleting crops and adding duplicates. I feel like I have learned so much from working on VinoSeeker, it is cool to see how it applies here!

### 3/22/24

- Worked on adding the varietal routes today! 
- Updated the react router to include a page for each crop variety we select. 
- I started adding CRUD functionality to varietals and was able to update varietals using the varietal form component. 
- Next time, I want to work on delete and create for varietals, AND I need to work out an issue with the information pulled along with my get requests for each model. I need to limit/include related info being pulled.