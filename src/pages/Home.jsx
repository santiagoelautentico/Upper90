import BoxLeague from "../components/boxLeague";
import MatchesCard from "../components/MatchesCard";
import PixelBlast from "../components/PixelBlast";
import ShinyText from "../components/ShinyText";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AiFillCaretLeft } from "react-icons/ai";

const Home = () => {
  const [match, setMatch] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [matchesLoaded, setMatchesLoaded] = useState(5);
  const [clickedBtnMatches, setClickedBtnMatches] = useState(false);

  console.log(match, "match in home");

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:1234/matches")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMatch(data);
      });
  }, []);

  return (
    <section
      className={`${clickedBtnMatches ? "matchContainer" : "home-container"}`}
    >
      <AnimatePresence>
        <motion.div className="allGamesBtnContainer">
          {!clickedBtnMatches && (
            <motion.button
              className="allGamesBtn"
              onClick={() => {
                setMatchesLoaded(matchesLoaded + 100);
                setClickedBtnMatches(true);
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.9, y: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              initial={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.3 },
              }}
            >
              All Games
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="retornBtnContainer">
        <AnimatePresence>
          {clickedBtnMatches && (
            <motion.button
              className="allGamesBtn2"
              onClick={() => {
                setMatchesLoaded(matchesLoaded === 5 ? 100 : 5);
                setClickedBtnMatches(false);
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.9, y: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              initial={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.3 },
              }}
            >
              <AiFillCaretLeft />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {!clickedBtnMatches ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="matches-container"
          >
            {match.slice(0, matchesLoaded).map((match, index) => (
              <motion.div key={match.matchId}>
                <Link to={`/matches/${match.matchId}`} className="linkP">
                  <MatchesCard
                    match={match}
                    backgroundColor={
                      index % 2 === 0 ? "firstMatch" : "SecondMatch"
                    }
                  />
                </Link>
              </motion.div>
            ))}
            <div className="fade-bottom"></div>
          </motion.article>
        ) : (
          <>
            <motion.input
              name="search"
              className="searchMatchesInput"
              placeholder="Search match..."
              type="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "ease-in", delay: 1 }}
            />
            <motion.article
              className="matches-container2"
              initial={{ y: -75 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 1.5, ease: "ease-in" }}
            >
              {match.slice(0, matchesLoaded).map((match, index) => (
                <motion.div
                  key={match.matchId}
                  initial={index >= 3 ? { opacity: 0 } : { opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index >= 3 ? (index - 3) * 0.15 : 0,
                    ease: "easyOut",
                  }}
                >
                  <Link to={`/matches/${match.matchId}`} className="linkP">
                    <MatchesCard
                      match={match}
                      backgroundColor={
                        index % 2 === 0 ? "firstMatch" : "SecondMatch"
                      }
                    />
                  </Link>
                </motion.div>
              ))}
              <div className="fade-bottom"></div>
            </motion.article>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {!clickedBtnMatches ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 0 }}
            key="all-players-box"
            className={`${
              clickedBtnMatches ? "invisible" : "all-players-container"
            } ${isHovered ? "border-allPlayers" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <PixelBlast
              variant=""
              patternScale={4}
              patternDensity={1.5}
              pixelSizeJitter={1.7}
              enableRipples={false}
              speed={0.9}
              color="#7354FF"
            />
            <Link className="link" to="/allPlayers">
              <h3 className="title-allPlayers">
                {isHovered ? (
                  <ShinyText
                    speed={1}
                    spread={isHovered ? 115 : 0}
                    text={"ALL PLAYERS"}
                  />
                ) : (
                  "ALL PLAYERS"
                )}
              </h3>
              <img
                src="/allplayers.png"
                alt="All Players"
                className="picture-allPlayers"
              />
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        className={`${clickedBtnMatches ? "invisible" : "league-containerBox"}`}
      >
        <h2>LEAGUES</h2>
        <Link to={"/league/2"} className="premierLink">
          <BoxLeague
            league="/premierIcon.svg"
            classContainer="premier"
            id="2"
          />
        </Link>
        <Link to={"/league/1"} className="laLigaLink">
          <BoxLeague league="/laligaIcon.svg" classContainer="laLiga" id="1" />
        </Link>
        <BoxLeague league="/serieAIcon.svg" classContainer="serieA" id="3" />
        <img src="../../public/texture.jpg" alt="" className="texture" />
      </div>
      <div
        className={`${clickedBtnMatches ? "invisible" : "champions-container"}`}
      >
        <img src="/championsLogo.svg" alt="" />
      </div>
    </section>
  );
};

export default Home;
