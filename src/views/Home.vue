<template>
  <div class="home">
    <FormAdmin />
    <FormProfil />
  </div>
</template>

<script>

import FormProfil from '@/components/ABFormProfil.vue' //J'importe le composant du formulaire de profil
import FormAdmin from '@/components/ABAdminForm.vue' //J'importe le compostant du formulaire de connexion de l'admninistrateur

export default {
  name: 'home',
  components: {
    FormProfil,
    FormAdmin,
  }
}
</script>
