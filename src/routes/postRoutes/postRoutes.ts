import { Router } from "express";
import { PostController } from "../../controllers/postController/postController";
import { PostService } from "../../services/postService/postService";
import { PostRepository } from "../../repositories/postRepository/postRepository";
import { AuthMiddleware } from "../../middleware/authMiddleware";
import { ItemFetcher } from "../../utils/pagination";
import prisma from "../../models/prisma";

const itemFetcher = new ItemFetcher(prisma);
const postRepository = new PostRepository(itemFetcher);
const postService = new PostService(postRepository);
const postController = new PostController(postService);
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get(
  "/posts",
  /*authMiddleware.authenticateToken,*/ (req, res) =>
    postController.getAllPosts(req, res),
);
router.get("/posts/:id", authMiddleware.authenticateToken, (req, res) =>
  postController.getPostById(req, res),
);
router.get(
  "/posts/profile/:profileId",
  authMiddleware.authenticateToken,
  (req, res) => postController.getPostsByProfileId(req, res),
);
router.get(
  "/posts/community/:communityId",
  authMiddleware.authenticateToken,
  (req, res) => postController.getPostsByCommunityId(req, res),
);
router.get("/posts/search", authMiddleware.authenticateToken, (req, res) =>
  postController.searchPosts(req, res),
);
router.get(
  "/posts/count/profile/:profileId",
  authMiddleware.authenticateToken,
  (req, res) => postController.countPostsByProfileId(req, res),
);
router.get(
  "/posts/count/community/:communityId",
  authMiddleware.authenticateToken,
  (req, res) => postController.countPostsByCommunityId(req, res),
);
router.post("/posts", authMiddleware.authenticateToken, (req, res) =>
  postController.createPost(req, res),
);
router.put("/posts/:id", authMiddleware.authenticateToken, (req, res) =>
  postController.updatePost(req, res),
);
router.delete("/posts/:id", authMiddleware.authenticateToken, (req, res) =>
  postController.deletePost(req, res),
);
router.get("/posts/cursor", authMiddleware.authenticateToken, (req, res) =>
  postController.fetchPostsWithCursor(req, res),
);

export default router;
