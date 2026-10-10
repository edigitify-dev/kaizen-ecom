export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/** Isolated for future API integration. Currently a frontend demo: nothing is sent anywhere. */
export async function subscribe(email: string): Promise<{ ok: boolean; demo: boolean; message: string }> {
  await new Promise((r) => setTimeout(r, 500));
  if (!isValidEmail(email)) return { ok: false, demo: true, message: "Enter a valid email address." };
  return { ok: true, demo: true, message: "Demo only: no newsletter service is connected, so nothing was sent." };
}
