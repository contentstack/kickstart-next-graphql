import { CodegenConfig } from '@graphql-codegen/cli';

const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || 'blte766efb491f96715';
const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'preview';
const region = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'EU'
const baseURL = region === 'EU' ? 'eu-graphql.contentstack.com' : 'graphql.contentstack.com'
const accessToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || 'cs620decb0e6bb175e31210ce9'

const config: CodegenConfig = {
  schema: {
    [`https://${baseURL}/stacks/${apiKey}?environment=${environment}`]: {
      headers: {
        access_token: accessToken,
      },
    },
  },
  documents: ['./**/*.tsx', './**/*.ts', '!src/gql/**/*'],
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;