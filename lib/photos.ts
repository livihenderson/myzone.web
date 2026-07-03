// Real MyZone gym photos, served locally from /public/photos.
// Converted from HEIC originals to web-sized WebP (longest edge 1600px, q80).
//
// Imported statically (not as string paths) so Next.js derives intrinsic
// width/height (kills CLS guesswork) and auto-generates a blurDataURL —
// enabling placeholder="blur" with no manual base64.
import type { StaticImageData } from "next/image";
import img3704 from "@/public/photos/img_3704-v2.webp";
import img3708 from "@/public/photos/img_3708-v2.webp";
import img3712 from "@/public/photos/img_3712-v2.webp";
import img3713 from "@/public/photos/img_3713-v2.webp";
import img3715 from "@/public/photos/img_3715-v2.webp";
import img3716 from "@/public/photos/img_3716-v3.webp";
import img3717 from "@/public/photos/img_3717-v2.webp";
import img3723 from "@/public/photos/img_3723-v2.webp";
import img3724 from "@/public/photos/img_3724-v2.webp";
import img3727 from "@/public/photos/img_3727-v2.webp";
import img3728 from "@/public/photos/img_3728-v2.webp";
import img3729 from "@/public/photos/img_3729-v2.webp";
import img3734 from "@/public/photos/img_3734-v2.webp";
import img3738 from "@/public/photos/img_3738-v2.webp";
import img3739 from "@/public/photos/img_3739-v2.webp";
import img3743 from "@/public/photos/img_3743-v2.webp";
import img3746 from "@/public/photos/img_3746-v2.webp";
import img3751 from "@/public/photos/img_3751-v2.webp";

export const gymPhotos: readonly StaticImageData[] = [
  img3704,
  img3708,
  img3712,
  img3713,
  img3715,
  img3716,
  img3717,
  img3723,
  img3724,
  img3727,
  img3728,
  img3729,
  img3734,
  img3738,
  img3739,
  img3743,
  img3746,
  img3751,
];

// Facility cards in components/sections/Vybaveni.tsx, in order:
//   0 Silový trénink  — squat rack / pull-up bar
//   1 Kladky & stroje — cable station
//   2 Kardio & mobilita — treadmill
//   3 Volné váhy      — dumbbell rack & bench
export const facilityPhotos: readonly StaticImageData[] = [
  img3751,
  img3746,
  img3739,
  img3717,
];
