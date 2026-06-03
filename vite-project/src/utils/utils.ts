export const roll3d6 = () => {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1)
              .reduce((a, b) => a + b, 0);
};

export const getModifier = (score: number) => {
  if (score <= 3) return "-3";
  if (score <= 5) return "-2";
  if (score <= 8) return "-1";
  if (score <= 12) return "+0";
  if (score <= 15) return "+1";
  if (score <= 17) return "+2";
  return "+3";
};

export const getRandomElement = (arr: any) => arr[Math.floor(Math.random() * arr.length)];