import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative order-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-12 md:grid-cols-12 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/snoopieweb3/somnix"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-slate-400" />
              </a>
              <a
                href="https://x.com/snoopieweb3"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear().toString()} Somnix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
