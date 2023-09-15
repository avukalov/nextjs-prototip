import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (request: NextApiRequest) => {

  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET! })
    console.log(token);

    if (!token) {
      console.warn("No JWT token found when calling /federated-logout endpoint")
      return NextResponse.redirect(new URL(process.env.NEXTAUTH_URL!))
    }

    if (!token.idToken)
      console.warn("Without an id_token the user won't be redirected back from the IdP after logout.")

    const endsessionURL = `${process.env.DUENDE_IDS6_ISSUER}/connect/endsession`
    const endsessionParams = new URLSearchParams({
      id_token_hint: token.idToken!,
      post_logout_redirect_uri: process.env.DUENDE_IDS6_POST_LOGOUT_URI!,
    })

    return NextResponse.redirect(new URL(`${endsessionURL}?${endsessionParams}`))

  } catch (error) {
    console.error(error)
    NextResponse.redirect(new URL(process.env.NEXTAUTH_URL!))
  }
}