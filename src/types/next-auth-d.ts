import { DefaultSession, DefaultUser, Profile, TokenSet } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { JWT } from "next-auth/jwt/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultUser {
    id: string;
    //profile?: Profile
  }

  interface Session extends DefaultSession {
    user: User;
    token: JWT;
    error?: "RefreshAccessTokenError"
  }

  interface TokenSetParameters2 {
    expires_in?: number;
  }

  type TokenSet2 = TokenSet & TokenSetParameters2
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    tokenType?: string;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt: number
    error?: "RefreshAccessTokenError"
    //profile?: Profile
  }
}