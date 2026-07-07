// Lets TypeScript know about req.user added by requireAuth.
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export {};
