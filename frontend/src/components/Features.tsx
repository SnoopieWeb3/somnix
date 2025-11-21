import { motion } from "motion/react";
import { Zap, Shield, Code2, TrendingUp, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Super Fast",
    description: "Sub-second latency powered by Somnia's cutting-edge infrastructure.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "99.99% Uptime",
    description: "Enterprise-grade reliability with automatic failover and redundancy.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Code2,
    title: "Developer-Friendly",
    description: "Clean APIs, comprehensive docs, and state-of-the-art dev experience.",
    gradient: "from-blue-500 to-purple-500",
  }
];

export function Features() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Built for Scale. Developer First.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to build your financial applications requiring market pricing data, powered by Somnia Data Streams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl`}
                whileHover={{ scale: 1.1 }}
              />
              <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-8 backdrop-blur-sm hover:border-slate-700 transition-all overflow-hidden">
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-2.5 mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className="mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}