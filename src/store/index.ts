import { createStore } from 'vuex';

interface CustomError extends Error {
  code?: number;
}

export default createStore({
  state: {
    users: [],
    currentUser: null,
    error: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setError(state, error) {
      state.error = error;
    },
  },
});
