<template>
  <div>
    <b-button block squared v-b-modal.modal-prevent-closing>Espace Administrateur</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Espace Administrateur"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="userNameState"
          label="Nom d'utilisateur"
          label-for="name-input"
          invalid-feedback="Le nom d'utilisateur est requis"
        >
          <b-form-input
            id="name-input"
            v-model="userName"
            :state="userNameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="userPwdState"
          label="Mot de passe utilisateur"
          label-for="pwd-input"
          invalid-feedback="Le mot de passe utilisateur est requis"
        >
          <b-form-input
            id="pwd-input"
            type="password"
            v-model="userPwd"
            :state="userPwdState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PouchDB from "pouchdb";

  export default {
    data() {
      return {
        userNameState: null,
        userPwdState: null,
        userName: '',
        userPwd:'',
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.userNameState = valid ? true : false
        this.userPwdState = valid ? true : false
        return valid
      },
      resetModal() {
        this.userName = ''
        this.userPwd = ''
        this.userNameState = null
        this.userPwdState = null
      },
      handleOk(bvModalEvt) {
        //Prévient de la fermeture
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        
      var db = new PouchDB("questionnaire"); //On récupère la bdd

      db.find({
        selector: {name: this.userName, password: this.userPwd},
        fields: ['name'],
      }).then(function (result) {
        console.log(result)
      }).catch(function (err) {
        console.log(err);
      });

        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>