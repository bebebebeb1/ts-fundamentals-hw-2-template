import axios, { AxiosResponse } from 'axios';
import type { PixabayResponse } from './types/pixabay';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'YOUR_API_KEY';
const PER_PAGE = 40;

export async function getImagesByQuery(
  query: string,
  page: number
): Promise<PixabayResponse> {
  const response: AxiosResponse<PixabayResponse> = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}
