module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
        "modules": true,
        "jsx": true
        }
    },
    "globals": {
        "chrome": true,
        "__DEV__": true
    },
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base"
    ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "comma-dangle": 0,
        "indent": [
        2,
        2,
        {
            "SwitchCase": 1
        }
        ],
        "no-unused-vars": [
        "error",
        {
            "vars": "local",
            "args": "none"
        }
        ],
        "no-console": 1,
        "camelcase": 0,
        "no-return-assign": 0,
        "arrow-body-style": 0,
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0,
        "no-underscore-dangle": 0,
        "linebreak-style": 0,
        "eslint eol-last": 0,
        "eslint-disable eol-last": 0
    }

};