"use client";

import { IconChevronDown, IconHelpCircle } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * An accordion where one answer is open at a time. The copy arrives as props so the
 * three site languages all run through the same component.
 */
export function FAQSection({
  items,
  title,
  subtitle,
  className,
}: {
  items: FaqItem[];
  /** Leave unset on a page that already carries its own heading, so it is not said twice. */
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const reduce = useReducedMotion();

  /** Cards rise into view as they are scrolled to, unless the visitor asked for less motion. */
  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } }
      : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay, duration: 0.4 } };

  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-4xl">
        {title && (
          <motion.div viewport={{ once: true }} {...rise(0)} className="mb-12 text-center">
            <motion.div
              initial={reduce ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={reduce ? { duration: 0 } : { delay: 0.2, type: "spring" }}
              className="mb-4 inline-flex rounded-full bg-coral/10 p-3"
              aria-hidden
            >
              <IconHelpCircle className="h-8 w-8 text-coral-ink" stroke={1.6} aria-hidden />
            </motion.div>
            <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
          </motion.div>
        )}

        <div className="space-y-4">
          {items.map((faq, index) => {
            const questionId = `${baseId}-question-${index}`;
            const answerId = `${baseId}-answer-${index}`;
            const open = openIndex === index;

            return (
              <motion.div key={faq.question} viewport={{ once: true }} {...rise(index * 0.1)}>
                {/* The card itself does not clip: the button fills it, and a clipping card
                    would swallow that button's focus outline. */}
                <Card>
                  <CardHeader className="p-0">
                    {/* The question is a heading so screen readers can jump between them. */}
                    <h3>
                      <motion.button
                        type="button"
                        onClick={() => setOpenIndex(open ? null : index)}
                        className="flex min-h-11 w-full items-center justify-between gap-4 p-6 text-left"
                        whileHover={reduce ? undefined : { x: 4 }}
                        aria-expanded={open}
                        aria-controls={answerId}
                        id={questionId}
                      >
                        <span className="font-heading text-base font-semibold md:text-lg">{faq.question}</span>
                        <motion.span
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: reduce ? 0 : 0.3 }}
                          className="shrink-0"
                          aria-hidden
                        >
                          <IconChevronDown className="h-5 w-5 text-coral" stroke={2} aria-hidden />
                        </motion.span>
                      </motion.button>
                    </h3>
                  </CardHeader>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                        // Clipping belongs on the panel that collapses, so the answer is cut
                        // off as the height animates rather than spilling out.
                        className="overflow-hidden"
                        role="region"
                        id={answerId}
                        aria-labelledby={questionId}
                      >
                        <CardContent className="pt-0">
                          <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
