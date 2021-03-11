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
          Ryan Schneider
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
              <v-row class="my-0">
                <v-col
                  cols="3"
                  class="py-0"
                >
                  <v-subheader>
                    Photo
                  </v-subheader>
                </v-col>
                <v-col
                  cols="6"
                  class="py-0"
                >
                  <v-btn
                    color="primary"
                    rounded
                  >
                    <v-icon
                      left
                      dark
                    >
                      mdi-cloud-upload
                    </v-icon>
                    Pick a file
                  </v-btn>
                </v-col>
              </v-row>

              <v-row class="my-0">
                <v-col
                  cols="3"
                  class="py-0"
                >
                  <v-subheader>
                    Name
                  </v-subheader>
                </v-col>
                <v-col
                  cols="6"
                  class="py-0"
                >
                  <v-text-field
                    append-icon="mdi-account-circle-outline"
                    label="Name"
                    type="text"
                    value="Ryan Schneider"
                    outlined
                    rounded
                    dense
                  />
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                class="mx-auto mb-2 px-5"
                rounded
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
              <v-row class="my-0">
                <v-col
                  cols="3"
                  class="py-0"
                >
                  <v-subheader>
                    Current password
                  </v-subheader>
                </v-col>
                <v-col
                  cols="6"
                  class="py-0"
                >
                  <v-text-field
                    append-icon="mdi-lock-outline"
                    label="Your current password..."
                    type="password"
                    outlined
                    rounded
                    dense
                  />
                </v-col>
              </v-row>

              <v-row class="my-0">
                <v-col
                  cols="3"
                  class="py-0"
                >
                  <v-subheader>
                    New password
                  </v-subheader>
                </v-col>
                <v-col
                  cols="6"
                  class="py-0"
                >
                  <v-text-field
                    append-icon="mdi-lock-outline"
                    label="New password..."
                    type="password"
                    outlined
                    rounded
                    dense
                  />
                </v-col>
              </v-row>

              <v-row class="my-0">
                <v-col
                  cols="3"
                  class="py-0"
                >
                  <v-subheader>
                    Confirm password
                  </v-subheader>
                </v-col>
                <v-col
                  cols="6"
                  class="py-0"
                >
                  <v-text-field
                    append-icon="mdi-lock-outline"
                    label="Confirm new password..."
                    type="password"
                    outlined
                    rounded
                    dense
                  />
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                class="mx-auto mb-2 px-5"
                rounded
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
export default {
  name: 'SignUp',
  layout: 'parallax'
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
</style>
