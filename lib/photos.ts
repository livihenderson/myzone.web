// Stock gym photos (moody/dark). Replace with real MyZone photos later.
// Uses Unsplash's direct image CDN. Listed in next.config.ts remotePatterns.
const BASE = "https://images.unsplash.com";
const PARAMS = "auto=format&fit=crop&w=1600&q=80";

export const gymPhotos: readonly string[] = [
  `${BASE}/photo-1534438327276-14e5300c3a48?${PARAMS}`,
  `${BASE}/photo-1571019613454-1cb2f99b2d8b?${PARAMS}`,
  `${BASE}/photo-1517836357463-d25dfeac3438?${PARAMS}`,
  `${BASE}/photo-1558611848-73f7eb4001a1?${PARAMS}`,
  `${BASE}/photo-1623874514711-0f321325f318?${PARAMS}`,
  `${BASE}/photo-1540497077202-7c8a3999166f?${PARAMS}`,
  `${BASE}/photo-1593079831268-3381b0db4a77?${PARAMS}`,
  `${BASE}/photo-1581009146145-b5ef050c2e1e?${PARAMS}`,
  `${BASE}/photo-1584735935682-2f2b69dff9d2?${PARAMS}`,
];

export const facilityPhotos: readonly string[] = gymPhotos.slice(0, 4);
