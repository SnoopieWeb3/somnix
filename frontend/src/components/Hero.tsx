import { motion } from "motion/react";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import { SDK } from '@somnia-chain/streams';
import { createPublicClient, http } from 'viem';
import { somniaTestnet } from 'viem/chains';

const publicClient = createPublicClient({
  chain: somniaTestnet,
  transport: http(),
});

const sdk = new SDK({
  public: publicClient
});

const schemaId = '0xfec38ed8e82cb002fa916f912c146bf66708958bbea1f369b69368c4c3330af2';
const publisher = '0xc5020ecb67701f3b978e8daec2371db0abf0e24c';

export function Hero() {

  const [priceData, setPriceData]: any = useState({
    "BTC": { price: 0, logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040' },
    "ETH": { price: 0, logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040' },
    "SOL": { price: 0, logo: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=040' },
  });

  const loadStreams = async () => {

    try {

      const latest: any = await sdk.streams.getLastPublishedDataForSchema(schemaId, publisher);

      const updatedPrices = { ...priceData };

      for (let symbol of Object.keys(priceData)) {
        const found = latest[0].find((x: any) => x.name === symbol);
        if (found && found.value && found.value.value) {
          const price = parseFloat(found.value.value) / 1e18;
          updatedPrices[symbol].price = price;
        }
      }

      setPriceData(updatedPrices);

    } catch (error) {
      console.error("Error loading prices", error);
    }

    setTimeout(loadStreams, 3000);
  };

  useEffect(() => {
    loadStreams();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-slate-950 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
        >
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300">Real-time Price Feeds</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.3 }}
        >
          Lightning-Fast Price Data Streams
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 text-slate-300 max-w-3xl mx-auto"
        >
          Access cryptocurrency price data with sub-second latency via Somnia Data Streams.
          Built for developers who demand reliability, security, and speed.
        </motion.p>

        {/* Live Price Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          {Object.keys(priceData).map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border cursor-pointer border-slate-800 rounded-lg px-6 py-3 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <img src={priceData[item].logo} style={{ height: 20 }} />
                <span className="text-slate-400">{priceData[item].symbol}</span>
                <span className="text-white">${priceData[item].price.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                <span
                  className={`text-sm flex items-center`}
                >
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {"< 250ms"}
            </div>
            <p className="text-slate-400">Latency</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              99.99%
            </div>
            <p className="text-slate-400">Uptime</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              1,000+
            </div>
            <p className="text-slate-400">Requests / day</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}