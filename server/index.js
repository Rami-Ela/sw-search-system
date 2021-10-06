"use strict";

const Hapi = require("@hapi/hapi");
const axios = require("axios");

const baseURL = "https://swapi.dev/api";

/**
 * get all root SWAPI api URLs 
 * @returns 
 */
async function getAllRootURLs() {
    const response = await axios.get(baseURL);
    return response.data;
}

/**
 * get all data from all pages of the specified URL
 * @param {*} URL base URL of the data you are trying to get
 * @returns all data without page limit
 */
async function getAllPages(URL, type, searchInput) {
    let data = [];
    let currentPage = await axios.get(URL + (searchInput ? "/?search=" + searchInput : ""));
    data = data.concat(currentPage.data.results);
    while (currentPage.data.next) {
        currentPage = await axios.get(currentPage.data.next);
        data = data.concat(currentPage.data.results);
    }
    return data.map((element) => { 
        element.type = type; 
        return element;
    });
}

/**
 * Get all data from the SWAPI API 
 * @returns an array with all the elements of SWAPI API
 */
async function getAllData(searchInput) {
    const URLs = await getAllRootURLs();
    const promises = [];
    for (const type in URLs) {
        promises.push(getAllPages(URLs[type], type, searchInput));
    }
    const data = await Promise.all(promises);
    const flatData = data.flat();
    return flatData;
}

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: "localhost"
    });


    server.route({
        method: "GET",
        path: "/api",
        handler: async (request, h) => {
            const data = await getAllData(request.query.search);
            return data;
        }
    });
    

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();