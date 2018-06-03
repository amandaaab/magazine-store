const loginComponent = {
  template: `
    <div class="card-body">
      <h2 v-if="!user.email">Logga in</h2>
      <div class="col-sm-12" v-if="user.email">
        <h1>Welcome {{user.email}}!</h1>
        <button v-on:click="logout" :disabled="loading">Logout</button>
      </div>
      <form v-else @submit.prevent="submit">
        <label>Email
          <input type="text" v-model="email" :disabled="loading" />
        </label>
        <label>Lösenord
          <input type="password" v-model="password" :disabled="loading" />
        </label>
        <button type="submit" class="btn btn-primary" :disabled="loading">Logga in här</button>
        <br/>
        <span v-if="message" class="col-sm-12">{{message}}</span>
      </form>
    </div>
  `,
  data() {
    return {
      email: '',
      password: '',
      message: '',
      loading: false,
      user: {}
    };
  },
  created(){
    http.get('/rest/user').then(response => {
      console.log('/rest/user', response);
      this.user = response.data;
    }).catch(e => {
      console.error(e);
    });
  },
  methods: {
    submit() { // login
      this.loading = true;
      http.post('/rest/login', {
        email: this.email,
        password: this.password,
      }).then(response => {
        console.log('/rest/login', response);
        this.loading = false;
        if(response.data.email) {
          this.message = 'Inloggad';
          this.user = response.data;
        } else {
          this.message = 'Fel email/password';
        }
      }).catch(error => {
        console.log('/rest/login error', error);
        this.loading = false;
        this.message = 'Redan inloggad';
      });
    },
    logout() {
      this.loading = true;
      http.post('/rest/logout').then(response => {
        console.log(response);
        this.loading = false;
        this.message = response.data.message;
        this.user = {};
      }).catch(error => {
        this.loading = false;
        this.message = 'Redan utloggad';
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