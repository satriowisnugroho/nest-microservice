import * as moment from 'moment';

export const getName = (str: string): { first_name: string, last_name: string } => {
  const name = str.split(' ');
  const firstName = name.splice(0, 1)[0];
  const lastName = name.length ? name.join(' ') : firstName;
  return { first_name: firstName, last_name: lastName };
};

export const matchParams = (data: any, params: any, isStrict: boolean = true): any => {
  return Object.keys(data).reduce((matched, prop) => {
    if (params[prop] && data[prop] !== undefined) {
      matched[params[prop]] = data[prop];
    } else if (!isStrict) {
      matched[prop] = data[prop];
    }

    return matched;
  }, {});
};

export const parseDate = (date: string): number => moment(date).unix();

export const parseUnixToDate = (value: number): string => moment.unix(value).format("MM/DD/YYYY");;

export const metaPagination = (query: any): any => ({
  meta: {
    page: Number(query.page),
    limit: Number(query.limit),
  },
});

export const priceFormat = (price) => String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');