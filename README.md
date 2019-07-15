# Property-Pro-Lite


-----------------------------------------------------


##TABLE OF CONTENTS
### 1.Description
### 2.Badges
### 3.Required Features
### 4.Links
### 5.How it works


-----------------------------------------------------


##Description
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.


-----------------------------------------------------


## 2.Badges
[![Build Status](https://travis-ci.com/Jordybastien/Property-Pro-Lite.svg?branch=develop)](https://travis-ci.com/Jordybastien/Property-Pro-Lite)

[![Coverage Status](https://coveralls.io/repos/github/Jordybastien/Property-Pro-Lite/badge.svg?branch=Testing)](https://coveralls.io/github/Jordybastien/Property-Pro-Lite?branch=Testing)

[![Maintainability](https://api.codeclimate.com/v1/badges/5a331f0fe6f364594f9d/maintainability)](https://codeclimate.com/github/Jordybastien/Property-Pro-Lite/maintainability)


-----------------------------------------------------


## 3.Required Features

**3.1.** User can sign up.
**3.2.** User can sign in.
**3.3.** User (agent) can post a property advert.
**3.4.** User (agent) can update the details of a pr3perty advert.
**3.5.** User (agent) can mark his/her posted advert as sold.
**3.6.** User (agent) can delete a property advert.
**3.7.** User can view all properties adverts.
**3.8.** User can view all properties of a specific ty3e - 2 bedroom, 3 bedroom, mini flat etc.
**3.9.** User can view a specific property advert.


-----------------------------------------------------


## 4.Links
### 4.1.Gh-pages
https://jordybastien.github.io/Property-Pro-Lite/UI/


### 4.2.Pivotal Tracker
https://www.pivotaltracker.com/n/projects/2356125

### 4.3.API Endpoints deployed to Heroku
https://propertyprolitejordy.herokuapp.com/

#### 4.3.1. User can view all properties
https://propertyprolitejordy.herokuapp.com/api/v1/getProperties


#### 4.3.2. User can view specific property
https://propertyprolitejordy.herokuapp.com/api/v1//properties/[:id]


#### 4.3.3. User can get property by type
https://propertyprolitejordy.herokuapp.com/api/v1/properties/[:type]


#### 4.3.4. Agent can post a property
https://propertyprolitejordy.herokuapp.com/api/v1/properties/[:type]


#### 4.3.5. Agent can update a property
https://propertyprolitejordy.herokuapp.com/api/v1/updateProperty/[:id]


#### 4.3.6. Agent can delete a property
https://propertyprolitejordy.herokuapp.com/api/v1/deleteProperty/[:id]


#### 4.3.7. Agent can mark a property as sold
https://propertyprolitejordy.herokuapp.com/api/v1/masProperty/[:id]/sold



#### 4.3.8. User can sign up
https://propertyprolitejordy.herokuapp.com/api/v1/user


#### 4.3.9. User can log in
https://propertyprolitejordy.herokuapp.com/api/v1/login


-----------------------------------------------------


## 5.How it Works
Just go to https://jordybastien.github.io/Property-Pro-Lite/UI/ on the homepage you will see a dialogue explaining how to proceed


-----------------------------------------------------


## 6.Project Setup

 **6.1.** Clone the Repository [https://github.com/Jordybastien/Property-Pro-Lite.git]

 **6.2.** Navigate to the application directory `cd Property-Pro-Lite`

 **6.3** Install all dependencies `npm install`

 **6.4** Start the application `npm start`


