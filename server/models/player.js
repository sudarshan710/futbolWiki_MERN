import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        position: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        nationlity: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        age: {
            type: Number,
            required: true,
            min: 10,
            max: 110,
        },
        team: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        history: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
); 

const Player = mongoose.model("Player", PlayerSchema);
export default Player;