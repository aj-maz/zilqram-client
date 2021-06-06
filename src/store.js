import { createStore, action } from "easy-peasy";

const store = createStore({
  user: {
      me: null,
      setMe: action((state, payload) => state.me = payload),
      refetchMe: null,
      setRefetchMe: action((state, payload) => state.refetchMe = payload),
      token: localStorage,
      setToken: action((state, payload) => state.me = payload),
  }
});

export default store;
