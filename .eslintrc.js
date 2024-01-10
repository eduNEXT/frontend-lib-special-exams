const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/function-component-definition': 'off',
    'react/no-array-index-key': 'off',
    'no-restricted-exports': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
});
