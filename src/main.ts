import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './pixabay-api';
import Pagination from './pagination';
import { initRender } from './render-functions';
import type { PixabayImage, PixabayResponse } from './types/pixabay';

const form = document.querySelector<HTMLFormElement>('#search-form');
const input = document.querySelector<HTMLInputElement>('input[name="searchQuery"]');
const gallery = document.querySelector<HTMLDivElement>('.gallery');
const loader = document.querySelector<HTMLDivElement>('.loader');
const loadMoreBtn = document.querySelector<HTMLButtonElement>('.load-more');

if (!form || !input || !gallery || !loader || !loadMoreBtn) {
  throw new Error('Required DOM elements not found');
}

let query: string = '';
const pagination = new Pagination();

const render = initRender({ gallery, loader, loadMoreBtn });

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

function onFormSubmit(event: SubmitEvent): void {
  event.preventDefault();

  query = input.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  pagination.reset();
  render.clearGallery();
  fetchAndRender();
}

function onLoadMoreClick(): void {
  fetchAndRender();
}

async function fetchAndRender(): Promise<void> {
  try {
    render.showLoader();

    const page = pagination.getPage();
    const data: PixabayResponse = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found' });
      render.hideLoadMore();
      return;
    }

    render.createGallery(data.hits as PixabayImage[]);
    pagination.nextPage();
    render.showLoadMore();
  } catch {
    iziToast.error({ message: 'Something went wrong' });
  } finally {
    render.hideLoader();
  }
}
