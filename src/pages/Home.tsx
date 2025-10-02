import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useName } from '../hooks/useName';
import { DynamicIcon } from 'lucide-react/dynamic';

export default function Home() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState('');
	const { setName } = useName();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		const value = inputRef.current?.value;

		if (!value || value.trim() === '') {
			setError('Por favor ingresa un nombre válido');
			return;
		}

		setName(value.trim());
		inputRef.current!.value = '';
		navigate('/dex');
	};

	return (
		<div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4">
			<div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
				<div className="hidden md:flex p-0 max-h-[400px] overflow-hidden">
					<img
						src="/pokeball.png"
						alt="Pokémon"
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="bg-gray-900 flex flex-col p-8">
					<div className="flex items-center justify-center gap-4 mb-6">
						<a
							href="https://github.com/jaisemberg2022/poke-api-react.git"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 transition"
						>
							<DynamicIcon name="github" size={20} />
						</a>
						<a
							href="https://www.linkedin.com/in/jaidertoro2003/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="w-10 h-10 flex items-center justify-center bg-[#0A66C2] text-white hover:bg-[#085aab] transition"
						>
							<DynamicIcon name="linkedin" size={20} />
						</a>
						<a
							href="https://api.whatsapp.com/send?phone=573007288938&text=contactame para conocer mas acerca de mi"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="WhatsApp"
							className="w-10 h-10 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#1ebe59] transition"
						>
							<DynamicIcon name="phone" size={20} />
						</a>
					</div>
					<div className="flex-grow">
						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold text-white">Pokédex</h2>
							<p className="text-gray-300 mt-1">
								Para comenzar tu viaje Pokémon, dinos tu nombre
							</p>
						</div>
						<form onSubmit={handleSubmit} className="space-y-4">
							<input
								ref={inputRef}
								type="text"
								placeholder="Ingresa tu nombre"
								className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
							{error && (
								<p className="text-sm text-red-400 text-center">{error}</p>
							)}
						</form>
					</div>
					<div className="mt-6">
						<button
							type="submit"
							onClick={handleSubmit}
							className="cursor-pointer w-full bg-red-500 text-white font-semibold py-3 rounded hover:bg-red-600 transition-colors duration-300"
						>
							Comenzar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
