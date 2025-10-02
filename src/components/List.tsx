import Item from './Item';
import { Link } from 'react-router';

type pokemon = {
	name: string;
	url: string;
};

export default function List({
	pokemons,
}: {
	pokemons: pokemon[] | undefined;
}) {
	if (!pokemons || pokemons.length === 0) {
		return (
			<div className="min-h-dvh flex flex-col items-center justify-center text-center text-gray-400">
				<img
					src="/error.png"
					alt="No Pokémon found"
					className="w-100 h-100 opacity-50 mb-4"
				/>
				<h3 className="text-xl font-semibold text-white mb-2">
					No se encontraron Pokémon
				</h3>
				<p className="text-sm text-gray-500">
					Prueba con otro nombre o tipo
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-dvh grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
			{pokemons.map((pokemon) => (
				<Link key={pokemon.name} to={`/dex/${pokemon.name}`}>
					<Item url={pokemon.url} />
				</Link>
			))}
		</div>
	);
}
