export class Project {
    id: number;
    projectName: string;
    projectManagerId: number;
    status: number;
    startDate: Date;
    endDate: Date;
}

export var projectStatus = [
    {
        id:1,
        status: 'On Going'
    },
    {
        id:2,
        status: 'Completed'
    },
    {
        id:3,
        status: 'On Hold'
    },
    {
        id:4,
        status: 'OverDue'
    }
]

export var projectType = [
    {
        id: 1,
        type: 'Hourly'
    },
    {
        id: 2,
        type: 'Fixed'
    }
]
