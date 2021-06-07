<!--suppress JSUnresolvedVariable, CssOverwrittenProperties, CssUnknownTarget -->
<template>
  <div class="page-header">
    <!--TODO: move to separate component-->
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

          <v-form
            v-model="valid"
            @submit.prevent="sendRequest"
          >
            <v-card-text class="py-1">
              <v-text-field
                v-model="name"
                prepend-inner-icon="mdi-account-circle-outline"
                label="Username"
                :rules="[
                  $rules.required,
                  $rules.regexCheck( /^[\w-.\s]*$/gi, 'Only letters, numbers and \'.-_\' allowed')
                ]"
                dark
                filled
                rounded
                dense
              />

              <v-text-field
                v-model="email"
                prepend-inner-icon="mdi-at"
                label="Email"
                :rules="[
                  $rules.required,
                  $rules.regexCheck( /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi, 'Please provide correct email')
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
                  $rules.minLength(8),
                  $rules.regexCheck(/(?=.*[a-z])/gi, 'Password must have at least one lowercase character'),
                  $rules.regexCheck(/(?=.*[A-Z])/gi, 'Password must have at least one uppercase character'),
                  $rules.regexCheck(/(?=.*[0-9])/gi, 'Password must have at least one number character'),
                  $rules.regexCheck(/(?=.*[!@#$%^&*()_+])/gi, 'Password must have at least one special character'),
                ]"
                dark
                filled
                rounded
                dense
              />

              <v-text-field
                v-model="confirmPassword"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                label="Confirm Password"
                :rules="[
                  $rules.required,
                  $rules.minLength(8),
                  v => password === confirmPassword || 'Passwords do not match'
                ]"
                dark
                filled
                rounded
                dense
              />
            </v-card-text>

            <v-card-actions>
              <div class="buttons">
                <v-btn
                  color="primary"
                  type="submit"
                  dark
                  rounded
                  :disabled="!valid"
                >
                  Register
                </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SignUp',
  layout: 'parallax',
  data () {
    return {
      valid: true
    }
  },
  computed: {
    name: {
      get () { return this.getName() },
      set (val) { this.setName(val) }
    },
    email: {
      get () { return this.getEmail() },
      set (val) { this.setEmail(val) }
    },
    password: {
      get () { return this.getPassword() },
      set (val) { this.setPassword(val) }
    },
    confirmPassword: {
      get () { return this.getConfirmPassword() },
      set (val) { this.setConfirmPassword(val) }
    }
  },
  destroyed () {
    this.resetState()
  },
  methods: {
    ...mapActions('authorization', ['registerUser']),
    ...mapGetters('authorization', ['getName', 'getEmail', 'getPassword', 'getConfirmPassword']),
    ...mapMutations('authorization', ['resetState', 'setName', 'setEmail', 'setPassword', 'setConfirmPassword']),
    sendRequest () {
      this.registerUser()
      this.valid = true
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
    padding: 150px;
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
