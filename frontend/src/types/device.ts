export const Device = {
    Mobile: "mobile",
    Kiosk: "kiosk",
} as const;

export type Device = typeof Device[keyof typeof Device];