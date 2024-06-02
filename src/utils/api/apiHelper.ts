export const getContentType = () => ({
    'Content-Type': 'application/json',
});
export type IUser = {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export const getAccessToken = () => {
    return localStorage.getItem('accesssToken');
};

export const setUserInfo = (data: IUser) => {
    return localStorage.setItem('user', JSON.stringify(data));
};
export const setAccessToken = (token: string) => {
    return localStorage.setItem('accessToken', token);
};
