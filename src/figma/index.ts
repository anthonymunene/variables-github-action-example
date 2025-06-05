import 'dotenv/config';

import { TOKENS_DIR } from '../variables.js';

import { brightRed, green } from './utils/index.js';
import FigmaApi from './api.js';
import { saveTokenFiles, tokenFilesFromLocalVariables } from './tokenExport.js';

if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error('PERSONAL_ACCESS_TOKEN and FILE_KEY environemnt variables are required');
} else {
    try {
        const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN);
        const localVariables = await api.getLocalVariables(process.env.FILE_KEY);

        const tokensFiles = tokenFilesFromLocalVariables(localVariables);

        saveTokenFiles(tokensFiles, TOKENS_DIR);
        // eslint-disable-next-line no-console
        console.log(green(`✅ Tokens files have been written to the ${TOKENS_DIR} directory`));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(brightRed(`❌ ${error}`));
    }
}
