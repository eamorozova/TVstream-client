<template>
  <div id="user-profile">
    <v-container class="mt-8">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-card>
            <div v-if="!editing">
              <v-card-title class="text-h4">{{ user.name }}</v-card-title>
              <v-card-subtitle class="text-subtitle-1">{{
                user.email
              }}</v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="beginEditing" outlined class="mr-2 mb-1">
                  <v-icon left>mdi-circle-edit-outline</v-icon>
                  Редактировать
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="editing">
              <v-card-text>
                <v-text-field
                  color="#7a6054"
                  counter
                  label="имя"
                  maxlength="32"
                  name="name"
                  type="name"
                  v-model="name"
                  :rules="[nameRules]"
                />
                <v-text-field
                  color="#7a6054"
                  label="электронная почта"
                  name="email"
                  type="email"
                  v-model="email"
                  :rules="[emailRules]"
                  v-if="!$store.state.isAdmin"
                />
                <v-text-field
                  color="#7A6054"
                  counter
                  id="register-form-password-field"
                  label="новый пароль"
                  maxlength="16"
                  name="password"
                  type="password"
                  v-model="password"
                  :rules="[passwordRules]"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  color="#ff0000"
                  class="white--text ml-2 mb-2 pr-4"
                  @click="deleteUser"
                >
                  <v-icon left>mdi-delete</v-icon>
                  удалить аккаунт
                </v-btn>
                <v-spacer />
                <v-btn
                  outlined
                  color="blue-grey darken-1"
                  @click="save"
                  :disabled="!formIsValid"
                >
                  сохранить
                </v-btn>
                <v-btn
                  color="blue-grey darken-1"
                  outlined
                  @click="cancel"
                  class="mr-2"
                >
                  отмена
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

const namePattern = /^[а-яА-ЯёЁa-zA-Z]{2,32}$/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern = /^[a-zA-Z0-9]{6,16}$/;

export default {
  name: 'UserProfile',
  async mounted() {
    this.user = (await AuthenticationService.getInfo()).data;
  },
  computed: {
    formIsValid() {
      return (
        namePattern.test(this.name) &&
        emailPattern.test(this.email) &&
        (this.password.length === 0 || passwordPattern.test(this.password))
      );
    },
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
      newPasswordUser: {
        name: '',
        email: '',
        password: '',
      },
      name: '',
      email: '',
      password: '',
      editing: false,
      nameRules: name => {
        return (
          name.length === 0 || namePattern.test(name) || 'Некорректное имя'
        );
      },
      emailRules: email => {
        return (
          email.length === 0 ||
          emailPattern.test(email) ||
          'Некорректная форма записи электронной почты'
        );
      },
      passwordRules: password => {
        this.alert = false;
        return (
          password.length === 0 ||
          passwordPattern.test(password) ||
          'Не менее шести символов, допускаются только буквы латинского алфавита верхнего и нижнего регистра и цифры'
        );
      },
    };
  },
  methods: {
    async deleteUser() {
      await AuthenticationService.delete();
      await this.$store.dispatch('setToken', null);
      await this.$store.dispatch('setUser', null);
      await this.$router.push('/');
    },
    async save() {
      this.user.name = this.name;
      this.user.email = this.email;
      if (this.password.length === 0) {
        await AuthenticationService.editInfo(this.user);
      } else {
        this.newPasswordUser.name = this.user.name;
        this.newPasswordUser.email = this.user.email;
        this.newPasswordUser.password = this.password;
        await AuthenticationService.editInfo(this.newPasswordUser);
      }
      this.editing = false;
    },
    beginEditing() {
      this.editing = true;
      this.name = this.user.name;
      this.email = this.user.email;
      this.password = '';
    },
    cancel() {
      this.editing = false;
    },
  },
};
</script>

<style scoped />
