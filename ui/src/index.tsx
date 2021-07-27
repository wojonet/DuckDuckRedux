import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";

const cache = new InMemoryCache({
  typePolicies: {
    People: {
      keyFields: ["person_id"],
      fields: {
        planet(_, { readField, toReference }) {
          const planetid = readField("planet_id");
          const planetRef = toReference(`Planet:${planetid}`);
          return planetRef;
        },
      },
    },
  },
});

//const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: cache,
  connectToDevTools: true,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
