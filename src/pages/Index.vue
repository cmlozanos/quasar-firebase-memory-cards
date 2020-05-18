<template>
  <div class="fixed-center text-center">
    <p class="text-faded">
      Welcome to Memory<strong>On</strong>
    </p>
    <p>
      <q-img
        src="~assets/index.png"
        style="width:100vw;max-width:300px;"
      >
        <div class="absolute-bottom">
          <q-btn outline icon="play_arrow" class="full-width" to="/game">START</q-btn>
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
