import Vue from "vue";

export const state = () => ({
  me: null,
  isLoggedIn: false,
  friendList: [],
  nickname: '',
  other: {}
});


const totalFriends = 8;
const limit=3;

export const mutations = {
  setMe(state, payload) {
    console.log(payload)
    if (payload.success == false) {
      state.isLoggedIn = false
    }
    else {
      state.isLoggedIn = true
      console.log(state.isLoggedIn)
      state.me = payload
    }
  },
  logOut(state, payload){
    state.isLoggedIn = false
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
  loadFriend(state, payload) {
    console.log(payload[0])
    console.log(payload[0].FRIEND_ID)
    var tmp1 = [];
    var tmp2 = [];
    if (tmp1.length>0){
      tmp1.length = 0;
    }
    if (tmp2.length>0){
      tmp2.length = 0;
    }
    for(let i=0; i<2;i++){
      tmp1.push(payload[i].NAME)
      tmp2.push(payload[i].STATUS_MESSAGE)
    }
    const tmpuser = tmp1.map(function(v,i) {
      return {
        id: v,
        nickname: tmp2[i]
      }
    })
    state.friendList = tmpuser;
    // const tmp = Array.map( v=>
    //   id: 
    //   )
    // state.friendList = payload.data
    // const diff = totalFriends - state.friendList.length;
    // const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
    //   id: Math.random().toString(),
    //   nickname: Math.floor(Math.random()*1000),
    // }));

  //  state.friendList = state.friendList.concat(tmpuser);
    // state.friendList = payload.data
  },
};

export const actions = {
  async loadUser({ state, commit }) {
    try {
      const res = await this.$axios.get('/user', {
        withCredentials: true,
      });
      commit('setMe', res.data);
    } catch (err) {
      console.error(err);
    }
  },

  signUp({ commit, state }, payload) {
    this.$axios.post('http://localhost:3085/user/signup', {
      id: payload.id,
      password: payload.password,
      name: payload.nickname,
      type: payload.membership
    }, {
      withCredentials: true,
    })
    .then((res) => {
      commit('setMe', res.data)
    })
    .catch((err) => {
      console.error(err);
    });
  },
  async logIn({ commit }, payload) {
    await this.$axios.post('http://localhost:3085/user/login', {
      id: payload.id,
      password: payload.password,
    }, {
      withCredentials:true,
    })
    .then((res) => {
      commit('setMe', res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  },   
  logOut( { commit }) {
    this.$axios.post('http://localhost:3085/user/logout', {}, {
      withCredentials: true,
    }),
    commit('logOut')
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
  loadFriend({ commit, state }, payload) {
    // console.log(data);
    // commit('loadFriend');
    return this.$axios.get('http://localhost:3085/api/friends/list/?My_id=admin@yonsei.ac.kr', {
      withCredentials: true,
      res: [],
    })
      .then((res) => {
        // console.log(res.FRIEND_ID)
        // const data = res.body
        // const test = res.data.FRIEND_ID.
        console.log(res),
        console.log(res.data),
        
        commit('loadFriend', res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  },
}