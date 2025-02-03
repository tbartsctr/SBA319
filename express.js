const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors")
const app = express();
const Game = require("./Models/game");
const port = 3000;


app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://tbartsctr:Tuckfuck17@cluster1.itf8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));


  app.post("/games", async (req, res) =>{
        const {title, genre, releaseYear, platform, rating} = req.body;

        try{
            const newGame = ({title, genre, releaseYear, platform, rating });
            await newGame.save();
            res.status(201).json(newGame);

        } catch (err){
            res.status(400).json({error: "Failed to create new game!"});
        }


  });


  app.get("/games", async (req, res) => {
        try{
            const games = await Game.find();
            res.status(201).json(games);
        
        } catch(err){
            res.status(400).json({error: "Failed to retrieve game info!"});
        }
  });

