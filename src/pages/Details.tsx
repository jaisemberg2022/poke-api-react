import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';

const BaseUrl = 'https://pokeapi.co/api/v2/pokemon';

type Pokemon = {
	id: number;
	name: string;
	image: string;
	types: string[];
	moves: string[];
	stats: Stats;
};

type Type = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

type Moves = {
	move: Move;
	version_group_details: VersionGroupDetail[];
};

interface Move {
	name: string;
	url: string;
}

interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: MoveLearnMethod;
	order: any;
	version_group: VersionGroup;
}

interface MoveLearnMethod {
	name: string;
	url: string;
}

interface VersionGroup {
	name: string;
	url: string;
}

type Stats = {
	hp: number;
	attack: number;
	defense: number;
	specialAttack: number;
	specialDefense: number;
	speed: number;
};

export default function Details() {
	const params = useParams();
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		axios
			.get(`${BaseUrl}/${params.name}`)
			.then((res) => {
				setPokemon({
					id: res.data.id,
					name: res.data.name,
					image: res.data.sprites.other['official-artwork'].front_default,
					types: res.data.types.map((type: Type) => type.type.name),
					moves: res.data.moves
						.map((move: Moves) => move.move.name)
						.slice(0, 10),
					stats: {
						hp: res.data.stats[0].base_stat,
						attack: res.data.stats[1].base_stat,
						defense: res.data.stats[2].base_stat,
						specialAttack: res.data.stats[3].base_stat,
						specialDefense: res.data.stats[4].base_stat,
						speed: res.data.stats[5].base_stat,
					},
				});
			})
			.catch((err) => console.error(err));
	}, [params.name]);

	if (!pokemon)
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
				<div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
				<p className="text-xl font-semibold animate-pulse">
					Cargando Pokémon...
				</p>
			</div>
		);

	return (
		<div className="flex justify-center items-center min-h-screen px-4 py-10">
			<div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full">
				<Link
					to="/dex"
					className="inline-block mb-6 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
				>
					← Volver
				</Link>

				<div className="text-center mb-6">
					<h1 className="text-3xl font-bold capitalize text-gray-300">
						{pokemon.name}
					</h1>
					<p className="text-gray-600">
						N.º {pokemon.id.toString().padStart(4, '0')}
					</p>
				</div>

				<div className="flex justify-center mb-6">
					<img
						src={pokemon.image}
						alt={pokemon.name}
						className="w-40 h-40 object-contain"
					/>
				</div>

				<div className="flex justify-center gap-2 mb-6">
					{pokemon.types.map((type) => (
						<span
							key={type}
							className="bg-gray-500 text-white px-4 py-1 rounded-full capitalize text-sm"
						>
							{type}
						</span>
					))}
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Estadísticas
					</h2>
					<div className="space-y-2">
						{Object.entries(pokemon.stats).map(([key, value]) => (
							<div key={key}>
								<p className="capitalize text-sm text-gray-300 mb-1">
									{key.replace(/([A-Z])/g, ' $1')}
								</p>
								<div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
									<div
										className={`h-4 rounded-full ${
											value > 80
												? 'bg-green-500'
												: value > 50
												? 'bg-yellow-500'
												: 'bg-red-500'
										}`}
										style={{ width: `${value}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-gray-400 mb-2">
						Movimientos
					</h2>
					<ul className="flex flex-wrap gap-2">
						{pokemon.moves.map((move) => (
							<li
								key={move}
								className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm capitalize"
							>
								{move}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
