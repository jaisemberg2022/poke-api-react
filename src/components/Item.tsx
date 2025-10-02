import { useEffect, useState } from 'react';
import axios from 'axios';

type Pokemon = {
	id: number;
	name: string;
	image: string;
	types: string[];
};

type Type = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

export default function Item({ url }: { url: string }) {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setPokemon({
					id: res.data.id,
					name: res.data.name,
					image: res.data.sprites.other['official-artwork'].front_default,
					types: res.data.types.map((type: Type) => type.type.name),
				});
			})
			.catch((err) => console.error(err));
	}, [url]);

	if (!pokemon) return <p>cargando...</p>;

	return (
		<div className="bg-amber-300 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs mx-auto">
			<img
				src={pokemon.image}
				alt={`Imagen de ${pokemon.name}`}
				className="w-32 h-32 mx-auto object-contain mb-4 drop-shadow-md"
			/>

			<p className="text-center font-mono text-sm text-gray-700">
				#{pokemon.id.toString().padStart(4, '0')}
			</p>

			<h2 className="text-center text-2xl font-bold capitalize text-gray-900 mb-3">
				{pokemon.name}
			</h2>

			<div className="flex flex-wrap gap-2 justify-center">
				{pokemon.types.map((t) => (
					<span
						key={t}
						className="bg-black/50 rounded-full py-1 px-4 text-white text-sm capitalize"
					>
						{t}
					</span>
				))}
			</div>
		</div>
	);
}
