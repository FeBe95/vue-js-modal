# Slots

## Close button

If you want to have a Close (x) button in the top-right corner, you can use "top-right" slot for it. There is no pre-defined Close button style - you will have to implement your own button.

```html{3-7}
<template>
  <modal name="foo">
    <template #top-right>
      <div>
        <button @click="$modal.hide('foo')">
          ❌
        </button>
      </div>
    </template>
    Hello, ☀️!
  </modal>
</template>
```