<template>
  <div>
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
      {{tab | capitalize}} to acces your cards
    </q-banner>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-mt-md"
    >
      <q-input
        filled
        v-model="formData.email"
        label="Your email *"
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type an email']"
      />

      <q-input
        filled
        v-model="formData.password"
        label="Your password *"
        lazy-rules
        type="password"
        :rules="[ val => val && val.length > 0 || 'Please type a password']"
      />

      <q-toggle v-if="tab=='register'" v-model="accept" label="I accept the license and terms" />

      <div class="row justify-end">
        <q-btn label="Cancel" type="reset" color="primary" flat />
        <q-btn :label="tab" type="submit" color="primary" class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: ['tab'],
  data () {
    return {
      formData: {
        email: null,
        password: null
      },
      accept: this.tab === 'login'
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.submitForm()
        /*
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
        */
      }
    },
    onReset () {
      this.formData.email = null
      this.formData.password = null
      this.accept = false
    },
    submitForm () {
      if (this.tab === 'login') {
        this.loginUser(this.formData)
      } else if (this.tab === 'register') {
        this.registerUser(this.formData)
      }
    }
  },
  filters: {
    capitalize: (value) => value.charAt(0).toUpperCase() + value.slice(1)
  }
}
</script>
