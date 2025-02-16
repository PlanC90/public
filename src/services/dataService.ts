import toast from 'react-hot-toast';

const dataDir = "./data"; // Veri dizini

export async function readJsonFile<T>(filename: string): Promise<T | null> {
  try {
    const decoder = new TextDecoder();
    const data = await Deno.readFile(`${dataDir}/${filename}`);
    const jsonString = decoder.decode(data);
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    toast.error(`Failed to read data from ${filename}`);
    return null;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const jsonData = JSON.stringify(data, null, 2);
    await Deno.writeFile(`${dataDir}/${filename}`, encoder.encode(jsonData));
    toast.success('Data saved successfully!');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    toast.error(`Failed to save data to ${filename}`);
    return false;
  }
}

// Dizin ve dosya oluşturma (gerekirse)
try {
  await Deno.stat(dataDir);
} catch (e) {
  if (e instanceof Deno.errors.NotFound) {
    console.log(`Creating directory: ${dataDir}`);
    await Deno.mkdir(dataDir);
  } else {
    console.error(`Error checking directory:`, e);
  }
}

try {
  await Deno.stat(`${dataDir}/links.json`);
} catch (e) {
  if (e instanceof Deno.errors.NotFound) {
    console.log(`Creating file: ${dataDir}/links.json`);
    await Deno.writeFile(`${dataDir}/links.json`, new TextEncoder().encode(JSON.stringify({ links: [] })));
  } else {
    console.error(`Error checking file:`, e);
  }
}
