import React from 'react';
import './App.css';
import { Main } from './templates/Main'

export default props =>
	<React.Fragment>
		<header>
			<h1> Calcule it! </h1>
		</header>
		<main className="main">
			<Main/>
		</main>
	</React.Fragment>

