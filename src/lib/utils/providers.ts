export const WALLET_PROVIDERS = {
    METAMASK: {
      name: 'MetaMask',
      mobile: {
        native: 'metamask://',
        universal: 'https://metamask.app.link/dapp',
        connectionSteps: [
          "Tap 'Connect' in MetaMask",
          "Select your account",
          "Return to browser after connecting"
        ]
      },
      desktop: {
        downloadUrl: 'https://metamask.io/download/'
      }
    },
    COINBASE: {
      name: 'Coinbase Wallet',
      mobile: {
        native: 'cbwallet://',
        universal: 'https://go.cb-w.com/dapp',
        connectionSteps: [
          "Tap 'Connect Wallet' in Coinbase",
          "Choose your account",
          "Return to browser"
        ]
      },
      desktop: {
        downloadUrl: 'https://www.coinbase.com/wallet/downloads'
      }
    }
  } as const;