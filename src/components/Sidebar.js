import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOptions from "./SidebarOptions";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import WebOutlinedIcon from "@material-ui/icons/WebOutlined";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Sidebar() {
	const [channels, loading, error] = useCollection(db.collection("rooms"));
	const [user] = useAuthState(auth);

	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarInfo>
					<h2>Slack Clone</h2>
					<h3>
						<FiberManualRecordIcon />
						{user.displayName}
					</h3>
				</SidebarInfo>
				<CreateIcon />
			</SidebarHeader>
			<SidebarOptions Icon={InsertCommentIcon} title='Threads' />
			<SidebarOptions Icon={ForumRoundedIcon} title='All DMs' />
			<SidebarOptions Icon={AlternateEmailIcon} title='Mentions & reactions' />
			<SidebarOptions Icon={BookmarkBorderIcon} title='Saved items' />
			<SidebarOptions Icon={WebOutlinedIcon} title='Channel browser' />
			<SidebarOptions Icon={FileCopyIcon} title='File Browser' />
			<SidebarOptions
				Icon={PeopleAltOutlinedIcon}
				title='People & user groups'
			/>
			<SidebarOptions Icon={AppsOutlinedIcon} title='Apps' />
			<SidebarOptions Icon={ExpandLessOutlinedIcon} title='Show less' />
			<hr />
			<SidebarOptions Icon={ExpandMoreOutlinedIcon} title='Channels' />
			<hr />
			<SidebarOptions
				Icon={AddOutlinedIcon}
				addChannelOption
				title='Add Channel'
			/>
			{channels?.docs.map((doc) => (
				<SidebarOptions key={doc.id} id={doc.id} title={doc.data().name} />
			))}
		</SidebarContainer>
	);
}

export default Sidebar;

const SidebarContainer = styled.div`
	color: white;
	background-color: var(--slack-color);
	flex: 0.3;
	border-top: 0.5px solid #49274b;
	max-width: 260px;
	margin-top: 45px;
	> hr {
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid #49274b;
	}
`;

const SidebarHeader = styled.div`
	display: flex;
	border-bottom: 1px solid #49274b;
	padding: 13px;
	> .MuiSvgIcon-root {
		padding: 8px;
		color: #49274b;
		font-size: 18px;
		background-color: white;
		border-radius: 999px;
	}
`;

const SidebarInfo = styled.div`
	flex: 1;
	> h2 {
		font-size: 15px;
		font-weight: 900;
		margin-bottom: 5px;
	}

	> h3 {
		display: flex;
		font-size: 13px;
		font-weight: 400;
		align-items: center;
	}

	> h3 > .MuiSvgIcon-root {
		font-size: 14px;
		margin-top: 1px;
		margin-right: 2px;
		color: green;
	}
`;
