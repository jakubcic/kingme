import React, { useState, useEffect } from "react";
import crownWhite from "../assets/crownwhite.png";
import crown from "../assets/crown.png";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GAME } from "../utils/mutation";
import { ADD_PLAYER_TO_GAME } from "../utils/mutation";

import { QUERY_ME } from "../utils/queries";
import { QUERY_GAME_BY_GAME_ID } from "../utils/queries";

const Menu = () => {
	const [addGame] = useMutation(CREATE_GAME);
	const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
	const { loading, data } = useQuery(QUERY_ME);
	const [hostId, setHostId] = useState(null);
	const user = data?.me || {};
  
	useEffect(() => {
	  if (user.games && user.games.length > 0) {
		setHostId(user.games[0]._id);
	  }
	}, [user]);

	const input = document.getElementById("joinInput");
	// console.log(input.value);

	console.log(user);

	const handleSolo = async () => {
		// @ricky we can add these to the db if we want
		// try {
		// 	const { data } = await addGame({
		// 		variables: { id: user._id },
		// 	});
		// 	console.log(data);
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	const handleHost = async () => {
		try {
			const { data } = await addGame({
				variables: { id: user._id },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddPlayer = async () => {
		try {
			const { data } = await addPlayerToGame({
				variables: { id: user._id, gameId: input.value },
			});
			const { data: gameData } = await QUERY_GAME_BY_GAME_ID({
				variables: { gameId: input.value },
			});
			console.log(gameData);
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};


	return (
		<>
			<section className="my-2 grid place-content-center align-middle">
				<div className="container my-10 max-w-6xl">
					<h1 className="font-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center">
						kingme.gg
					</h1>
				</div>
			</section>
			<div id="menu" className="w-full border-t-2 border-t-black">
				<section id="hotseatContainer">
					<div id="deco2">
						<img
							className="ml-6"
							id="decoImg"
							src={crownWhite}
							style={{ transform: "rotate(10deg)" }}
						/>
					</div>
					<div id="deco">
						<img
							className="ml-6"
							id="decoImg"
							src={crown}
							style={{ transform: "rotate(-10deg)" }}
						/>
					</div>
					<Link to="/hotseat">
						<button id="hotseatBtn" onClick={handleSolo}>
							Play Hot-Seat
						</button>
					</Link>
				</section>
				<section id="multiplayerContainer">
					<div id="hostContainer">
						<Link to={`/multiplayer/${hostId}`}>
							<button id="hostBtn" onClick={handleHost}>
								Host a Game
							</button>
						</Link>
					</div>
					<div id="joinContainer">
						<input id="joinInput" maxLength={10} autoFocus placeholder="Game ID"/>
						<Link to="/multiplayer">
							<button id="joinBtn" onClick={handleAddPlayer}>
								Join a Friend
							</button>
						</Link>
					</div>
				</section>
			</div>
		</>
	);
};

export default Menu;
