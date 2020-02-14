import request from "@/utils/request";

export function getContractLengths(page, perPage) {
  return request({
    url: "/api/contract-lengths?perPage=" + perPage + "&page=" + page,
    method: "get"
  });
}

export function getContractLength(id) {
  return request({
    url: "/api/contract-lengths/" + id,
    method: "get"
  });
}

export function postContractLength(data) {
  return request({
    url: "/api/contract-lengths",
    method: "post",
    data
  });
}

export function putContractLength(id, data) {
  return request({
    url: "/api/contract-lengths/" + id,
    method: "put",
    data
  });
}

export function deleteContract(id) {
  return request({
    url: "/api/contract-lengths/" + id,
    method: "delete"
  });
}
