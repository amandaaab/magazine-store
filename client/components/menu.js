const MenuComponent = {

    template: `
      <div class="nav">
      <ul class="nav-item">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Hem</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Produkter</router-link>
        </li>
        </ul>

        <ul class="nav-item">
        <router-link class="nav-link" to="/login"><i class="fas fa-user fa-2x"></i>

        </router-link>
      </li>
      <li class="nav-item" id="cartLink">
        <router-link class="nav-link" to="/cart"><i class="fas fa-shopping-bag fa-2x"></i></router-link>
      </li>
      </ul>
      </div>
    `
  }