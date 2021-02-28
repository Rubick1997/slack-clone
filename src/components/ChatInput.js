import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ChactInput({ channelName, channelId, chatRef }) {
	const [input, setInput] = useState("");
	const [user] = useAuthState(auth);

	const sendMessage = (e) => {
		e.preventDefault();

		if (!channelId) {
			return false;
		}

		db.collection("rooms").doc(channelId).collection("messages").add({
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: user.displayName,
			userImage: user.photoURL,
		});

		chatRef.current.scrollIntoView({
			behavior: "smooth",
		});

		setInput("");
	};
	return (
		<ChatInputContainer>
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message #${channelName}`}
				/>
				<Button type='submit' onClick={sendMessage}>
					<SendIcon />
				</Button>
			</form>
		</ChatInputContainer>
	);
}

export default ChactInput;

const ChatInputContainer = styled.div`
	border-radius: 20px;
	> form {
		position: relative;
		display: flex;
		justify-content: center;
	}
	> form > input {
		position: fixed;
		bottom: 0.5px;
		width: 60%;
		border: 1px solid gray;
		border-radius: 3px;
		height: 40px;
		padding: 20px;
		outline: none;
	}
	> form > button {
		display: none !important;
	}
`;
