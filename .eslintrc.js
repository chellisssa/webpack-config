module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jquery": true
  },
  "plugins": [
    "react"
  ],
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": "off",
    "no-unused-vars": 'off',
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  "globals": {
    "google": true,
  }
};
