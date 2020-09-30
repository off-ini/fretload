import { Ability, AbilityBuilder } from "@casl/ability"
import store from "../store/index"

// Defines how to detect object's type
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item
  }
  return item.__type
}

const ability = new Ability([], { subjectName })

let currentAuth = [];
store.subscribe(() => {
  const prevAuth = currentAuth
  try{
    currentAuth = store.getState().AuthReducer.user.auth
    if (prevAuth !== currentAuth) {
      ability.update(defineRulesFor(currentAuth))
    }
  }catch(e)
  {
    ability.update(defineRulesFor(currentAuth))
  }
})

function defineRulesFor(auth) {
  const { can,  rules } = new AbilityBuilder(ability)

  can("view", "Accueil");
  can("view", "Parametres");
  can("view", "ModePayements");
  can("view", "TypeMarchandises");
  can("view", "TypeVehicules");
  can("view", "Profils");

  if (auth.roles.find(e => e === 'Admin')) {
    can("user", "Admin");

    can("add", "ModePayements");
    can("edit", "ModePayements");
    can("delete", "ModePayements");

    can("add", "TypeMarchandises");
    can("edit", "TypeMarchandises");
    can("delete", "TypeMarchandises");

    can("add", "TypeVehicules");
    can("edit", "TypeVehicules");
    can("delete", "TypeVehicules");
  }
  if (auth.roles.find(e => e === 'Proprietaire')) {
    can("user", "Proprietaire");

    can("view", "Adresses");
    can("add", "Adresses");
    can("edit", "Adresses");
    can("delete", "Adresses");

    can("view", "Recivers");
    can("add", "Recivers");
    can("edit", "Recivers");
    can("delete", "Recivers");

    can("view", "Marchandises");
    can("add", "Marchandises");
    can("edit", "Marchandises");
    can("delete", "Marchandises");

    can("view", "Annonces");
    can("add", "Annonces");
    can("edit", "Annonces");
    can("delete", "Annonces");

    can("view", "Propositions");

    can("view", "Missions");
  }
  if (auth.roles.find(e => e === 'Transporteur')) {
    can("user", "Transporteur");

    can("view", "Vehicules");
    can("add", "Vehicules");
    can("edit", "Vehicules");
    can("delete", "Vehicules");

    can("view", "Annonces");

    can("view", "Propositions");
    can("view", "ADDPropositions");
    can("view", "EDITPropositions");
    can("add", "Propositionss");
    can("edit", "Propositions");
    can("delete", "Propositions");

    can("view", "Missions");
    can("view", "ADDMissions");
    can("view", "EDITMissions");
    can("delete", "Missions");
  }
  if (auth.roles.find(e => e === 'Chauffeur')) {
    can("user", "Chauffeur");

    can("view", "Vehicules");
    can("add", "Vehicules");
    can("edit", "Vehicules");
    can("delete", "Vehicules");

    can("view", "Annonces");

    can("view", "Propositions");
    can("view", "ADDPropositions");
    can("view", "EDITPropositions");
    can("add", "Propositionss");
    can("edit", "Propositions");
    can("delete", "Propositions");

    can("view", "Missions");
    can("view", "ADDMissions");
    can("view", "EDITMissions");
    can("delete", "Missions");
  }
  return rules
}

export default ability