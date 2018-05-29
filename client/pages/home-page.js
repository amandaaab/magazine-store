const HomePageComponent = {

    template: `
    <div class="homeDiv">
      <div class="row">
        <hello class="col-12 home"></hello>
        <h4>Nyheter</h4>
        <product-page v-bind:slice="3"></product-page>
      </div>
      </div>
    `
  }