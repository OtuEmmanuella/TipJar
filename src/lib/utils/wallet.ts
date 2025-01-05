export const DEMO_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

export function formatAddress(address: string): string {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}