<template>
  <div
    id="basic-elements"
    class="section section-basic"
  >
    <div class="container">
      <h3 class="title">
        Basic Elements
      </h3>
      <h4>Buttons</h4>
      <p class="category">
        Pick your style
      </p>
      <div class="row">
        <div class="col-md-10">
          <v-btn color="primary">
            Default
          </v-btn>
          <v-btn
            color="primary"
            rounded
          >
            Round
          </v-btn>
          <v-btn
            color="primary"
            rounded
            dark
          >
            <v-icon>
              mdi-heart-outline
            </v-icon>
            With Icon
          </v-btn>
          <v-btn
            color="primary"
            rounded
            fab
            dark
            small
          >
            <v-icon>
              mdi-heart-outline
            </v-icon>
          </v-btn>
          <v-btn
            color="primary"
            rounded
            simple
          >
            Simple
          </v-btn>
        </div>
      </div>
      <p class="category">
        Pick your size
      </p>
      <div class="row">
        <div class="col-md-10">
          <v-btn
            color="primary"
            small
          >
            Small
          </v-btn>
          <v-btn color="primary">
            Regular
          </v-btn>
          <v-btn
            color="primary"
            large
          >
            Large
          </v-btn>
        </div>
      </div>
      <p class="category">
        Pick your color
      </p>
      <div class="row">
        <div class="col-md-10">
          <v-btn color="default">
            Default
          </v-btn>
          <v-btn color="primary">
            Primary
          </v-btn>
          <v-btn color="info">
            Info
          </v-btn>
          <v-btn color="success">
            Success
          </v-btn>
          <v-btn color="warning">
            Warning
          </v-btn>
          <v-btn color="error">
            Danger
          </v-btn>
          <v-btn color="secondary">
            Neutral
          </v-btn>
        </div>
      </div>
      <h4>Links</h4>
      <div class="row">
        <div class="col-md-8">
          <v-btn
            color="default"
            plain
          >
            Default
          </v-btn>
          <v-btn
            color="primary"
            plain
          >
            Primary
          </v-btn>
          <v-btn
            color="info"
            plain
          >
            Info
          </v-btn>
          <v-btn
            color="success"
            plain
          >
            Success
          </v-btn>
          <v-btn
            color="warning"
            plain
          >
            Warning
          </v-btn>
          <v-btn
            color="error"
            plain
          >
            Danger
          </v-btn>
          <v-btn
            color="secondary"
            plain
          >
            Neutral
          </v-btn>
        </div>
      </div>
      <!--      <div class="space-70"></div>-->
      <!--      <div id="inputs">-->
      <!--        <h4>Inputs</h4>-->
      <!--        <p class="category">Form Controls</p>-->
      <!--        <div class="row">-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input placeholder="Regular"></fg-input>-->
      <!--          </div>-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input value="Success" class="has-success"></fg-input>-->
      <!--          </div>-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input value="Error Input" class="has-danger"></fg-input>-->
      <!--          </div>-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input-->
      <!--              addon-left-icon="now-ui-icons users_single-02"-->
      <!--              placeholder="Left Nucleo Icon"-->
      <!--            >-->
      <!--            </fg-input>-->
      <!--          </div>-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input-->
      <!--              addon-right-icon="now-ui-icons users_single-02"-->
      <!--              placeholder="Right Nucleo Icon"-->
      <!--            >-->
      <!--            </fg-input>-->
      <!--          </div>-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input-->
      <!--              addon-left-icon="now-ui-icons users_single-02"-->
      <!--              class="no-border"-->
      <!--              placeholder="No border left icon"-->
      <!--            >-->
      <!--            </fg-input>-->
      <!--          </div>-->
      <!--          <div class="col-sm-6 col-lg-3">-->
      <!--            <fg-input-->
      <!--              addon-right-icon="now-ui-icons users_single-02"-->
      <!--              class="no-border"-->
      <!--              placeholder="No border right icon"-->
      <!--            >-->
      <!--            </fg-input>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="space-70"></div>-->
      <!--      <div class="row" id="checkRadios">-->
      <!--        <div class="col-sm-6 col-lg-3">-->
      <!--          <p class="category">Checkboxes</p>-->
      <!--          <n-checkbox v-model="checkboxes.unchecked">Unchecked</n-checkbox>-->
      <!--          <n-checkbox v-model="checkboxes.checked">Checked</n-checkbox>-->
      <!--          <n-checkbox v-model="checkboxes.disabledUnchecked" disabled-->
      <!--          >Disabled Unchecked</n-checkbox-->
      <!--          >-->
      <!--          <n-checkbox v-model="checkboxes.disabledChecked" disabled-->
      <!--          >Disabled Checked</n-checkbox-->
      <!--          >-->
      <!--        </div>-->
      <!--        <div class="col-sm-6 col-lg-3">-->
      <!--          <p class="category">Radios</p>-->
      <!--          <n-radio v-model="radios.radioOn" label="1">Radio is On</n-radio>-->
      <!--          <n-radio v-model="radios.radioOn" label="2">Radio is Off</n-radio>-->

      <!--          <n-radio v-model="radios.radioOff" label="1" disabled-->
      <!--          >Disabled radio is on</n-radio-->
      <!--          >-->
      <!--          <n-radio v-model="radios.radioOff" label="2" disabled-->
      <!--          >Disabled radio is off</n-radio-->
      <!--          >-->
      <!--        </div>-->
      <!--        <div class="col-sm-6 col-lg-3">-->
      <!--          <p class="category">Toggle buttons</p>-->
      <!--          <n-switch v-model="switches.defaultOn"></n-switch>-->
      <!--          <br />-->
      <!--          <n-switch-->
      <!--            v-model="switches.defaultOff"-->
      <!--            on-text="ON"-->
      <!--            off-text="OFF"-->
      <!--          ></n-switch>-->
      <!--        </div>-->
      <!--        <div class="col-sm-6 col-lg-3">-->
      <!--          <p class="category">Sliders</p>-->
      <!--          <slider v-model="sliders.simple"> </slider>-->
      <!--          <br />-->
      <!--          <slider v-model="sliders.rangeSlider" type="primary" :connect="true">-->
      <!--          </slider>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicElementsSelection'
}
</script>

<style lang="scss" scoped>
.section {
  padding: 10px 0;
  position: relative;
  background: $white-color;

  .row + .category {
    margin-top: $margin-base-vertical;
  }
}
</style>
