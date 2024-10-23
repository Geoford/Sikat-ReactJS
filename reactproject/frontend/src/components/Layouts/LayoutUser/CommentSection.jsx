import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import CommentDropdown from "./CommentDropdown";
import AnonymousIcon from "../../../assets/Anonymous.png";
import SendIcon from "../../../assets/SendIcon.png";
import Button from "react-bootstrap/Button";
import React from "react";

const CommentSection = ({ userID, entryID, entry }) => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error messages
  const [commentsFetched, setCommentsFetched] = useState(false); // Flag to track fetching

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      window.location.href = "/";
    }
  }, []);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/fetchComments/${entryID}`
      );
      const fetchedComments = response.data;
      console.log("Fetched Comments:", fetchedComments); // Add this to debug
      const nestedComments = nestComments(fetchedComments);
      setComments(nestedComments);
      setCommentsFetched(true); // Set flag to true after fetching
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to fetch comments. Please try again."); // Set error message
    } finally {
      setLoading(false); // Always set loading to false
    }
  }, [entryID]);

  useEffect(() => {
    if (show && !commentsFetched) {
      fetchComments();
    }
  }, [show, fetchComments, commentsFetched]);

  const nestComments = (comments) => {
    const commentMap = {};
    const nested = [];

    comments.forEach((comment) => {
      comment.replies = [];
      commentMap[comment.commentID] = comment;
      if (!comment.replyCommentID) {
        nested.push(comment);
      } else {
        const parent = commentMap[comment.replyCommentID];
        if (parent) {
          parent.replies.push(comment);
        }
      }
    });

    return nested;
  };

  const handleSendComment = async () => {
    if (!userID || !entryID || newComment.trim() === "") {
      console.error("User ID, Entry ID, and comment text are required.");
      return;
    }

    const newCommentObj = {
      commentID: Date.now(), // Temporary ID for optimistic update
      userID,
      entryID,
      text: newComment,
      username: user.username,
      profile_image: user.profile_image, // Assuming you have this in the user object
      replies: [],
    };

    // Optimistically update comments UI
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/comments", newCommentObj);
      // Optionally fetch comments again from server to sync with backend
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentID) => {
    console.log("Deleting commentID:", commentID);
    console.log("UserID:", userID);
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    // Optimistically update comments UI
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentID !== commentID)
    );

    setLoading(true);
    try {
      await axios.delete(`http://localhost:8081/deleteComments/${commentID}`, {
        params: { userID },
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment. Please try again.");
      fetchComments();
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (parentID) => {
    if (replyText.trim() === "") return;

    const newReplyObj = {
      userID,
      entryID,
      text: replyText,
      replyCommentID: parentID,
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/comments", newReplyObj);
      setReplyTo(null);
      setReplyText("");
      fetchComments();
    } catch (error) {
      console.error("Error posting reply:", error);
      setError("Failed to post reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setReplyTo(null);
    setReplyText("");
    setError(null); // Reset error message on close
    setCommentsFetched(false); // Reset fetching flag
  };

  const handleShow = () => setShow(true);

  const Comment = React.memo(({ comment, depth = 0 }) => {
    const canDelete = comment.userID === user?.userID;
    console.log("Comment User ID:", comment.userID); // Add this to debug
    console.log("Can Delete:", canDelete); // Add this to verify condition
    return (
      <div style={{ marginLeft: depth * 20, marginTop: "10px" }}>
        <div className="d-flex align-items-start flex-column gap-2 pb-2">
          <div className="w-100 d-flex align-items-center justify-content-between pe-3">
            <div className="d-flex align-items-center gap-2">
              <div className="profilePicture d-flex align-items-center justify-content-center pt-1">
                <img
                  src={
                    comment.profile_image
                      ? `http://localhost:8081${comment.profile_image}`
                      : AnonymousIcon
                  }
                  alt="Profile"
                  style={{ width: "80%" }}
                />
              </div>
              <div className="d-flex justify-content-start flex-column">
                <h6 className="m-0 text-start">{comment.username}</h6>
              </div>
            </div>
            <div>
              <CommentDropdown />
            </div>
          </div>
        </div>

        <p className="ms-4 ps-2 border-start border-2 rounded-bottom-5 text-secondary">
          {comment.text}
        </p>
        <div className="ps-5">
          <button className="btn btn-light btn-sm me-2">Gadify</button>
          <button
            className="btn btn-light btn-sm"
            onClick={() => setReplyTo(comment.commentID)}
          >
            Reply
          </button>
          {canDelete && (
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => handleDeleteComment(comment.commentID)}
            >
              Delete
            </button>
          )}
        </div>

        {replyTo === comment.commentID && (
          <div className="ps-5 mt-2">
            <FloatingLabel
              controlId={`replyTextarea-${comment.commentID}`}
              label="Reply"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a reply here"
                style={{ height: "60px" }}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </FloatingLabel>
            <button
              className="btn btn-primary btn-sm mt-2"
              onClick={() => handleSendReply(comment.commentID)}
            >
              Send Reply
            </button>
            <button
              className="btn btn-secondary btn-sm mt-2 ms-2"
              onClick={() => setReplyTo(null)}
            >
              Cancel
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.commentID}
                comment={reply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <>
      <button className="InteractButton" onClick={handleShow}>
        Comment
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <p>Loading comments...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && comments.length === 0 && (
            <p className="text-secondary">
              No comments yet. Be the first to comment!
            </p>
          )}

          <div className="comments-container">
            {comments.map((comment) => (
              <Comment key={comment.commentID} comment={comment} />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="w-100 position-relative">
            <FloatingLabel controlId="floatingTextarea2" label="Comment">
              <Form.Control
                className="custom-scrollbar pe-5"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </FloatingLabel>
            <button
              className="position-absolute p-2 rounded-circle"
              onClick={handleSendComment}
              style={{
                right: "10px",
                bottom: "10px",
                backgroundColor: "#ffff",
                border: "none",
              }}
            >
              <img className="miniIcon m-0" src={SendIcon} alt="Send" />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentSection;
