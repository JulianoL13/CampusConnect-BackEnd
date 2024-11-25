import { Router } from "express";
import { PostVoteController } from "../../controllers/postController/postVoteController";
import { PostVoteService } from "../../services/postService/postVoteService";
import { AuthMiddleware } from "../../middleware/authMiddleware";
import { PostVoteRepository } from "../../repositories/postRepository/postVoteRepository";

const router = Router();
const postVoteRepository = new PostVoteRepository();
const postVoteService = new PostVoteService(postVoteRepository);
const postVoteController = new PostVoteController(postVoteService);
const authMiddleware = new AuthMiddleware();

router.get(
  "/posts/:postId/votes",
  authMiddleware.authenticateToken,
  (req, res) => postVoteController.countVotes(req, res),
);
router.post(
  "/posts/:postId/votes",
  authMiddleware.authenticateToken,
  (req, res) => postVoteController.toggleVote(req, res),
);
router.get(
  "/posts/:postId/votes/users/:userId",
  authMiddleware.authenticateToken,
  (req, res) => postVoteController.hasUserVoted(req, res),
);

export default router;
