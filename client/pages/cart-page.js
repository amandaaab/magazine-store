const CartPageComponent = {

    template: `
    <div class="container mt-5">
      <div class="row">
       <cart class="col-sm-6"></cart>
       <div class="payDiv col-4">
        <button class="payButton col-sm-6  mt-5 btn btn-success" v-on:click="pay">Betala</button>
       </div>
      </div>
      </div>
    `
    ,

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
    