async function getGoogleRate(from, to) {
  const url = `http://www.google.com/ig/calculator?hl=en&q=1${from}=?${to}`;
  const response = await fetch(url);
  const text = await response.text();
  // Extract rate from response like "1 USD = 83.90 INR"
  const match = text.match(/lhs: "1\s+([A-Z]+)\s*=\s*([\d.,]+)/);
  return match ? parseFloat(match[2].replace(/,/g, '')) : null;
}

// Usage
getGoogleRate('INR', 'USD').then(rate => console.log(`${rate} USD per INR`));
