const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// Singleton client — her request'te yeniden oluşturulmasın
let _client = null;

function getClient() {
  if (_client) return _client;

  const raw = process.env.GA4_CREDENTIALS_JSON;
  if (!raw) return null;

  try {
    // Base64-encoded JSON veya düz JSON string her ikisini de destekle
    const json = raw.trimStart().startsWith('{')
      ? raw
      : Buffer.from(raw, 'base64').toString('utf8');

    const credentials = JSON.parse(json);
    _client = new BetaAnalyticsDataClient({ credentials });
    return _client;
  } catch (err) {
    console.error('[GA4] Credentials parse hatası:', err.message);
    return null;
  }
}

/**
 * GA4 Data API çağrısı yapar.
 * @param {string} propertyId - Sadece sayısal kısım (örn: "323456789")
 * @param {object} request - dateRanges, dimensions, metrics, vb.
 */
async function runReport(propertyId, request) {
  const client = getClient();
  if (!client) {
    const err = new Error('GA4_NOT_CONFIGURED');
    err.code = 'GA4_NOT_CONFIGURED';
    throw err;
  }

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    ...request,
  });

  return response;
}

module.exports = { getClient, runReport };
