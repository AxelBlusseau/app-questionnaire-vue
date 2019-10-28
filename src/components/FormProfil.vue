<template>
  <b-container>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Votre Nom :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.nom"
            type="text"
            required
            placeholder="Entrez votre nom"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Votre Prénom :" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.prenom"
            required
            placeholder="Entrez votre prénom"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Le nom de votre société :" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.nomSociete"
            required
            placeholder="Entrez le nom de votre société"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
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
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));

      var db = new PouchDB("test");

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+time;

      db.put({
        _id: this.form.nom + dateTime,
        nom: this.form.nom,
        prenom: this.form.prenom,
        nomSociete: this.form.nomSociete
      });

      db.get("test").then(function(doc){
        console.log(doc._rev)
        const data = { 
          id: doc._rev
        }
        window.localStorage.setItem('idUser', JSON.stringify(data))
      })

      db.replicate.to("http://127.0.0.1:5984/test");

      this.$router.push('survey')
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.nom = "";
      this.form.prenom = "";
      this.form.nomSociete = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>