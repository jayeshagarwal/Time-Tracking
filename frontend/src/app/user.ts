export  interface  User {
    email: string;
    password: string;
}

export var userType = [
    {
        id: 1,
        type: 'Admin'
    },
    {
        id: 2,
        type: 'Project Manager'
    },
    {
        id: 3,
        type: 'Employee'
    }
]

export var userStatus = [
    {
        id:1,
        status: 'Active'
    },
    {
        id:2,
        status: 'Inactive'
    }
]