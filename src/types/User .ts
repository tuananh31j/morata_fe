export type IUserLogin = {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IUserProfileResponse = {
    username: string;
    email: string;
    avatar: string;
    phone: string;
    address: string;
    role: string;
};
