module.exports = {
    plugins: ['log-filenames'],
    extends: ['next/core-web-vitals', 'prettier'],
    rules: {
        'react-internal/no-production-logging': 'off',
        '@next/next/no-img-element': 'off',
        'react/display-name': 'off'
    },
    env: {
        node: true,
        jest: true
    },
    parserOptions: {
        ecmaVersion: 'latest'
    },
    settings: {
        next: {
            rootDir: ['apps/*/']
        }
    }
};
