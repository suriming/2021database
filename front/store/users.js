import Vue from "vue";

export const state = () => ({
  me: null,
  isLoggedIn: false,
  friendList: [],
  friendList2: [],
  nickname: '',
  other: {},
  status_message: '',
  name: ''
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
    var tmp3 = [];
    var tmp4 = [];
    if (tmp1.length>0){
      tmp1.length = 0;
    }
    if (tmp2.length>0){
      tmp2.length = 0;
    }
    if (tmp3.length>0){
      tmp3.length = 0;
    }
    if (tmp4.length>0){
      tmp4.length = 0;
    }
    // if (payload.data === 'No friends'){
    //   state.friendList2= [{
    //     name: 'no friend',
    //     status_message: 'empty'
    //   }, {
    //     name: 'please add friend',
    //     status_message: ''
    //   }];
    // }
    for(let i=0; i<payload.length ;i++){
      if(payload[i].LOGIN_STATE === 1) {
        tmp1.push(payload[i].NAME)
        tmp2.push(payload[i].STATUS_MESSAGE)      
      } else {
        tmp3.push(payload[i].NAME)
        tmp4.push(payload[i].STATUS_MESSAGE)        
      }
    }
    const tmpuser = tmp1.map(function(v,i) {
      return {
        name: v,
        status_message: tmp2[i]
      }
    })
    const tmpuser2 = tmp3.map(function(v,i) {
      return {
        name: v,
        status_message: tmp4[i]
      }
    })
    if (tmp1.length===0){
      state.friendList= [{
        name: 'no friend', 
        status_message: 'empty'
      }];
    } else {
      state.friendList = tmpuser;
    }
    if (tmp4.length===0){
      state.friendList2= [{
        name: 'no friend',
        status_message: 'empty'
      }, {
        name: 'please add friend',
        status_message: ''
      }];
    } else {
      state.friendList2 = tmpuser2;     
    }
  },
  loadMe(state, payload) {
    state.me.name = payload.name,
    state.me.status_message = payload.status_message
  }
};

export const actions = {
  loadMe({ commit }, payload) {
    return this.$axios.get('http://localhost:8080/user/whoAmI', {
      withCredentials: true
    });
  },

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
    await this.$axios.post('http://localhost:8080/user/login', {
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
    this.$axios.post('http://localhost:8080/user/logout', {}, {
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
    return this.$axios.get(`http://localhost:8080/api/friends/list/?My_id=${state.me.id}`, {
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