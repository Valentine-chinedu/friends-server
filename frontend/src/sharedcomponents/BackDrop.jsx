import { cloneElement } from 'react';

const Backdrop = ({ children, show, onClose = () => {} }) => {
	const newChildren = cloneElement(children, {
		...children.props,
		show,
	});
	const closeModal = (e) => {
		const isBackdrop =
			e.target.firstChild?.classList?.contains('backdrop__content');
		if (isBackdrop) onClose();
	};
	return (
		<div className={show ? '' : ''} onClick={closeModal}>
			<div>{newChildren}</div>
		</div>
	);
};

export default Backdrop;
