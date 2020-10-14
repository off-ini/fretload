import React from 'react';

import { Dashboard } from './views/Dashboard';

const Profil = React.lazy(() => import('./views/user/Profil'));
const Reciver = React.lazy(() => import('./views/reciver/Reciver'));
const Adresse = React.lazy(() => import('./views/adresse/Adresse'));
const AddAdresse = React.lazy(() => import('./views/adresse/AddAdresse'));
const EditAdresse = React.lazy(() => import('./views/adresse/EditAdresse'));
const MPayement = React.lazy(() => import('./views/mpayement/MPayement'));
const TMarcahndise = React.lazy(() => import('./views/tmarchandise/TMarchandise'));
const TVehicule = React.lazy(() => import('./views/tvehicule/TVehicule'));
const Vehicule = React.lazy(() => import('./views/vehicule/Vehicule'));
const Marchandise = React.lazy(() => import('./views/marchandise/Marchandise'));
const Annonce = React.lazy(() => import('./views/annonce/Annonce'));
const Proposition = React.lazy(() => import('./views/proposition/Proposition'));
const AddProposition = React.lazy(() => import('./views/proposition/AddProposition'));
const EditProposition = React.lazy(() => import('./views/proposition/EditProposition'));
const Mission = React.lazy(() => import('./views/mission/Mission'));
const MissionPaided = React.lazy(() => import('./views/mission/MissionPaided'));
const Tracker = React.lazy(() => import('./views/mission/Tracker'));
const StreamMap = React.lazy(() => import('./views/mission/Stream'));
const AddMission = React.lazy(() => import('./views/mission/AddMission'));
const EditMission = React.lazy(() => import('./views/mission/EditMission'));
const RapportMission = React.lazy(() => import('./views/mission/MissionRapport'));


export default [
  { path: "/app", exact: true, name: "Acceuil" },
  { path: "/app/dashboard", name: "Dashboard", tag:'Accueil', component: Dashboard },
  { path: "/app/user/profil", name: "Profil", tag:'Profils', component: Profil },
  { path: "/app/recivers", name: "Reciver", tag:'Recivers', component: Reciver },
  { path: "/app/adresses", exact: true, name: "Adresse", tag:'Adresses', component: Adresse },
  { path: "/app/adresses/add", name: "Adresse", tag:'Adresses', component: AddAdresse },
  { path: "/app/adresses/edit/:id", name: "Adresses", tag:'Adresses', component: EditAdresse },
  { path: "/app/mpayements", name: "ModePayement", tag:'ModePayements', component: MPayement },
  { path: "/app/tmarchandises", name: "TypeMarchandise", tag:'TypeMarchandises', component: TMarcahndise },
  { path: "/app/tvehicules", name: "TypeVehicule", tag:'TypeVehicules', component: TVehicule },
  { path: "/app/vehicules", name: "Vehicule", tag:'Vehicules', component: Vehicule },
  { path: "/app/marchandises", name: "Marchandise", tag:'Marchandises', component: Marchandise },
  { path: "/app/annonces", name: "Annonce", tag:'Annonces', component: Annonce },
  { path: "/app/propositions", exact:true, name: "Proposition", tag:'Propositions', component: Proposition },
  { path: "/app/propositions/add/:id", name: "Add Proposition", tag:'ADDPropositions', component: AddProposition },
  { path: "/app/propositions/edit/:id", name: "Edit Proposition", tag:'EDITPropositions', component: EditProposition },
  { path: "/app/missions", exact: true, name: "Mission", tag:'Missions', component: Mission },
  { path: "/app/missions/stream/:id", name: "Stream", tag:'Missions', component: StreamMap },
  { path: "/app/missions/tracker", name: "Tracker", tag:'Missions', component: Tracker },
  { path: "/app/missions/paided", name: "Paided", tag:'Paided', component: MissionPaided },
  { path: "/app/missions/add/:id", name: "Add Mission", tag:'ADDMissions', component: AddMission },
  { path: "/app/missions/edit/:id", name: "Edit Mission", tag:'EDITMissions', component: EditMission },
  { path: "/app/missions/rapport/:id", name: "Rapport Mission", tag:'RAPPORTMissions', component: RapportMission },
];