export default class ImageApiService {
  constructor() {
    this.pageNumber = 1;
    this.inputValue = '';
    this.totalHits = 0;
    this.hits = 0;
  }

  fetchImages() {
    const { baseURL, image_type, orientation, per_page, key } = {
      baseURL: 'https://pixabay.com/api/',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      key: '22982376-5ba816c8dbdcbd488bfab475d',
    };

    //?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

    const BASE_URL = `${baseURL}?q=${this.inputValue}&page=${this.pageNumber}&key=${key}&image_type=${image_type}&orientation=${orientation}&per_page=${per_page}`;

    return fetch(BASE_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Not Found :('));
      })
      .then(result => {
        this.pageNumber += 1;
        this.totalHits = result.totalHits;
        this.hits += result.hits.length;

        return result;
      });
  }

  resetPage() {
    this.pageNumber = 1;
  }

  resetAmount() {
    this.hits = 0;
  }

  get value() {
    return this.inputValue;
  }

  set value(newInputValue) {
    this.inputValue = newInputValue;
  }
}
