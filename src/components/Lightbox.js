import React from 'react';

const Lightbox = ({ color }) => {
	const style = {
		width: '100px',
		height: '100px',
		backgroundColor: color,
	};
	return <div style={style}></div>;
};

export default Lightbox;
