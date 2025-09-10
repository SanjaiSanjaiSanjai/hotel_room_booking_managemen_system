export function validateCondition(condition: any,messages: string) {
    if (!condition) {
        throw new Error(messages)
    }
}