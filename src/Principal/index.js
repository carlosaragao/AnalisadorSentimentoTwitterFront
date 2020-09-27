import React, { useState } from 'react';
import './styles.css'
import api from '../services/api'
import { Doughnut } from 'react-chartjs-2'
import logo from '../assets/logo.png'

function Principal() {
	const [chart, setChart] = useState({
		name: 'React',
		data: {
			datasets: [{
				data: [0, 0, 0],
				backgroundColor: ["#FF5733", "#24B2FE", "#5DFE24"]
			}],
			labels: [
				'Negativo',
				'Neutro',
				'Positivo'
			]
		}
	})

	function openModal(event) {
		event.preventDefault();

		api.post('/analisar', {
			nome_perfil_usuario: document.getElementById("input").value
		}).then(params => {
			document.getElementById("myModal").style.visibility = "visible";

			setChart({
				name: 'React',
				data: {
					datasets: [{
						data: [(params.data.media_negativa * 100), (params.data.media_neutra * 100), (params.data.media_positiva * 100)],
						backgroundColor: ["#FF5733", "#24B2FE", "#5DFE24"]
					}],
					labels: [
						'Negativo',
						'Neutro',
						'Positivo'
					]
				}
			})

		})

	}

	function closeModal() {
		document.getElementById('myModal').style.visibility = 'hidden';
	}

	return (
		<div>
			<header>

				<img
					className="logo"
					src={logo}
					alt="logo" />
				<section className="teste">
					<h2>Faça sua análise !</h2>
					<p>Modelo de treinamento criado para trazer
					um prognóstico com base no perfil
						buscando a probabilidade do usuário ter depressão ou ansiedade</p>
				</section>

			</header>

			<section id='form' className="form hide" >
				<h2>Digite o @ do perfil do twitter desejado</h2>
				<form method="POST">
					<input
						type="text"
						id="input"
						name="name"
						placeholder="Usuário"
					/>

					<button id="myBtn" onClick={openModal}>Fazer análise</button>
				</form>

			</section>


			<div id="myModal" className="modal">


				<div className="modal-content">
					<span className="close" onClick={closeModal}>&times;</span>
					<p>Resultado da análise</p>
					<p className="subtitle">em %, dado os últimos 100 tweets do usuário</p>

					<div className="chart">
						<Doughnut
							data={chart.data}
							width={"1125px"}
							height={"575"}
							options={{
								responsive: true,
								maintainAspectRatio: false
							}}
						/>
					</div>
				</div>

			</div>
		</div>
	)
}
export default Principal;