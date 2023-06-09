import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./components/Game/Game.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Game />
	</React.StrictMode>
);
