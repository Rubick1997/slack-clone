import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import firebase from "firebase";

function ChactInput({ channelName, channelId }) {
	const [input, setInput] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();

		if (!channelId) {
			return false;
		}

		db.collection("rooms").doc(channelId).collection("messages").add({
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: "Rustam Kolumbayev",
			userImage:
				"https://pm1.narvii.com/6717/853fa0542c4a453c28da102ab8bcad61c416de9c_hq.jpg",
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
