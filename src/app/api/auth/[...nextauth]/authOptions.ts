import { Account, AuthOptions, CallbacksOptions, EventCallbacks, Profile, TokenSet, TokenSet2 } from "next-auth";
import { Provider } from "next-auth/providers";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

const providers: Provider[] = [
  DuendeIDS6Provider({
    clientId: process.env.DUENDE_IDS6_ID!,
    clientSecret: process.env.DUENDE_IDS6_SECRET!,

    issuer: process.env.DUENDE_IDS6_ISSUER!,
    authorization: {
      params: {
        response_type: "code",
        scope: "openid email profile offline_access"
      },
    },
    checks: ["pkce", "state"],

    idToken: true,

    // Get requested user claims 
    userinfo: {
      async request(context) {
        return await context.client.userinfo(context.tokens.access_token!)
      }
    },
  })
]

//
// https://authjs.dev/guides/basics/callbacks#jwt-callback
// 
const callbacks: Partial<CallbacksOptions<Profile, Account>> | undefined = {
  async redirect({ url, baseUrl }) {
    const origin = new URL(url).origin;
    console.log();
    console.log("------- REDIRECT -------");
    console.log("url", url);
    console.log("baseUrl", baseUrl);
    console.log(`\nredirect url: ${url}\n, baseUrl: ${baseUrl}\n, URL(url).origin: ${origin}\n`)
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },
  // Requests to /api/auth/signin, /api/auth/session and calls to getSession(),
  // unstable_getServerSession(), useSession() will invoke this function, 
  // but only if you are using a JWT session. 
  // This method is not invoked when you persist sessions in a database.

  async jwt({ token, account }) {
    console.log();
    console.log("------- JWT -------");
    console.log("token", token);
    console.log("account", account);

    // Initial sign in
    if (account) {
      token.tokenType = account.token_type;
      token.idToken = account.id_token;
      token.accessToken = account.access_token;
      token.refreshToken = account.refresh_token;
      token.expiresAt = account.expires_at!;
      return token;

    }
    // Token is still valid
    else if (Date.now() < token.expiresAt * 1000) { return token; }
    else {
      try {
        const response = await fetch(`${process.env.DUENDE_IDS6_ISSUER}/connect/token`, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.DUENDE_IDS6_ID!,
            client_secret: process.env.DUENDE_IDS6_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken!
          }),
          method: "POST"
        })

        const tokens: TokenSet2 = await response.json();
        console.log();
        console.log("------- REFRESHING -------");
        console.log(tokens);

        if (!response.ok) throw tokens;

        return {
          ...token,
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in!)
        }

      } catch (error) {
        console.log();
        console.log("------- REFRESHING -------");
        console.error("Error refreshing access token", error)
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: "RefreshAccessTokenError" as const }
      }
    }
  },

  // The session callback is called whenever a session is checked. 
  // By default, only a subset of the token is returned for increased security. 
  // If you want to make something available you added to the token through the jwt() callback, 
  // you have to explicitly forward it here to make it available to the client.

  //e.g. getSession(), useSession(), /api/auth/session

  async session({ session, token }) {
    console.log();
    console.log("------- SESSION -------");
    console.log("session", session);
    console.log("token", token);

    if (token.expiresAt)
      session.expires = (new Date(token.expiresAt * 1000)).toISOString();

    session.token = token
    session.error = token.error;

    return session
  },
}

const events: Partial<EventCallbacks> = {
  // async signOut({ token, session }) {
  //   console.log();
  //   console.log("------- SIGN-IN EVENT -------");
  //   console.log("session", session);
  //   console.log("token", token);


  // },
}

const authOptions: AuthOptions = {
  providers,
  callbacks,
  // events
  pages: {
    signIn: "/auth/signin",
    // signOut: "/api/auth/signOut",
    // error: "/auth/error"
  }
}

export default authOptions;