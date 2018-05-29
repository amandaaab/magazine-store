const MenuComponent = {

    template: `
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Hem</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Produkter</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/login">Konto</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/cart">Varukorg</router-link>
      </li>
      </ul>
    `
  }