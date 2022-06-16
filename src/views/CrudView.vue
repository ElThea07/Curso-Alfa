<template>
  <v-container>
    <v-col cols="12" class="justify-center d-flex mt-10 mb-10">
      <h1 class="display-4">Administración</h1>
      <v-btn color="blue" class="white--text ml-5" @click="addCurso()"
        >AGREGAR CURSO</v-btn
      >
    </v-col>
    <v-col cols="12">
      <v-card>
        <template>
          <template>
            <v-row justify="center">
              <v-dialog v-model="dialog" max-width="1080px">
                <v-card>
                  <v-card-title>
                    <h3>Agregando Curso</h3>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="addForm" v-model="valid">
                        <v-col cols="12">
                          <v-text-field
                            label="Nombre"
                            v-model="curso.nombre"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="URL de la imágen del curso"
                            v-model="curso.src"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Cupos del curso"
                            v-model.number="curso.cupos"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Inscritos en el curso"
                            v-model.number="curso.inscritos"
                            :rules="studentRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Duración del curso"
                            v-model="curso.duracion"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Costo del curso"
                            v-model.number="curso.costo"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Fecha de registro(dd-mm-yyyy)"
                            v-model="curso.fecha"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Código del curso"
                            v-model="curso.codigo"
                            :rules="textRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            label="Descripción del curso"
                            v-model="curso.descripcion"
                            :rules="textRules"
                            required
                            outlined
                          />
                          <v-switch
                            v-model="curso.terminado"
                            label="Terminado"
                          />
                        </v-col>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mr-4"
                      color="success"
                      :disabled="!valid"
                      @click="addCursoForm"
                    >
                      AGREGAR
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">
                      LIMPIAR FORMULARIO
                    </v-btn>
                    <v-btn color="warning" @click="resetValidacion">
                      LIMPIAR VALIDACIÓN
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>

          <v-data-table :headers="headers" :items="cursos" class="elevation-3">
            <template v-slot:[`item.costo`]="{ item }">
              <v-chip color="green" dark> ${{ item.costo }} </v-chip>
            </template>
            <template v-slot:[`item.fecha`]="{ item }">
              <v-chip color="green" dark>
                {{ item.fecha }}
              </v-chip>
            </template>
            <template v-slot:[`item.terminado`]="{ item }">
              <v-chip :color="terminadoColor(item.terminado)" dark>
                {{ terminadoTrue(item.terminado) }}
              </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="updateCursoForm(item.id)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteCurso(item.id)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </template>
      </v-card>

      <v-alert dense outlined color="purple" class="mt-10">
        <v-icon class="me-3 purple--text">mdi-account-group</v-icon>Cantidad
        total de alumnos permitidos: <b>{{ cuposDisponibles }}</b> alumnos
      </v-alert>
      <v-alert dense outlined color="blue" class="mt-5">
        <v-icon class="me-3 blue--text">mdi-account-multiple-check</v-icon>
        Cantidad total de alumnos inscritos:
        <b>{{ cuposReservados }}</b> alumnos
      </v-alert>
      <v-alert dense outlined color="red" class="mt-5">
        <v-icon class="me-3 red--text">mdi-account-clock</v-icon>
        Cantidad total de cupos restantes:
        <b>{{ totalCuposRestantes }}</b> alumnos
      </v-alert>
      <v-alert dense outlined color="pink" class="mt-5">
        <v-icon class="me-3 pink--text">mdi-block-helper</v-icon>
        Cantidad total de cursos terminados:
        <b>{{ totalCursosTerminados }}</b> alumnos
      </v-alert>
      <v-alert dense outlined color="brown" class="mt-5">
        <v-icon class="me-3 brown--text">mdi-bell-ring</v-icon>Cantidad total de
        cursos activos: <b>{{ totalCursosActivos }}</b> cursos.
      </v-alert>
      <v-alert dense outlined color="red" class="mt-5">
        <v-icon class="me-3 red--text">mdi-bell-ring</v-icon>Cantidad total de
        cursos: <b>{{ totalCursos }}</b> cursos.
      </v-alert>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      dialog: false,
      routerEdit: "",
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
      headers: [
        {
          text: "Curso",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Cupos", value: "cupos" },
        { text: "Inscritos", value: "inscritos" },
        { text: "Duración", value: "duracion" },
        { text: "Costo", value: "costo" },
        { text: "Terminado", value: "terminado" },
        { text: "Fecha", value: "fecha" },
        { text: "Acciones", value: "actions" },
      ],
      textRules: [(v) => !!v || "Requiere ser completado"],
      studentRules: [
        (v) => !!v || "Requiere ser completado",
        (v) =>
          v <= this.curso.cupos || "No pueden haber más estudiantes que cupos",
      ],
    };
  },
  methods: {
    ...mapActions(["add_curso", "delete_curso", "update_curso", "get_cursos"]),
    addCursoForm() {
      this.add_curso({ ...this.curso });
      this.dialog = false;
      this.$refs.addForm.reset();
    },
    deleteCurso(id) {
      this.delete_curso(id);
    },
    addCurso() {
      this.dialog = true;
    },
    updateCursoForm(id) {
      this.routerEdit = id;
      this.$router.push(`/edit/${this.routerEdit}`);
    },
    reset() {
      this.$refs.addForm.reset();
    },
    resetValidacion() {
      this.$refs.addForm.resetValidation();
    },
    terminadoColor(terminado) {
      if (terminado == !true) {
        return "grey";
      } else {
        return "blue";
      }
    },
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
    totalCursos() {
      return this.cursos.length;
    },
    totalCursosTerminados() {
      const terminados = this.cursos.filter((item) => item.terminado == true);
      return terminados.length;
    },
    totalCursosActivos() {
      let cursosNoTermiandos = this.cursos;
      cursosNoTermiandos = cursosNoTermiandos.filter((item) => {
        return item.terminado == !true;
      });
      return cursosNoTermiandos.length;
    },
    cuposDisponibles() {
      return this.cursos.reduce((acc, current) => acc + +current.cupos, 0);
    },
    cuposReservados() {
      return this.cursos.reduce((acc, current) => acc + +current.inscritos, 0);
    },
    totalCuposRestantes() {
      return this.cuposDisponibles - this.cuposReservados;
    },
  },
  created() {
    this.get_cursos();
  },
};
</script>

<style></style>
