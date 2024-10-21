import React, { useState } from 'react';
import Lightbox from './Lightbox';

const generateRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const LightBoxContainer = () => {
	const [history, setHistory] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(-1);

	const handleNext = () => {
		const newColors = [
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
		];
		const newHistory = [...history.slice(0, currentIndex + 1), newColors];
		setHistory(newHistory);
		setCurrentIndex(newHistory.length - 1);
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const currentColors = history[currentIndex] || [
		'#FFFFFF',
		'#FFFFFF',
		'#FFFFFF',
	];

	return (
		<div>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '10px',
				}}
			>
				{currentColors.map((color, index) => (
					<Lightbox key={index} color={color} />
				))}
			</div>
			<button onClick={handlePrevious} disabled={currentIndex <= 0}>
				Previous
			</button>
			<button onClick={handleNext}>Next</button>
		</div>
	);
};

export default LightBoxContainer;
