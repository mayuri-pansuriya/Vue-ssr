import request from "../utils/request";

export function getProperties(page, perPage) {
  return request({
    url: "/api/properties?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}
export function getProperty(id) {
  return request({
    url: "/api/properties/" + id,
    method: "get"
  });
}
export function deleteProperty(id) {
  return request({
    url: "/api/properties/" + id,
    method: "delete"
  });
}
export function deleteImage(id) {
  return request({
    url: "/api/property-image-delete/" + id,
    method: "delete"
  });
}
export function postProperty(data) {
  return request({
    url: "/api/properties",
    method: "post",
    data
  });
}
export function putProperty(id, data) {
  return request({
    url: "/api/properties/" + id,
    method: "post",
    data
  });
}

export function getPropertyBySearch(data) {
  return request({
    url: "/api/properties-search",
    method: "post",
    data
  });
}
