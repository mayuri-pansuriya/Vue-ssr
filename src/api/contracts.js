import request from "@/utils/request";

export function getContracts(page, perPage) {
  return request({
    url: "/api/contracts?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}
export function deleteContract(id) {
  return request({
    url: "/api/contracts/" + id,
    method: "delete"
  });
}
export function getContract(id) {
  return request({
    url: "/api/contracts/" + id,
    method: "get"
  });
}

export function postContract(data) {
  return request({
    url: "/api/contracts",
    method: "post",
    data
  });
}

export function putContract(id, data) {
  return request({
    url: "/api/contracts/" + id,
    method: "put",
    data
  });
}

export function getContractByUser(id) {
  return request({
    url: "/api/user-contracts/" + id,
    method: "get"
  });
}
