export const getContentType = () => ({
    'Content-Type': 'application/json',
});
export type IUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};
export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const setUserInfo = (data: IUser) => {
    return localStorage.setItem('user', JSON.stringify(data));
};
export const setAccessToken = (token: string) => {
    return localStorage.setItem('access_token', token);
};
