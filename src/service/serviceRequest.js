import { API_CONSTANTS } from "../constant";
import axios from "axios";

const headers = { "Content-Type": "application/json" };

/**
 * @name getToken
 * @description This method fetch the route from the server based on token
 * @param {{url}} URI
 * @param {{request}} Object containing source and destination
 * @returns {{token}}
 */
export const getToken = (url, request) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}${url}`,
    request,
    headers
  );
};

/**
 * @name getPath
 * @description fetch the token from the server based on the starting and drop-off point
 * @param {{token}} String An alphbanumeric key
 * @return Route Info
 */

export const getPath = token => {
  let pathUrl = `${process.env.REACT_APP_BASE_URL}${
    API_CONSTANTS.route
  }/${token}`;
  return axios.get(pathUrl);
};

/**
 * @name getDirections
 * @description Fetch the directions based on the starting and drop-off point
 * This method first fetch the token and after based on token fetch the routing info
 * @param {{origin}} String Starting Point
 * @param {{destination}} String Drop-off Point
 * @param {{retryLimit}} Number Retry limit in case status is in progress
 */
export const getDirections = async (origin, destination, retryLimit) => {
  if (retryLimit && retryLimit < 1) {
    return {
      error: "Server is busy, Kindly try after some time."
    };
  }
  const url = API_CONSTANTS.route;
  const request = {
    origin,
    destination
  };
  let result;
  const {
    data: { token },
    error
  } = await getToken(url, request);

  if (token) {
    const { data, error } = await getPath(token);

    if (data) {
      if (data.status.toLowerCase() === API_CONSTANTS.inProgress) {
        result = getDirections(origin, destination, retryLimit - 1);
      } else {
        result = data;
      }
    }
    if (error) {
      result = error;
    }
  } else {
    result = error;
  }

  return result;
};

export default getDirections;
