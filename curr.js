const API_KEY = 'd12926193809297465fdb90d'; // Replace with your actual free API key
const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const currencies = [
  // Middle East & North Africa
  { code: 'AED', locale: 'en-US', name: 'UAE Dirham' },
  { code: 'SAR', locale: 'en-UK', name: 'Saudi Riyal' },
  { code: 'QAR', locale: 'en-US', name: 'Qatari Rial' },
  { code: 'KWD', locale: 'en-US', name: 'Kuwaiti Dinar' },
  { code: 'BHD', locale: 'en-US', name: 'Bahraini Dinar' },
  { code: 'OMR', locale: 'en-US', name: 'Omani Rial' },
  { code: 'EGP', locale: 'en-US', name: 'Egyptian Pound' },
  { code: 'JOD', locale: 'en-US', name: 'Jordanian Dinar' },
  { code: 'LBP', locale: 'en-US', name: 'Lebanese Pound' },
  { code: 'MAD', locale: 'en-AR', name: 'Moroccan Dirham' },
  { code: 'DZD', locale: 'en-US', name: 'Algerian Dinar' },
  { code: 'ILS', locale: 'he-IL', name: 'Israeli New Shekel' },

  // North America & Europe
  { code: 'USD', locale: 'en-US', name: 'US Dollar' },
  { code: 'CAD', locale: 'en-US', name: 'Canadian Dollar' },
  { code: 'EUR', locale: 'de-DE', name: 'Euro' },
  { code: 'GBP', locale: 'en-GB', name: 'Pound Sterling' },
  { code: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  { code: 'TRY', locale: 'tr-TR', name: 'Turkish Lira' },
  { code: 'RUB', locale: 'ru-RU', name: 'Russian Ruble' },
  { code: 'PLN', locale: 'pl-PL', name: 'Polish Zloty' },
  { code: 'SEK', locale: 'sv-SE', name: 'Swedish Krona' },
  { code: 'NOK', locale: 'no-NO', name: 'Norwegian Krone' },
  { code: 'DKK', locale: 'da-DK', name: 'Danish Krone' },
  { code: 'HUF', locale: 'hu-HU', name: 'Hungarian Forint' },
  { code: 'CZK', locale: 'cs-CZ', name: 'Czech Koruna' },
  { code: 'RON', locale: 'ro-RO', name: 'Romanian Leu' },

  // Asia & Pacific
  { code: 'JPY', locale: 'ja-JP', name: 'Japanese Yen' },
  { code: 'CNY', locale: 'zh-CN', name: 'Chinese Yuan' },
  { code: 'INR', locale: 'en-IN', name: 'Indian Rupee' },
  { code: 'AUD', locale: 'en-US', name: 'Australian Dollar' },
  { code: 'NZD', locale: 'en-US', name: 'New Zealand Dollar' },
  { code: 'SGD', locale: 'en-US', name: 'Singapore Dollar' },
  { code: 'HKD', locale: 'en-US', name: 'Hong Kong Dollar' },
  { code: 'KRW', locale: 'ko-KR', name: 'South Korean Won' },
  { code: 'IDR', locale: 'id-ID', name: 'Indonesian Rupiah' },
  { code: 'MYR', locale: 'ms-MY', name: 'Malaysian Ringgit' },
  { code: 'THB', locale: 'th-TH', name: 'Thai Baht' },
  { code: 'PHP', locale: 'en-PH', name: 'Philippine Peso' },
  { code: 'PKR', locale: 'en-PK', name: 'Pakistani Rupee' },
  { code: 'VND', locale: 'vi-VN', name: 'Vietnamese Dong' },
  { code: 'BDT', locale: 'en-US', name: 'Bangladeshi Taka' },

  // Latin America & Africa
  { code: 'BRL', locale: 'pt-BR', name: 'Brazilian Real' },
  { code: 'MXN', locale: 'en-US', name: 'Mexican Peso' },
  { code: 'CLP', locale: 'es-CL', name: 'Chilean Peso' },  
  { code: 'COP', locale: 'en-US', name: 'Colombian Peso' },
  { code: 'PEN', locale: 'es-PE', name: 'Peruvian Sol' },
  { code: 'ARS', locale: 'es-AR', name: 'Argentine Peso' },
  { code: 'ZAR', locale: 'en-ZA', name: 'South African Rand' },
  { code: 'KES', locale: 'sw-KE', name: 'Kenyan Shilling' },
  { code: 'NGN', locale: 'en-NG', name: 'Nigerian Naira' }
];

async function runTests() {
  console.log("=== TEST 1: Checking ExchangeRate-API Free Plan Response ===\n");
  try {
    const response = await fetch(URL);
    const data = await response.json();
    
    if (data.result === 'success') {
      
      // Loop through the entire currencies array
      currencies.forEach(currency => {
        const apiValue = data.conversion_rates[currency.code];
        
        if (apiValue !== undefined) {
          // Check if the API returned just a number or something else (like a string containing a symbol)
          const isJustNumber = typeof apiValue === 'number';
          
          console.log(`[${currency.code}] ${currency.name}:`);
          console.log(`  -> API Value: ${apiValue}`);
          console.log(`  -> Provides Symbol? ${isJustNumber ? 'No, just a number.' : 'Yes!'}`);
        } else {
          console.log(`[${currency.code}] ${currency.name}: Not found in API response.`);
        }
      });
      
      console.log("\n");

    } else {
      console.log("API Request failed. Did you replace YOUR_API_KEY?");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  console.log("=== TEST 2: Extracting Symbols using Native JavaScript (Free & Instant) ===\n");
  
  currencies.forEach(currency => {
    try {
      const formatter = new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 0
      });

      const parts = formatter.formatToParts(0);
      const symbolObj = parts.find(part => part.type === 'currency');
      const symbol = symbolObj ? symbolObj.value : 'N/A';

      console.log(`[${currency.code}] ${currency.name}: Symbol generated locally -> ${symbol}`);
    } catch (error) {
      console.log(`[${currency.code}] ${currency.name}: Error generating symbol`);
    }
  });
}

runTests();