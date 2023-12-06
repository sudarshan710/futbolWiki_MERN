import Player from '../models/player.js';

// Add player
export const addPlayer = async (req, res) => {
    try {
        const {
            name, 
            position,
            nationlity,
            age,
            team,
        } = req.body;

        const newPlayer = new Player({ 
            name, 
            position,
            nationlity,
            age,
            team,
        });

        try {
            const player = await newPlayer.save();
            res.status(201).json(player);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    } catch (err) {
        res.status(404).json({ message: err.message });
    };
};

// Get player by id
export const getPlayer = async (req, res) => {
    console.log("im here");
    try {
        const { playerId } = req.params;
        const player = await Player.findById(playerId);

        res.status(200).json(player);
    } catch (err){
        res.status(404).json({ message: err.message });
    };
};

// Get all players
export const getPlayers = async (req, res) => {
    try {
        const player = await Player.find();

        res.status(200).json(player);
    } catch (err){
        res.status(404).json({ message: err.message });
    };
};

    
// Add/Remove player by id
export const removePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByIdAndRemove(id);
        player.save();

        res.status(200).json(player);
    } catch (err){
        res.status(404).json({ message: err.message });
    };
};
