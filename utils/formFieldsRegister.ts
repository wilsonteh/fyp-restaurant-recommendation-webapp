const { register } = require('react-hook-form')

export const email = register('email', {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email address is invalid",
  }
})