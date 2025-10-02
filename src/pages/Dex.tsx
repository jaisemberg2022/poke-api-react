import { useEffect, useState } from 'react';
import List from '../components/List';
import axios from 'axios';

type Pokemon = {
	name: string;
	url: string;
};

type Type = {
	name: string;
	url: string;
};

const BaseUrl = 'https://pokeapi.co/api/v2';

export default function Dex() {
	const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
	const [pokemonsByType, setPokemonsByType] = useState<Pokemon[] | null>(null);
	const [types, setTypes] = useState<Type[] | null>(null);

	const [searchValue, setSearchValue] = useState('');
	const [selectValue, setSelectValue] = useState('');

	useEffect(() => {
		axios
			.get(BaseUrl + '/pokemon?limit=151')
			.then((res) => setPokemons(res.data.results)) // {name, url}
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		if (selectValue !== '') {
			axios.get(BaseUrl + `/type/${selectValue}`).then((res) => {
				const pokemonNames = res.data.pokemon.map(
					(p: { pokemon: Pokemon }) => p.pokemon.name,
				);
				const filteredPokemons =
					pokemons?.filter((p) => pokemonNames.includes(p.name)) || null;
				setPokemonsByType(filteredPokemons);
			});
		}
	}, [selectValue]);

	useEffect(() => {
		axios
			.get(BaseUrl + '/type?limit=21')
			.then((res) => setTypes(res.data.results))
			.catch((err) => console.error(err));
	}, []);

	const pokemonsFiltered = (selectValue ? pokemonsByType : pokemons)?.filter(
		(p) => p.name.toLowerCase().includes(searchValue.toLowerCase()),
	);

	return (
		<div className="container mx-auto">
			<form className="mb-4 flex flex-col sm:flex-row gap-4 justify-start">
				<input
					type="text"
					placeholder="Search Pokémon..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className="w-full sm:w-auto px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
				/>

				<select
					value={selectValue}
					onChange={(e) => setSelectValue(e.target.value)}
					className="w-full sm:w-auto px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 capitalize"
				>
					<option value="">Select a type</option>
					{types &&
						types.map((t) => (
							<option key={t.name} value={t.name} className="capitalize">
								{t.name}
							</option>
						))}
				</select>
			</form>

			{pokemons && <List pokemons={pokemonsFiltered} />}
		</div>
	);
}
