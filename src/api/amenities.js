import request from "@/utils/request";

export function getAmenities(page, perPage) {
  return request({
    url: "/api/aminities?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}

export function postAmenity(data) {
  return request({
    url: "/api/aminities",
    method: "post",
    data
  });
}
export function putAmenity(id, data) {
  return request({
    url: "/api/aminities/" + id,
    method: "put",
    data
  });
}
export function getAmenity(id) {
  return request({
    url: "/api/aminities/" + id,
    method: "get"
  });
}

export function deleteAmenity(id) {
  return request({
    url: "/api/aminities/" + id,
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
