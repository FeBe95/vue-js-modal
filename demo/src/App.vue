<template>
  <div class="card">
    <!-- Modals -->
    <demo-error-modal />
    <demo-login-modal />
    <demo-dog-profile-modal />
    <demo-conditional-modal />
    <demo-size-modal />
    <demo-adaptive-modal />
    <demo-adaptive-and-auto-height-modal />
    <demo-resizable-modal />
    <demo-draggable-modal />

    <v-dialog
      @before-opened="dialogEvent('before-open')"
      @before-closed="dialogEvent('before-close')"
      @opened="dialogEvent('opened')"
      @closed="dialogEvent('closed')"
    />

    <!-- Other -->

    <h2>Quick Start</h2>
    <pre>
      npm install --save vue-js-modal
    </pre>

    <pre>
      import VModal from 'vue-js-modal'
      app.use(VModal, { ... })
    </pre>
  </div>

  <div class="card">
    <h2>Examples</h2>
    <div>
      <button class="btn" @click="$modal.show('example-resizable')">Resizable</button>
      <button class="btn" @click="$modal.show('example-adaptive')">Adaptive</button>
      <button class="btn" @click="$modal.show('example-adaptive-and-auto-height')">Adaptive, Height: auto</button>
      <button class="btn" @click="$modal.show('example-draggable')">Draggable</button>
      <br />
      <button class="btn green" @click="$modal.show('dog-profile')">Demo: Dog Profile photo</button>
      <button class="btn green" @click="$modal.show('error-modal')">Demo: Error handling</button>
      <button class="btn green" @click="$modal.show('demo-login')">Demo: Login</button>
      <button class="btn green" @click="$modal.show('size-modal')">Demo: Width: 60%, Height: auto</button>
      <button :class="canBeShown ? 'btn green' : 'btn red'" @click="conditionalShow">
        Can
        <b v-if="!canBeShown">NOT</b> be shown
      </button>

      <br />

      <button class="btn" @click="showBasicDialog">Dialog: basic</button>

      <button class="btn" @click="showTitleDialog">Dialog: title</button>

      <button class="btn" @click="showButtonsDialog">Dialog: buttons</button>
      <br />
      <button class="btn" @click="showDynamicRuntimeModal">Dynamic: Runtime Modal</button>
      <button class="btn" @click="showDynamicComponentModal">Dynamic: Component Modal</button>
      <button
        class="btn"
        @click="showDynamicComponentModalWithModalParams"
      >Dynamic: Component Modal with modal params</button>
      <br>
      <button class="btn" @click="showDynamicRuntimeModalWithEvents">Custom Events: Runtime Modal</button>
      <button class="btn" @click="showDynamicComponentModalWithEvents">Custom Events: Component Modal</button>
      <br>
      <button
        class="btn"
        style="min-width: 206px; white-space: nowrap;"
        :disabled="asyncComponentBasicLoading ? 'disabled' : null"
        @click="showDynamicAsyncComponentModal"
      >
        {{ asyncComponentBasicButtonLabel }}
      </button>
      <button class="btn" @click="showDynamicAsyncComponentModalWithDefaultLoadingBars">Async Component: default loading bars</button>
      <button class="btn" @click="showDynamicAsyncComponentModalWithCustomLoadingText">Async Component: custom text</button>
      <button class="btn" @click="showDynamicAsyncComponentModalWithCustomLoadingHtml">Async Component: custom html</button>
    </div>
  </div>

  <div class="card">
    <h2>Event Log</h2>

    <pre
      ref="event-log"
      style="
        white-space-collapse: collapse;
        max-height: 200px;
        overflow: scroll;
      "
    >
      <template v-for="{ timestamp, data } of receivedEvents" :key="timestamp">
        {{
          timestamp.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 })
        }}
        <template v-if="data?.name && data?.state">
          [native event data]: {{ data.name }} → "{{ data.state }}"
        </template>
        <template v-else>
          [custom event data]: {{ JSON.stringify(data.replace(/\n+/, ' ')) }}
        </template>
        <br>
        <template v-if="data?.state === 'closed'">
          <br>
        </template>
      </template>
    </pre>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import DemoAdaptiveModal from './components/Modal_Adaptive.vue'
import DemoAdaptiveAndAutoHeightModal from './components/Modal_AdaptiveAndAutoHeight.vue'
import DemoDraggableModal from './components/Modal_Draggable.vue'
import DemoResizableModal from './components/Modal_Resizable.vue'
import DemoConditionalModal from './components/Modal_Conditional.vue'
import DemoErrorModal from './components/Modal_Error.vue'
import DemoLoginModal from './components/Modal_Login.vue'
import DemoDogProfileModal from './components/Modal_Dogge.vue'
import DemoSizeModal from './components/Modal_Autosize.vue'
import DemoCustomComponent from './components/Modal_CustomComponent.vue'
import ModalCustomComponentWithEvents from './components/Modal_CustomComponentWithEvents.vue'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const DemoCustomComponentAsync = defineAsyncComponent(async () => {
  await sleep(2000) // artificial delay: 1 seconds
  return import('./components/Modal_CustomComponent.vue')
})

const DemoCustomComponentAsyncWithDefaultLoadingBars = defineAsyncComponent(async () => {
  await sleep(2000) // artificial delay: 2 seconds
  return import('./components/Modal_CustomComponent.vue')
})

const DemoCustomComponentAsyncWithCustomHtml = defineAsyncComponent(async () => {
  await sleep(2000) // artificial delay: 2 seconds
  return import('./components/Modal_CustomComponent.vue')
})

const DemoCustomComponentAsyncWithCustomText = defineAsyncComponent(async () => {
  await sleep(2000) // artificial delay: 2 seconds
  return import('./components/Modal_CustomComponent.vue')
})

export default {
  name: 'app',
  components: {
    DemoAdaptiveModal,
    DemoAdaptiveAndAutoHeightModal,
    DemoDraggableModal,
    DemoResizableModal,
    DemoErrorModal,
    DemoLoginModal,
    DemoDogProfileModal,
    DemoConditionalModal,
    DemoSizeModal
  },
  data() {
    return {
      receivedEvents: [],
      asyncComponentBasicLoading: false,
      canBeShown: false
    }
  },
  created() {
    setInterval(() => {
      this.canBeShown = !this.canBeShown
    }, 5000)
  },
  computed: {
    asyncComponentBasicButtonLabel() {
      return this.asyncComponentBasicLoading
        ? 'Loading...'
        : 'Async Component: basic'
    }
  },
  watch: {
    receivedEvents: {
      handler() {
        this.$nextTick(() => {
          this.$refs['event-log'].scrollTo({
            top: this.$refs['event-log'].scrollHeight,
            behavior: 'smooth'
          })
        })
      },
      deep: true
    }
  },
  methods: {
    logReceivedEvent(event) {
      this.receivedEvents.push({
        timestamp: new Date(),
        data: event
      })
    },
    conditionalShow() {
      this.$modal.show('conditional-modal', {
        show: this.canBeShown
      })
    },

    showBasicDialog() {
      this.$modal.show('dialog', {
        text: 'I am a tiny dialog box.<br/>And I render <b>HTML!</b>'
      })
    },

    showTitleDialog() {
      this.$modal.show('dialog', {
        title: 'Information',
        text: 'Check out, I have a title 😎'
      })
    },

    showButtonsDialog() {
      this.$modal.show('dialog', {
        title: 'The standard Lorem Ipsum passage',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Like',
            default: true,
            handler: () => {
              alert('Like action')
            }
          },
          {
            title: 'Repost',
            handler: () => {
              alert('Repost action')
            }
          }
        ]
      })
    },

    showDynamicRuntimeModal() {
      this.$modal.show(
        {
          template: `
              <div class="example-modal-content">
                <p>Component has been created inline.</p>
                <p>{{ text }}</p>
                <p>This component is draggable because of the "dynamicDefaults" property.</p>
              </div>
            `,
          props: ['text']
        },
        {
          text: 'Text has been passed as a property.'
        },
        {
          height: 'auto'
        }
      )
    },

    showDynamicComponentModal() {
      this.$modal.show(DemoCustomComponent, {
        text: 'This text is passed as a property'
      })
    },

    showDynamicComponentModalWithModalParams() {
      let counter = 0

      const interval = setInterval(() => {
        if (counter === 5) {
          clearInterval(interval)
        } else {
          counter++
        }

        const name = `dynamic-modal-${Math.random()}`

        this.$modal.show(
          {
            template: `
              <div class="example-modal-content">
                <h2>{{ name }}</h2>
                <button class="btn" @click="closeByName">Close using name</button>
                <button class="btn" @click="closeByEvent">Close using events</button>
                <button class="btn" @click="this.$modal.hideAll">Close all dynamic modals</button>
              </div>
            `,
            props: ['name'],
            methods: {
              closeByName() {
                this.$modal.hide(name)
              },
              closeByEvent() {
                this.$emit('close')
              }
            }
          },
          { name },
          { name, height: 'auto' }
        )
      }, 300)
    },

    showDynamicRuntimeModalWithEvents() {
      this.$modal.show(
        {
          template: `
              <div class="example-modal-content">
                <p>Click the button to send data back to the app</p>
                <button class="btn" @click="sendData">Emit data to parent</button>
              </div>
            `,
          emits: ['my-event'],
          methods: {
            sendData() {
              this.$emit('my-event', 'This message was sent via `this.$emit()`')
              this.$parent.$emit('my-event', 'This message was sent via `this.$parent.$emit()`.\n\n⚠️ This is DEPRECATED ⚠️')
              this.$parent.$parent.$emit('my-event', 'This message was sent via `this.$parent.$parent.$emit()`.\n\n⚠️ This is DEPRECATED ⚠️')
              this.$parent.$parent.$parent.$emit('my-event', 'This message was sent via `this.$parent.$parent.$parent.$emit()`.\n\n⚠️ This is DEPRECATED ⚠️')
            }
          }
        },
        {},
        {
          height: 'auto'
        },
        {
          'my-event': (event) => {
            this.logReceivedEvent(event)
            setTimeout(() => alert(event), 100)
          }
        }
      )
    },

    showDynamicComponentModalWithEvents() {
      this.$modal.show(
        ModalCustomComponentWithEvents,
        {},
        {
          height: 'auto'
        },
        {
          'my-event': (event) => {
            this.logReceivedEvent(event)
            setTimeout(() => alert(event), 100)
          }
        }
      )
    },

    showDynamicAsyncComponentModal() {
      this.asyncComponentBasicLoading = true

      this.$modal.show(
        DemoCustomComponentAsync,
        {
          text: 'I was loaded asynchronously. Loading took ~2 seconds (the first time only).'
        },
        {
          height: 'auto'
        },
        {
          loadstart: this.logReceivedEvent,
          loaded: this.logReceivedEvent,
          'before-open': (event) => {
            this.asyncComponentBasicLoading = false
            this.logReceivedEvent(event)
          },
          opened: this.logReceivedEvent,
          'before-close': this.logReceivedEvent,
          closed: this.logReceivedEvent
        }
      )
    },

    showDynamicAsyncComponentModalWithDefaultLoadingBars() {
      this.$modal.show(
        DemoCustomComponentAsyncWithDefaultLoadingBars,
        {
          text: 'I was loaded asynchronously using <Suspense>!'
        },
        {
          height: 'auto',
          loader: true
        },
        {
          'before-open': this.logReceivedEvent,
          loadstart: this.logReceivedEvent,
          opened: this.logReceivedEvent,
          loaded: this.logReceivedEvent,
          'before-close': this.logReceivedEvent,
          closed: this.logReceivedEvent
        }
      )
    },

    showDynamicAsyncComponentModalWithCustomLoadingText() {
      this.$modal.show(
        DemoCustomComponentAsyncWithCustomText,
        {
          text: 'I was loaded asynchronously with a custom loading text!'
        },
        {
          loader: 'Loading...'
        },
        {
          'before-open': this.logReceivedEvent,
          loadstart: this.logReceivedEvent,
          opened: this.logReceivedEvent,
          loaded: this.logReceivedEvent,
          'before-close': this.logReceivedEvent,
          closed: this.logReceivedEvent
        }
      )
    },

    showDynamicAsyncComponentModalWithCustomLoadingHtml() {
      this.$modal.show(
        DemoCustomComponentAsyncWithCustomHtml,
        {
          text: 'I was loaded asynchronously with a custom loading html!'
        },
        {
          loader: {
            html: `
              <div style="text-align: center">
                <h3>Loading</h3>
                <p>
                  <span>Please wait...</span>
                </p>
                <p>
                  <img width="128" src="../static/cute_dog.gif" alt="Cute Dog" />
                </p>
              </div>
            `,
            style: {
              color: 'red',

              // Center text horizontally and vertically
              position: 'relative',
              width: '100%',
              height: '100%',
              padding: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
        },
        {
          'before-open': this.logReceivedEvent,
          loadstart: this.logReceivedEvent,
          opened: this.logReceivedEvent,
          loaded: this.logReceivedEvent,
          'before-close': this.logReceivedEvent,
          closed: this.logReceivedEvent
        }
      )
    },

    dialogEvent(eventName) {
      console.log('Dialog event: ' + eventName)
    }
  }
}
</script>

<style lang="scss">
*:not(pre) {
  font-family: 'Montserrat';
  box-sizing: border-box;
}

body {
  margin: 0;

  padding: 100px 50px;
  padding-bottom: 0;

  width: 100%;
  min-height: 100vh;

  background: #fc00aa;
  background: -webkit-linear-gradient(to right, #fc00aa, #00dbde);
  background: linear-gradient(315deg, #fc00aa, #00dbde);

  cursor: default;
}

pre {
  color: #595959;
  background-color: #f3f3f3;
  border: 1px solid #eee;
  line-height: 1.5;
  white-space: pre-line;
  padding: 1rem;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.card {
  color: #6b7c93;

  background: #f6f9fc;
  padding: 20px;
  border-radius: 3px;

  box-shadow: 0 4px 36px rgba(50, 50, 93, 0.11), 0 1px 33px rgba(0, 0, 0, 0.08);
}

h1,
h2 {
  font-weight: normal;
  margin-top: 0;

  a {
    font-size: 12px;
  }
}

a {
  color: inherit;
}

button.btn {
  outline: none;
  background: white;
  border: 0;
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 3px;

  color: white;

  box-shadow: 0 4px 8px rgba(#20a0ff, 0.3);
  background: #4db3ff;

  font-weight: 600;

  border-radius: 3px;

  min-width: 90px;

  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 8px;

  &:hover {
    background: #20a0ff;
  }

  &.green {
    box-shadow: 0 4px 8px rgba(#50c9ba, 0.3);
    background: #50c9ba;

    &:hover {
      background: mix(#50c9ba, black, 95%);
    }
  }

  &.red {
    box-shadow: 0 4px 8px rgba(#f21368, 0.3);
    background: #f21368;

    &:hover {
      background: mix(#f21368, black, 95%);
    }
  }
}

button:disabled {
  opacity: 0.75;
  pointer-events: none;
}

.example-modal-content {
  //  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 13px;
  line-height: 1.5;
  overflow: auto;
}

@media (max-width: 600px) {
  body {
    padding: 10px;
  }
}
</style>
