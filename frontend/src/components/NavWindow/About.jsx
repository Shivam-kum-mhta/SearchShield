

function About() {
  return (
    <div className="container flex [flex-flow:column] text-white justify-center items-center" style={{minHeight:"70vh", backgroundColor: '#000000d9'}}>
      <div><h1>SearchShield</h1></div>
      <div> <h2> SearchShield is a sophisticated web application designed to offer a seamless image search experience akin to Pinterest.</h2> The application uses the Google Custom Search API to fetch image search results and display them in a grid layout.
     
      <h4>
        The application is built using the following technologies:
      </h4>
      <div><ul  style={{listStyle:'none'}}>
        <li>React+Vit+Tailwind</li>
        <li>Nodejs+ExpressJs+JWT+MongoDB</li>
        <li>Distillbert Model+ FastApi</li>
      </ul>
      </div></div>
      <div style={{ position:"absolute", bottom:'20px'}}>  Created by : SHIVAM KUMAR A  on  12 July 2024 </div>
     <div  aria-hidden="true" high> Thank you for using this application! If you have any feedback or suggestions, please let us know.
    
    </div>
    </div>

    
  );
}

export default About;