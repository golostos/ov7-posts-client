export type Post = {
    id: number
    title: string
    text: string
    createdAt: string
    updatedAt: string
    userId: number
}

// Data transfer object = DTO
export type PostDTO = Post & {
    User: {
        name: string;
        email: string;
    };
}