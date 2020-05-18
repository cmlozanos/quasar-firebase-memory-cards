<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="absolute-center">
          <q-btn flat to="/" label="MemoryOn"/>
        </q-toolbar-title>
        <q-btn v-if="!loggedIn" @click="loginUser" icon-right="account_circle" flat label="login"  class="absolute-right"/>
        <!--<q-btn v-if="!loggedIn" to="/auth" icon-right="account_circle" flat label="login"  class="absolute-right"/>-->
        <q-btn v-else @click="logoutUser" icon-right="account_circle" flat label="logout"  class="absolute-right"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header>{{user.name}}</q-item-label>
        <q-item clickable to="/game" exact>
          <q-item-section avatar>
            <q-icon name="mouse" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Game</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/cards" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cards</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="loggedIn && admin" clickable to="/cards-admin" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cards Administration</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/gameplays" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Game Plays</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedIn', 'admin', 'user'])
  },
  methods: {
    ...mapActions('auth', ['loginUser', 'logoutUser'])
  }
}
</script>
