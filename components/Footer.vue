<template>
  <v-footer
    :color="bgColor"
    class="footer"
    dark
  >
    <div class="container">
      <div class="copyright">
        &copy; {{ year }}, Designed by MJ Company. Coded by MJ Company.
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    bgColor: {
      type: String,
      default: '#000000'
    }
  },
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 991px) {
  .footer {
    .copyright {
      text-align: right;
    }
  }
}
@media screen and (min-width: 992px){
  .footer {
    .copyright {
      float: right;
    }
  }
}
@media screen and (max-width: 576px){
  .footer {
    .copyright {
      text-align: center;
    }
  }
}

.container {
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
}

.footer {
  padding: 24px 0;

  nav {
    display: inline-block;
    float: left;
  }

  ul {
    margin-bottom: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        color: inherit;
        padding: $padding-base-vertical;
        font-size: $font-size-small;
        text-transform: uppercase;
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .copyright {
    font-size: $font-size-small;
  }

  &:after {
    display: table;
    clear: both;
    content: " ";
  }
}
</style>
