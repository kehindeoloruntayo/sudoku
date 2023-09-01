// Define puzzle and solution as constants
export const puzzle = [
    [
        "--74916-5",
        "2---6-3-9",
        "-----7-1-",
        "-586----4",
        "--3----9-",
        "--62--187",
        "9-4-7---2",
        "67-83----",
        "81--45---"
    ],
];

export const solution = [
    [
        "123456789",
        "456789123",
        "789123456",
        "234567891",
        "567891234",
        "891234567",
        "345678912",
        "678912345",
        "912345678"
    ],
];

// Define the refreshGame function
export const refreshGame = () => {
    location.reload();
};

// Define the newGame function
export const newGame = () => {
    return 0;
};