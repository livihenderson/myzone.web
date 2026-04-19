"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Errors = Partial<Record<"name" | "email" | "source", string>>;

export function SlevaForm() {
  const { t } = useT();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const name = (form.get("name") as string | null)?.trim() ?? "";
    const email = (form.get("email") as string | null)?.trim() ?? "";
    const phone = (form.get("phone") as string | null)?.trim() ?? "";
    const source = (form.get("source") as string | null)?.trim() ?? "";
    const message = (form.get("message") as string | null)?.trim() ?? "";

    const next: Errors = {};
    if (!name) next.name = t.sleva.errorRequired;
    if (!email) next.email = t.sleva.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t.sleva.errorEmail;
    if (!source) next.source = t.sleva.errorRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("[MyZone lead]", { name, email, phone, source, message });
    setSubmitting(false);
    setSent(true);
  };

  return (
    <section id="sleva" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Card className="relative overflow-hidden p-8 md:p-14">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(107,216,255,0.18), transparent 70%)",
            }}
          />
          <RevealOnScroll className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={t.sleva.eyebrow}
              title={t.sleva.title}
              sub={t.sleva.sub}
            />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-[var(--color-ice)]/40 bg-[rgba(107,216,255,0.06)] p-8 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-ice)] text-[var(--color-ice)]">
                    ✓
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {t.sleva.successTitle}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-text-dim)]">
                    {t.sleva.successBody}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <Input
                    name="name"
                    label={t.sleva.name}
                    required
                    error={errors.name}
                  />
                  <Input
                    name="email"
                    type="email"
                    label={t.sleva.email}
                    required
                    error={errors.email}
                  />
                  <Input name="phone" type="tel" label={t.sleva.phone} />
                  <Select
                    name="source"
                    label={t.sleva.source}
                    options={t.sleva.sourceOptions}
                    placeholder="—"
                    required
                    error={errors.source}
                  />
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-dim)]">
                      {t.sleva.message}
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-dim)]/60 focus:border-[var(--color-ice)]"
                    />
                  </label>
                  <div className="md:col-span-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? t.sleva.submitting : t.sleva.submit}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </RevealOnScroll>
        </Card>
      </div>
    </section>
  );
}
