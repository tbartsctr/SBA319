const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors");
const app = express();
const Game = require("./Models/Games");
const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })


app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://tbartsctr:Tuckfuck17@cluster1.itf8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(uri)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));


  app.post("/Games", async (req, res) =>{
        const {title, genre, releaseYear, platform, rating} = req.body;

        try{
            const newGame = new Game({title, genre, releaseYear, platform, rating });
            await newGame.save();
            res.status(201).json(newGame);

        } catch (err){
            res.status(400).json({error: "Failed to create new game!"});
        }


  });


  app.get("/Games", async (req, res) => {
        try{
            const games = await Game.find({
                title: title,
                genre: genre,
                releaseYear: releaseYear,
                rating: rating,
                platform: platform
            });
            res.status(200).json(games);
        
        } catch(err){
            res.status(400).json({error: "Failed to retrieve game info!"});
        }
  });

  app.patch("/Games/:id", async (req, res) => {
        const {id} = req.params;
        //const {title, genre, releaseYear, platform, rating} = req.body;

        const updateFields = {};

        if (title) updateFields.title = title;
        if (genre) updateFields.genre = genre;
        if (releaseYear) updateFields.releaseYear = releaseYear;
        if (platform) updateFields.platform = platform;
        if (rating) updateFields.rating = rating;

        try{
            const updateGame = await Game.findByIdAndUpdate(id, updateFields,
        
                {new: true}
            );

            if(!updateGame) {
                return res.status(404).json({error: "Game not found"})
            }

            res.status(200).json(updateGame);

        } catch (err) {
            res.status(400).json("Game not updated");

        }
    
  });

  app.delete("/Games/:id", async (req, res) => {
        const {id} = req.params;

       try{

        const deleteGame = await Game.findByIdAndDelete(id);

        if(!deleteGame) {
            return res.status(404).json({error: "Game could not be deleted"})
        }
            res.status(200).json("Game successfully deleted!", deleteGame)
    
            } catch  (err) {
                res.status(400).json("Game not deleted");

    }

  });


  app.post('/test/invalid-game', async (req, res) => {
    try {
        
        const invalidGame = new Game({
            genre: "RPG",        
            releaseYear: 2020,
            platform: ["PS5"],
            rating: 11           
        });

        await invalidGame.save();
        res.status(201).json(invalidGame);  
    } catch (err) {
        res.status(400).json({ error: "Invalid game data", message: err.message });
    }
});

