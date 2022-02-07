import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://swapi.dev/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default class API {
  // Get Items
  static async getItemsFromCategory(categoryName, page) {
    let res = await axiosAPI.get(`/${categoryName}/?page=${page}`);
    return res.data;
  }

  // Planets
  static async getAllPlanets() {
    let res = await axiosAPI.get('/planets');
    return res.data;
  }

  static async getOnePlanet(id) {
    let res = await axiosApi.get('/planets/' + id);
    return res.data;
  }

  // Species
  static async getAllSpecies() {
    let res = await axiosAPI.get('/species');
    return res.data;
  }

  static async getOneSpecies(id) {
    let res = await axiosApi.get('/species/' + id);
    return res.data;
  }

  // Films
  static async getAllFilms() {
    let res = await axiosAPI.get('/films');
    return res.data;
  }

  static async getOneFilm(id) {
    let res = await axiosApi.get('/films/' + id);
    return res.data;
  }

  // Vehicles
  static async getAllVehicles() {
    let res = await axiosAPI.get('/vehicles');
    return res.data;
  }

  static async getOneVehicle(id) {
    let res = await axiosApi.get('/vehicles/' + id);
    return res.data;
  }

  // Starships
  static async getAllStarships() {
    let res = await axiosAPI.get('/starships');
    return res.data;
  }

  static async getOneStarship(id) {
    let res = await axiosApi.get('/starships/' + id);
    return res.data;
  }

  // People
  static async getAllPeople() {
    let res = await axiosAPI.get('/people');
    return res.data;
  }

  static async getOnePeople(id) {
    let res = await axiosApi.get('/people/' + id);
    return res.data;
  }
}