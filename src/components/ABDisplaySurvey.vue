<template>
  <b-container>
    <b-row style="margin-top:10%">
      <b-col></b-col>
      <b-col cols="8">
        <div>
          <p>{{listQuestions[this.index].question}}</p>

          <b-form @submit="ABonSubmit">
            <b-form-group id="input-group">
              <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                <div
                  style="text-align:left; margin-left:20%"
                  v-for="reponse in listQuestions[this.index].reponses"
                  v-bind:key="reponse"
                >
                  <b-form-checkbox v-bind:value="reponse">{{ reponse }}</b-form-checkbox>
                  <br />
                </div>
              </b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Question suivante</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import PouchDB from "pouchdb";

export default {
  name: "DisplaySurvey",
  props: {
    listQuestions: []
  },
  data() {
    return {
      form: {
        checked: [] //Les choix de l'utilisateur
      },
      index: 0,
      list: this.listQuestions, //La liste des questions récupérées depuis la vue
      results: {
        questions: [] //Notre objet results que nous allons envoyer en base de données (nous envoyons la question les réponses prévues ainsi que les réponses de l'utilisateur dans la base de données)
      },
      score: 0,
      sendInBdd: 0
    };
  },
  methods: {
    //Cette méthode sert à calculer le score en fonction des réponses de l'utilisateur et des réponses exactes.
    ABsetScore(userAnswer, realAnswer) {
      var error = false;
      if (userAnswer.length != realAnswer.length) {
        error = true;
      }

      userAnswer.forEach(function(element) {
        if (realAnswer.includes(element) == false) {
          error = true;
        }
      });

      if (error == false) {
        this.score++;
      }
    },

    //Lorsque l'utilisateur envoi sa question on passe par cette fonction qui s'occupe de la gestion de celles-ci
    ABonSubmit(evt) {
      evt.preventDefault();

      //Tant qu'on a pas répondu à toutes les questions on ajoute la question et les réponses dans notre objet results
      if (this.index < this.list.length) {
        this.results.questions.push({
          question: this.list[this.index].question,
          reponse: this.list[this.index].reponse,
          reponseUser: this.form.checked
        });
        this.ABsetScore(this.form.checked, this.list[this.index].reponse);
        if (this.index < this.list.length - 1) {
          this.index++;
        }
        this.sendInBdd++;
      }

      //On vide le tableau a choix multiple
      this.form.checked = []

      //Si toutes les questinos ont été répondues on insert notre objet results en base de données
      if (this.sendInBdd == this.list.length) {
        var db = new PouchDB("questionnaire");

        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + time;

        this.results._id = "questionnaire-" + dateTime;
        this.results.idUser = JSON.parse(
          window.localStorage.getItem("idUser")
        ).id;
        this.results.score = this.score;

        //J'envoi les questions ainsi que les réponses de l'utilisateur en base de données pour les récupérer dans l'interface administrateur
        db.put(this.results);

        db.replicate.to("http://127.0.0.1:5984/questionnaire");

        //J'envoi le score à notre page des scores
        this.$router.push({ name: "score", params: { score: this.score } });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
