const OpenAI = require('openai');

const SECTOR_CONTEXT = {
  restaurant:  'restoran, kafe, gastronomi ve yemek kültürü',
  dental:      'diş sağlığı, ağız bakımı ve diş hekimliği',
  real_estate: 'emlak, gayrimenkul, konut alım-satım ve kiralama',
  beauty:      'güzellik, estetik, cilt bakımı ve kuaförlük',
  hotel:       'otelcilik, konaklama ve turizm',
  service:     'yerel hizmetler ve küçük işletmeler',
  other:       'dijital pazarlama, teknoloji ve iş dünyası',
};

const LANG_LABEL = { tr: 'Türkçe', en: 'İngilizce' };

async function generateBlogPost({ title, sector = 'other', language = 'tr' }) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY tanımlı değil');

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const ctx = SECTOR_CONTEXT[sector] || SECTOR_CONTEXT.other;
  const lang = LANG_LABEL[language] || 'Türkçe';

  const system = `Sen ${ctx} alanında uzman, SEO odaklı bir içerik yazarısın.
Ürettiğin blog yazıları; okunabilir, bilgilendirici, doğal akışlı ve arama motoru dostu olmalı.
Yanıtını SADECE geçerli JSON olarak ver, başka hiçbir şey ekleme.`;

  const user = `Başlık: "${title}"
Dil: ${lang}
Sektör: ${ctx}

Aşağıdaki JSON şemasını doldur:
{
  "title": "${lang} başlık (verileni iyileştir veya aynen kullan)",
  "slug": "url-dostu-slug-sadece-latin-harf-ve-tire",
  "content": "Tam makale — HTML formatında (h2, h3, p, ul, li kullan). En az 600 kelime. Giriş → alt başlıklar → sonuç yapısı.",
  "excerpt": "Makaleyi özetleyen 150-200 karakter metin",
  "metaTitle": "SEO meta başlığı (50-60 karakter)",
  "metaDescription": "SEO meta açıklaması (140-155 karakter)",
  "tags": ["etiket1", "etiket2", "etiket3", "etiket4", "etiket5"]
}`;

  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user',   content: user   },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.72,
    max_tokens: 3500,
  });

  const raw = resp.choices[0].message.content;
  return JSON.parse(raw);
}

module.exports = { generateBlogPost };
