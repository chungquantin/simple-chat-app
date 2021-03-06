import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import App from './app/app';
import './styles.scss';
import { SERVER_URI, WEB_SOCKET_URI } from './constant/global-variables';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { RoomProvider } from '@app/ui';

const httpLink = new HttpLink({
  uri: SERVER_URI,
  credentials: 'include',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: WEB_SOCKET_URI,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoomProvider>
        <App />
      </RoomProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
