import React from 'react';
import { useSelector } from 'react-redux';

const FavPlayers = () => {
  
  const user = useSelector((state) => state.auth.user);
  console.log("\n User: ", user);
  const favPlayers = user.favPlayers;
  console.log("\n FavPlayers: ", favPlayers);

  return (
    <div className="bg-gray-800 text-white w-72 border border-gray-600 rounded p-4">
      <div className="bg-gray-700 py-2 px-4 border-b">
        <h2 className="text-xl font-bold">Your Favorite Players</h2>
      </div>
      <ul className="list-none m-0 p-0 mt-3">
        {favPlayers.map((favPlayer) => (
                  <li className="py-2 border-b border-gray-600">{favPlayer}</li>
                ))}
      </ul>
    </div>
  );
};

export default FavPlayers;
