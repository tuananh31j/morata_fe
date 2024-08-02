export type IUserLogin = {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IUserProfileResponse = {
    _id: string;
    username: string;
    isActive: boolean;
    email: string;
    avatar: string;
    phone: string;
    address: string;
    role: string;
};
