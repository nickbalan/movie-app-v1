# MyFlix Client
 
# Objective
Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database)

## User Stories 
- As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in 
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Essential Views and Features: 
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
- Allows users to remove a movie from their list of favorites 

## Initial Technical Requirements 
- The application must be a single-page application (SPA) 
- The application must use state routing to navigate between views and share URLs 
- The application must give users the option to filter movies  
- The application must give users the option to sort movies 
- The application must initially use Parcel as its build tool 
- The application must be written using the React library and in ES2015+ 
- The application must be written with React Redux (hence respecting the Flux pattern) 
- The application must use Bootstrap as a UI library for styling and responsiveness 
- The application must contain a mix of class components and function components 
- The application may be hosted online 