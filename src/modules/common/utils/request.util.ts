import * as rp from 'request-promise';

export const get = async (uri: string): Promise<any> => await rp({ method: 'GET',  uri });

export const post = async (uri: string, formData: any = {}): Promise<any> => await rp({
  method: 'POST',
  uri,
  formData,
});