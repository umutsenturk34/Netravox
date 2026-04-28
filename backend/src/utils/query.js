// Query param güvenlik yardımcıları

// Operator injection önleme: object geldiyse undefined döner, string ise aynen geçirir
const safeStr = (val) => (typeof val === 'string' ? val : undefined);

// Sayfalama: limit 1–100 arasına kısıtlar
const safePage = (val, defaultLimit = 20) => {
  const n = Math.floor(Number(val));
  return isNaN(n) || n < 1 ? defaultLimit : Math.min(n, 100);
};

const safePageNum = (val) => {
  const n = Math.floor(Number(val));
  return isNaN(n) || n < 1 ? 1 : n;
};

module.exports = { safeStr, safePage, safePageNum };
