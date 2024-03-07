import nodemailder from "nodemailer";

export const accountActivationEmail = async (email, data) => {
  // Send Email
  const transport = nodemailder.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "becomeahaq@gmail.com",
      pass: "nnhj lcly puzj hlxv",
    },
  });

  await transport.sendMail({
    from: "NexusCareer <becomeahaq@gmail.com>",
    subject: "Account Activation",
    to: email,
    html: `<h1>Hello This is your Account Activation Code ${data.code}</h1>`,
  });
};
