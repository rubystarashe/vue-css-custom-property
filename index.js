export default {
  install: function (Vue, options) {
    const pluginOptions = {
      readyKey: typeof options === 'string' ? options : (options || {}).readyKey || 'customPropertiesReady'
    }
    Vue.mixin({
      mounted() {
        const _this = this
        const properties = this.$options.customProperties || {}
        Object.keys(properties).forEach(key => {
          const observer = properties[key]
          _this.$watch(observer, value => {
            const style = _this.$el.style
            if (style) {
              style.setProperty(key, value)
            }
          }, {
            immediate: true
          })
        })
        this.$data[pluginOptions.readyKey] = true
        if (this.$options.customPropertiesReady) this.$options.customPropertiesReady.apply(this)
      }
    })
    const functions = (name, value, vue = null) => {
      if (vue) {
        vue.$el.style.setProperty(name, value)
      } else {
        document.documentElement.style.setProperty(name, value)
      }
    }
    Vue.customProperty = functions
    Vue.prototype.$customProperty = functions
  }
}
