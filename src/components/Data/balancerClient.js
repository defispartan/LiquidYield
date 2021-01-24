import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const balancerClient = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({
    // pending uniswap with 'fixed' trade volumne
    uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer",
  }),
  cache: new InMemoryCache(),
});
