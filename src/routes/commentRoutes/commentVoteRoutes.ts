import { Router } from "express";
import { CommentVoteController } from "../../controllers/commentController/commentVoteController";
import { CommentVoteService } from "../../services/commentService/commentVoteService";
import { CommentVoteRepository } from "../../repositories/commentRepository/commentVoteRepository";
import { AuthMiddleware } from "../../middleware/authMiddleware";

const commentVoteRepository = new CommentVoteRepository();
const commentVoteService = new CommentVoteService(commentVoteRepository);
const commentVoteController = new CommentVoteController(commentVoteService);
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get(
  "/comments/:commentId/votes",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentVoteController.countVotes(req, res),
);
router.post(
  "/comments/:commentId/vote",
  authMiddleware.authenticateToken,
  (req, res) => commentVoteController.toggleVote(req, res),
);
router.get(
  "/comments/:commentId/votes/user/:userId",
  /* authMiddleware.authenticateToken, */
  (req, res) => commentVoteController.hasUserVoted(req, res),
);

export default router;
