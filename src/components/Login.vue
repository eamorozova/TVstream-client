<!--template>
  <div>
    <h1>Login</h1>
    <div>
      <v-text-field
          type="email"
          name="email"
          v-model="email"
          placeholder="email" />
      <v-text-field
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
      />
      <div v-html='error' />
      <button @click='login'>Login</button>
    </div>
  </div>
</template-->

<script>
import AuthenticationService from '../services/AuthenticationService';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        await this.$store.dispatch('setToken', response.data.token);
        await this.$store.dispatch('setUser', response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  name: 'Login',
};
</script>

<style>
h1 {
  text-align: center;
}

</style>
