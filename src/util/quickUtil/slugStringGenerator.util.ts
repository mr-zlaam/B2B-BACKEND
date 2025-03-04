import crypto from "node:crypto";
export function generateRandomStrings(length: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

export function generateSlug(slugString: string) {
  let slug = slugString.toLowerCase();
  slug = slug.replace(/[^a-z0-9\s-]/g, "");
  slug = slug.trim().replace(/\s+/g, "-");
  return slug;
}

// OTP generator
// 5 digit random otp generator
export function generateOtp() {
  let otp = crypto.randomInt(100000, 1000000).toString();
  otp = otp.padStart(6, "0");
  const otpExpiry = new Date(Date.now() + 30 * 60 * 1000); // change expiry time using the first letter after Date.now()+1 like this otp is valid for 30 minutes
  return { otp, otpExpiry };
}
export function generateUsername(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}
