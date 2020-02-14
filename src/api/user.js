import request from "../utils/request";

export function login(data) {
  return request({
    url: "/api/login",
    method: "post",
    data
  });
}

export function getUsers(page, perPage) {
  return request({
    url: "/api/users?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}

export function postUser(data) {
  return request({
    url: "/api/users",
    method: "post",
    data
  });
}
export function regUser(data) {
  return request({
    url: "/api/register",
    method: "post",
    data
  });
}
export function putUser(id, data) {
  return request({
    url: "/api/users/" + id,
    method: "put",
    data
  });
}
export function getUser(id) {
  return request({
    url: "/api/users/" + id,
    method: "get"
  });
}

export function deleteUser(id) {
  return request({
    url: "/api/users/" + id,
    method: "delete"
  });
}

export function getInfo() {
  return request({
    url: "/api/details",
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "post"
  });
}
