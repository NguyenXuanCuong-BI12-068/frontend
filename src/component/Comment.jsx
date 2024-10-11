import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import styles from "./css/Comment.module.css";

const Comment = ({
  comment, currentUser, handleInsertNode, handleEditNode, handleDeleteNode
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const canEditDelete = currentUser === comment.author;
  const isRootComment = !comment.parent;
  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleNewComment = () => {
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef.current.innerText);
      setEditMode(false);
    } else {
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }
  };

  const handleDelete = (isRoot) => {
    if (isRoot) {
      // Delete the entire comment thread
      handleDeleteNode(comment.id, true);
    } else {
      // Delete only this comment
      handleDeleteNode(comment.id, false);
    }
  };

  const extractUsername = (email) => {
    return email.split('@')[0];
  };

  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.authorName}>{extractUsername(comment.author)}</div>
        <span
          contentEditable={editMode}
          suppressContentEditableWarning={editMode}
          ref={inputRef}
          style={{ wordWrap: "break-word" }}
        >
          {comment.content}
        </span>
        <div style={{ display: "flex", marginTop: "5px" }}>
          {editMode ? (
            <>
              <Action
                className={styles.reply}
                type="SAVE"
                handleClick={onAddComment}
              />
              <Action
                className={styles.reply}
                type="CANCEL"
                handleClick={() => {
                  if (inputRef.current) inputRef.current.innerText = comment.content;
                  setEditMode(false);
                }}
              />
            </>
          ) : (
            <>
              <Action
                className={styles.reply}
                type="REPLY"
                handleClick={handleNewComment}
              />
              {canEditDelete && (
                <>
                  <Action
                    className={styles.reply}
                    type="EDIT"
                    handleClick={() => setEditMode(true)}
                  />
                  <Action
                    className={styles.reply}
                    type="DELETE"
                    handleClick={() => handleDelete(isRootComment)}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div style={{ paddingLeft: 25 }}>
        {showInput && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputContainer__input}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your reply..."
            />
            <Action
              className={styles.reply}
              type="REPLY"
              handleClick={onAddComment}
            />
            <Action
              className={styles.reply}
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
              }}
            />
          </div>
        )}
        {comment.replies && comment.replies.map((cmnt) => (
          <Comment
            key={cmnt.id}
            comment={cmnt}
            currentUser={currentUser}
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
          />
        ))}
      </div>
    </div>
  );
}
export default Comment;
