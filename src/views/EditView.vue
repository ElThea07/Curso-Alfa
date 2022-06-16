<template>
  <v-app>
    <h1 class="text-center display-4 mt-5 mt-10 mb-10">
      Editando el curso: {{ dataCurso.nombre }}
    </h1>
    <v-container>
      <v-col cols="12">
        <v-form ref="updateForm" v-model="valid">
          <v-text-field
            label="Nombre"
            v-model="curso.nombre"
            :rules="formRules"
          />
          <v-text-field
            label="URL de la imágen del curso"
            v-model="curso.src"
            :rules="formRules"
          />
          <v-text-field
            label="Cupos del curso"
            v-model.number="curso.cupos"
            type="number"
            :rules="formRules"
          />
          <v-text-field
            label="Inscritos en el curso"
            v-model.number="curso.inscritos"
            type="number"
            :rules="inscritosRules"
          />
          <v-text-field
            label="Duración del curso"
            v-model="curso.duracion"
            :rules="formRules"
          />
          <v-text-field
            label="Costo del curso"
            v-model.number="curso.costo"
            type="number"
            :rules="formRules"
          />
          <v-text-field
            label="Código del curso"
            v-model="curso.codigo"
            :rules="formRules"
          />
          <v-textarea
            label="Descripción del curso"
            v-model="curso.descripcion"
            outlined
            :rules="formRules"
          />
          <v-text-field
            label="Fecha de registro"
            v-model="curso.fecha"
            :rules="formRules"
          />
          <v-switch v-model="curso.terminado" label="Terminado" />
          <v-btn
            class="mr-4 white--text"
            color="green"
            :disabled="!valid"
            @click="updateCurso"
          >
            ACTUALIZAR
          </v-btn>
          <v-btn class="mr-4 white--text" color="red" @click="reset">
            LIMPIAR FORMULARIO
          </v-btn>
          <v-btn
            class="mr-4 white--text"
            color="orange"
            @click="resetValidacion"
          >
            LIMPIAR VALIDACIÓN
          </v-btn>
          <v-btn class="white--text" color="blue" @click="back">
            REGRESAR
          </v-btn>
        </v-form>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      valid: false,
      curso: {
        nombre: "",
        cupos: "",
        inscritos: "",
        duracion: "",
        costo: "",
        terminado: "",
        fecha: "",
        src: "",
        codigo: "",
        descripcion: "",
      },
      formRules: [(v) => !!v || "Requiere ser completado"],
      inscritosRules: [
        (v) => !!v || "Requiere ser completado",
        (v) =>
          v <= this.curso.cupos || "No pueden haber más estudiantes que cupos",
      ],
    };
  },

  methods: {
    ...mapActions(["update_curso", "get_cursos"]),
    updateCurso() {
      this.update_curso({ ...this.curso });
      this.curso = {};
      this.$router.push("/crud");
    },
    back() {
      this.$router.push("/crud");
    },
    reset() {
      this.$refs.updateForm.reset();
    },
    resetValidacion() {
      this.$refs.updateForm.resetValidation();
    },
  },
  computed: {
    ...mapState(["cursos"]),
    dataCurso() {
      const { cursos } = this;
      const { id } = this.$route.params;
      this.curso = cursos.find((cursoId) => cursoId.id == id);
      return this.curso;
    },
  },
  created() {
    this.get_cursos();
  },
};
</script>
