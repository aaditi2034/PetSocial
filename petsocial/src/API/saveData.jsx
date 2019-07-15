
export function insertData(props) {
    return fetch('http://localhost:3001/users', {
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
  