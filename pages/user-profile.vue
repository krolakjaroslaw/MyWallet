<!--suppress JSUnresolvedVariable, CssOverwrittenProperties, CssUnknownTarget -->
<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
      <div class="container">
        <div class="photo-container">
          <img
            :src="'ryan.jpg'"
            alt=""
            height="123"
            width="123"
          >
        </div>

        <h3 class="title-name">
          {{ name }}
        </h3>

        <div class="content">
          <div class="social-description">
            <h2>$260.000</h2>
            <p>Your wallet</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>days</p>
          </div>
          <div class="social-description">
            <h2>$320.000</h2>
            <p>Your master wallet</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <v-container>
        <div class="col-md-8 ml-auto mr-auto">
          <v-card
            class="mb-6"
            outlined
          >
            <v-card-title>
              <h4 class="title mt-0 pt-0">
                Edit Profile:
              </h4>
            </v-card-title>

            <v-card-text class="py-1">
              <v-row class="my-4">
                <v-col
                  cols="6"
                  class="buttons py-0 mx-auto"
                >
                  <v-btn
                    color="primary"
                    rounded
                    disabled
                  >
                    <v-icon
                      left
                      dark
                    >
                      mdi-cloud-upload
                    </v-icon>
                    <!--TODO: no BE support-->
                    Change photo
                  </v-btn>
                </v-col>
              </v-row>

              <v-row class="my-0">
                <v-col
                  cols="6"
                  class="py-0 mx-auto"
                >
                  <v-form v-model="validName">
                    <v-text-field
                      v-model="name"
                      append-icon="mdi-account-circle-outline"
                      type="text"
                      label="Name"
                      :rules="[
                        $rules.required,
                        $rules.minLength(5)
                      ]"
                      outlined
                      rounded
                      dense
                    />
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                class="mx-auto mb-2 px-5"
                rounded
                :disabled="!validName"
                @click="updateUserName"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card
            class="mb-6"
            outlined
          >
            <v-card-title>
              <h4 class="title mt-0 pt-0">
                Change password:
              </h4>
            </v-card-title>

            <v-card-text class="py-1">
              <v-form v-model="validPass">
                <v-row class="my-0">
                  <v-col
                    cols="6"
                    class="py-0 mx-auto"
                  >
                    <v-text-field
                      v-model="currentPassword"
                      append-icon="mdi-lock-outline"
                      type="password"
                      label="Current password"
                      :rules="[
                        $rules.required,
                        $rules.minLength(8)
                      ]"
                      outlined
                      rounded
                      dense
                    />
                  </v-col>
                </v-row>

                <v-row class="my-0">
                  <v-col
                    cols="6"
                    class="py-0 mx-auto"
                  >
                    <v-text-field
                      v-model="password"
                      append-icon="mdi-lock-outline"
                      type="password"
                      label="New password"
                      :rules="[
                        $rules.required,
                        $rules.minLength(8),
                        $rules.regexCheck(/(?=.*[a-z])/gi, 'Password must have at least one lowercase character'),
                        $rules.regexCheck(/(?=.*[A-Z])/gi, 'Password must have at least one uppercase character'),
                        $rules.regexCheck(/(?=.*[0-9])/gi, 'Password must have at least one number character'),
                        $rules.regexCheck(/(?=.*[!@#$%^&*()_+])/gi, 'Password must have at least one special character'),
                        v => password !== currentPassword || 'New password must be different than current'
                      ]"
                      outlined
                      rounded
                      dense
                    />
                  </v-col>
                </v-row>

                <v-row class="my-0">
                  <v-col
                    cols="6"
                    class="py-0 mx-auto"
                  >
                    <v-text-field
                      v-model="confirmPassword"
                      append-icon="mdi-lock-outline"
                      type="password"
                      label="Confirm new password"
                      :rules="[
                        $rules.required,
                        $rules.minLength(8),
                        v => password === confirmPassword || 'Passwords do not match'
                      ]"
                      outlined
                      rounded
                      dense
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                class="mx-auto mb-2 px-5"
                rounded
                :disabled="!validPass"
                @click="updatePassword"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserProfile',
  layout: 'parallax',
  data () {
    return {
      validName: true,
      validPass: true
    }
  },
  computed: {
    name: {
      get () {
        if (!this.getCurrentUser()) return 'Guest'
        return this.getCurrentUser().username
      },
      set (val) { this.setName(val) }
    },
    currentPassword: {
      get () { return this.getCurrentPassword() },
      set (val) { this.setCurrentPassword(val) }
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
    ...mapActions('authorization', ['updatePassword', 'updateUserName']),
    ...mapGetters('authorization', ['getConfirmPassword', 'getCurrentPassword', 'getCurrentUser', 'getPassword']),
    ...mapMutations('authorization', ['resetState', 'setConfirmPassword', 'setCurrentPassword', 'setName', 'setPassword'])
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 70vh;

  .container {
    height: 70vh;
    left: 0;
    padding: 150px;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.parallax {
  width: 100%;
  height: 500px !important;
}

.photo-container {
  width: 123px;
  height: 123px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
}

.title-name {
  text-align: center;
  color: white;
}

.title {
  font-weight: bold;
  margin: 0 auto;
}

.content {
  max-width: 609px;
  margin: 0 auto;
  color: white;

  .social-description {
    display: inline-block;
    max-width: 200px;
    width: 200px;
    text-align: center;
    margin: 15px 0 0;

    h2 {
      margin-bottom: 15px;
    }
  }
}

.section {
  padding: 10px 0;
  position: relative;
}

.buttons {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
}
</style>
