import { ApolloProvider, SuspenseCache } from '@apollo/client';
import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Fallback } from '../../../pages/Fallback';
import { apolloClient } from '../../../utils//apollo_client';

type Props = {
  children: ReactNode;
};

const suspenseCache = new SuspenseCache();

export const Providers: FC<Props> = ({ children }) => (
  <ApolloProvider client={apolloClient} suspenseCache={suspenseCache}>
    <HelmetProvider>
    <BrowserRouter>
      <RecoilRoot>
        <ErrorBoundary fallbackRender={Fallback}>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>
);
