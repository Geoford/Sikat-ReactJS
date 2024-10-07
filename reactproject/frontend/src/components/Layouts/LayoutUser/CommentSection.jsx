// src/Layouts/LayoutUser/CommentSection.jsx

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import CommentDropdown from "./CommentDropdown";
import AnonymousIcon from "../../../assets/Anonymous.png";
import SendIcon from "../../../assets/SendIcon.png";
import Button from "react-bootstrap/Button";
import React from "react";

const CommentSection = ({ userID, entryID }) => {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/fetchComments/${entryID}`
      );
      const fetchedComments = response.data;
      const nestedComments = nestComments(fetchedComments);
      setComments(nestedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [entryID]);

  useEffect(() => {
    if (show) {
      fetchComments();
    }
  }, [show, fetchComments]);

  // Helper function to nest comments
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
    if (newComment.trim() === "") return;

    const newCommentObj = {
      userID,
      entryID,
      text: newComment,
    };

    try {
      await axios.post("http://localhost:8081/comments", newCommentObj);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentID) => {
    // Prompt for confirmation before deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return; // If the user did not confirm, exit the function
    }

    try {
      await axios.delete(`http://localhost:8081/deleteComments/${commentID}`, {
        data: { userID }, // Pass the userID in the request body
      });
      fetchComments(); // Refresh comments after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSendReply = async (parentID) => {
    if (replyText.trim() === "") return;

    const newReplyObj = {
      userID,
      entryID,
      text: replyText,
      replyCommentID: parentID, // Correct variable
    };

    try {
      await axios.post("http://localhost:8081/comments", newReplyObj);
      setReplyTo(null);
      setReplyText("");
      fetchComments();
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setReplyTo(null);
    setReplyText("");
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

        {/* Render Replies */}
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
          <div
            className="d-flex flex-column gap-2"
            style={{ height: "55vh", overflowY: "scroll" }}
          >
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <Comment key={comment.commentID} comment={comment} />
              ))
            )}
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
