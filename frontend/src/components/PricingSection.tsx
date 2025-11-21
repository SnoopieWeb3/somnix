import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing and development",
    features: [
      "100 requests/hour",
      "WebSocket access",
      "Basic support",
      "Community access",
      "50+ crypto pairs",
    ],
    gradient: "from-slate-700 to-slate-800",
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    description: "For production applications",
    features: [
      "100,000 requests/hour",
      "Priority WebSocket",
      "Priority support",
      "Custom webhooks",
      "200+ asset pairs",
      "Historical data access",
      "99.99% SLA",
    ],
    gradient: "from-blue-600 to-purple-600",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For high-volume applications",
    features: [
      "Unlimited requests",
      "Dedicated infrastructure",
      "24/7 premium support",
      "Custom integrations",
      "All asset pairs",
      "Raw market data",
      "Custom SLA",
      "Dedicated account manager",
    ],
    gradient: "from-purple-600 to-pink-600",
    popular: false,
  },
];

export function PricingSection() {
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include core features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4 fill-white" />
                    Most Popular
                  </div>
                </motion.div>
              )}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-300`}
                whileHover={{ scale: 1.05 }}
              />
              <div
                className={`relative h-full bg-slate-900/50 border ${
                  plan.popular ? "border-blue-500/50 shadow-lg shadow-blue-500/20" : "border-slate-800"
                } rounded-xl p-8 backdrop-blur-sm hover:border-slate-700 transition-all`}
              >
                <div className="mb-8">
                  <h3 className="mb-2 text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <motion.span
                      className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {plan.price}
                    </motion.span>
                    {plan.price !== "Custom" && <span className="text-slate-400">/month</span>}
                  </div>
                  <p className="text-slate-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 shadow-lg shadow-blue-500/20`
                      : "bg-slate-800 hover:bg-slate-700"
                  } group transition-all`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  <motion.span
                    className="inline-block ml-2"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}