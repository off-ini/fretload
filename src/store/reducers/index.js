import { combineReducers } from "redux";
import settings from './Settings';
import menu from './Menu';
import AuthReducer from "./AuthReducer";
import UsersReducer from "./UsersReducer";
import ReciverReducer from "./ReciverReducer";
import AdresseReducer from './AdresseReducer';
import TypeVehiculeReducer from './TypeVehiculeReducer';
import TypeMarchandiseReducer from './TypeMarchandiseReducer';
import ModePayementReducer from './ModePayementReducer';
import MarchandiseReducer from './MarchandiseReducer';
import VehiculeReducer from './VehiculeReducer';
import AnnonceReducer from './AnnonceReducer';
import PropositionReducer from './PropositionReducer';
import MissionReducer from './MissionReducer';
import NotificationReducer from './NotificationReducer';


const All = combineReducers({
    menu,
    settings,
    AuthReducer, 
    UsersReducer,
    ReciverReducer,
    AdresseReducer,
    TypeVehiculeReducer,
    TypeMarchandiseReducer,
    ModePayementReducer,
    MarchandiseReducer,
    VehiculeReducer,
    AnnonceReducer,
    PropositionReducer,
    MissionReducer,
    NotificationReducer,
});

export default All;
