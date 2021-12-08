<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list subheader>
      <v-subheader>내 정보</v-subheader>
      <v-list-item>
        <div>{{name}}</div>
      </v-list-item>
      <v-btn dark color="blue" nuxt to="/edit" type="submit">내 정보 수정</v-btn>

      <v-list-item
        v-for="chat in recent"
        :key="chat.title"
      >

        <v-list-item-icon>
          <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
            mdi-message-outline
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader>접속중인 친구</v-subheader>
        <total-friend-list :users = "friendList" />
      <v-list-item>
          <total-friend-list />
      </v-list-item>
    </v-list>
    <v-list subheader>
      <v-subheader>미접속 친구</v-subheader>
       <total-friend-list-2 :users = "friendList2" />
     <v-list-item>
        <total-friend-list-2 />
     </v-list-item>
    </v-list>
  <v-container>
    <bottom-nav />
  </v-container>
  </v-card>
</template>

<script>
import BottomNav from '../components/BottomNav.vue';
import TotalFriendList from '../components/TotalFriendList.vue';
import TotalFriendList2 from '../components/TotalFriendList2.vue';
  export default {
    components: {
        BottomNav,
        TotalFriendList,
        TotalFriendList2,
    },
      data() {
    return{
      valid: false, 
      nickname: '',
    }
  },
    computed: {
    friendList() {
      return this.$store.state.users.friendList;
    },
    friendList2() {
      return this.$store.state.users.friendList2;
    },
    name() {
      return this.$store.state.users.me.name;
    }
  },
    fetch({ store }) {
    store.dispatch('users/loadFriend');
    }
  }
  
</script>