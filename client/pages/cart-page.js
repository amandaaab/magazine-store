const CartPageComponent = {

    template: `
      <div class="row">
        <h1>Cart Page</h1>
       <cart class="col-12"></cart>
       <div class="col-12">
        <label for="first-name">Förnamn: </label>
        <input name="first-name" v-model="firstName"></input>
        <button v-on:click="pay">Betala</button>
       </div>
      </div>
    `
    ,
  
   /* created(){
      http.get('/rest/products').then((response) => {
        this.products = response.data;
  //  Kod för att filtrera och söka vidare, ex för att viosa 3 första produkterna på första sidan
        //      this.products = response.data.splice(0,1);
  
      }).catch((error) => {
        console.error(error);
      });
    },*/
    data(){
      return{
        firstName:''
      }
    },

    methods: {
        pay: ()=>{
            http.post('/rest/pay', {}).then(response => {
              alert('Du har betalat');
                console.log(response);
              }).catch(error => {
               console.error(error);
              });
            }
          },
        
        }
    