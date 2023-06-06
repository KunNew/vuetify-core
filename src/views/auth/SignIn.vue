<template>
  <v-container
    fill-height
    class="justify-center"
    fluid
    style="background-color: #233a5f"
  >
    <div id="particles-js"></div>
    <v-card
      class="col-lg-3 col-sm-5 pt-0"
      style="
        margin-bottom: 48px;
        background-color: #17263d;
        box-shadow: 0 0 10px #17263d;
      "
      :loading="signingIn"
      dark
    >
      <v-card-text>
        <v-row class="align-center justify-center mt-2 mb-3">
          <v-img
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
            class="mr-2"
            max-width="32"
          ></v-img>
          <span class="text-h5 white--text">Login</span>
        </v-row>
        <v-alert color="error" v-model="errorAlert" text dismissible dark>{{
          indications.error
        }}</v-alert>
        <v-form ref="signInForm" lazy-validation>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="[(v) => !!v || 'Username cannot be empty!']"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                v-model="password"
                autocomplete
                label="Password"
                :rules="[(v) => !!v || 'Password cannot be empty!']"
                required
                @keydown="whenPressingEnter"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions class="px-0 mb-3">
          <v-checkbox
            dense
            label="Remember Me"
            hide-details
            class="customized-checkbox"
          />
          <v-spacer />
        </v-card-actions>
        <v-btn color="primary" block @click="signIn()">Sign In</v-btn>
      </v-card-text>
      <!-- <v-card-actions class="text-caption">
        <v-card-actions> Don't have an account yet? </v-card-actions>
        <router-link to="/sign-up" style="color: white">Sign Up</router-link>
      </v-card-actions> -->
    </v-card>
    <v-toolbar
      style="
        background-color: #17263d;
        color: #959da4;
        letter-spacing: 2px;
        font-size: 12px;
        font-weight: 600;
      "
      width="100%"
      dense
      absolute
      bottom
      flat
      class="ma-0"
    >
      <v-spacer />
      <div class="text-right">
        By
        <a href="#" class="white--text">Kun New</a>
        <br />version {{ version }}
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
import realease from "@/release";
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      signingIn: false,
      passwordType: true,
      rememberMe: false,
      warningAlert: false,
      errorAlert: false,
      indications: { warning: "", error: "" },
      version: realease,
    };
  },
  methods: {
    async signIn() {
      const valid = await this.$refs["signInForm"].validate();
      if (valid) {
        this.signingIn = true;
        console.log("valid");
        this.$router.push("/");
      }
    },
    whenPressingEnter(e) {
      if (e.key === "Enter") {
        this.signIn();
      }
    },
  },
  mounted() {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  },
};
</script>

<style lang="scss" scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
