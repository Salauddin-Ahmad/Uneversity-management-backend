export type Tuser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    status: 'in-progress' | 'blocked';
    role: 'admin' | 'faculty' | 'user';
    isDeleted: boolean;
};

