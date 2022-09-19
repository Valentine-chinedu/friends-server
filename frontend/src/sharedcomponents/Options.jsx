import React, { useState } from 'react';
import { useEffect } from 'react';

const Options = ({ options }) => {
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	const handleOutsideClick = (e) => {
		if (
			!e.target.classList.contains('options') &&
			!e.target.classList.contains('options__icon')
		) {
			setIsOptionsVisible(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
		return () => document.body.removeEventListener('click', handleOutsideClick);
	});

	const handleClick = (handler) => {
		setIsOptionsVisible(false);
		handler();
	};

	return (
		<div className='options' onClick={() => setIsOptionsVisible((val) => !val)}>
			<p>optionsIcon</p>
			<ul className={isOptionsVisible ? 'show' : ''}>
				{Object.entries(options).map(([title, handler], i) => (
					<li onClick={() => handleClick(handler)} key={i}>
						{title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Options;
