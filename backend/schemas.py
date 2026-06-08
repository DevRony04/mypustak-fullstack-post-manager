from pydantic import BaseModel, Field, field_validator

class PostBase(BaseModel):
    title: str = Field(..., description="The title of the post")
    body: str = Field(..., description="The content body of the post")

    @field_validator("title", "body")
    @classmethod
    def check_not_empty_and_strip(cls, v: str) -> str:
        # Trim leading and trailing whitespace
        stripped = v.strip()
        if not stripped:
            raise ValueError("Field cannot be empty or consist only of whitespace")
        return stripped

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int = Field(..., description="The unique identifier of the post")

class MessageResponse(BaseModel):
    message: str = Field(..., description="A simple status or success message")
