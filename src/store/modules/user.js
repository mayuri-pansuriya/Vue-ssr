import { login, getInfo } from "../../api/user";
import { getToken, setToken, removeToken } from "../../utils/auth";
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    role: "",
    user: null
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_USER: (state, user) => {
    state.user = user;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ email: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          commit("SET_NAME", data.user.name);
          commit("SET_ROLE", data.user.role);
          commit("SET_USER", data.user);

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //get allusers

  // getUsers({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getUsers(state.token)
  //       .then(response => {
  //         const { data } = response;

  //         if (!data) {
  //           reject("Verification failed, please Login again.");
  //         }

  //         resolve(data);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { user } = data;

          commit("SET_NAME", user.name);
          commit("SET_ROLE", user.role);
          commit("SET_USER", user);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    removeToken(); // must remove  token  first
    // resetRouter()
    commit("RESET_STATE");
    // resolve()
    // }).catch(error => {
    //   reject(error)
    // })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
