<template>
  <div class="container">
    <example-modal />
    <div>
      <Logo />
      <h1 class="title">
        nuxt
      </h1>
      <div class="links">
        <button class="button--green" @click="click">Show modal</button>
      </div>
      <p style="margin-top: 40px">{{ renderMode }}</p>
    </div>
  </div>
</template>

<script>
import ExampleModal from '../components/ExampleModal'

export default {
  components: {
    ExampleModal
  },
  computed: {
    renderMode() {
      return this.$nuxt.payload.serverRendered
        ? 'Server-Side Rendering'
        : 'Client-Side Rendering'
    }
  },
  methods: {
    click() {
      this.$modal.show('example-modal')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
