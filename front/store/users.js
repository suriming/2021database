import Vue from "vue";

export const state = () => ({
  me: null,
  friendList: []
});

const totalFriends = 8;
const limit=3;

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  }, 
  changeNickname(state, payload){
    state.me.nickname = payload.nickname
  },
  addFriend(state, payload){
    state.friendList.push(payload);
  },
  removeFriend(state, payload){
    const index = state.friendList.findIndex(v => v.id ===payload.id);
    state.follwerList.splice(index, 1);
  },
  loadFriend(state) {
    const diff = totalFriends - state.friendList.length;
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000),
    }));
    state.friendList = state.friendList.concat(fakeUsers);
    // state.hasMoreFollower = fakeUsers.length === limit;
  },
};

export const actions = {
  signUp({ commit, state }, payload) {
  // 서버에 회원가입 요청을 보내는 부분
    commit('setMe', payload)
  },
  logIn({ commit }, payload) {
    commit('setMe', payload)
  },   
  logOut(context, payload) {
    commit('setMe', null);
  },
  changeNickname({ commit }, payload) {
    commit('changeNickname', payload);
  },
  addFriend({ commit }, payload) {
    commit('addFriend', payload);
  },
  removeFriend({ commit }, payload) {
    // 비동기 요청
    commit('removeFriend', payload);
  },
};