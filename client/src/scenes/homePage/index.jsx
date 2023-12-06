import NavBar from "scenes/navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlayerCard from "components/PlayerCard";
import FavPlayers from "components/FavPlayers";

const HomePage = () => {
  const token = useSelector((state) => state.auth.token);

  const borderStyle = "border-2 border-black p-16";
  const playersContainerStyle = "flex flex-row gap-8 p-8 place-content-center";
  const loadingStyle = "text-white text-2xl";

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://serverdeploy-7xbn.onrender.com/players/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setPlayers(data);
          setLoading(false); // Set loading to false when data is fetched
          console.log("Players updated:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // Set loading to false on error
      });
  }, [token]);

  return (
    <div>
      <div className="flex flex-col bg-[#1F1F1F] items-center">
        <NavBar />
        <div className={playersContainerStyle}>
          {loading ? (
            <div className={loadingStyle}>Loading...</div>
          ) : (
            <div className={borderStyle}>
              <div className="flex flex-col gap-4">
                {players.map((player) => (
                  <PlayerCard key={player.id} playerData={player} />
                ))}
              </div>
            </div>
          )}
          <div className="overflow-y-hidden">
            <FavPlayers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
