<template>
  <div>
    <h1 class="text-center">REGISTER</h1>
    <v-form v-model="registerValid" ref="registerForm">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field
            v-model="register.name"
            label="Name"
            :rules="registerNameRules"
          />
          <v-text-field
            v-model="register.email"
            label="Email"
            :rules="registerEmailRules"
          />
          <v-text-field
            v-model="register.password"
            label="Password"
            :rules="registerPasswordRules"
          />
          <v-text-field
            v-model="register.repitPassword"
            label="Repit Password"
            :rules="registerRepitPasswordRules"
          />
          <v-btn
            class="mr-2 white--text"
            color="green"
            :disabled="!registerValid"
            @click="registerUser"
            >REGISTRAR</v-btn
          >
          <v-btn class="mr-2 white--text" color="red" @click="reset"
            >LIMPIAR FORM</v-btn
          >
          <v-btn class="white--text" color="orange" @click="resetValidacion"
            >LIMPIAR VALIDACIÓN</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="registerError">
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export default {
  data() {
    return {
      registerValid: false,
      registerError: false,
      errorCode: "",
      register: {
        name: "",
        email: "",
        password: "",
        repitPassword: "",
      },
      registerNameRules: [
        (v) => !!v || "Ingrese un nombre",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => (v && v.length > 3) || "Nombre minimo 4 caracteres",
      ],
      registerEmailRules: [
        (v) => !!v || "Ingrese un email",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) || "Email incorrecto",
      ],
      registerPasswordRules: [
        (v) => !!v || "Ingrese password",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => (v && v.length > 7) || "Password minimo 8 caracteres",
      ],
      registerRepitPasswordRules: [
        (v) => !!v || "Confirme password",
        (v) => (v && !!v.trim()) || "No espacios en blanco",
        (v) => (v && v.length > 7) || "Password minimo 8 caracteres",
        (v) => v === this.register.password || "Debe ser la misma password",
      ],
    };
  },
  methods: {
    async registerUser() {
      try {
        const userRegister = await createUserWithEmailAndPassword(
          auth,
          this.register.email,
          this.register.password
        ).then((userCredential) => console.log(userCredential));
        this.$router.push("/");
        console.log(userRegister);
      } catch (error) {
        this.registerError = true;
        switch (error.code) {
          case "auth/email-already-in-use":
            this.errorCode = "Correo registrado!";
            break;
          default:
            this.errorCode = "falla de servidor";
        }
      }
    },
    reset() {
      this.$refs.registerForm.reset();
    },
    resetValidacion() {
      this.$refs.registerForm.resetValidation();
    },
  },
};
</script>

<style></style>
