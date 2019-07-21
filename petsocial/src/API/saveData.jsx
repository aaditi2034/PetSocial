
export function insertData(props) {
    return fetch('http://localhost:3000/users', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username: props.username,
        password: props.password,
        email: props.email,
        f_name: props.f_name,
        l_name: props.l_name
      }),
    });
}

export function insertUpload(props) {
  return fetch('http://localhost:3000/uploadPost', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username: props.username,
      date: props.date,
      description: props.description,
      category: props.category,
      image: props.image,
      time: props.time
    }),
  });
}
  