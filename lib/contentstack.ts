import contentstack from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { GraphQLHeaders, Page } from "./types";
import { GraphQLClient } from "graphql-request";
import { graphql } from "../gql"
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "EU")
const endpoints = getContentstackEndpoints(region, true)

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: region,
  live_preview: {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host: endpoints.preview,
  }
});

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false,
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },
    clientUrlParams: {
      host: endpoints.application
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"]
    },
  });
}

export async function getPage(url: string) {
  const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
  const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string;
  const preview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW;
  const previewToken = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN as string;
  const hash = ContentstackLivePreview.hash;
  const baseURL = preview === 'true' && hash ? endpoints.graphqlPreview : endpoints.graphql

  const headers: GraphQLHeaders = {
    access_token: accessToken
  }

  if (hash) {
    headers.live_preview = hash;
    headers.preview_token = previewToken
  }

  const gqEndpoint = `https://${baseURL}/stacks/${apiKey}?environment=${environment}`;
  const graphQLClient = new GraphQLClient(gqEndpoint, {
    headers
  })

  const query = graphql(`
    query Page($url: String!) {
      all_page(where: {url: $url}) {
        items {
          system {
            uid
            content_type_uid
          }
          description
          rich_text
          title
          url
          imageConnection {
            edges {
              node {
                url
                title
              }
            }
          }
          blocks {
            ... on PageBlocksBlock {
              __typename
              block {
                copy
                imageConnection {
                  edges {
                    node {
                      url
                      title
                    }
                  }
                }
                layout
                title
              }
            }
          }
        }
      }
    }
  `)

  const variables = {
    url: url || "/",
  };

  const res = await graphQLClient.request(
    query,
    variables
  );

  // needed for editable tags
  const fullPage = res?.all_page?.items && res?.all_page?.items[0]
  const fixedEntryForEditableTags = res?.all_page?.items && {
    ...fullPage,
    image: fullPage?.imageConnection?.edges && fullPage?.imageConnection?.edges[0]?.node,
    blocks: fullPage?.blocks && fullPage?.blocks.map(block => ({
      ...block,
      block: {
        ...block?.block,
        image: block?.block && block?.block.imageConnection?.edges?.[0]?.node || null
      }
    })),
    uid: res?.all_page?.items[0]?.system?.uid,
    _content_type_uid: res?.all_page?.items[0]?.system?.content_type_uid
  }

  const entry = fixedEntryForEditableTags;

  if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
    entry && contentstack.Utils.addEditableTags(entry as Page, 'page', true);
  }

  return entry as Page
}