import { GetLocalVariablesResponse } from '@figma/rest-api-spec';
import axios from 'axios';

export default class FigmaApi {
    private baseUrl = 'https://api.figma.com';
    private token: string;

    constructor(token: string) {
        this.token = token;
    }
    async getBranches(fileKey: string) {
        const resp = await axios.request<GetLocalVariablesResponse>({
            url: `${this.baseUrl}/v1/files/${fileKey}?branch_data=true`,
            headers: {
                Accept: '*/*',
                'X-Figma-Token': this.token,
            },
        });
        return resp.data;
    }
    async getLocalVariables(fileKey: string) {
        const resp = await axios.request<GetLocalVariablesResponse>({
            url: `${this.baseUrl}/v1/files/${fileKey}/variables/local?branch_data=true`,
            headers: {
                Accept: '*/*',
                'X-Figma-Token': this.token,
            },
        });

        return resp.data;
    }
}
