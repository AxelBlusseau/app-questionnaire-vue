<template>
  <b-container>
    <div>
      <p>{{listQuestions[this.index].question}}</p>

      <b-form @submit="onSubmit">
        <b-form-group id="input-group">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <ul v-for="reponse in listQuestions[this.index].reponses" v-bind:key="reponse">
              <li>
                <b-form-checkbox v-bind:value="reponse">{{ reponse }}</b-form-checkbox>
              </li>
            </ul>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
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
        checked: []
      },
      userAnswer: [],
      index: 0,
      list: this.listQuestions,
      results: {
        questions: []
      },
      score: 0,
      sendInBdd: 0
    };
  },
  methods: {
    setScore( userAnswer, realAnswer){
      var error = false

      if(userAnswer.length != realAnswer.length){
        error = true
      }

      userAnswer.forEach(function(element) {
        if(realAnswer.includes(element) == false){
          error = true 
        }
      });

      if(error == false){
        this.score++
      }
    },
    onSubmit(evt) {
      evt.preventDefault();

      if (this.index < this.list.length) {
        this.results.questions.push({
          question: this.list[this.index].question,
          reponse: this.list[this.index].reponse,
          reponseUser: this.form.checked
        });
        this.setScore(this.form.checked, this.list[this.index].reponse)
        if (this.index < this.list.length - 1) {
          this.index++;
        }
        this.sendInBdd++
      }

      if (this.sendInBdd == this.list.length) {

        var db = new PouchDB("test");

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

        db.put(this.results);

        db.replicate.to("http://127.0.0.1:5984/test");

        this.$router.push({name: "score", params:{score: this.score}})

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
