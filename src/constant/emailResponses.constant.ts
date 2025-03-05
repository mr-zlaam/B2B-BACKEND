export default {
  OTP_SENDER_MESSAGE: (OTP: string, expireyTime?: string): string => {
    const message = `<br>  Please use this OTP code <span style="color: blue; font-weight: bold"> ${OTP} </span> to verify your account. If you did not request this , please ignore it.<br>${expireyTime ? `<span style="text-align:center; color:red; display:block;font-weight:bold;"><i>OTP is valid for ${expireyTime}</i></span>` : ""}`;
    return message;
  }
};
