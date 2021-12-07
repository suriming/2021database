<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list subheader>
      <v-subheader>내 정보</v-subheader>

      <v-list-item
        v-for="chat in recent"
        :key="chat.title"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${chat.title} avatar`"
            :src="chat.avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="chat.title"></v-list-item-title>
        </v-list-item-content>

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

      <!-- <v-list-item> -->
        <total-friend-list :users = "friendList" />
        <!-- <v-list-item-avatar> -->
          <!-- <total-friend-list /> -->
          <!-- <v-img
            :alt="`${chat.title} avatar`"
            :src="chat.avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="chat.title"></v-list-item-title>
        </v-list-item-content> -->
      <!-- </v-list-item> -->
    </v-list>
  <v-container>
    <bottom-nav />
  </v-container>
  </v-card>
</template>

<script>
import BottomNav from '../components/BottomNav.vue';
import TotalFriendList from '../components/TotalFriendList.vue';
  export default {
    components: {
        BottomNav,
        TotalFriendList,
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
    }
  },
  fetch({ store }) {
    store.dispatch('users/loadFriend');
  }
  }
</script>