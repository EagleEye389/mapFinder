import * as ApiHandler from "../../service/serviceRequest";
import { API_CONSTANTS } from "../../constant";
import axios from "axios";

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

const mockDirectionFailure = {
  status: "failure"
};

let post, get;

describe("Tests for directions api", () => {
  beforeEach(() => {
    post = jest.spyOn(axios, "post");
    get = jest.spyOn(axios, "get");
  });
  it("should test for getToken method", async () => {
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

  it("should test for getPath method", async () => {
    get.mockImplementation(() =>
      Promise.resolve({ data: mockDirectionResponse })
    );
    const { data } = await ApiHandler.getPath("token");
    expect(data).toBeDefined();
    expect(data.status).toEqual("success");
    expect(data.total_distance).toEqual(20000);
    expect(data.total_time).toEqual(1800);
    get.mockRestore();
  });

  it("should test for getDirections method", async () => {
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
    get.mockRestore();
    post.mockRestore();
  });

  it("should test for getDirections method retry check", async () => {
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
    get.mockRestore();
    post.mockRestore();
  });

  it("should test for getPath failure", async () => {
    post.mockImplementation(() =>
      Promise.resolve({
        data: {
          token: "token"
        }
      })
    );

    get.mockImplementation(() =>
      Promise.resolve({
        data: mockDirectionFailure
      })
    );

    const result = await ApiHandler.getDirections(
      "from",
      "to",
      API_CONSTANTS.retryLimit
    );
    expect(result.status).toEqual("failure");
    get.mockRestore();
    post.mockRestore();
  });
});
