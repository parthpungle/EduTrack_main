import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// POST /api/reviews  (protected)
export const submitReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId; // set by requireAuth
    const { courseId, rating, text } = req.body;

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const review = await prisma.review.create({
      data: { rating, text, userId, courseId },
    });

    return res.status(201).json(review);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to submit review" });
  }
};
