<template>
  <b-container>
    <b-row style="margin-top:10%">
      <b-col></b-col>
      <b-col cols="8">
      <b-form @submit="ABonSubmit" @reset="ABonReset" v-if="show">
        <b-form-group id="input-group-1" label="Nom" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.nom"
            type="text"
            required
            placeholder="Entrez votre nom"
          ></b-form-input>
        </b-form-group>        
        <b-form-group id="input-group-2" label="Prénom" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.prenom"
            required
            placeholder="Entrez votre prénom"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Société" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.nomSociete"
            required
            placeholder="Entrez le nom de votre société"
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
          <b-button type="submit" block variant="primary">Commencer le Test</b-button>
          </b-col>
          <b-col>
          <b-button type="reset" block variant="danger">Vider</b-button>
          </b-col>
        </b-row>
      </b-form>
      </b-col>
    <b-col>
    </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PouchDB from "pouchdb"

export default {
  data() {
    return {
      form: {
        nom: "",
        prenom: "",
        nomSociete: ""
      },
      show: true
    };
  },
  methods: {
    ABonSubmit(evt) {
      evt.preventDefault();

      var db = new PouchDB("questionnaire");

      //Génération de la date pour obtenir un id unique
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+time;

      //On envoi en base de données l'utilisateur
      db.put({
        _id: this.form.nomSociete + dateTime,
        nom: this.form.nom,
        prenom: this.form.prenom,
        nomSociete: this.form.nomSociete
      });

      //Récupération du dernier ID enregistré, et mise en session de celui ci
      db.get(this.form.nomSociete + dateTime).then(function(doc){
        const data = { 
          id: doc._rev
        }
        window.localStorage.setItem('idUser', JSON.stringify(data))
      })

      db.replicate.to("http://127.0.0.1:5984/questionnaire");

      this.$router.push('questionnaire') 
    },
    ABonReset(evt) {
      evt.preventDefault();
      //On reset nos valeurs
      this.form.nom = "";
      this.form.prenom = "";
      this.form.nomSociete = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>