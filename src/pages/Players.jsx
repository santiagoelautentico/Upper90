import { useState, useEffect } from "react";
import CardPlayer from "../components/CardPlayer";
import { Link } from "react-router-dom";
import SkeletonCardPlayer from "../components/SkeletonCardPlayer";
import { motion } from "motion/react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState("2026/27");
  const [searchPlayer, setSearchPlayer] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/playersCards?season=${season}&playerName=${searchPlayer}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayers(data);
        setIsLoading(false);
        console.log(data, "players data");
      });
  }, [season, searchPlayer]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="players-container">
      <header>
        <Link to={"/"} className="linkBack">
          Back
        </Link>
        <ul className="filters-container">
          <li>
            <select className="select" onChange={(e) => setSeason(e.target.value)}>
              <option value="" disabled selected hidden>
                Current Season
              </option>
              <option value="2026/27">2026/27</option>
              <option value="2025/26">2025/26</option>
            </select>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search player..."
              value={searchPlayer}
              onChange={(e) => setSearchPlayer(e.target.value)}
              className="inputSearchPlayer"
            />
          </li>
        </ul>
      </header>
      <section className="playersCards-container">
        {isLoading ? (
          <SkeletonCardPlayer cards={20} />
        ) : (
          <motion.ul variants={container} initial="hidden" animate="visible">
            {players.map((player) => (
              <motion.li key={player.player_id} variants={item}>
                <Link
                  to={`/players/${player.player_id}`}
                  className="linkPlayers"
                >
                  <CardPlayer player={player} />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>
    </section>
  );
};

export default Players;
