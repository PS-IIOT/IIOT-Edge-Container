// [
//     {
//         _id: {
//             $oid: '6392219e0c2a39a504b2c99b',
//         },
//         errormsg: "4 is not of type 'boolean'",
//         id: 202,
//         machine: 'NeusteMach',
//     },
// ];

export type ErrorlogResponse = {
    _id: {
        $oid: string;
    };
    errormsg: string;
    errorcode: number;
    machine?: string;
};
