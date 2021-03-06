const CategoryAdminComponent = {
    template: `
      <div class="card-body">
        <h2>Skapa en kategori</h2>
        <form @submit.prevent="submit">
          <label>Name
            <input type="text" v-model="name" :disabled="loading" required/>
          </label>
          
          <button type="submit" :disabled="loading" id="button"class="p-1 mb-2 btn btn-primary">Skapa kategori</button>
          <br/>
          <span v-if="message">{{message}}</span>
        </form>
      </div>
    `,
    data() {
      return {
        name: '',
        message: '',
        loading: false
      };
    },
    methods: {
      submit() { 
        this.loading = true;
        http.post('/rest/category', {
          name: this.name,

        }).then(response => {
          console.log(response);
          this.loading = false;
          if(response.data.name) {
            this.message = 'Category saved';
          } else {
            this.message = 'Save failed';
          }
        }).catch(error => {
          this.loading = false;
          this.message = 'Save failed';
        });
      }
    }
  }
  