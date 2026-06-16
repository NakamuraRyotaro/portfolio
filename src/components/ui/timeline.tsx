"use client";

import { motion } from "motion/react";
import { IconExternalLink } from "@tabler/icons-react";

export type TimelineEntry = {
  date: string;
  title: string;
  detail: string;
  companies?: { name: string; url: string }[];
};

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/60 via-neutral-700 to-transparent" />
      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative pl-10"
          >
            <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-emerald-400 bg-neutral-950 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
            <span className="text-xs font-medium tracking-wide text-emerald-400">
              {item.date}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-neutral-50">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{item.detail}</p>
            {item.companies && item.companies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.companies.map((c) => (
                  <a
                    key={c.url}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                  >
                    {c.name}
                    <IconExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
