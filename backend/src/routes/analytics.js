const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { runReport } = require('../services/ga4');

router.use(authenticate, resolveTenant);

// Türkçe gün adları (GA4 YYYYMMDD → Pzt/Sal/...)
const DAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const SOURCE_MAP = {
  'Organic Search': 'Organik',
  'Direct': 'Direkt',
  'Referral': 'Referans',
  'Organic Social': 'Sosyal',
  'Paid Search': 'Ücretli',
  'Email': 'E-posta',
  'Organic Video': 'Video',
  'Organic Shopping': 'Alışveriş',
};

const SOURCE_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#e0e7ff'];

function parseDateStr(yyyymmdd) {
  const y = parseInt(yyyymmdd.slice(0, 4));
  const m = parseInt(yyyymmdd.slice(4, 6)) - 1;
  const d = parseInt(yyyymmdd.slice(6, 8));
  return new Date(y, m, d);
}

function calcTrend(cur, prev) {
  if (!prev || prev === 0) return null;
  return Math.round(((cur - prev) / prev) * 100);
}

function formatDuration(seconds) {
  const s = parseFloat(seconds) || 0;
  const m = Math.floor(s / 60);
  const sec = String(Math.floor(s % 60)).padStart(2, '0');
  return `${m}:${sec}`;
}

// GET /api/analytics/summary
router.get('/summary', async (req, res) => {
  const { tenant } = req;
  const propertyId = tenant.integrations?.analyticsPropertyId;

  if (!propertyId) {
    return res.json({ configured: false, reason: 'no_property_id' });
  }

  if (!process.env.GA4_CREDENTIALS_JSON) {
    return res.json({ configured: false, reason: 'no_credentials' });
  }

  try {
    const [curRes, prevRes, trafficRes, sourcesRes, pagesRes] = await Promise.all([
      // Güncel dönem (son 7 gün)
      runReport(propertyId, {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'newUsers' },
        ],
      }),
      // Önceki dönem (karşılaştırma)
      runReport(propertyId, {
        dateRanges: [{ startDate: '14daysAgo', endDate: '8daysAgo' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
        ],
      }),
      // Günlük trafik grafiği (son 7 gün)
      runReport(propertyId, {
        dateRanges: [{ startDate: '6daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      // Trafik kaynakları
      runReport(propertyId, {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGrouping' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 6,
      }),
      // En çok görüntülenen sayfalar
      runReport(propertyId, {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pageTitle' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'bounceRate' },
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),
    ]);

    // Güncel dönem metrikleri
    const cur = curRes.rows?.[0]?.metricValues || [];
    const prev = prevRes.rows?.[0]?.metricValues || [];

    const visitors = parseInt(cur[0]?.value || 0);
    const pageViews = parseInt(cur[1]?.value || 0);
    const sessions = parseInt(cur[2]?.value || 0);
    const avgDuration = formatDuration(cur[3]?.value || 0);
    const newUsers = parseInt(cur[4]?.value || 0);

    const pVisitors = parseInt(prev[0]?.value || 0);
    const pPageViews = parseInt(prev[1]?.value || 0);
    const pSessions = parseInt(prev[2]?.value || 0);

    // Günlük trafik
    const traffic = (trafficRes.rows || []).map((row) => {
      const date = parseDateStr(row.dimensionValues[0].value);
      return {
        day: DAYS_TR[date.getDay()],
        ziyaretçi: parseInt(row.metricValues[0].value || 0),
        görüntülenme: parseInt(row.metricValues[1].value || 0),
      };
    });

    // Trafik kaynakları
    const totalSrc = (sourcesRes.rows || []).reduce(
      (s, r) => s + parseInt(r.metricValues[0].value || 0), 0
    );
    const sources = (sourcesRes.rows || []).map((row, i) => {
      const rawName = row.dimensionValues[0].value;
      const value = parseInt(row.metricValues[0].value || 0);
      return {
        name: SOURCE_MAP[rawName] || rawName,
        value,
        pct: totalSrc > 0 ? Math.round((value / totalSrc) * 100) : 0,
        color: SOURCE_COLORS[i] || '#e0e7ff',
      };
    });

    // En iyi sayfalar
    const topPages = (pagesRes.rows || []).map((row) => ({
      title: row.dimensionValues[0].value,
      views: parseInt(row.metricValues[0].value || 0),
      sessions: parseInt(row.metricValues[1].value || 0),
      bounce: Math.round(parseFloat(row.metricValues[2].value || 0) * 100),
    }));

    res.json({
      configured: true,
      stats: {
        visitors,
        pageViews,
        sessions,
        newUsers,
        avgDuration,
        visitorTrend: calcTrend(visitors, pVisitors),
        pageViewTrend: calcTrend(pageViews, pPageViews),
        sessionTrend: calcTrend(sessions, pSessions),
      },
      traffic,
      sources,
      topPages,
    });
  } catch (err) {
    if (err.code === 'GA4_NOT_CONFIGURED') {
      return res.json({ configured: false, reason: 'no_credentials' });
    }
    console.error('[GA4] API hatası:', err.message);
    res.status(500).json({ message: 'GA4 verisi alınamadı', detail: err.message });
  }
});

module.exports = router;
