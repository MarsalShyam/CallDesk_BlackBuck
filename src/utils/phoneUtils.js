export function normalizePhoneNumber(value) {
  if (!value) return "";

  let phone = String(value).trim();

  // Keep + if it exists and remove everything else
  const hasPlus = phone.startsWith("+");

  phone = phone.replace(/\D/g, "");

  if (!phone) return "";

  return hasPlus ? `+${phone}` : phone;
}

export function isValidPhoneNumber(phone) {
  const normalized = normalizePhoneNumber(phone);

  // Basic international phone validation
  return /^\+?[0-9]{7,15}$/.test(normalized);
}

export function getTelLink(phone) {
  const normalized = normalizePhoneNumber(phone);

  return `tel:${normalized}`;
}

export function formatPhoneNumber(phone) {
  const normalized = normalizePhoneNumber(phone);

  if (!normalized) return "";

  // Indian number formatting
  if (normalized.startsWith("+91") && normalized.length === 13) {
    const number = normalized.substring(3);

    return `+91 ${number.substring(0, 5)} ${number.substring(5)}`;
  }

  return normalized;
}