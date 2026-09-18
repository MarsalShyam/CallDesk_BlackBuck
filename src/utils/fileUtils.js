import * as XLSX from "xlsx";
import { normalizePhoneNumber } from "./phoneUtils";

function findColumn(row, possibleNames) {
  const keys = Object.keys(row);

  return keys.find((key) =>
    possibleNames.includes(
      key
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "")
    )
  );
}

export async function parseContactFile(file) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
  });

  const firstSheetName = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[firstSheetName];

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
  });

  if (!rows.length) {
    throw new Error("The uploaded file is empty.");
  }

  const contacts = rows
    .map((row, index) => {
      const phoneColumn = findColumn(row, [
        "phone",
        "phonenumber",
        "mobile",
        "mobilenumber",
        "contact",
        "contactnumber",
        "number",
      ]);

      const nameColumn = findColumn(row, [
        "name",
        "fullname",
        "customername",
        "contactname",
      ]);

      const rawPhone = phoneColumn ? row[phoneColumn] : "";

      const phone = normalizePhoneNumber(rawPhone);

      return {
        id: `${Date.now()}-${index}`,
        name: nameColumn
          ? String(row[nameColumn]).trim()
          : `Contact ${index + 1}`,
        phone,
        status: "pending",
        originalData: row,
      };
    })
    .filter((contact) => contact.phone);

  if (!contacts.length) {
    throw new Error(
      "No valid phone numbers were found in the file."
    );
  }

  return contacts;
}