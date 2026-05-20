export const getCurrencySymbol = (currencyCode: string, locale: string = 'en-US'): string => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    });
    
    // Format a dummy number and extract the currency symbol part
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find((part) => part.type === 'currency');
    
    return symbolPart ? symbolPart.value : currencyCode;
  } catch (error) {
    console.error(`Invalid currency code: ${currencyCode}`);
    return currencyCode; // Fallback to the code itself
  }
};

// ==========================================
// Usage Examples (with optimal locales)
// ==========================================

// Middle East & North Africa
console.log(getCurrencySymbol('AED', 'ar-AE')); // Outputs: د.إ (UAE Dirham)
console.log(getCurrencySymbol('SAR', 'ar-SA')); // Outputs: ر.س (Saudi Riyal)
console.log(getCurrencySymbol('QAR', 'ar-QA')); // Outputs: ر.ق (Qatari Rial)
console.log(getCurrencySymbol('KWD', 'ar-KW')); // Outputs: د.ك (Kuwaiti Dinar)
console.log(getCurrencySymbol('BHD', 'ar-BH')); // Outputs: د.ب (Bahraini Dinar)
console.log(getCurrencySymbol('OMR', 'ar-OM')); // Outputs: ر.ع. (Omani Rial)
console.log(getCurrencySymbol('EGP', 'ar-EG')); // Outputs: ج.م (Egyptian Pound)
console.log(getCurrencySymbol('JOD', 'ar-JO')); // Outputs: د.أ (Jordanian Dinar)
console.log(getCurrencySymbol('LBP', 'ar-LB')); // Outputs: ل.ل (Lebanese Pound)
console.log(getCurrencySymbol('MAD', 'ar-MA')); // Outputs: د.م. (Moroccan Dirham)
console.log(getCurrencySymbol('DZD', 'ar-DZ')); // Outputs: د.ج (Algerian Dinar)
console.log(getCurrencySymbol('ILS', 'he-IL')); // Outputs: ₪ (Israeli New Shekel)

// North America & Europe
console.log(getCurrencySymbol('USD', 'en-US')); // Outputs: $ (US Dollar)
console.log(getCurrencySymbol('CAD', 'en-CA')); // Outputs: $ (Canadian Dollar)
console.log(getCurrencySymbol('EUR', 'de-DE')); // Outputs: € (Euro)
console.log(getCurrencySymbol('GBP', 'en-GB')); // Outputs: £ (Pound Sterling)
console.log(getCurrencySymbol('CHF', 'de-CH')); // Outputs: CHF (Swiss Franc)
console.log(getCurrencySymbol('TRY', 'tr-TR')); // Outputs: ₺ (Turkish Lira)
console.log(getCurrencySymbol('RUB', 'ru-RU')); // Outputs: ₽ (Russian Ruble)
console.log(getCurrencySymbol('PLN', 'pl-PL')); // Outputs: zł (Polish Zloty)
console.log(getCurrencySymbol('SEK', 'sv-SE')); // Outputs: kr (Swedish Krona)
console.log(getCurrencySymbol('NOK', 'no-NO')); // Outputs: kr (Norwegian Krone)
console.log(getCurrencySymbol('DKK', 'da-DK')); // Outputs: kr. (Danish Krone)
console.log(getCurrencySymbol('HUF', 'hu-HU')); // Outputs: Ft (Hungarian Forint)
console.log(getCurrencySymbol('CZK', 'cs-CZ')); // Outputs: Kč (Czech Koruna)
console.log(getCurrencySymbol('RON', 'ro-RO')); // Outputs: lei (Romanian Leu)

// Asia & Pacific
console.log(getCurrencySymbol('JPY', 'ja-JP')); // Outputs: ¥ (Japanese Yen)
console.log(getCurrencySymbol('CNY', 'zh-CN')); // Outputs: ¥ (Chinese Yuan)
console.log(getCurrencySymbol('INR', 'en-IN')); // Outputs: ₹ (Indian Rupee)
console.log(getCurrencySymbol('AUD', 'en-AU')); // Outputs: $ (Australian Dollar)
console.log(getCurrencySymbol('NZD', 'en-NZ')); // Outputs: $ (New Zealand Dollar)
console.log(getCurrencySymbol('SGD', 'en-SG')); // Outputs: $ (Singapore Dollar)
console.log(getCurrencySymbol('HKD', 'zh-HK')); // Outputs: HK$ (Hong Kong Dollar)
console.log(getCurrencySymbol('KRW', 'ko-KR')); // Outputs: ₩ (South Korean Won)
console.log(getCurrencySymbol('IDR', 'id-ID')); // Outputs: Rp (Indonesian Rupiah)
console.log(getCurrencySymbol('MYR', 'ms-MY')); // Outputs: RM (Malaysian Ringgit)
console.log(getCurrencySymbol('THB', 'th-TH')); // Outputs: ฿ (Thai Baht)
console.log(getCurrencySymbol('PHP', 'en-PH')); // Outputs: ₱ (Philippine Peso)
console.log(getCurrencySymbol('PKR', 'en-PK')); // Outputs: Rs (Pakistani Rupee)
console.log(getCurrencySymbol('VND', 'vi-VN')); // Outputs: ₫ (Vietnamese Dong)
console.log(getCurrencySymbol('BDT', 'bn-BD')); // Outputs: ৳ (Bangladeshi Taka)

// Latin America & Africa
console.log(getCurrencySymbol('BRL', 'pt-BR')); // Outputs: R$ (Brazilian Real)
console.log(getCurrencySymbol('MXN', 'es-MX')); // Outputs: $ (Mexican Peso)
console.log(getCurrencySymbol('CLP', 'es-CL')); // Outputs: $ (Chilean Peso)
console.log(getCurrencySymbol('COP', 'es-CO')); // Outputs: $ (Colombian Peso)
console.log(getCurrencySymbol('PEN', 'es-PE')); // Outputs: S/ (Peruvian Sol)
console.log(getCurrencySymbol('ARS', 'es-AR')); // Outputs: $ (Argentine Peso)
console.log(getCurrencySymbol('ZAR', 'en-ZA')); // Outputs: R (South African Rand)
console.log(getCurrencySymbol('KES', 'sw-KE')); // Outputs: Ksh (Kenyan Shilling)
console.log(getCurrencySymbol('NGN', 'en-NG')); // Outputs: ₦ (Nigerian Naira)