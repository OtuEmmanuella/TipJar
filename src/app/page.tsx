import Hero from "@/components/Hero";
// import TipJarForm from "@/components/TipJarForm";
// import TransactionHistory from "@/components/TransactionHistory";
// import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* <WalletConnect /> */}
      <Hero />
      {/* <div className="max-w-7xl mx-auto px-4 py-16">
        <TipJarForm />
        <TransactionHistory />
      </div> */}
    </main>
  );
}