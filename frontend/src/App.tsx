import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CodeExamples } from "./components/CodeExamples";
import { PricingSection } from "./components/PricingSection";
import { Footer } from "./components/Footer";
import { FloatingElements } from "./components/FloatingElements";

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <FloatingElements />
      <Hero />
      <Features />
      <CodeExamples />
      <Footer />
    </div>
  );
}