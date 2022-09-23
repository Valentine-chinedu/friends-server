import React, { useState } from 'react';
import Login from '../../sharedcomponents/Login';
import Register from '../../sharedcomponents/Register';

import './auth.css';

const Auth = () => {
	const [isRegistering, setIsRegistering] = useState(false);

	return (
		<section className={isRegistering ? 'auth signup' : 'auth'}>
			<Login setIsRegistering={setIsRegistering} />
			<Register setIsRegistering={setIsRegistering} />
		</section>
	);
};

export default Auth;
