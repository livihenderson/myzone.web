"use client";

import { useState, type FormEvent } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/lib/i18n/useT";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Errors = Partial<Record<"name" | "email" | "source" | "form", string>>;

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const RECAPTCHA_ACTION = "sleva_lead";

function getRecaptchaToken(siteKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const g = window.grecaptcha;
    if (!g) {
      reject(new Error("recaptcha_unavailable"));
      return;
    }
    g.ready(() => {
      g.execute(siteKey, { action: RECAPTCHA_ACTION }).then(resolve, reject);
    });
  });
}

export function SlevaForm() {
  const { t, locale } = useT();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const name = (form.get("name") as string | null)?.trim() ?? "";
    const email = (form.get("email") as string | null)?.trim() ?? "";
    const phone = (form.get("phone") as string | null)?.trim() ?? "";
    const source = (form.get("source") as string | null)?.trim() ?? "";
    const message = (form.get("message") as string | null)?.trim() ?? "";
    const company = (form.get("company") as string | null)?.trim() ?? "";

    const next: Errors = {};
    if (!name) next.name = t.sleva.errorRequired;
    if (!email) next.email = t.sleva.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t.sleva.errorEmail;
    if (!source) next.source = t.sleva.errorRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);

    let recaptchaToken = "";
    try {
      if (!siteKey) throw new Error("missing_site_key");
      recaptchaToken = await getRecaptchaToken(siteKey);
    } catch {
      setSubmitting(false);
      setErrors({ form: t.sleva.errorCaptcha });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source,
          message,
          company,
          locale,
          recaptchaToken,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        const code = body?.error;
        const msg =
          code === "rate_limited"
            ? t.sleva.errorRateLimited
            : code === "captcha_failed"
              ? t.sleva.errorCaptcha
              : t.sleva.errorSendFailed;
        setSubmitting(false);
        setErrors({ form: msg });
        return;
      }
      setSubmitting(false);
      setSent(true);
    } catch {
      setSubmitting(false);
      setErrors({ form: t.sleva.errorSendFailed });
    }
  };

  return (
    <section id="sleva" className="relative py-24 md:py-32">
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      )}
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
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? t.sleva.submitting : t.sleva.submit}
                    </Button>
                    {errors.form && (
                      <p
                        role="alert"
                        className="mt-3 text-sm text-[var(--color-text-dim)]"
                      >
                        {errors.form}
                      </p>
                    )}
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
