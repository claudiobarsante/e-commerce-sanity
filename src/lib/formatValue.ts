const formatValue = (value: number): string =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);

export default formatValue;
