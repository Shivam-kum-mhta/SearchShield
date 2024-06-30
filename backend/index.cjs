const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser=require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
const PORT = 5000;
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const User = require('./database/models/User.cjs');
const SearchHistory = require('./database/models/SearchHistory.cjs')

const corsOptions = {
  origin: 'http://localhost:5173', // Specify the frontend origin
  credentials: true, // Enable credentials (cookies, etc.)
};


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


// Handling post request
app.post("/login",
  async (req, res, next) => {
      let { email, password } = req.body;

      let existingUser;
      try {
          existingUser =
              await User.findOne({ email: email });
      } catch {
          const error =
              new Error(
                  "Error! Something went wrong."
              );
          return next(error);
      }
      if (!existingUser
          || existingUser.password
          != password) {
          const error =
              Error(
                  "Wrong details please check at once"
              );
          return next(error);
      }
      let token;
      try {
          //Creating jwt token
          token = jwt.sign({userId: existingUser.id, email: existingUser.email},"secretkeyappearshere",{ expiresIn: "1h" });
      } catch (err) {
          console.log(err);
          const error =
              new Error("Error! Something went wrong.");
          return next(error);
      }

      res.status(200).json({
              success: true,
              data: {
                  userId: existingUser.id,
                  email: existingUser.email,
                  token: token,
                },    });

  });

  
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    console.log(`${username, email, password} is registered`)
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});


  app.get('/gethistory',
   async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
        //Decoding the token
        const decodedToken =
            jwt.verify(token, "secretkeyappearshere");
       if (!decodedToken) console.log("AUNTHETICATION FAILED")

        const userId=decodedToken.userId

        try {
          const searchHistory = await SearchHistory.find({ userId }).sort({ searchedAt: -1 }); // Sort by searchedAt in descending order
          if (!searchHistory.length) {
            return res.status(404).json({ message: 'No search history found for this user' });
          }
          res.status(200).json(searchHistory);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching search history' });
        }
    })

app.post('/savehistory', async (req, res)=>{
  const {keywords}=req.body
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
      //Decoding the token
      const decodedToken =
          jwt.verify(token, "secretkeyappearshere");
     if (!decodedToken) console.log("AUNTHETICATION FAILED")

      //retrive saved history
      const userId = decodedToken.userId
      try{
        console.log("userId: "+userId+"keyword: "+keywords)
        const newSearchHistory = new SearchHistory({userId, keywords});
        await newSearchHistory.save();
        console.log("Done saving keyword")
        res.status(200).json({ message: 'Search history successfully' });
        console.log(`keywords =${keywords}`)
      } catch (error) {
        res.status(402).json({error: 'Error creating search history'})}
     

})

app.get('/api/context', async (req, res) => {
  const { url } = req.query;
  if (!url) {return res.status(400).json({ error: 'URL is required' });}
  try {
    const response = await axios.get(url);
    console.log(url)
    res.status(200).json(response.data)
    console.log('Successfully response sent')
   } catch (error) {
    console.log('server error')
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
