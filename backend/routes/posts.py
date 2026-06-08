from fastapi import APIRouter, HTTPException, status
from typing import List
import schemas
import data

router = APIRouter()

@router.get("", response_model=List[schemas.Post])
def get_posts():
    """Retrieve all posts from the in-memory store."""
    return data.get_all_posts()

@router.post("", response_model=schemas.Post, status_code=status.HTTP_201_CREATED)
def create_new_post(post: schemas.PostCreate):
    """Create a new post and return the created post details with 201 Status."""
    created = data.create_post(title=post.title, body=post.body)
    return created

@router.delete("/{id}", response_model=schemas.MessageResponse)
def delete_post_route(id: int):
    """Delete a post by ID. Returns 404 if post does not exist."""
    success = data.delete_post_by_id(id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with ID {id} not found"
        )
    return {"message": "Post deleted successfully"}
