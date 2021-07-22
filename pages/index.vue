<!--suppress CssOverwrittenProperties, CssUnknownTarget -->
<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.2)), url('header.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.2)), url('header.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.2)), url('header.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.2)), url('header.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" :src="'now-logo.png'" alt="">

          <h1 class="h1-seo">
            My Wallet
          </h1>

          <h3 class="h3-seo">
            A beautiful service for beautiful people. <br> Start earning.
          </h3>

          <v-btn
            rounded
            plain
            outlined
            dark
            @click="$router.push({name: 'sign-in'})"
          >
            Get started
          </v-btn>
        </div>
        <h5 class="category category-absolute">
          Designed by MJ Company.
          Coded by MJ Company.
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import Parallax from '../components/Parallax'

export default {
  name: 'WelcomePage',
  components: { Parallax },
  layout: 'parallax'
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 100vh;

  .container {
    height: 100vh;
    left: 0;
    padding: 200px;
    position: absolute;
    right: 0;
    top: 0;

    .content-center {
      color: rgba(255, 255, 255, .9);
      text-align: center;
    }
  }

  .category-absolute {
    bottom: 0;
    color: rgba(255, 255, 255, .6);
    margin-bottom: 50px;
    left: 0;
    padding: 0;
    position: absolute;
    right: 0;
    text-align: center;
    width: 100%;
  }
}

.brand {
  .n-logo {
    max-width: 100px;
    margin-bottom: 40px;
  }

  .h1-seo {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 300;
    margin-bottom: 20px;
  }

  .h3-seo {
    font-size: 1.9em;
    font-weight: 400;
    margin-bottom: 30px;
  }
}

.parallax {
  width: 100%;
  height: 100vh !important;
}
</style>
