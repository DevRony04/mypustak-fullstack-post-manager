from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.posts import router as posts_router

app = FastAPI(
    title="MyPustak Post Manager API",
    description="API backend for MyPustak Full Stack Developer Hiring Challenge",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://mypustak-fullstack-post-manager.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the posts router under the prefix '/posts'
app.include_router(posts_router, prefix="/posts", tags=["Posts"])

@app.get("/")
def health_check():
    """Health check endpoint to verify backend status."""
    return {
        "status": "healthy",
        "service": "mypustak-post-manager-api",
        "endpoints": {
            "get_posts": "GET /posts",
            "create_post": "POST /posts",
            "delete_post": "DELETE /posts/{id}"
        }
    }
