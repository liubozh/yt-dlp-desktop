import antfu from '@antfu/eslint-config'

export default antfu({
  extends: [
  // add more generic configs
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
  ],
  rules: {
  // add more rules
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
  },
})
