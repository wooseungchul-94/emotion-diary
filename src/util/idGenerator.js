let currentId = 0;

export function initId(start) {
    currentId = start;
}

export function generateId() {
    return currentId++;
}