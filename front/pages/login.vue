<template>
  <div>
    <v-container>
      <v-card 
        class="mx-auto"
        max-width="500"
      >
    <!-- <v-main class="white"> -->
        <v-container>
          <!-- <v-row align="center" justify-center> -->
          <!-- <v-row>
            <v-col cols="12" sm="8"> -->
              <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-text-field
                    v-model="id"
                    :rules="idRules"
                    label="아이디"
                    type="id"
                    required
                />
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="비밀번호"
                    type="password"
                    required
                />
                <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
                <v-btn nuxt to="/signup">회원가입</v-btn>
              </v-form>
          <!-- </v-row> -->
            <!-- </v-col>
          </v-row> -->
        </v-container>
    <!-- </v-main> -->
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        id: '',
        password: '',
        idRules: [
          v => !!v || '아이디는 필수입니다.',
          // v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      isLoggedIn(){
        return this.$store.state.users.isLoggedIn;
      }
    },
    // fetch({ store }){
    //   return Promise.all([
    //     store.dispatch(this.$store.state.isLoggedIn)
    //   ])
    // },
    methods: {
      async getInfo() {
        await this.$store.dispatch('users/logIn', {
          id: this.id,
          password: this.password,
        })
      },
      async onSubmitForm() {
        if (this.$refs.form.validate()){
          await this.getInfo()
        }
        console.log(this.$store.state.users.isLoggedIn)
        if(this.$store.state.users.isLoggedIn ===true) {
          this.$store.dispatch('users/loadFriend')
          this.$store.dispatch('users/loadMe'),
          this.$router.push({
            path: '/friendpage',
          })
        } else {
          alert('아이디나 비밀번호를 다시 확인해주세요')
        }
      },
      onLogOut() {
        this.$store.dispatch('users/logOut')
      }
    }
  }
</script>

<style>
</style>