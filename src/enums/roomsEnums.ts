export enum Rooms_Type {
    SINGLE = "single",
    DOUBLE = "double",
    DELUXE = "deluxe",
    NON_DELUXE = "non_deluxe"
}


export function getRoomDetails(type: Rooms_Type): number {
    switch (type) {
        case Rooms_Type.SINGLE:
            return 3000
        case Rooms_Type.DOUBLE:
            return 5000;
        case Rooms_Type.DELUXE:
            return 11000;
        case Rooms_Type.NON_DELUXE:
            return 8000;
        default:
            return 0;
    }
}