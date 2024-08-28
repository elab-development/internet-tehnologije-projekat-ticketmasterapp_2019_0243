import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const decodeUserFromToken = (token: string): any => {
  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken || null;
  } catch (error) {
    console.error("Error decoding user from token", error);
    return undefined;
  }
};

export const trimDate = (date: any) => {
  return date.slice(0, 10);
};

const flattenObject = (obj: any, parent: string = "", res: any = {}) => {
  for (let key in obj) {
    const propName = parent ? `${parent}_${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

export const exportToExcel = (data: any, filename: string) => {
  const flattenedData = data.map((item: any) => flattenObject(item));
  const ws = XLSX.utils.json_to_sheet(flattenedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${filename}.xlsx`);
};
