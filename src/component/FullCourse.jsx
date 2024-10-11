import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import userService from '../services/userService';
import professorService from '../services/professorService';
import styles from './css/FullCourse.module.css';
import CommentService from '../services/commentService';
import NoteService from '../services/noteServices';
import NoteComponent from './NoteComponent';
import Comment from './Comment';
import Action from './Action';
import Header from './Header';
import Sidebar from './Sidebar';

const FullCourse = () => {
  const { coursename } = useParams();
  const [video, setVideo] = useState(null);
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('loggedUser') || '{}')
  const [courseName, setCourseName] = useState(coursename);
  const [chapterList, setChapterList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [currRole, setCurrRole] = useState('');
  const loggedUser = sessionStorage.getItem('loggedUser') || '{}';
  

  const sortCommentsByNewest = (comments) => {
    return comments.sort((a, b) => b.id - a.id);
  };
  useEffect(() => {
    const loggedUser = sessionStorage.getItem('loggedUser') || '{}';
    const role = sessionStorage.getItem('ROLE') || '{}';
    setCurrRole(role);
    setCurrentUser(loggedUser);
    userService.getChapterListByCourseName(courseName).then(setChapterList);
    professorService.getCourseListByName(courseName).then(setCourseList);
    const fetchComments = async () => {
      const comments = await CommentService.fetchComments(courseName);
      setCommentsData(sortCommentsByNewest(comments));
    };
    const fetchNotes = async () => {
      const notes = await NoteService.fetchNotes(courseName);
      setNotesData(sortCommentsByNewest(notes));
    };
    fetchComments();
    fetchNotes();
    
  }, [courseName]);

  const extractVideoId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
  };

  const openSection = (section) => {
    document.querySelectorAll(`.${styles.descriptions}`).forEach(el => el.style.display = 'none');
    document.getElementById(section).style.display = 'block';
  };

  const handleChapterClick = (videoUrl, chapterIndex) => {
    const videoId = extractVideoId(videoUrl);
    setVideo(videoId);
    setSelectedChapter(chapterIndex);
  };

  const handleInsertNode = async (parentId, content) => {
    const loggedUser = sessionStorage.getItem('loggedUser') || '{}';
    const newComment = { content, parent: parentId ? { id: parentId } : null };
    const savedComment = await CommentService.addComment(newComment, courseName, loggedUser);

    setCommentsData((prevData) => sortCommentsByNewest(addCommentToTree(prevData, parentId, savedComment)));
  };

  const addCommentToTree = (comments, parentId, newComment) => {
    if (!parentId) {
      return [...comments, { ...newComment, replies: [] }];
    }
  
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), { ...newComment, replies: [] }],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addCommentToTree(comment.replies, parentId, newComment),
        };
      }
      return comment;
    });
  };

  const handleAddNewComment = async () => {
    const loggedUser = sessionStorage.getItem('loggedUser') || '{}';
    if (newCommentContent.trim() !== "") {
      const newComment = { content: newCommentContent, parent: null };
      const savedComment = await CommentService.addComment(newComment, courseName, loggedUser);
      setCommentsData((prevData) => [savedComment, ...prevData]);
      setNewCommentContent("");
    }
  };

  const handleEditNode = async (commentId, content) => {
    try {
      await CommentService.updateComment(commentId, { content });
      setCommentsData((prevData) => updateCommentInTree(prevData, commentId, content));
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const updateCommentInTree = (comments, commentId, content) => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, content };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentInTree(comment.replies, commentId, content),
        };
      } else {
        return comment;
      }
    });
  };
  
  const handleDeleteNode = async (commentId, deleteThread) => {
    try {
      await CommentService.deleteComment(commentId, deleteThread);
      setCommentsData((prevData) => deleteCommentFromTree(prevData, commentId, deleteThread));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  const deleteCommentFromTree = (comments, commentId, deleteThread) => {
    return comments.filter((comment) => {
      if (comment.id === commentId) {
        return !deleteThread;
      }
      if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteCommentFromTree(comment.replies, commentId, deleteThread);
      }
      return true;
    });
  };
  

  return (
    <>
    <Header />
    <Sidebar
            role={currRole}
            loggedUser={loggedUser}

    />
    <div className={styles.container}>
      <div>
        <div style={{ fontWeight: 'bolder', color: 'darkgreen', fontSize: '35px', marginBottom: '2%', marginLeft: '22%' }}>
          Welcome to {courseName} course 👋
        </div>
        <div className={styles.videoContainer}>
          {video && <YouTube className={styles.youtubeEmbed} videoId={video} opts={{ height: '380', width: '640' }} />}
        </div>
        <div className={styles.chapterList}>
          <div style={{ fontWeight: 'bold', fontSize: 'large', color: 'darkred' }}>
            <i className="fa fa-list"></i> Course Contents
          </div>
          <div style={{ color: 'gray', fontSize: 'small' }}> (click on chapter name to get into the videos)</div>
          {Array.from({ length: 8 }).map((_, index) => {
            const chapterName = chapterList[0] ? chapterList[0][`chapter${index + 1}name`] : '';
            const chapterUrl = chapterList[0] ? chapterList[0][`chapter${index + 1}id`] : '';
            return (
              <React.Fragment key={index}>
                {chapterName ? (
                  <>
                    <div
                      className={`${styles.chapter} ${selectedChapter === index ? styles.selected : ''}`}
                      onClick={() => handleChapterClick(chapterUrl, index)}
                    >
                      <div className={styles.box}>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className={styles.name}>
                        {index + 1}) {chapterName}
                      </div>
                    </div>
                    <hr />
                  </>
                ) : null}
              </React.Fragment>
            );
          })}
          {!chapterList[0] || !Array.from({ length: 8 }).some((_, index) => chapterList[0][`chapter${index + 1}name`]) && (
            <div style={{ color: 'red', fontSize: 'medium', fontWeight: 'bolder' }}>
              Currently No Chapters available for this Course. Please wait, the Instructor will be adding the chapters soon here.
            </div>
          )}
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.subBtns}>
          <button onClick={() => openSection('overview')} className="btn btn-info">Overview</button>
          <button onClick={() => openSection('note')} className="btn btn-info">Note</button>
          <hr />
        </div>
        <div id="overview" className={`${styles.descriptions}`}>
          {courseList.map((course, index) => (
            <div key={index}>
              <strong style={{ fontWeight: 'bolder', fontSize: '25px' }}>About this Course</strong>
              <h3 style={{ marginTop: '1.5%', fontWeight: 'normal', fontSize: '21px' }}>{course.coursename}</h3>
              <h6 style={{ marginLeft: 0, padding: '5px 20px', backgroundColor: 'darkgoldenrod', borderRadius: '5px', marginBottom: '2%', color: 'white' }}>
                {course.courseid}
              </h6>
              <hr />
              <p><b style={{ color: 'darkblue', fontSize: 'large' }}>{course.description}</b></p>
              <hr />
              <div><b style={{ color: 'darkred', fontSize: 'large' }}>Level: </b>{course.skilllevel}</div>
              <div><b style={{ color: 'darkred', fontSize: 'large' }}>Language: </b>{course.language}</div>
              <div><b style={{ color: 'darkred', fontSize: 'large' }}>Course Type: </b>{course.coursetype} contents</div>
              <div><b style={{ color: 'darkred', fontSize: 'large' }}>Instructor: </b>{course.instructorname} - {course.instructorinstitution}</div>
              <div><b style={{ color: 'darkred', fontSize: 'large' }}>Enrolled Date: </b>{course.enrolleddate}</div>
              <div><b style={{ color: 'darkred', fontSize: 'large' }}>Learners: ...</b></div>
            </div>
          ))}
        </div>
        <div id="note" className={`${styles.descriptions}`}>
          <NoteComponent courseName={courseName} currentUser={currentUser} />
        </div>
      </div>
    </div>
    <div className={styles.container}>
        <h2>Course Comments</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={`${styles.inputContainer__input} ${styles.first_input}`}
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Type a comment..."
          />
          <Action
            className={`${styles.reply} ${styles.comment}`}
            type="COMMENT"
            handleClick={handleAddNewComment}
          />
        </div>
        {commentsData.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
        />
        ))}
      </div>
    </>
  );
};

export default FullCourse;