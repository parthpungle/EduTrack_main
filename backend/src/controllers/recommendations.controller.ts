import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /api/recommendations  (protected)
// Placeholder heuristic: top-rated courses the user hasn't reviewed yet.
// Replace this body with the real recommendation engine later.
export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const reviewed = await prisma.review.findMany({
      where: { userId },
      select: { courseId: true },
    });
    const reviewedIds = reviewed.map((r) => r.courseId);

    const courses = await prisma.course.findMany({
      where: { id: { notIn: reviewedIds } },
      orderBy: { rating: "desc" },
      take: 10,
    });

    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to build recommendations" });
  }
};
