import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /api/courses?platform=Udemy&rating=4
export const listCourses = async (req: Request, res: Response) => {
  try {
    const { platform, rating } = req.query;

    const where: any = {};
    if (platform) where.platform = String(platform);
    if (rating) where.rating = { gte: Number(rating) }; // rating acts as a minimum

    const courses = await prisma.course.findMany({ where });
    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// GET /api/courses/search?q=python&difficulty=beginner
export const searchCourses = async (req: Request, res: Response) => {
  try {
    const { q, difficulty } = req.query;

    const where: any = {};
    if (q) {
      where.OR = [
        { title: { contains: String(q), mode: "insensitive" } },
        { description: { contains: String(q), mode: "insensitive" } },
      ];
    }
    if (difficulty) where.difficulty = String(difficulty);

    const courses = await prisma.course.findMany({ where });
    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Search failed" });
  }
};
