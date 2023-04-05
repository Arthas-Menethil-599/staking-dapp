import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, goerli, bscTestnet } from 'wagmi/chains'
import { publicProvider} from 'wagmi/providers/public'
import "@rainbow-me/rainbowkit/styles.css"
const {chains, provider} = configureChains(
  [mainnet, polygon, optimism, goerli, bscTestnet],
  [publicProvider()]
);

const {connectors} = getDefaultWallets({
  appName: 'Test web3 app',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors,
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps}/>
    </RainbowKitProvider>
  </WagmiConfig>
  );
}
