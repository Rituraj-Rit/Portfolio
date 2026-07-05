import emailjs from '@emailjs/browser'

export async function sendEmail({ name, email, message }) {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name,
        email,
        message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )

    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}
