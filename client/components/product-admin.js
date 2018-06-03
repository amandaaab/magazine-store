const ProductAdminComponent = {
    template: `
      <div class="card-body">
        <h2>Skapa en produkt</h2>
        <form @submit.prevent="submit">
          <label>Name
            <input type="text" v-model="name" class="createProd" :disabled="loading" required/>
          </label>
          <label>Description
            <input type="text" v-model="description" :disabled="loading" class="createProd" />
          </label>
          <label>Price
          <input type="number" v-model="price" :disabled="loading"class="createProd" />
        </label>
        <label>Vat
        <input type="number" v-model="vat" :disabled="loading" class="createProd"/>
      </label>
      <label>Artikelnummer
      <input type="text" v-model="artnr" placeholder="t ex: abc123" :disabled="loading" class="createProd"/>
    </label>
    <label>Kategori
      <input type="text" v-model="category" placeholder="categori ID" :disabled="loading" class="createProd"/>
    </label>
          <button type="submit" :disabled="loading" id="button" class="p-1 mb-2 btn btn-primary">Skapa produkt</button>
          <br/>
          <span v-if="message">{{message}}</span>
        </form>
      </div>
    `,
    data() {
      return {
        name: '',
        description: '',
        price: 0,
        vat: 0.25,
        artnr: '',
        category: '',
        message: '',
        loading: false
      };
    },
    methods: {
      submit() { 
        this.loading = true;
        http.post('/rest/products', {
          name: this.name,
          description: this.description,
          price: this.price,
          vat: this.vat,
          artnr: this.artnr,
          category: this.category
        }).then(response => {
          console.log(response);
          this.loading = false;
          if(response.data.name) { 
            this.message = 'Product saved';
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
  