import { HttpParams } from "@angular/common/http";

export function buildParams(query: Record<string, unknown>): HttpParams {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        params = params.set(key, String(value));
      }
    });

    return params;
  }