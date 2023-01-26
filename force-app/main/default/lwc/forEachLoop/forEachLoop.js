import { LightningElement } from 'lwc';
export default class ForEachLoop extends LightningElement {
    NameList = ["Karthik", "Mahesh", "Naveen", "Tabhu", "Vinay", "Maruthi", "Harish"];
    CarList = ["Audi", "Ferrari", "Scorpio", "Toyato", "Verna", "Maruthi", "Hyundai"];
    ProgramList = [
        {
            Id: "12",
            Language: "HTML",
            owner: "Raja"
        },
        {
            Id: "13",
            Language: "Python",
            owner: "Rani"
        },
        {
            Id: "14",
            Language: "C++",
            owner: "Manoj"
        },
        {
            Id: "15",
            Language: "Ruby",
            owner: "Ravi"
        }
    ]
    BhupalList = [
        "Bhupal", "Reddy", "Kanakanti"
    ];
}