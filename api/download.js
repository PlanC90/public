import { downloadJSON } from '../src/api/download';

    export default async function handler(req, res) {
      await downloadJSON(req, res);
    }
