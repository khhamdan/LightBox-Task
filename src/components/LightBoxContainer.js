import React, { useEffect, useState } from 'react';
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

	useEffect(() => {
		console.log(`useEffect - Current Index updated: ${currentIndex}`);
	}, [currentIndex]);

	const handleNext = () => {
		const newColors = [
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
		];
		const newHistory = [...history.slice(0, currentIndex + 1), newColors];
		const newIndex = newHistory.length - 1;

		console.log(
			`handleNext - New Index: ${newIndex}, New History Length: ${newHistory.length}`
		);

		setHistory(newHistory);
		setCurrentIndex(newIndex);
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const isPreviousDisabled = currentIndex <= 0;

	console.log(
		`Render - Current Index: ${currentIndex}, Is Previous Disabled: ${isPreviousDisabled}`
	);

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
			<div data-testid="current-index">{currentIndex}</div>
			<button onClick={handlePrevious} disabled={isPreviousDisabled}>
				Previous
			</button>
			<button onClick={handleNext}>Next</button>
		</div>
	);
};

export default LightBoxContainer;
