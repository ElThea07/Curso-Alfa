<template>
  <v-container>
    <v-col cols="12">
      <h1 class="display-4 text-center mt-10 mb-10">Lista de Cursos</h1>
    </v-col>
    <v-row>
      <v-flex v-for="item in cursos" :key="item.nombre">
        <v-card width="450px" class="mb-5 mt-5">
          <v-img contain height="380px" :src="item.src"> </v-img>
          <v-card-text class="grey lighten-3">
            <h2 class="ml-9 mt-6">{{ item.nombre }}</h2>
            <h4 class="ml-9 mt-10">Información</h4>
            <v-timeline dense>
              <v-timeline-item color="purple" small>
                <v-row class>
                  <v-col cols="5">
                    Costo:
                    <span>
                      <b>${{ item.costo }}</b></span
                    >
                    Duración:
                    <span
                      ><b>{{ item.duracion }}</b></span
                    >
                  </v-col>
                </v-row>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <v-row class>
                  <v-col cols="5">
                    Cupos:
                    <span
                      ><b>{{ item.cupos }}</b></span
                    >
                    Completado:
                    <span>
                      <b>{{ terminadoTrue(item.terminado) }}</b></span
                    >
                  </v-col>
                </v-row>
              </v-timeline-item>
              <v-timeline-item color="purple" small>
                <v-row>
                  <v-col cols="12">
                    Fecha de Registro:
                    <p>
                      <b>{{ item.fecha }}</b>
                    </p>
                  </v-col>
                </v-row>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <v-row>
                  <v-col cols="12">
                    Descripción:
                    <p>{{ item.descripcion }}</p>
                  </v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["get_cursos"]),
    terminadoTrue(terminado) {
      if (terminado == !true) {
        return "No";
      } else {
        return "Si";
      }
    },
  },
  computed: {
    ...mapState(["cursos"]),
  },
  created() {
    this.get_cursos();
  },
};
</script>

<style></style>
