import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editProfile(action) {
    console.log('rawr', action.payload.infoKey);
    console.log('meow', action.payload);
    const id = action.payload.infoKey;
    try {
        yield axios({
            method: 'PUT',
            url: '/api/editprofile/' + id,
            data: action.payload
        });
        put({
            type: 'GET_PROFILE'
        });
    } catch (err) {
        console.log('error with edit profile', err);
    }
}

function* editProfileSaga() {
    yield takeLatest('EDIT_PROFILE', editProfile);
}

export default editProfileSaga;