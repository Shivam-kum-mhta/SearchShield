const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser=require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
const PORT = 3000;
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
      } catch (err) {
        res.status(401).json({message:'No user found try signup'})
        return
        }
    
      if (!existingUser
          || existingUser.password
          != password) {
              res.status(402).json({message:'Wrong credentials please check'})
              return
              }
      
      let token;
      try {
          //Creating jwt token
          token = jwt.sign({userId: existingUser.id, email: existingUser.email},"mysecretcode",{ expiresIn: "1h" });
      } catch (err) {
        res.status(403).json({message:'Cant create token, server busy'})
        return
        }
      

      res.status(200).json({
              success: true,
              data: {
                  userId: existingUser.id,
                  email: existingUser.email,
                  token: token,
                },    });

  });

  
  app.post('/signup', async (req, res,next) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      console.log(`${username, email, password} is registered`)
    } catch (err) {
      res.status(401).json({message:'Username or email already exists'})
      return
      }
    
  
      let findnewUser;
      try {
          findnewUser =
              await User.findOne({ email: email });
      } catch (err) {
        res.status(402).json({message:'Try registering again'})
        return
        }
  
      let token;
                try {
                      //Creating jwt token
                      token = jwt.sign({userId: findnewUser.id, email: findnewUser.email},"mysecretcode",{ expiresIn: "1h" });
                  } catch (err) {
                  res.status(403).json({message:'Cant create token, server busy'})
                  return
                  }
  
      res.status(201).json({
        success: true,
        data: {
            userId: findnewUser.id,
            email: findnewUser.email,
            token: token,
          }, });
  
        })


  app.get('/gethistory',
   async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
        //Decoding the token
        const decodedToken =
            jwt.verify(token, "mysecretcode");
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
          jwt.verify(token, "mysecretcode");
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
