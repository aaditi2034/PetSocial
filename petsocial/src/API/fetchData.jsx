export function fetchData() {
    return fetch('http://localhost:3001/users')
      .then(response => response.json());
}

export function fetchUploadData() {
  return fetch('http://localhost:3001/uploadPost')
    .then(response => response.json());
}
