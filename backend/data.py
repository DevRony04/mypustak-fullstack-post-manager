import threading
from typing import List, Dict, Any, Optional

# In-memory post list, pre-seeded with requested initial data
POSTS_DB: List[Dict[str, Any]] = [
    {
        "id": 1,
        "title": "Welcome",
        "body": "First sample post"
    },
    {
        "id": 2,
        "title": "MyPustak",
        "body": "Hiring Challenge"
    }
]

# Thread-safe counter for ID generation
# Since initial items have IDs 1 and 2, the next generated ID should start from 3.
_id_counter = 3
_lock = threading.Lock()

def get_all_posts() -> List[Dict[str, Any]]:
    """Retrieve all posts from the in-memory database."""
    with _lock:
        # Return a copy to prevent mutation outside the lock
        return [dict(post) for post in POSTS_DB]

def create_post(title: str, body: str) -> Dict[str, Any]:
    """
    Create a new post, automatically generating a unique ID.
    """
    global _id_counter
    with _lock:
        new_post = {
            "id": _id_counter,
            "title": title.strip(),
            "body": body.strip()
        }
        POSTS_DB.append(new_post)
        _id_counter += 1
        return dict(new_post)

def delete_post_by_id(post_id: int) -> bool:
    """
    Delete a post by its ID. Returns True if successfully deleted,
    False if the post was not found.
    """
    global POSTS_DB
    with _lock:
        initial_length = len(POSTS_DB)
        POSTS_DB = [post for post in POSTS_DB if post["id"] != post_id]
        return len(POSTS_DB) < initial_length
