export default ({ store }, inject) => {
  inject('rules', {
    required: (value) => {
      if (typeof value === 'string') value.trim()
      if (value === 0) return true
      return !!value || 'This field is required'
    },
    regexCheck: (regex, errMsg) => { return value => RegExp(regex).test(value) || errMsg },
    minLength: (threshold) => { return value => value.length >= threshold || `Field must have minimum ${threshold} characters` },
    maxLength: (threshold) => { return value => value.length <= threshold || `Field must have maximum ${threshold} characters` },
    maxSize: (threshold) => { return value => !value || value.size < 1000 * threshold || `Image size should be less than ${threshold / 1000} MB!` },
    greaterThan: (threshold) => { return value => value > threshold || `Field must be greater than ${threshold}` },
    greaterThanEquals: (threshold) => { return value => value >= threshold || `Field must be not lower than ${threshold}` },
    lowerThanEquals: (threshold) => { return value => value <= threshold || `Field must be not greater than ${threshold}` }
  })
}
