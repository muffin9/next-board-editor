export function getKeyFromCookie(key: string) {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((cookie) => cookie.startsWith(`${key}=`));
    if (userCookie) {
        const user = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        return user;
    }
    return null;
}
