export function isEmptyObject(obj: Object): boolean {
    return Object.values(obj).every((value) => {
        if (value === null || value === undefined || value === "") {
            return true;
        }
        return false;
    });
}
