const ProductAdminComponent = {
    template: `
      <div class="card-body">
        <h2>Skapa en produkt</h2>
        <form @submit.prevent="submit">
          <label>Name
            <input type="text" v-model="name" :disabled="loading" required/>
          </label>
          <label>Description
            <input type="text" v-model="description" :disabled="loading" />
          </label>
          <label>Price
          <input type="number" v-model="price" :disabled="loading" />
        </label>
        <label>Vat
        <input type="number" v-model="vat" :disabled="loading" />
      </label>
      <label>Artikelnummer
      <input type="text" v-model="artnr" placeholder="t ex: abc123" :disabled="loading" />
    </label>
    <label>Kategori
      <input type="text" v-model="category" placeholder="categori ID" :disabled="loading" />
    </label>
          <button type="submit" :disabled="loading">Skapa produkt</button>
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
        category:'',
        message: '',
        loading: false
      };
    },
    methods: {
      submit() { // save a product
        this.loading = true;
        http.post('/rest/products', {//här gör vi samma som i postman
          name: this.name,
          description: this.description,
          price: this.price,
          vat: this.vat,
          artnr: this.artnr
        }).then(response => {
          console.log(response);
          this.loading = false;
          if(response.data.name) { //om jag fått nåt i name, vet jag att produkten har sparats kan bytas ut mot tex id, pris osv
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
  