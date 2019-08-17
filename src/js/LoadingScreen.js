import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/LoadingScreen.scss';

const LoadingScreen = () => (
	<div className="justified-mosaic-loading">
		<FontAwesomeIcon icon={faSpinner} />
	</div>
);

export default LoadingScreen;
