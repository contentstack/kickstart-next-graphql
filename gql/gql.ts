/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query Page($url: String!) {\n      all_page(where: {url: $url}) {\n        items {\n          system {\n            uid\n            content_type_uid\n          }\n          description\n          rich_text\n          title\n          url\n          imageConnection {\n            edges {\n              node {\n                url\n                title\n              }\n            }\n          }\n          blocks {\n            ... on PageBlocksBlock {\n              __typename\n              block {\n                copy\n                imageConnection {\n                  edges {\n                    node {\n                      url\n                      title\n                    }\n                  }\n                }\n                layout\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  ": typeof types.PageDocument,
};
const documents: Documents = {
    "\n    query Page($url: String!) {\n      all_page(where: {url: $url}) {\n        items {\n          system {\n            uid\n            content_type_uid\n          }\n          description\n          rich_text\n          title\n          url\n          imageConnection {\n            edges {\n              node {\n                url\n                title\n              }\n            }\n          }\n          blocks {\n            ... on PageBlocksBlock {\n              __typename\n              block {\n                copy\n                imageConnection {\n                  edges {\n                    node {\n                      url\n                      title\n                    }\n                  }\n                }\n                layout\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.PageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Page($url: String!) {\n      all_page(where: {url: $url}) {\n        items {\n          system {\n            uid\n            content_type_uid\n          }\n          description\n          rich_text\n          title\n          url\n          imageConnection {\n            edges {\n              node {\n                url\n                title\n              }\n            }\n          }\n          blocks {\n            ... on PageBlocksBlock {\n              __typename\n              block {\n                copy\n                imageConnection {\n                  edges {\n                    node {\n                      url\n                      title\n                    }\n                  }\n                }\n                layout\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query Page($url: String!) {\n      all_page(where: {url: $url}) {\n        items {\n          system {\n            uid\n            content_type_uid\n          }\n          description\n          rich_text\n          title\n          url\n          imageConnection {\n            edges {\n              node {\n                url\n                title\n              }\n            }\n          }\n          blocks {\n            ... on PageBlocksBlock {\n              __typename\n              block {\n                copy\n                imageConnection {\n                  edges {\n                    node {\n                      url\n                      title\n                    }\n                  }\n                }\n                layout\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;