import React from 'react';

function About() {
  return (
    <div className="container flex [flex-flow:column] text-white justify-center items-center" style={{minHeight:"70vh"}}>
      <div><h1>SearchShield</h1></div>
      <div> <h2> A web application that allows you to search for and watch YouTube videos 
        related to programming and technology.</h2> The application uses the YouTube Data API to fetch video search results and display them in a grid layout.
     
      <h4>
        The application is built using the following technologies:
      </h4>
      <div><ul  style={{listStyle:'none'}}>
        <li>React for the user interface</li>
        <li>Redux for state management</li>
        <li>YouTube Data API for video search and playback</li>
        <li>CSS for styling and responsiveness</li>
      </ul>
      </div></div>
      <div style={{ position:"absolute", bottom:'20px'}}>  Created by : SHIVAM KUMAR A  on  27 Feb 2024 </div>
     <div  aria-hidden="true" high> Thank you for using this application! If you have any feedback or suggestions, please let us know.
    
    </div>
    </div>

    
  );
}

export default About;