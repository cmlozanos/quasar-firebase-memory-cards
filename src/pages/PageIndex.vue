<template>
  <div class="fixed-center text-center">
    <p class="text-faded">
      Welcome to Memory<strong>On</strong>
    </p>
    <p>
      <q-img
        src="~assets/index.png"
        style="width:50vw"
      >
        <div class="absolute-bottom">
          <q-btn outline icon="touch_app" class="full-width" to="/game">Go to the game</q-btn>
        </div>
      </q-img>
    </p>
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
