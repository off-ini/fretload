const data = [
  {
    id: "Accueil",
    icon: "iconsminds-home-1",
    label: "Accueil",
    to: "/app/dashboard",
    tag:'Accueil',
  },
  {
    id: "Adresses",
    icon: "iconsminds-map2",
    label: "Adresses",
    to: "/app/adresses",
    tag:'Adresses',
  },
  {
    id: "Destinataires",
    icon: "iconsminds-engineering",
    label: "Destinataires",
    to: "/app/recivers",
    tag:'Recivers',
  },
  {
    id: "Vehicules",
    icon: "iconsminds-jeep",
    label: "Vehicules",
    to: "/app/vehicules",
    tag:'Vehicules',
  },
  {
    id: "Marchandises",
    icon: "iconsminds-big-data",
    label: "Marchandises",
    to: "/app/marchandises",
    tag:'Marchandises',
  },
  {
    id: "Annonces",
    icon: "iconsminds-rss",
    label: "Annonces",
    to: "/app/annonces",
    tag:'Annonces',
  },
  {
    id: "Proposition",
    icon: "iconsminds-environmental-3",
    label: "Proposition",
    to: "/app/propositions",
    tag:'Propositions',
  },
  {
    id: "Missions",
    icon: "iconsminds-thunder",
    label: "Missions",
    to: "/app/missions",
    tag:'Missions',
  },
  {
    id: "Parametres",
    icon: "iconsminds-gear",
    label: "Paramètres",
    to: "#",
    tag:'Parametres',
    subs: [
      {
        icon: "simple-icon-tag",
        label: 'Mode Payement',
        to: '/app/mpayements',
        tag:'ModePayements',
      },   
      {
        icon: "simple-icon-tag",
        label: 'Type Marchandise',
        to: '/app/tmarchandises',
        tag:'TypeMarchandises',
      },   
      {
        icon: "simple-icon-tag",
        label: 'Type Vehicule',
        to: '/app/tvehicules',
        tag:'TypeVehicules',
      },         
    ]
  },
  /*{
    id: "secondmenu",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.second-menu",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/second-menu/second"
      }
    ]
  },
  {
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.blank-page",
    to: "/app/todo",
  },*/
];
export default data;
  