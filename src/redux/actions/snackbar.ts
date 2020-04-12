export enum SnackbarActionTypes {
    'CLOSE'='CLOSE',
    'OPEN'='OPEN',
}

export type SnackbarAction = ReturnType<typeof openSnackbar> | ReturnType<typeof closeSnackbar>

export function openSnackbar(message: string) {
    return {
        type: SnackbarActionTypes.OPEN as typeof SnackbarActionTypes.OPEN,
        message
    }
}

export function closeSnackbar() {
    return {
        type: SnackbarActionTypes.CLOSE as typeof SnackbarActionTypes.CLOSE,
    }
}
