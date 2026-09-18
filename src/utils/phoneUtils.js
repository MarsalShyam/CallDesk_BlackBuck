// export function normalizePhoneNumber(value) {
//   if (!value) return "";

//   let phone = String(value).trim();

//   // Keep + if it exists and remove everything else
//   const hasPlus = phone.startsWith("+");

//   phone = phone.replace(/\D/g, "");

//   if (!phone) return "";

//   return hasPlus ? `+${phone}` : phone;
// }

// export function isValidPhoneNumber(phone) {
//   const normalized = normalizePhoneNumber(phone);

//   // Basic international phone validation
//   return /^\+?[0-9]{7,15}$/.test(normalized);
// }

// export function getTelLink(phone) {
//   const normalized = normalizePhoneNumber(phone);

//   return `tel:${normalized}`;
// }

// export function formatPhoneNumber(phone) {
//   const normalized = normalizePhoneNumber(phone);

//   if (!normalized) return "";

//   // Indian number formatting
//   if (normalized.startsWith("+91") && normalized.length === 13) {
//     const number = normalized.substring(3);

//     return `+91 ${number.substring(0, 5)} ${number.substring(5)}`;
//   }

//   return normalized;
// }

export function normalizePhoneNumber(value) {
  if (value === null || value === undefined) {
    return "";
  }

  let phone = String(value).trim();

  if (!phone) {
    return "";
  }

  // Remove spaces, hyphens, brackets, etc.
  phone = phone.replace(/[^\d+]/g, "");

  // Indian number:
  // 9950298611 → +919950298611
  if (/^[6-9]\d{9}$/.test(phone)) {
    return `+91${phone}`;
  }

  // 919950298611 → +919950298611
  if (/^91[6-9]\d{9}$/.test(phone)) {
    return `+${phone}`;
  }

  // +919950298611
  if (/^\+91[6-9]\d{9}$/.test(phone)) {
    return phone;
  }

  // Other international numbers
  if (phone.startsWith("+")) {
    return phone;
  }

  return phone;
}

export function isValidPhoneNumber(phone) {
  const normalized = normalizePhoneNumber(phone);

  // Indian number
  if (/^\+91[6-9]\d{9}$/.test(normalized)) {
    return true;
  }

  // Generic international number
  return /^\+[1-9]\d{6,14}$/.test(normalized);
}

export function getTelLink(phone) {
  const normalized = normalizePhoneNumber(phone);

  return `tel:${normalized}`;
}

export function formatPhoneNumber(phone) {
  const normalized = normalizePhoneNumber(phone);

  if (!normalized) {
    return "";
  }

  // Indian number
  if (
    normalized.startsWith("+91") &&
    normalized.length === 13
  ) {
    const number = normalized.substring(3);

    return `+91 ${number.substring(
      0,
      5
    )} ${number.substring(5)}`;
  }

  return normalized;
}