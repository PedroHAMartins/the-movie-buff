import { ApiResponse, ApiServiceResponseType } from '@/domain';

interface Props {
  method?: string;
  body?: BodyInit | null;
  path: string;
}

export async function requestHandler<T = unknown>({
  method = 'GET',
  body,
  path = '',
}: Props): Promise<ApiResponse<T>> {
  const url = process.env['TMDB_URL'] + path;
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
