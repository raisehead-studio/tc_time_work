import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LinkIcon from "@material-ui/icons/Link";

import Spinner from "../Spinner/Spinner";

const VideoList = ({ loading, videoListData }) => {
  const history = useHistory();
  const handleParsedData = (data) => {
    const arr = [];
    Object.entries(data).forEach((i) => {
      arr.push({
        ...i[1],
        id: i[0],
      });
    });
    return arr;
  };

  const memoedVideoList = React.useMemo(
    () => handleParsedData(videoListData),
    [videoListData]
  );

  const handleOpenVideoPage = (id) => history.push(`/live-stream/${id}`);

  if (loading) {
    return (
      <VideoListWrapper>
        <Spinner />
      </VideoListWrapper>
    );
  }

  return (
    <VideoListWrapper>
      <VideoLists>
        {memoedVideoList.map((row) => {
          return (
            <VideoListItem key={row.id}>
              <VideoListText width={30}>{row.videoName}</VideoListText>
              <VideoListText width={60}>{row.videoLink}</VideoListText>
              <VideoListIcon onClick={() => handleOpenVideoPage(row.id)}>
                <LinkIcon />
              </VideoListIcon>
            </VideoListItem>
          );
        })}
      </VideoLists>
    </VideoListWrapper>
  );
};

const VideoListWrapper = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  max-height: 80vh;
  overflow-y: scroll !important;
  transform: translateY(48px);
`;
const VideoLists = styled(List)`
  width: 100%;
`;
const VideoListItem = styled(ListItem)`
  width: 100%;
`;
const VideoListText = styled(ListItemText)`
  width: ${(p) => `${p.width}%`};
  > span {
    color: #666666;
  }
`;
const VideoListIcon = styled(ListItemIcon)`
  width: ${(p) => `${p.width}%`};
  .MuiSvgIcon-root {
    cursor: pointer;
    color: #666666;
  }
`;

export default VideoList;
