import axios from 'axios';

  const api = axios.create({
    baseURL: "https://backend-2d8n.onrender.com/api/comments",
    headers: {
        'Content-Type': 'application/json',
    },
  });
class CommentService {
  static fetchComments = async (courseName) => {
    try {
        const response = await api.get(`/course/${courseName}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
  };
  static addComment = async (newComment, courseName, author) => {
    const response = await api.post(`/addComments/${courseName}/${author}`, newComment, {
      params: {
        parentId: newComment.parent ? newComment.parent.id : null
      }
    });
    return response.data;
  };
    
  static updateComment = async (id, updatedComment) => {
    const response = await api.put(`/${id}`, updatedComment);
    return response.data;
  };

  static deleteComment = async (id, deleteThread) => {
    await api.delete(`/${id}`, { params: { deleteThread } });
  };
}

export default CommentService;