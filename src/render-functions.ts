import SimpleLightbox from 'simplelightbox';
import type { PixabayImage } from './types/pixabay';

export type RenderElements = {
  gallery: HTMLDivElement;
  loader: HTMLDivElement;
  loadMoreBtn: HTMLButtonElement;
};

export type RenderAPI = {
  clearGallery: () => void;
  createGallery: (images: PixabayImage[]) => void;
  showLoader: () => void;
  hideLoader: () => void;
  showLoadMore: () => void;
  hideLoadMore: () => void;
};

export function initRender(elements: RenderElements): RenderAPI {
  const { gallery, loader, loadMoreBtn } = elements;

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  function clearGallery(): void {
    gallery.innerHTML = '';
  }

  function createGallery(images: PixabayImage[]): void {
    const markup = images
      .map(
        image => `
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>`
      )
      .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }

  function showLoader(): void {
    loader.classList.remove('hidden');
  }

  function hideLoader(): void {
    loader.classList.add('hidden');
  }

  function showLoadMore(): void {
    loadMoreBtn.classList.remove('hidden');
  }

  function hideLoadMore(): void {
    loadMoreBtn.classList.add('hidden');
  }

  return {
    clearGallery,
    createGallery,
    showLoader,
    hideLoader,
    showLoadMore,
    hideLoadMore,
  };
}
