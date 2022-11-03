import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/moneda';

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 5px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	margin-top: 30px;

	&:hover {
		background-color: #7a7dfe;
		cursor: pointer;
	}
`;

const Formulario = () => {
	const [cryptos, setCryptos] = useState([]);
	const [error, setError] = useState(false);

	const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
	const [cryptomoneda, SelectCryptomoneda] = useSelectMonedas(
		'Elige tu CryptoMoneda',
		cryptos
	);

	useEffect(() => {
		const consultalApi = async () => {
			const url =
				'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			const arrayCryptos = resultado.Data.map((crypto) => {
				const objeto = {
					id: crypto.CoinInfo.Name,
					nombre: crypto.CoinInfo.FullName,
				};
				return objeto;
			});

			setCryptos(arrayCryptos);
		};

		consultalApi();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([moneda, cryptomoneda].includes('')) {
			setError(true);
			return;
		}

		setError(false);
	};

	return (
		<>
			{error && <Error>Todos los campos son obligatorios</Error>}

			<form onSubmit={handleSubmit}>
				<SelectMonedas />
				<SelectCryptomoneda />

				<InputSubmit type='submit' value='Cotizar' />
			</form>
		</>
	);
};

export default Formulario;
