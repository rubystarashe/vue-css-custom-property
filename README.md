## Installation / 설치
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

## Basic Usage / 기본 사용법
Defining customProperties options in your components. It only works in this component. And data is being observed.  
컴포넌트의 customProperties 옵션을 지정하여 해당 컴포넌트에서 css custom property를 사용할 수 있습니다. 데이터는 옵저빙되어 변할때 마다 즉시 적용됩니다.
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
You can use this plugin programmatically as well. It runs only once and can also be used as an event  
이 플러그인은 전역 함수로도 사용할 수 있습니다. 메소드를 통해 이벤트처럼 사용할 수 있습니다.
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
customProperty가 준비되었을 때 customPropertiesReady 이벤트 훅을 사용할 수 있습니다.
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
Or put ready key to check whether css custom property is ready. 
미리 준비된 customPropertiesReady 키를 데이터에 추가하여 즉시 바인딩 할 수도 있습니다.
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
