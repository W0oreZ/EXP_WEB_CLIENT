import L from "leaflet";

export const iconTracker = new L.Icon({
  iconUrl: require("./img/car2.svg"),
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  iconSize: [30, 40]
});

export const iconPOI = new L.Icon({
  iconUrl: require("./img/car.svg"),
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  iconSize: [30, 40]
});

export const iconCamion = new L.Icon({
  iconUrl: require("./img/Camion.svg"),
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  iconSize: [30, 40]
});
