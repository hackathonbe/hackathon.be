// Where the cities in the event files are, for the dots on the homepage map.
// A city that is not listed here still gets its pages, but no dot.

const COORDINATES: Record<string, [lat: number, lon: number]> = {
  Aalst: [50.936, 4.036],
  Antwerp: [51.22, 4.4],
  Bruges: [51.209, 3.225],
  Brussels: [50.85, 4.35],
  Charleroi: [50.41, 4.44],
  Geel: [51.162, 4.99],
  Genk: [50.965, 5.5],
  Ghent: [51.05, 3.72],
  Gullegem: [50.86, 3.17],
  'Avin (Hannut)': [50.67, 5.08],
  Hasselt: [50.93, 5.34],
  Kortrijk: [50.828, 3.265],
  Leuven: [50.88, 4.7],
  Liège: [50.63, 5.57],
  'Louvain-la-Neuve': [50.668, 4.612],
  'Marche-les-Dames': [50.49, 4.95],
  Mechelen: [51.026, 4.477],
  Mons: [50.454, 3.952],
  Namur: [50.467, 4.867],
  Ostend: [51.215, 2.928],
  Ramillies: [50.644, 4.915],
  'Sint-Niklaas': [51.165, 4.143],
  'Sint-Truiden': [50.816, 5.186],
  Zeebrugge: [51.33, 3.2],
};

// The map is a plain linear fit on the 560 x 480 outline, calibrated on
// Brussels, Antwerp, Ghent, Liège and Charleroi (all within 1 px).
const SCALE_X = 137.9;
const SCALE_Y = 216.5;

export function projectCity(city: string): { x: number; y: number } | null {
  const coordinates = COORDINATES[city];
  if (!coordinates) return null;
  const [lat, lon] = coordinates;
  return {
    x: Math.round((266.8 + SCALE_X * (lon - 4.35)) * 10) / 10,
    y: Math.round((165.4 - SCALE_Y * (lat - 50.85)) * 10) / 10,
  };
}
