const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY || '4d78298c6ae5edffae3480c7';
const EXCHANGE_API_BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const exchangeRates = {
  getRate: async (fromCurrency, toCurrency) => {
    // Skip API in fallback mode
    if (import.meta.env.VITE_USE_FALLBACK === 'true') {
      console.log('🚀 Using fallback rates - skipping ExchangeRate-API');
      return null;
    }

    try {
      // CORRECT ENDPOINT: /latest/{base_currency}
      const response = await fetch(`${EXCHANGE_API_BASE}/latest/${fromCurrency}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result !== 'success') {
        throw new Error('Invalid API response');
      }

      const rate = data.conversion_rates[toCurrency];
      if (!rate) {
        throw new Error(`Rate not found for ${toCurrency}`);
      }

      return { rate };
    } catch (error) {
      console.error('ExchangeRate-API failed:', error);
      throw error;
    }
  },
};

export default exchangeRates;