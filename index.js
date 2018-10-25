export default {
  install: function (Vue, options) {
    const pluginOptions = {
      readyKey: typeof options === 'string' ? options : (options || {}).readyKey || 'customPropertiesReady'
    }
    Vue.mixin({
      mounted: function () {
        const _this = this
        const properties = this.$options.customProperties || {}
        Object.keys(properties).forEach(function (key) {
          const observer = properties[key]
          _this.$watch(observer, function (value) {
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
    function functions (name, value, vue) {
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
