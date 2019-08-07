import * as ApiHandler from "../../api/apiRequest";
import { API_CONSTANTS } from "../../constant";
import axiosInstance from "../../api/axiosSetup";

const mockDirectionResponse = {
  status: "success",
  path: [
    ["22.372081", "114.107877"],
    ["22.326442", "114.167811"],
    ["22.284419", "114.159510"]
  ],
  total_distance: 20000,
  total_time: 1800
};

const mockTokenResponse = {
  token: "token"
};

const mockDirectionResponseRetry = {
  status: "in progress"
};

describe("Tests for directions api", () => {
  it("Should test for getToken method", async () => {
    const post = jest.spyOn(axiosInstance, "post");
    const url = API_CONSTANTS.route;
    const request = {
      origin: "origin",
      destination: "destination"
    };

    post.mockImplementation(() =>
      Promise.resolve({
        data: mockTokenResponse
      })
    );
    const token = await ApiHandler.getToken(url, request);
    expect(token).toBeDefined();
    post.mockRestore();
  });

  it("Should test for getPath method", async () => {
    const get = jest.spyOn(axiosInstance, "get");

    get.mockImplementation(() =>
      Promise.resolve({ data: mockDirectionResponse })
    );

    const result = await ApiHandler.getPath("token");
    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
    expect(result.total_distance).toEqual(20000);
    get.mockRestore();
  });

  it("Should test for getDirections method", async () => {
    const get = jest.spyOn(axiosInstance, "get");
    const post = jest.spyOn(axiosInstance, "post");

    post.mockImplementation(() =>
      Promise.resolve({
        data: {
          token: "token"
        }
      })
    );

    get.mockImplementation(() =>
      Promise.resolve({
        data: mockDirectionResponse
      })
    );

    const result = await ApiHandler.getDirections(
      "from",
      "to",
      API_CONSTANTS.retryLimit
    );
    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
  });

  it("Should test for getDirections method retry check", async () => {
    const post = jest.spyOn(axiosInstance, "post");
    const get = jest.spyOn(axiosInstance, "get");
    post.mockImplementation(() =>
      Promise.resolve({
        data: {
          token: "token"
        }
      })
    );

    get.mockImplementation(() =>
      Promise.resolve({
        data: mockDirectionResponseRetry
      })
    );

    const result = await ApiHandler.getDirections(
      "from",
      "to",
      API_CONSTANTS.retryLimit
    );
    expect(result.error).toEqual(API_CONSTANTS.inProgressErrorMessage);
  });
});
