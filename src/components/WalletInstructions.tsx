import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { WALLET_PROVIDERS } from '@/lib/utils/providers';
type WalletProviderType = keyof typeof WALLET_PROVIDERS;


interface WalletInstructionsProps {
    provider: WalletProviderType;
    onBack: () => void;
}

export const WalletInstructions: React.FC<WalletInstructionsProps> = ({
  provider,
  onBack
}) => {
  const walletInfo = WALLET_PROVIDERS[provider];

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to wallet selection
      </button>
      
      <h3 className="text-lg font-semibold mb-4">
        Connect with {walletInfo.name}
      </h3>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800 mb-2 font-medium">
            Connection Steps:
          </p>
          <ol className="list-decimal pl-4 space-y-2">
            {walletInfo.mobile.connectionSteps.map((step, index) => (
              <li key={index} className="text-sm text-blue-700">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            If the app doesn't open automatically, tap the button below:
          </p>
        </div>
      </div>
    </div>
  );
};