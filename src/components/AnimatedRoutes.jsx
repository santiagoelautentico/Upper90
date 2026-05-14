import { AnimatePresence } from "motion/react"
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "../pages/Home.jsx"
import AllPlayers from "../pages/Players.jsx"
import PlayerDetails from "../pages/Player.jsx"
import PageTransition from "./PageTransition.jsx"

export default function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/allPlayers" element={<PageTransition><AllPlayers /></PageTransition>} />
                <Route path="/player/:id" element={<PageTransition><PlayerDetails /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    )
}