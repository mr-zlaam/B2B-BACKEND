export default {
  OTP_SENDER_MESSAGE: (OTP: string, expireyTime?: string): string => {
    const message = `<br>Welcome to our B2B. Please Click  <a href="${OTP}" target="_blank">here</a> to verify your account. If you did not request this , please ignore it.<br>${expireyTime ? `<span style="text-align:center; color:red; display:block;font-weight:bold;"><i>OTP is valid for ${expireyTime}</i></span>` : ""}`;
    return message;
  }
};
