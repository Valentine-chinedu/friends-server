import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import modalReducer from './slices/modalSlice';
import postReducer from './slices/postSlice';
import messageReducer from './slices/messageSlice';
import socketReducer from './slices/socketSlice';
import usersReducer from './slices/usersSlice';

export default combineReducers({
	user: userReducer,
	modal: modalReducer,
	post: postReducer,
	message: messageReducer,
	socket: socketReducer,
	users: usersReducer,
});
