export async function signIn(username, password) {
  return await signUpOrIn('sign-in', username, password)
}

export async function signUp(username, password) {
  return await signUpOrIn('sign-up', username, password)
}

export async function signUpOrIn(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  };
  try {
    const res = await fetch(`api/auth/${action}`, req);
    if(!res.ok) {
      const response = await res.json();
      throw new Error(response.error);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}
