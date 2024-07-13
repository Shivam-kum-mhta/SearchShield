
import './Welcome.css';
import shieldicon from '../../assets/shield-removebg-preview.png'
const Welcome = () => {
  return (
    <div className="welcome-page">
    <div style={{   backgroundImage:'linear-gradient(to right, rgb(255, 0, 242), rgb(246, 248, 250))', WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      <h1 className="title">SearchShield</h1></div>
      <p className="subtitle">Ensuring Safe and Appropriate Searches</p>
      <p className="description">
        SearchShield is a web-ML application designed to filter out vulgar or inappropriate keywords, ensuring that users only conduct safe and appropriate Google searches.
      </p>
      <div className="shield-container">
        {[...Array(20)].map((_, i) => (
          <div className="shield" key={i} style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, height: `${Math.random() * 100}px`, width:`${Math.random() * 200}px` }}>
            <img width='48' src={shieldicon} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
