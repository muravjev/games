module.exports = {
    plugins: ['@typescript-eslint', 'log-filenames', 'prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals', 'prettier'],
    rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false
                }
            }
        ],
        'react-internal/no-production-logging': 'off',
        'react/display-name': 'off',
        '@next/next/no-img-element': 'off'
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
