# Client-Side MyFlix App. Technical Case Study

# Objective

Build a client-side app with React as Front-End and using a REST API as Back-End.

## Context

Client-side development hasn’t always been so prominent. In the past, web pages would be generated on the server-side and sent to the browser, resulting in a poor user experience. But thanks to modern browsers and libraries such as React, the client-side of an application is today considered to be just as important as the server-side.

## Project Owner, Management, and Acknowledgement

[CareerFoundry](https://careerfoundry.com/) (25.02.2021 - 17.03.2022)

## My Role

- Full-Stack Web Developer

## The 5 W's

- Who? — The users of your myFlix application. They will be movie enthusiasts who enjoy reading information about different movies
- What? — A single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The client-side development in this project supports the existing server-side code (REST API and database) by facilitating user requests and rendering the response from the server-side via several different interface views
- When? — MyFlix users will be able to use it whenever they want to read information about different movies or update their user data — for instance, their list of "Favorite Movies"
- Where? — The application is hosted online. The MyFlix application itself is responsive and can be used anywhere and on any device, giving all users the same experience
- Why? — Movie enthusiasts should be able to access information about different movies, directors, and genres, whenever they want to. Having the ability to save lists of favorite movies will ensure users always have access to the films they want to watch or recommend to their peers.

## User Stories

- As a user, I should be able to access information on movies, directors, and genres so that I can learn more about movies I've watched or am interested in
- As a user, I should be able to create an account to save data about my favorite movies.

## Technical Requirements & Solutions

- The application must be a single-page application (SPA)
- The application must use state routing to navigate between views and share URLs
- The application must give users the option to filter movies
- The application must give users the option to sort movies
- The application must initially use Parcel as its build tool
- The application must be written using the React library and in ES2015+
- The application must be written with React-Redux (hence respecting the Flux pattern)
- The application must use Bootstrap as a UI library for styling and responsiveness
- The application must contain a mix of class components and function components
- The application may be hosted online.

## Essential Views and Features

### Main view

- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

### Single movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

### Login view

- Allows users to log in with a username and password
- Registration view
- Allows new users to register (username, password, email, birthday)

### Genre view

- Returns data about a genre, with a name and description
- Displays example movies

### Director view

- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

### Profile view

- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites.

## MyFlix Client (React App) screenshot

![Livescreen](src/img/Livescreen/MyFLixClient_Livescreen_1.JPG)
