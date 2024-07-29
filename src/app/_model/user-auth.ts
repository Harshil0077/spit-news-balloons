export class UserAuth {
    token: string;
    data : {
        id: string;
    };
    status: number
}

export class AdminAuth {
    token: string;
    data : {
        role_id: string;
    };
    status: number
}
