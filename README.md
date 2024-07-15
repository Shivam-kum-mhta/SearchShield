# SearchShield Documentation
### TABLE OF CONTENT

1. [Overview](#overview)
2. [Features](#features)
3. [Clone the repository](#to-clone)
4. [Conclusion](#conclusion)
## Overview

SearchShield is a sophisticated web application designed to offer a seamless image search experience akin to Pinterest. It allows users to open an infinite number of tabs, utilize the "load more" feature for continuous browsing, save images, and visit the context links of images. The application is equipped with a robust profanity detection model trained on DistilBERT, boasting an F1 score of over 90%. This ensures that all search keywords are filtered for appropriateness, providing a safe and user-friendly experience.

## Features

### Infinite Tabs
- Users can open and manage an unlimited number of tabs, enhancing their browsing experience.
- Each tab operates independently, maintaining its own state and search history.

### Load More
- The "load more" feature allows users to continuously load additional images without refreshing the page.
- This feature enhances user engagement and ensures a smooth browsing experience.

### Image Saving
- Users can save images for future reference.
- Saved images can be accessed easily from the user's profile or saved items section.

### Context Link Visits
- Users can visit the context links of images to explore more information about the image source.
- This feature adds depth to the browsing experience by connecting users to related content.

### Profanity Detection
- The application integrates a profanity detection model trained on DistilBERT.
- The model has an F1 score of over 90%, ensuring high accuracy in filtering out inappropriate content.
- This feature ensures that all search keywords are appropriate and safe.

### Personalization
- SearchShield personalizes the user experience by maintaining a search history.
- Users can revisit their previous searches and manage their search history.

### User Interface
- The application features a user-friendly and visually appealing interface.
- The design is intuitive, ensuring a seamless and enjoyable user experience.

## Backend

### Express Server
- The backend is built on Express.js, a fast and minimal web framework for Node.js.
- The server handles all API requests, authentication, and interaction with the database.

### Authorization
- User authentication is managed using JSON Web Tokens (JWT) and cookies.
- This ensures secure access to user-specific features and data.

### MongoDB and Mongoose
- The application uses MongoDB as its database, with Mongoose as the ODM (Object Data Modeling) library.
- This setup allows for efficient data storage, retrieval, and management.

## Frontend
- *React*: A popular JavaScript library for building user interfaces, providing a component-based architecture that enhances code reusability and maintainability.
- *Tailwind CSS*: A utility-first CSS framework that enables rapid UI development by providing pre-defined utility classes.
- *Axios*: A promise-based HTTP client for making asynchronous requests from the client-side to the backend API.
- *Vite*: A fast build tool that supports React and modern JavaScript features, enhancing development speed and efficiency.


## Machine Learning Integration

### FastAPI
- The machine learning components are integrated using FastAPI, a modern and fast web framework for building APIs with Python.
- FastAPI serves the profanity detection model and interacts with the backend server for analyzing search keywords.

### Profanity Detection Model
- The profanity detection model is based on DistilBERT, a smaller and faster version of BERT.
- The model is trained to detect inappropriate keywords with an F1 score exceeding 90%.

## TO CLONE:

**(THIS REPO IS EASY TO RUN IF FIRST AND FOREMOST YOU HAVE Mongodb database setup)**
Download mongodb compass, create a database

### Starting the Application
---
**Clone the repository from GitHub.**
  ```bash
  https://github.com/Shivam-kum-mhta/SearchShield.git
  ```
**Navigate to the project directory.**
  ```bash
    cd SearchShield
  ```

**Set up the environment variables for the API keys, database connection, and JWT secrets.** <br>

**for the .env file in backend directory** <br>
- CREATE a mongoDB compass database and paste the localhost link. Example is provided in env file in the backend directory. <br>
- JWT secret key is already embeded in index.cjs, u can change if you want. <br>

**for the .env file in frontend directory**

- A dummy api key and cx search-engine ID is provided. <br>
- YOU can also generate your own cx search-engine id here https://programmablesearchengine.google.com/controlpanel/all .<br>
and api key here https://developers.google.com/custom-search/v1/overview if u want :) . <br>

**for the ml directory.** <br>
-"read-only" Access token for the hugging face - DISTILLBERT model is embedded already in the codebase , so no worries.


**Open three instances of terminal** <br> 
**TERMINAL-1 Start the backend server**
   ```bash
    cd backend
   ```
   ```bash
    npm install
   ```
   ```bash
    npm run dev
   ```
OR
   ```bash
    node index.cjs
   ```
**TERMINAL-2 Start the frontend application using npm run dev (for Vite).**
   ```bash
     cd frontend
   ```
   ```bash
    npm install
   ```
   ```bash
    npm run dev
   ```
**TERMINAL-3 Start the ml application**
Ensure that you have python installed , (in my setup it was python 3.12 version)
```bash
     cd ML-model
```
1. Create a virtual environment
```bash
  python -m venv venv
````
  2. Activate the virtual environment (On windows/Powershell/git bash)
```bash
  venv/Scripts/activate
```
3.
```bash
  pip install -r requirements.txt
```
4. Start the uvicorn server
```
  uvicorn app:app --reload
```

**Voila! the setup is complete**
---
### Creating an Account
1. Open the application in your browser.
2. Click on the "Sign Up" button.
3. Fill in the required details and submit the form.


### Searching and Browsing
1. Enter a keyword in the search bar.
2. Browse through the images and open new tabs as needed.
3. Use the "load more" button to fetch additional images.
4. Save images to your profile by clicking the "Save" button.
5. Visit the context link of an image by clicking the "Visit" button.
6. You can sign in when visited later
   
### Managing Profile and History
1. Access your profile from the navigation menu.
2. View your saved images and search history.
3. Manage your saved items and history as needed.

## Future Enhancements

- Implementing more advanced search filters and sorting options.
- Enhancing the recommendation system for personalized content.
- Adding social features like sharing and commenting on images.
- Continuous improvement of the profanity detection model for even higher accuracy.

## Conclusion

SearchShield is a powerful and user-friendly image search application designed to provide a safe and engaging browsing experience. With its advanced features and robust backend, it ensures that users can explore and save images securely and efficiently.
