<template>
  <div>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="500"      
        >
        <v-container>
          <v-btn color="blue" nuxt to="/friendpage">뒤로가기</v-btn>
          <v-subheader>내 정보 수정</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              v-model="status_message"
              label="상태 메시지"
              type="status_message"
              :rules="status_messageRules"
              required
            />
            <v-btn color="blue" type="submit" nuxt to = "/friendpage">변경하기</v-btn>
          </v-form>
        </v-container>
        <v-container fluid>
      <v-row>
        <v-col
          cols="12"
        >
          <v-textarea
            solo
            name="csv-input"
            label="현재 위치"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
        <v-container>
            <v-file-input placeholder="위치정보가 담긴 csv파일을 올려보아요!"
              truncate-length="15"
            ></v-file-input>
        </v-container>
        <v-container>
            <v-btn color="blue" type="submit" nuxt to = "/login">로그아웃</v-btn>
            <v-btn color="blue" type="submit" nuxt to="/login">회원탈퇴</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        csvfile: '',
        valid: false,
        status_message: '',
        terms: false,
        area:[
          {name : '학관', value: '학관'},
          {name : '백양관', value: '백악관'},
          {name : '공학관', value: '공학관'},
          {name : '신촌역', value: '신촌역'}
        ],
      };
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/signUp', {
            nickname: this.nickname,
            email: this.email,
          })
            .then(() => {
              this.$router.push({
                path: '/login',
              });
            })
            .catch(()=> {
               alert('폼이 유효하지 않습니다.'); 
            });
        }
      },
    },
    head() {
      return {
        title: '내 정보 수정',
      };
    },
  };
</script>
