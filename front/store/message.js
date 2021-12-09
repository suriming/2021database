export const state = () => ({
    user: {},
    messages: [],
    users: [],
  });
  
  export const getters = {
    typingUsers: ({ users, user }) => users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
    typingStatus: ({ user }) => user.typingStatus,
  };
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
    },
    SOCKET_newMessage(state, msg) {
      state.messages = [...state.messages, msg];
    },
    SOCKET_updateUsers(state, users) {
      state.users = users;
    },
    clearData(state) {
      state.user = {};
      state.messages = [];
      state.users = [];
    },
    setTypingStatus(state, status) {
      state.user.typingStatus = status;
    },
  };
  
  export const actions = {
    socketEmit(_, { action, payload }) {
      return this._vm.$socket.emit(action, payload);
    },
    createMessage({ dispatch, state }, msg) {
      const { user } = state;
      const payload = {
        msg,
        id: user.id,
      };
  
      dispatch("socketEmit", {
        action: "createMessage",
        payload,
      });
    },
    joinRoom({ dispatch, state }) {
      const { user } = state;
  
      dispatch("socketEmit", {
        action: "joinRoom",
        payload: user,
      });
    },
    leftRoom({ commit, dispatch }) {
      dispatch("socketEmit", {
        action: "leftChat",
        payload: null,
      });
  
      commit("clearData");
    },
    setTypingStatus({ dispatch, commit, state }, typingStatus) {
      commit("setTypingStatus", typingStatus);
      const { user } = state;
      dispatch("socketEmit", {
        action: "setTypingStatus",
        payload: user,
      });
    },
    async createUser({ commit, dispatch }, user) {
      const { id } = await dispatch("socketEmit", {
        action: "createUser",
        payload: user,
      });
  
      commit("setUser", { id, ...user });
    },
    SOCKET_reconnect({ state, dispatch }) {
      const { user } = state;
      if (Object.values(user).length) {
        const { id, ...userInfo } = user;
        dispatch('createUser', userInfo);
        dispatch('joinRoom');
      }
    },
  };

// export const state = () => ({
//     mainMessage: [],
//     hasMoreMessage: true,
// });

// export const mutations = {
//     addMainMessage(state, payload) {
//         state.mainMessage.unshift(payload);
//     }
// };

// export const actions = {
//     add({ commit }, payload) {
//     //서버에 
//         commit('addMainMessage', payload);
//     },
//     loadMessage(state) {
//       const fakeMessage = Array(limit).fill().map(v => ({
//         id : Math.random().toString(),
//         User: {
//             id: 1,
//             nickname: '제로초',
//         },
//         content: 'Hello~ ${Math.random()}',
//       }));
//       state.mainMessage = state.mainMessage.concat(fakeMessage);
//       state.hasMoreMessage = fakePosts.length ===limit;
//     },
// };
