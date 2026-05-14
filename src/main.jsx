import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Players from "./pages/Players.jsx";
import Player from "./pages/Player.jsx";
import League from "./pages/League.jsx";
import Match from "./pages/Match.jsx";
import PageTransition from "./components/PageTransition.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: (props) => <PageTransition><Home {...props} /></PageTransition>,
      },
      {
        path: "/allPlayers",
        Component: (props) => <PageTransition><Players {...props} /></PageTransition>,
      },
      {
        path: "/players/:id",
        Component: (props) => <PageTransition><Player {...props} /></PageTransition>,
      },
      {
        path: "/league/:id",
        Component: (props) => <PageTransition><League {...props} /></PageTransition>,
      },
      {
        path: "/matches/:id",
        Component: (props) => <PageTransition><Match {...props} /></PageTransition>
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </SkeletonTheme>
);
