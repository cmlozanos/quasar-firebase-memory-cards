<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-md-10">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" :label="$t('auth.login')" />
            <q-tab name="register" :label="$t('auth.register')" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">
              <login-and-register :tab="tab"/>
            </q-tab-panel>

            <q-tab-panel name="register">
              <login-and-register :tab="tab"/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  components: {
    loginAndRegister: require('components/Auth/LoginAndRegister.vue').default
  },
  data () {
    return {
      tab: 'login'
    }
  }
}
</script>
