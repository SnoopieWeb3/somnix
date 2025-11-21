import { motion } from "motion/react";
import { useState } from "react";
import { Check, Copy, Play, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { SyntaxHighlighter } from "./SyntaxHighlighter";

const codeExamples = [
  {
    language: "JavaScript",
    code: `import { SDK } from '@somnia-chain/streams';
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

const latest: any = await sdk.streams.getLastPublishedDataForSchema(schemaId, publisher);

// Outputs the prices of around 20+ crypto tokens - BTC, SOL, ETH, XRP, AAVE, etc.`,
}
];

export function CodeExamples() {

  const [activeTab, _setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Start in Minutes
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Simple, intuitive source code that gets you up and running in no time!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >

          {/* Code Block */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl" />
            <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-red-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <span className="ml-4 text-slate-400 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    {codeExamples[activeTab].language}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="p-6 overflow-x-auto bg-slate-950/50">
                <SyntaxHighlighter
                  code={codeExamples[activeTab].code}
                  language={codeExamples[activeTab].language}
                />
              </div>
            </div>
          </motion.div>

          {/* Live Demo Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mt-6 justify-center"
          >
            <div className="relative">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
            </div>
            <span className="text-slate-400">Feed is Active</span>
          </motion.div>
        </motion.div>

      </div>

    </section>
    
  );
}