## Installation
```
npm install --save vue-css-custom-property
```

```js
// plugins/vue-css-custom-property.js
import Vue from 'vue'
import customProperty from 'vue-css-custom-property'
Vue.use(customProperty)
// Vue.use(customProperty, readyKey) or Vue.use(customProperty, { readyKey: 'readyKeyTest' }) for use custom property ready key. if empty, default is 'customPropertiesReady'
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
Define customProperties options in components. It works only in the component with components data observing
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
```
You can use too this plugin programmatically. It runs only once and can be used as event
```html
<script>
export default {
  ...
  methods: {
    test(val) {
      this.$customProperty('--global-property', val + 'px') // it will work on top of html elements
      this.$customProperty('--local-property', val + 'px', this)  // it just on 'this' vue instance
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
  <div v-if="ready">Hello world!<div>
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
Or use ready key in data for if you want to know if css custom properties ready
```html
<script>
export default {
  data() {
    return {
      customPropertiesReady: false  // if css custom properties is ready, turn this to true without use event hook
      // you can change this value name by set readyKey of this plugin options when vue.use
    }
  }
}
</script>
```