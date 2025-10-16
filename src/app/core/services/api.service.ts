import { ApiResponse, ApiServiceResponseType } from '@/domain';

interface Props {
  method?: string;
  body?: BodyInit | null;
  path: string;
  queryParams?: Record<string, string | number>;
}

export async function requestHandler<T = unknown>({
  method = 'GET',
  body,
  path = '',
  queryParams,
}: Props): Promise<ApiResponse<T>> {
  let url = process.env['TMDB_URL'] + path;

  if (queryParams) {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });
    url += `?${searchParams.toString()}`;
  }
  const token = process.env['TMDB_TOKEN'];

  try {
    if (!url) {
      throw new Error('TMDB_URL is not defined');
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    return { data };
  } catch (e) {
    console.error('Request failed:', e);
    throw new Error(e instanceof Error ? e.message : 'Request failed');
  }
}
