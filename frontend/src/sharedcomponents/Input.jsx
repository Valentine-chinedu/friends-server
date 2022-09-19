import React, { useState } from 'react';

import { useRef } from 'react';

const Input = ({ placeholder, handler }) => {
	const [value, setValue] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		if (value.trim()) await handler(value.trim());
		setValue('');
	};

	return (
		<form onSubmit={submitHandler}>
			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button type='submit' aria-label='submit'>
				sendIcon
			</button>
		</form>
	);
};

export default Input;
