import request from "@/utils/request";

export function getNearbyAmenities(page, perPage) {
  return request({
    url: "/api/near-by-amenities?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}

export function postNearbyAmenity(data) {
  return request({
    url: "/api/near-by-amenities",
    method: "post",
    data
  });
}
export function putNearbyAmenity(id, data) {
  return request({
    url: "/api/near-by-amenities/" + id,
    method: "put",
    data
  });
}
export function getNearbyAmenity(id) {
  return request({
    url: "/api/near-by-amenities/" + id,
    method: "get"
  });
}

export function deleteNearbyAmenity(id) {
  return request({
    url: "/api/near-by-amenities/" + id,
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
