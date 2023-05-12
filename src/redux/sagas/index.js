import {all} from "redux-saga/effects";
import Auth from "./Auth";
import Normal from "./Normal";
import User from "./User";
import Fdp from "./Fdp";
import Organization from "./Organization";

export default function* rootSaga(getState) {
    yield all([
        Auth(),
        Normal(),
        User(),
        Fdp(),
        Organization(),
    ]);
}
