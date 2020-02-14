import request from "@/utils/request";

export function getOptions(page, perPage) {
  return request({
    url: "/api/additional-options?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}

export function postOption(data) {
  return request({
    url: "/api/additional-options",
    method: "post",
    data
  });
}
export function putOption(id, data) {
  return request({
    url: "/api/additional-options/" + id,
    method: "put",
    data
  });
}
export function getOption(id) {
  return request({
    url: "/api/additional-options/" + id,
    method: "get"
  });
}

export function deleteOption(id) {
  return request({
    url: "/api/additional-options/" + id,
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
