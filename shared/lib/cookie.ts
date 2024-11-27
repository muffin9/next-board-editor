export function getCookieByKey(key: string) {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((cookie) => cookie.startsWith(`${key}=`));
    if (userCookie) {
        const user = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        return user;
    }
    return null;
}

export function deleteCookieByKey(key: string) {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
