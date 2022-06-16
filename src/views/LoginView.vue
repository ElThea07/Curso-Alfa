<template>
  <div>
    <h1 class="text-center">LOGIN</h1>
    <v-form v-model="valid" ref="loginForm">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="emailRules"
          />
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
          />
          <v-btn
            class="mr-4 white--text"
            color="green"
            :disabled="!valid"
            @click="loginUser"
            >INICIAR</v-btn
          >
          <v-btn class="mr-4 white--text" color="red" @click="reset"
            >LIMPIAR FORM</v-btn
          >
          <v-btn class="white--text" color="orange" @click="resetValidacion">LIMPIAR VALIDACIÓN</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="loginError">
      <v-card-title class="text-h5 error text-center"> ERROR </v-card-title>
      <v-card-text class="blue-grey lighten-5">
        <v-form>
          <v-container>
            <v-row>
              <v-col class="text-center" cols="12" md="12">
                <p>{{ errorCode }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-dialog>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { th } from "vuetify/lib/locale";
import { auth } from "../firebase";
export default {
  data() {
    return {
      valid: false,
      loginError: false,
      errorCode: "",
      user: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo",
        (v) => !!v || "No existe",
        (v) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) || "Email incorrecto",
      ],
      passwordRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 7) || "Password sobre 8 caracteres",
      ],
    };
  },
  methods: {
    async loginUser() {
      try {
        const userLogin = await signInWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        ).then((userCredential) => console.log(userCredential));
        this.$router.push("/");
        console.log(userLogin);
      } catch (error) {
        this.loginError = true;
        switch (error.code) {
          case "auth/user-not-found":
            this.errorCode = "Usurario no registrado";
            break;
          case "auth/wrong-password":
            this.errorCode = "Contraseña incorrecta";
            break;
          default:
            this.errorCode = "FALLA DE SERVIDOR!";
        }
      }
    },
    reset() {
      this.$refs.loginForm.reset();
    },
    resetValidacion() {
      this.$refs.loginForm.resetValidation();
    },
  },
};
</script>

<style></style>
