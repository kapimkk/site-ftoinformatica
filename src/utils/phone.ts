export function formatBrazilPhone(digits: string): string {
  const localDigits =
    digits.startsWith('55') && (digits.length === 12 || digits.length === 13)
      ? digits.slice(2)
      : digits;

  if (localDigits.length !== 10 && localDigits.length !== 11) {
    return digits.startsWith('55') ? `+${digits}` : digits;
  }

  const areaCode = localDigits.slice(0, 2);
  const number = localDigits.slice(2);
  const formattedNumber =
    number.length === 9
      ? `${number.slice(0, 5)}-${number.slice(5)}`
      : `${number.slice(0, 4)}-${number.slice(4)}`;
  const localText = `(${areaCode}) ${formattedNumber}`;

  if (digits.startsWith('55') && digits.length > localDigits.length) {
    return `+55 ${localText}`;
  }

  return localText;
}

export function toTelHref(digits: string): string {
  if (digits.length > 11) {
    return `tel:+${digits}`;
  }

  return `tel:${digits}`;
}
