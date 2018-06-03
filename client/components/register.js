const registerComponent = {
  template: `
    <div class="card-body">
      <h2>Registrera dig här</h2>
      <div class="col-sm-12">
      <form @submit.prevent="submit">
        <label>Email
          <input type="text" v-model="email" :disabled="loading" />
        </label>
        <label>Lösenord
          <input type="password" v-model="password" :disabled="loading" />
        </label>
        <button type="submit" class="btn btn-primary" :disabled="loading">Register</button>
        <br/>
        <span v-if="message">{{message}}</span>
      </form>
      </div>
    </div>
  `,
  data() {
    return {
      email: '',
      password: '',
      message: '',
      loading: false,
    };
  },
  methods: {
    submit() { 
      this.loading = true;
      http.post('/rest/register', {
        email: this.email,
        password: this.password,
      }).then(response => {
        console.log(response);
        this.loading = false;
        if(response.data.msg) {
          this.message = 'Registration complete';
        } else {
          this.message = 'Failed registration';
        }
      }).catch(error => {
        this.loading = false;
        this.message = 'Failed registration';
      });
    }
  },
  watch: {
    email() {
      this.message = '';
    },
    password() {
      this.message = '';
    }
  }
}
