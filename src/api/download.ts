import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

export async function downloadJSON(req: Request, res: Response) {
  const { type } = req.params;
  const validTypes = ['settings', 'wallets', 'withdrawals'];
  
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Geçersiz dosya tipi' });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'config', `${type}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${type}.json`);
    res.send(fileContent);
  } catch (error) {
    console.error('Dosya indirme hatası:', error);
    res.status(500).json({ error: 'Dosya indirilemedi' });
  }
}
