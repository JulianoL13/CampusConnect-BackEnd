import { Router } from "express";
import { CommentController } from "../../controllers/commentController/commentController";
import { CommentService } from "../../services/commentService/commentService";
import { CommentRepository } from "../../repositories/commentRepository/commentRepository";
import { ItemFetcher } from "../../utils/pagination";
import { AuthMiddleware } from "../../middleware/authMiddleware";
import prisma from "../../models/prisma";

const itemFetcher = new ItemFetcher(prisma);
const commentRepository = new CommentRepository(itemFetcher);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get(
  "/comments/cursor",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    commentController.fetchCommentsWithCursor(req, res),
);
router.get(
  "/comments",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    commentController.getAllComments(req, res),
);
router.get(
  "/comments/profile/:profileId",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentController.getCommentsByProfileId(req, res),
);
router.get(
  "/comments/post/:postId",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentController.getCommentsByPostId(req, res),
);
router.get(
  "/comments/child/:parentCommentId",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentController.fetchChildComments(req, res),
);
router.get(
  "/comments/count/post/:postId",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentController.countCommentsByPostId(req, res),
);
router.get(
  "/comments/count/child/:parentCommentId",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentController.countChildComments(req, res),
);
router.post("/comments", authMiddleware.authenticateToken, (req, res) =>
  commentController.createComment(req, res),
);
router.put("/comments/:id", authMiddleware.authenticateToken, (req, res) =>
  commentController.updateComment(req, res),
);
router.delete("/comments/:id", authMiddleware.authenticateToken, (req, res) =>
  commentController.deleteComment(req, res),
);
router.get(
  "/comments/with-replies/:postId",
  authMiddleware.authenticateToken,
  (req, res) => commentController.getCommentsWithReplies(req, res),
);

export default router;
