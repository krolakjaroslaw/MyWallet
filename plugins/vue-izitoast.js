import iziToast from 'izitoast'
import Vue from 'vue'

import 'izitoast/dist/css/iziToast.css'

export const options = {
  class: '',
  close: false,
  closeOnClick: true,
  position: 'topCenter',
  drag: false,
  progressBar: true,
  transition: 'fadeInDown'
}

iziToast.settings(options)

export const toasts = new Vue({
  _izi: iziToast,
  _checkParams (message, title, options) {
    if (!message || message.constructor !== String) throw new Error('Message must be a string')
    if (title && title.constructor !== String) throw new Error('Title must be a string')
    if (options && options.constructor !== Object) throw new Error('Options must be an object')
  },
  _checkEventNames (eventName) {
    if (!eventName || eventName.constructor !== String) throw new Error('Event Name must be a string')
    if (eventName !== 'iziToast-open' && eventName !== 'iziToast-close') {
      throw new Error('Event Name has only two possible values: iziToast-open or iziToast-close')
    }
  },
  methods: {
    show (message, title = '', options = {}) {
      this.$options._checkParams(message, title, options)
      this.$options._izi.show(Object.assign({}, options, { message, title }))
    },
    hide (toast = null, options = {}) {
      if (toast && toast.constructor !== String) toast = document.querySelector(toast)
      if (!toast || toast.constructor !== HTMLDivElement) toast = document.querySelector('.iziToast')
      if (options && options.constructor !== Object) throw new Error('Options must be an object')
      this.$options._izi.hide(options, toast)
    },
    progress (toast, options = {}, callback = () => {}) {
      if (toast && toast.constructor !== String) toast = document.querySelector(toast)
      if (!toast || toast.constructor !== HTMLDivElement) toast = document.querySelector('.iziToast')
      if (options && options.constructor !== Object) throw new Error('Options must be an object')
      if (callback && callback.constructor !== Function) throw new Error('Callback must be a function')
      return this.$options._izi.progress(options, toast, callback)
    },
    destroy () {
      this.$options._izi.destroy()
    },
    info (message, title = '', options = {}) {
      this.$options._checkParams(message, title, options)
      this.$options._izi.info(Object.assign({}, options, { message, title }))
    },
    success (message, title = '', options = {}) {
      if (!options.timeout) options.timeout = 2000
      this.$options._checkParams(message, title, options)
      this.$options._izi.success(Object.assign({}, options, { message, title }))
    },
    warning (message, title = '', options = {}) {
      this.$options._checkParams(message, title, options)
      this.$options._izi.warning(Object.assign({}, options, { message, title }))
    },
    error (message, title = '', options = {}) {
      if (message instanceof Error) message = message.message
      this.$options._checkParams(message, title, options)
      this.$options._izi.error(Object.assign({}, options, { message, title }))
    },
    errorAxios (err, message, title = '', options = {}) {
      this.$options._checkParams(message, title, options)
      if (err && err.response) this.error(message, `${err.response.status} ${err.response.statusText} ${err.response.data.message || ''}`)
      else this.error(message)
    },
    warningAxios (err, message, title = '', options = {}) {
      this.$options._checkParams(message, title, options)
      if (err && err.response) this.warning(message, `${err.response.status} ${err.response.statusText} ${err.response.data.message || ''}`)
      else this.warning(message)
    },
    question (message, title = '', options = {}) {
      this.$options._checkParams(message, title, options)
      this.$options._izi.question(Object.assign({}, options, { message, title }))
    },
    on (eventName, callback) {
      this.$options._checkEventNames(eventName)
      if (!callback || callback.constructor !== Function) throw new Error('Callback must be a function')
      document.addEventListener(eventName, callback)
    },
    off (eventName, callback) {
      this.$options._checkEventNames(eventName)
      document.removeEventListener(eventName, callback)
    }
  }
})

// noinspection JSCheckFunctionSignatures
Vue.use(iziToast, options)

export default ({ store }, inject) => {
  inject('toast', toasts)
}
