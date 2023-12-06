import User from "../models/user.js";
import Player from "../models/player.js";

// Get user by id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by id
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get user's favPlayers list
export const getFavPlayers = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by id and populate the favPlayers array with player details
    const user = await User.findById(id).populate("favPlayers");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // The user's favPlayers list is now directly populated with player details
    const favPlayers = user.favPlayers;

    // Format the favPlayers list
    const formattedPlayers = favPlayers.map(
      ({ _id, name, nationality, position }) => {
        return { _id, name, nationality, position };
      }
    );

    res.status(200).json(formattedPlayers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Add/remove player to/from user's favPlayers list
export const addRemoveFavPlayers = async (req, res) => {
  try {
    const { id, playerId } = req.params;
    const user = await User.findById(id);
    const player = await Player.findById(playerId);

    // If user's favPlayers list includes the player id, remove it or else add it
    // if (user.favPlayers.includes(playerId)) {
    //   user.favPlayers = user.favPlayers.filter((id) => id !== playerId);
    // } else {
    //   user.favPlayers.push(playerId);
    // }
    const playerIndex = user.favPlayers.indexOf(playerId);
    if (playerIndex !== -1) {
      user.favPlayers.splice(playerIndex, 1);
    } else {
      user.favPlayers.push(player);
    }
    // Save the user
    await user.save();

    // Get the user's favPlayers list with player details
    const favPlayers = await Player.find({ _id: { $in: user.favPlayers } });

    // Format the favPlayers list
    const formattedPlayers = favPlayers.map(
      ({ _id, name, nationality, position }) => {
        return { _id, name, nationality, position };
      }
    );

    res.status(200).json(formattedPlayers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

