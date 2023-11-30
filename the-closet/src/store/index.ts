// store/index.ts
import { createStore, Commit } from 'vuex';

export interface User {
  username: string;
  email: string;
}

export interface AuthState {
  loggedIn: boolean;
  user: User | null;
}

const state: AuthState = {
  loggedIn: false,
  user: null
};

const mutations = {
  login(state: AuthState, user: User) {
    state.loggedIn = true;
    state.user = user;
  },
  logout(state: AuthState) {
    state.loggedIn = false;
    state.user = null;
  }
};

const actions = {
  async loginUser({ commit }: { commit: Commit }, credentials: { username: string; password: string }) {
    // Simulated login logic (replace this with actual authentication logic)
    // For demonstration, assuming success if username is 'example' and password is 'password'

    console.warn("credentials:", credentials)

    if (credentials.username === 'example' && credentials.password === 'password') {
      // Simulating user data after successful login
      const user: User = { username: credentials.username, email: 'example@example.com' };
      commit('login', user);
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logoutUser({ commit }: { commit: Commit }) {
    commit('logout');
  }
};

export default createStore({
  state,
  mutations,
  actions
});
