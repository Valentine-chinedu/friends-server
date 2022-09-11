import { months } from '../date';

const getDateString = (date) => {
	if (!date) return '';
	let newDate = new Date(date);
	newDate = `${newDate.getDate()} ${
		months[newDate.getMonth()]
	} ${newDate.getFullYear()}`;
	return newDate;
};

export default getDateString;
