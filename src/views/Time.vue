<template>
  <b-container>
    <b-row style="margin-top:10%">
      <b-col></b-col>
      <b-col cols="8">
        <p v-if="heureCalcul" style="font-size:150%">[[ Tu peux partir à {{heureCalcul}} ]]</p>
        <b-form @submit="ABonSubmit" @reset="ABonReset">
          <b-form-group id="input-group-1" label="Heure d'arrivée" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.heureArrive"
              type="time"
              required
              placeholder="Heure d'arrivée"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Heure où tu pars manger" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.heureDepMidi"
              required
              type="time"
              placeholder="Heure où tu pars manger"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Heure où j'arrive de manger" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.heureArrMidi"
              required
              type="time"
              placeholder="Heure à laquelle t'arrives de manger"
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col>
              <b-button type="submit" block variant="primary">Go diego</b-button>
            </b-col>
            <b-col>
              <b-button type="reset" block variant="danger">Reset</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "timework",
  data: function() {
    return {
      form: {
        heureArrive: "",
        heureDepMidi: "",
        heureArrMidi: ""
      },
      heureCalcul: ""
    };
  },
  created() {
    //Lancer des methodes au moment ou la page se charge (le plus souvent ce sont des appels api)
  },
  methods: {
    ABonSubmit(evt) {
      evt.preventDefault();
      var morningTime = this.diff(this.form.heureArrive, this.form.heureDepMidi)
      var timeToWork = this.diff(morningTime, "07:21")
      this.getTimeToLeave(timeToWork, this.form.heureArrMidi)
      },
    getTimeToLeave(firstTime, secondTime){
      firstTime = firstTime.split(":");
      secondTime = secondTime.split(":");
      //On additionne d'abord les heures
      var heure = parseInt(firstTime[0]) + parseInt(secondTime[0])
      //On additionne les minutes
      var minutes = parseInt(firstTime[1]) + parseInt(secondTime[1])
      //On gère si les minutes sont supérieurs à 60
      if(minutes >= 60){
        if(minutes === 60){
          minutes = 0
          heure = heure + 1
        }else{
          var diff = minutes - 60
          minutes = diff
          heure = heure + 1
        }
      }
      this.heureCalcul = heure.toString() + "h" + minutes.toString()
    },
    diff(start, end) {
      start = start.split(":");
      end = end.split(":");
      var startDate = new Date(0, 0, 0, start[0], start[1], 0);
      var endDate = new Date(0, 0, 0, end[0], end[1], 0);
      var diff = endDate.getTime() - startDate.getTime();
      var hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      var minutes = Math.floor(diff / 1000 / 60);

      // If using time pickers with 24 hours format, add the below line get exact hours
      if (hours < 0) hours = hours + 24;

      return (
        (hours <= 9 ? "0" : "") +
        hours +
        ":" +
        (minutes <= 9 ? "0" : "") +
        minutes
      );
    },
    ABonReset(evt) {
      evt.preventDefault();
      this.form.heureArrive = "";
      this.form.heureDepMidi = "";
      this.form.heureArrMidi = "";
    }
  }
};
</script>