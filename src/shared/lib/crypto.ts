// Вспомогательная функция для импорта ключа из Base64
async function importKeyFromBase64(keyBase64: string): Promise<CryptoKey> {
    const keyBuffer = Uint8Array.from(atob(keyBase64), c => c.charCodeAt(0));
    return crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
    );
}

// Функция шифрования с Base64-ключом
export async function encryptToString(text: string, keyBase64: string): Promise<string> {
    const key = await importKeyFromBase64(keyBase64);

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        data
    );

    const encryptedArray = new Uint8Array(encryptedBuffer);

    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    const base64 = btoa(String.fromCharCode(...combined));

    return base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// Функция дешифрования с Base64-ключом
export async function decryptFromString(str: string, keyBase64: string): Promise<string> {
    const key = await importKeyFromBase64(keyBase64);

    let base64 = str
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    while (base64.length % 4) {
        base64 += "=";
    }

    const combined = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
}
