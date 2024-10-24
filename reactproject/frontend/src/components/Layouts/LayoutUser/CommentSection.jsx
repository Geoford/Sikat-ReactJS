import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import CommentDropdown from "./CommentDropdown";
import AnonymousIcon from "../../../assets/Anonymous.png";
import Button from "react-bootstrap/Button";
import React from "react";

// Throttle function to optimize input handling
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const CommentSection = ({ userID, entryID, entry }) => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Using refs to hold reply text instead of state
  const replyTextsRef = useRef({});

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
      const nestedComments = nestComments(fetchedComments);
      setComments(nestedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to fetch comments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [entryID]);

  useEffect(() => {
    if (show) {
      fetchComments();
    }
  }, [show, fetchComments]);

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
      userID,
      entryID,
      text: newComment,
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/comments", newCommentObj);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }

    if (userID !== entry) {
      axios
        .post(`http://localhost:8081/notifications/${entry}`, {
          userID: entry,
          actorID: userID,
          entryID,
          type: "comment",
          message: `${user.username} commented on your diary entry.`,
        })
        .catch((err) => {
          console.error("Error sending comment notification:", err);
          setError("Failed to send notification.");
        });
    }
  };

  const handleDeleteComment = async (commentID) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:8081/deleteComments/${commentID}`, {
        data: { userID },
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle reply text changes
  const handleReplyTextChange = (commentID, value) => {
    replyTextsRef.current[commentID] = value; // Set reply text for specific comment
  };

  const handleSendReply = async (parentID) => {
    const replyText = replyTextsRef.current[parentID] || ""; // Get reply text for the specific comment
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
      replyTextsRef.current[parentID] = ""; // Clear the reply text after submission
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
    replyTextsRef.current = {}; // Clear reply texts
    setError(null);
  };

  const handleShow = () => setShow(true);

  const Comment = React.memo(({ comment, depth = 0 }) => {
    const canDelete = comment.userID === userID;
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
                style={{ height: "80px" }}
                onChange={(e) =>
                  handleReplyTextChange(comment.commentID, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply(comment.commentID);
                  }
                }}
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

        {comment.replies.map((reply) => (
          <Comment key={reply.commentID} comment={reply} depth={depth + 1} />
        ))}
      </div>
    );
  });

  return (
    <>
      <button className="InteractButton" onClick={handleShow}>
        {" "}
        Comments
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column justify-content-between"
          style={{ height: "600px" }}
        >
          <div style={{ overflowY: "scroll" }}>
            {loading && <p className="text-center">Loading comments...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && comments.length === 0 && (
              <p className="text-center">
                No comments yet. Be the first to share your thoughts.
              </p>
            )}
            {comments.map((comment) => (
              <Comment key={comment.commentID} comment={comment} />
            ))}
          </div>
          <FloatingLabel
            controlId="newCommentTextarea"
            label="Comment"
            className="mt-3 position-relative"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
            />
            <div className="d-flex justify-content-end mt-2">
              <button
                onClick={handleSendComment}
                className="position-absolute py-2 d-flex align-items-center justify-content-center border-0"
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#ffff",
                  right: "10px",
                  bottom: "10px",
                  color: "var(--primary)",
                }}
              >
                <i className="bx bxs-send bx-sm"></i>
              </button>
            </div>
          </FloatingLabel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentSection;
