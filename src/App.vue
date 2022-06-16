<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" class="white--text">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-5" v-if="user">{{ user.email }}</span>
      <v-btn color="deep-purple accent-4"  v-if="user" @click="cerrarSesion"
        ><v-icon color="white">mdi-logout</v-icon></v-btn
      >
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-layout colum>
        <v-flex mx-3>
          <v-btn block  v-if="user" to="/">
            <v-icon>mdi-home</v-icon>
            <span>Home</span>
          </v-btn>
          <v-btn block  v-if="user" to="/crud">
            <v-icon>mdi-account-school</v-icon>
            <span>Cursos</span>
          </v-btn>
          <v-btn block  v-if="!user" to="/login">
            <v-icon>mdi-account</v-icon>
            <span>Login</span>
          </v-btn>
          <v-btn block  v-if="!user" to="register">
            <v-icon>mdi-account-plus</v-icon>
            <span>Register</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
export default {
  name: "App",
  data: () => ({
    drawer: true,
    user: null,
  }),
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    async cerrarSesion() {
      await signOut(auth);
      this.$router.push("/login");
    },
  },
};
</script>
