import { PipeTransform, Injectable } from '@nestjs/common';

interface UrlQueryParams {
  [key: string]: string;
}

const filterParamRegExp = /^filters\[[A-z]+]$/g;

@Injectable()
export default class SearchQueryParamsPipe implements PipeTransform {
  transform(query: UrlQueryParams) {
    const filters = {};
    const queryParamsWithFilters = {};
    Object.keys(query).forEach(key => {
      const isParamFilter = key.search(filterParamRegExp) !== -1;
      if (isParamFilter) {
        const filterKey = key.slice(key.indexOf('[') + 1, key.length - 1);
        const isAlreadyInFilters = filters.hasOwnProperty(filterKey);

        if (isAlreadyInFilters && Array.isArray(filters[filterKey])) {
          filters[filterKey].push(query[key]);
        } else if (isAlreadyInFilters) {
          filters[filterKey] = [filters[filterKey], query[key]];
        } else {
          filters[filterKey] = query[key];
        }
      } else {
        queryParamsWithFilters[key] = query[key];
      }
    });
    return { ...queryParamsWithFilters, filters };
  }
}
