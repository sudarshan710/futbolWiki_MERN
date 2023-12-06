import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoritePlayer } from "../state/index.js"

const PlayerCard = ({ playerData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleSetFavPlayer = (playerId) => {
    dispatch(addFavoritePlayer(playerId));
  }

  const trimDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return description;
    }
  };

  return (
    <Card className="w-[700px] h-auto mx-auto mb-8 bg-wheat shadow-md">
      <CardMedia
        className="h-56"
        image="https://www.fcbarcelona.com/photo-resources/2020/04/30/43337a9f-3781-4886-948c-f70912e4b1af/1920x1080_Messi_primerGol-min.jpg?width=1200&height=750"
      />
      <CardContent>
        <Typography className="text-xl font-bold mb-2" variant="h5" component="div">
          {playerData.name}
        </Typography>
        <Typography className="text-gray-700" variant="body2" color="text.secondary">
          {trimDescription(playerData.history, 20)}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between p-4">
        <Button onClick={handleSetFavPlayer(playerData._id)} className="text-black border border-black" size="small">
          Add to Favorites
        </Button>
        <Link
          to={{
            pathname: `/players/${encodeURIComponent(playerData._id)}`,
          }}
        >
          <Button className="text-black border  border-black" size="small">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
