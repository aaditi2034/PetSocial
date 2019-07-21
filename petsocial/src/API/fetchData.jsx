export function fetchData() {
    return fetch('http://localhost:3000/users')
      .then(response => response.json());
}

export function fetchUploadData() {
  return fetch('http://localhost:3000/upload')
    .then(response => console.log('response', response));
}
