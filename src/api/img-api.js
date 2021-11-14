const API_KEY = '23521874-546d3070950852676c2506258';
const BASE_URL = 'https://pixabay.com/api';
const per_page = 12;

function fetchImage(searchQuery, page) {
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${per_page}&key=${API_KEY}`,
  ).then(response => {
    return response.json();
  });
}

export default fetchImage;
