export default ({ store }, inject) => {
  inject('rules', {
    required: (value) => {
      if (typeof value === 'string') value.trim()
      if (value === 0) return true
      return !!value || 'To pole jest wymagane'
    },
    regexCheck: (regex, errMsg) => { return value => RegExp(regex).test(value) || errMsg },
    minLength: (threshold) => { return value => value.length >= threshold || `Pole musi zawierać minimum ${threshold} znaków` },
    maxLength: (threshold) => { return value => value.length <= threshold || `Pole musi zawierać maksimum ${threshold} znaków` },
    maxSize: (threshold) => { return value => !value || value.size < 1000 * threshold || `Image size should be less than ${threshold / 1000} MB!` },
    greaterThan: (threshold) => { return value => value > threshold || `Wartośc musi być większa niż ${threshold}` },
    greaterThanEquals: (threshold) => { return value => value >= threshold || `Wartośc musi być nie mniejsza niż ${threshold}` },
    lowerThanEquals: (threshold) => { return value => value <= threshold || `Fartośc musi być nie większa niż ${threshold}` }
  })
}
