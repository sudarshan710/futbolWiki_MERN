import mongoose from "mongoose";

const UserScheme = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    // favPlayers: {
    //   type: Array,
    //   default: [],
    // },
    favPlayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player', // Reference to the Player model
      },
    ],
    favTeams: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme);
export default User;