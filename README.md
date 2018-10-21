## Installation
```
npm install --save vue-css-custom-property
```

```js
// plugins/vue-css-custom-property.js
import Vue from 'vue'
import customProperty from 'vue-css-custom-property'
Vue.use(customProperty)
// Vue.use(customProperty, readyKey) or Vue.use(customProperty, { readyKey: 'readyKeyTest' }) to use custom property ready event key. If empty, default is 'customPropertiesReady'
```
Nuxt.js
```js
// nuxt.config.js
module.exports = {
  plugins: [
    { src: '~plugins/vue-css-custom-property.js', ssr: false }
  ]
}
```

## Basic Usage
Defining customProperty options in your components. It only works in this component. And data is being observed.
```html
<script>
export default {
  data() {
    return {
      a: '10px',
      b: 10
    }
  }
...
  customProperties: {
    '--test-a': 'a',
    '--test-b'() {
      return this.b + 'px'
    }
  }
...
}
</script>

<style>
.element-a {
  font-size: var(--test-a)
}
.element-b {
  font-size: var(--test-b)
}
</style>
```
You can use this plugin programmatically as well. I runs only once and can also be used as an event
```html
<script>
export default {
  ...
  methods: {
    test(val) {
      this.$customProperty('--global-property', val + 'px') // It will works on top of html elements
      this.$customProperty('--local-property', val + 'px', this)  // It only works on 'this' vue instance
    }
  }
  ...
}
</script>
```

## Custom Properties Ready event hook
Use customPropertiesReady hook in your component
```html
<template>
...
  <div class="element-a" v-if="ready">Hello world!<div>
...
</template>

<script>
export default {
  data() {
    return {
      ready: false
    }
  },
  ...
  customPropertiesReady() {
    this.ready = true
  }
  ...
}
</script>
```
Or put ready key to check whether css custom property is ready
```html
<script>
export default {
  data() {
    return {
      customPropertiesReady: false  // If css custom properties is ready, change customPropertiesReady to true without using event hook
      // You can change this variable name by setting readyKey of this plugin options on vue.use
    }
  }
}
</script>
```
