import { get } from "../../config";

const getDefaultState = () => {
  return {
    publicPath: get()["BASE_URL"] || "/"
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_PUBLIC_PATH: (state, publicPath) => {
    state.publicPath = publicPath;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
