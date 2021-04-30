<!--suppress JSCheckFunctionSignatures, JSUnresolvedVariable, CssOverwrittenProperties, CssUnknownTarget -->
<template>
  <div class="page-header">
    <parallax
      class="parallax"
      style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.9), rgba(44, 44, 44, 0.6)), url('login.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.9), rgba(44, 44, 44, 0.6)), url('login.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.9), rgba(44, 44, 44, 0.6)), url('login.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.9), rgba(44, 44, 44, 0.6)), url('login.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
    />
    <div class="container">
      <div class="col-md-6 ml-auto mr-auto">
        <v-card
          color="transparent"
          outlined
        >
          <div class="logo-container">
            <img
              :src="'now-logo.png'"
              alt=""
              @click="$router.push({name: 'index'})"
            >
          </div>

          <v-card-text class="py-1">
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                prepend-inner-icon="mdi-at"
                label="Email"
                :rules="[
                  $rules.required,
                ]"
                dark
                filled
                rounded
                dense
              />

              <v-text-field
                v-model="password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                label="Password"
                :rules="[
                  $rules.required,
                ]"
                dark
                filled
                rounded
                dense
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <div class="buttons">
              <v-btn
                color="primary"
                :disabled="!valid"
                dark
                rounded
                @click="sendRequest"
              >
                Log in
              </v-btn>

              <div class="secondary-buttons mt-3">
                <v-btn
                  color="white"
                  x-small
                  plain
                  @click="$router.push({ name: 'sign-up' })"
                >
                  Create Account
                </v-btn>

                <v-btn
                  color="white"
                  x-small
                  plain
                >
                  Forgot password?
                </v-btn>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SignIn',
  layout: 'parallax',
  data () {
    return {
      valid: true
    }
  },
  computed: {
    email: {
      get () { return this.getEmail() },
      set (val) { this.setEmail(val) }
    },
    password: {
      get () { return this.getPassword() },
      set (val) { this.setPassword(val) }
    }
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapGetters('authorization', ['getEmail', 'getPassword']),
    ...mapMutations('authorization', ['resetState', 'setEmail', 'setPassword']),
    ...mapActions('authorization', ['login']),
    sendRequest () {
      this.login()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 90vh;

  .container {
    height: 100vh;
    left: 0;
    padding: 200px;
    position: absolute;
    right: 0;
    top: 0;

    .logo-container {
      color: rgba(255, 255, 255, .9);
      text-align: center;
      margin-bottom: 48px;

      & img {
        max-width: 100px;
      }
    }
  }
}

.parallax {
  width: 100%;
  height: 100vh !important;
}

.buttons {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;

  .secondary-buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
