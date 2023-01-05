export function loginUser(username: string, password: string): boolean {
    console.log('loginUser: ', username, password);
    const tempUser = { username: 'admin', password: 'admin' };
    console.log(
        'usernameBool',
        username === tempUser.username,
        username,
        tempUser.username
    );
    console.log(
        'passwordBool',
        password === tempUser.password,
        password,
        tempUser.password
    );
    if (username === tempUser.username && password === tempUser.password) {
        return true;
    } else {
        return false;
    }
    // const response = await fetch(
    // `${import.meta.env.VITE_BACKEND_API_URL}/login`;
    // );
    // const json_data = (await response.json()) as Allowlist;
    // return json_data;
}
