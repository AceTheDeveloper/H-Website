import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { vouchers } from "@/lib/data";
import type { Voucher } from "@/lib/data";

/**
 * Signed voucher codes (server only).
 *
 * A code looks like  7K3M-Q9XP-4TR2-H8VD  and is really two halves:
 *   - 8 random characters (the nonce, unique per voucher issued)
 *   - 8 characters of HMAC-SHA256(secret, voucherId + nonce)
 *
 * Without ROULETTE_SECRET nobody can produce a code that verifies, so a
 * guest cannot invent one or edit a screenshot into a different voucher.
 * Verification needs no database: we recompute the signature.
 *
 * What this does NOT do: remember that a code was already used. See the
 * note in the /staff/verify page.
 */

// Crockford base32: no I, L, O or U, so codes are easy to read out loud.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const HALF = 8; // characters per half
const HALF_BYTES = 5; // 5 bytes = 40 bits = 8 base32 characters

function secret(): string {
  const value = process.env.ROULETTE_SECRET;
  if (value && value.length >= 16) return value;
  if (process.env.NODE_ENV !== "production")
    return "dev-only-roulette-secret-change-me";
  // Fail closed: never sign with a guessable key in production.
  throw new Error("ROULETTE_SECRET is not set");
}

function toBase32(buf: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

function sign(voucherId: string, nonce: string): string {
  const digest = createHmac("sha256", secret())
    .update(`${voucherId}|${nonce}`)
    .digest();
  return toBase32(digest.subarray(0, HALF_BYTES));
}

function format(raw: string): string {
  return raw.match(/.{4}/g)!.join("-");
}

/** Make a new unique, signed code for a voucher. */
export function issueCode(voucherId: string): string {
  const nonce = toBase32(randomBytes(HALF_BYTES));
  return format(nonce + sign(voucherId, nonce));
}

/** Clean up what a person typed: case, dashes, spaces, look-alike letters. */
export function normalizeCode(input: string): string {
  return input
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0")
    .replace(/[IL]/g, "1");
}

/** Returns the voucher this code was issued for, or null if it is not genuine. */
export function verifyCode(input: string): Voucher | null {
  const raw = normalizeCode(input);
  if (raw.length !== HALF * 2) return null;
  const nonce = raw.slice(0, HALF);
  const given = Buffer.from(raw.slice(HALF));
  for (const voucher of vouchers) {
    const expected = Buffer.from(sign(voucher.id, nonce));
    if (expected.length === given.length && timingSafeEqual(expected, given))
      return voucher;
  }
  return null;
}
