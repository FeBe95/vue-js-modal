<template>
  <div class="example-modal-content">
    <p>Click the button to send data back to the app</p>
    <button class="btn" @click="sendData">Emit data to parent</button>
  </div>
</template>

<script>
export default {
  emits: ['my-event'],
  methods: {
    sendData() {
      this.$emit('my-event', 'This message was sent via `this.$emit()`')
      this.$parent.$emit('my-event', 'This message was sent via `this.$parent.$emit()`.\n\n⚠️ This is DEPRECATED ⚠️')
      this.$parent.$parent.$emit('my-event', 'This message was sent via `this.$parent.$parent.$emit()`.\n\n⚠️ This is DEPRECATED ⚠️')
      this.$parent.$parent.$parent.$emit('my-event', 'This message was sent via `this.$parent.$parent.$parent.$emit()`.\n\n⚠️ This is DEPRECATED ⚠️')
    }
  }
}
</script>
