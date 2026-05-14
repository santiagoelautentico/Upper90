import { useState, useEffect } from "react";
import CardPlayer from "../components/CardPlayer";
import { Link } from "react-router-dom";
import SkeletonCardPlayer from "../components/SkeletonCardPlayer";
import { motion } from "motion/react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:1234/playersCards")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayers(data);
        setIsLoading(false);
        console.log(data, "players data");
      });
  }, []);

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
          <h4>Filters</h4>
          <li>League</li>
          <li>Team</li>
          <li>Position</li>
          <li>Stats</li>
          <li>Market Value</li>
        </ul>
      </header>
      <section className="playersCards-container">
        {isLoading ? (
          <SkeletonCardPlayer cards={20} />
        ) : (
          <motion.ul variants={container} initial="hidden" animate="visible" >
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
