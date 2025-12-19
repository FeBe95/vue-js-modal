# Events

## Events

#### `@before-open`

Emits while modal is still invisible, but was added to the DOM. Further opening of the modal can be blocked from this event listener by calling `event.cancel()` .           

---

#### `@opened`

Emits after modal became visible or started transition.

---

#### `@loadstart`

> [!NOTE]
> For async components only.

Emits as soon as the component has started loading and the loader is shown.

---

#### `@loaded`

> [!NOTE]
> For async components only.

Emits after the component has finished loading, and the DOM is showing the modal content instead of the loader.

---

#### `@before-close`

Emits before modal is going to be closed. Further closing of the modal can be blocked from this event listener by calling `event.cancel()` .

---

#### `@closed` 
 
Emits right before modal is destroyed.

---

## Event cancellation

Opening and closing can be canceled by calling `event.cancel()` function in either `before-open` or `before-close` event handlers.


## Examples

Static modal:

```html{24}
<template>
  <modal name="example"
         @before-open="beforeOpen"
         @before-close="beforeClose">
    <span>Hello, {{ name }}!</span>
  </modal>
</template>
<script>
export default {
  name: 'Example',
  data () {
    return {
      name: 'Tom'
    }
  },
  methods: {
    beforeOpen (event) {
      console.log('Opening...')
    },
    beforeClose (event) {
      console.log('Closing...')
      // What a gamble... 50% chance to cancel closing
      if (Math.random() < 0.5) {
        event.cancel()
      }
    }
  }
}
</script>
```

Dynamic modal:


```html
<script>
export default {
  name: 'Example',
  data () {
    return {
      name: 'Tom'
    }
  },
  methods: {
    openModal () {
      this.$modal.show({
        template: `<span>Hello, {{ name }}!</span>`,
        props: ['name']
      }, {
        name: this.name
      }, {
        width: 300,
        height: 300
      }, {
        'before-open': this.beforeOpen,
        'before-close': this.beforeClose
      })
    },
    beforeOpen (event) {
      console.log('Opening...')
    },
    beforeClose (event) {
      console.log('Closing...')
      // What a gamble... 50% chance to cancel closing
      if (Math.random() < 0.5) {
        event.cancel()
      }
    }
  }
}
</script>

```