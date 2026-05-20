
const SPORT_IMAGES = {
  football: "https://images.unsplash.com/photo-1486286701208-1d58e9338013",
  cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
  badminton: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
  basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
  tennis: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
  swimming: "https://images.unsplash.com/photo-1530549387789-4c1017266635",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
  yoga: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
  volleyball: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1",
  "table tennis": "https://images.unsplash.com/photo-1534158914592-062992fbe900",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b";

const IMG_PARAMS = "?auto=format&fit=crop&w=800&q=60";

export function getFacilityImage(f) {
  if (f?.image) return f.image;
  const key = (f?.sport || f?.facility_type || "").toLowerCase();
  for (const k of Object.keys(SPORT_IMAGES)) {
    if (key.includes(k)) return SPORT_IMAGES[k] + IMG_PARAMS;
  }
  return DEFAULT_IMAGE + IMG_PARAMS;
}

export function getFacilitySport(f) {
  return f?.sport || f?.facility_type || "";
}

export function getFacilityPrice(f) {
  return f?.price ?? f?.price_per_hour ?? f?.pricePerHour ?? 0;
}
