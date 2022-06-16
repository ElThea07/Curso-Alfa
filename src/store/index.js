import Vue from "vue";
import Vuex from "vuex";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos: [],
  },
  mutations: {
    GET_CURSOS(state, payload) {
      state.cursos = payload;
    },
  },
  actions: {
    async get_cursos({ commit }) {
      try {
        const q = query(
          collection(db, "cursos"),
          // where("uid", "==", auth.currentUser.uid)
        );
        onSnapshot(q, (querySnapshot) => {
          const cursos = [];
          querySnapshot.forEach((doc) => {
            cursos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_CURSOS", cursos);
        });
      } catch (error) {}
    },

    async add_curso({ commit }, curso) {
      try {
        await addDoc(collection(db, "cursos"), {
          nombre: curso.nombre,
          cupos: curso.cupos,
          inscritos: curso.inscritos,
          duracion: curso.duracion,
          costo: curso.costo,
          terminado: curso.terminado,
          fecha: curso.fecha,
          src: curso.src,
          codigo: curso.codigo,
          descripcion: curso.descripcion,
          uid: auth.currentUser.uid,
        });
      } catch (error) {}
    },

    async delete_curso({ commit }, id) {
      try {
        const docRef = doc(db, "cursos", id);
        await deleteDoc(docRef);
      } catch (error) {}
    },
    
    async update_curso({ commit }, curso) {
      try {
        const docRef = doc(db, "cursos", curso.id);
        await updateDoc(docRef, {
          nombre: curso.nombre,
          cupos: curso.cupos,
          inscritos: curso.inscritos,
          duracion: curso.duracion,
          costo: curso.costo,
          terminado: curso.terminado,
          fecha: curso.fecha,
          src: curso.src,
          codigo: curso.codigo,
          descripcion: curso.descripcion,
        });
      } catch (error) {}
    },
  },
});
