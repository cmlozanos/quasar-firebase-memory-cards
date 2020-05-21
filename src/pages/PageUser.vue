<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="q-mt-md"
    >
      <div class="row">
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <div class="q-pa-sm">
            <q-img :src="formData.image">
            </q-img>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-19 col-lg-10">
          <div class="q-pa-sm">

            <q-input
              filled
              v-model="formData.mail"
              label="Your email *"
              disable
              type="email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type an email']"
            />

            <q-input
              filled
              v-model="formData.name"
              label="Your Name"
              type="text"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type a name']"
            />

          </div>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn label="Save" type="submit" color="primary" class="q-ml-sm"/>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      formData: {
        mail: null,
        image: null,
        name: null
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  mounted () {
    Object.assign(this.formData, this.user)
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    onSubmit () {
      this.updateUser(this.formData)
    }
  }
}
</script>
