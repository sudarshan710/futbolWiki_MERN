import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import { CardTab, TabSwitcher, TabContent } from "components/TabCard";

const PlayerPage = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const playerDataRef = useRef();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        if (token && playerId) {
          const response = await fetch(
            `https://serverdeploy-7xbn.onrender.com/players/${playerId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            playerDataRef.current = data;
            setPlayerData(data);
            console.log("Player Data:", data);
          } else {
            console.error("Error fetching player data:", response.status);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPlayerData();
  }, [token, playerId]);

  return (
    <div className="bg-[#1F1F1F]">
      <div className="flex flex-col h-screen items-start px-8 items-center place-content-start">
        <NavBar />
        <div className="m-8 bg-[#317873] text-white rounded-xl shadow-lg p-4 w-[1000px]">
          <CardTab>
            <div className="border-black text-base">
              <TabSwitcher tabId={1}>
                <div className="p-2">Personal Information</div>
              </TabSwitcher>
              <TabSwitcher tabId={2}>
                <div className="p-2">All Time Club Statistics</div>
              </TabSwitcher>
              <TabSwitcher tabId={3}>
                <div className="p-2">All Time Country Statistics</div>
              </TabSwitcher>
              <TabSwitcher tabId={4}>
                <div className="p-2">All Time Career Statistics</div>
              </TabSwitcher>
            </div>
            <div className="p-4 max-h-[500px] overflow-y-auto">
              <TabContent id={1}>
                {playerData ? (
                  <div className="mb-4">
                    <p className="text-2xl font-bold">{playerData.name}</p>
                    <hr className="my-4 border-t border-black" />
                    <p>Country - {playerData.nationlity}</p>
                    <p>Age - {playerData.age} years</p>
                    <p>Position - {playerData.position}</p>
                    <p>Current Team(s) - {playerData.team}</p>
                    <hr className="my-4 border-t border-black" />
                  </div>
                ) : null}
                <div>
                  <p className="text-xl font-bold">History</p>
                  <p>{playerData?.history}</p>
                </div>
              </TabContent>
              <TabContent id={2}>Tab content 2</TabContent>
              <TabContent id={3}>Tab content 2</TabContent>
              <TabContent id={4}>Tab content 2</TabContent>
            </div>
          </CardTab>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
