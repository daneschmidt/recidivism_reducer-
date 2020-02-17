import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Get all user credentials
function* getAllUserCredentials() {
    try {
        const response = yield axios.get('/api/user-credentials/');
        console.log(response);
        yield put ({
            type: 'SET_USER_CREDENTIALS',
            payload: response.data
        })
    } catch (err) {
        console.log(`Couldn't get all users`, err)
    };
};

// Update user credentials information
function* editUserCredential(action) {
    const id = action.payload;
    try {
        const response = yield axios.put('/api/user-credentials/edit-user/', + id);
        console.log(response);
        yield put ({
            type: 'SET_USER_CREDENTIALS',
        })
    } catch (err) {
        console.log(`Couldn't update user`, err)
    };
};

// changes isActive status in database to false
function* changeUserStatus(action) {
    try {
        const response = yield axios.put('/api/user-credentials/', action.payload);
        console.log(response);
        yield put ({
            type: 'SET_USER_CREDENTIALS',
        })
    } catch (err) {
        console.log(`Couldn't update user status`, err)
    };
};

function* userCredentials() {
    yield takeLatest('GET_USER_CREDENTIALS', getAllUserCredentials);
    yield takeLatest('EDIT_USER_CREDENTIALS', editUserCredential);
    yield takeLatest('EDIT_USER_STATUS', changeUserStatus);
    
  }
  
  export default userCredentials;