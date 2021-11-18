import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Backdrop from 'src/Components/Backdrop/Backdrop';
import Loader from 'src/Components/Loader/Loader';
import MoreInfo from 'src/Components/MoreInfo/MoreInfo';
import Person from 'src/Components/Person/Person';
import { useVideos } from 'src/hooks/useVideos';
import { fetchVideoDetail, fetchVideoPlayer } from 'src/store/Viedos/Videos.services';
import { StreamType, VideosActionTypes } from 'src/store/Viedos/Videos.types';
import { setCoverImg } from 'src/utils/helpers';
import * as S from './styles';

const VideoDetail = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [videoPlayerLoading, setVideoPlayerLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const {
        videosState: { videoDetail, videoPlayer },
        videosDispatch,
    } = useVideos();

    const handleFetchVideoDetail = useCallback(async () => {
        try {
            setLoading(true);
            if (!id) throw new Error('incorrect id given');

            const videoDetailToSet = await fetchVideoDetail(+id);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEO_DETAIL,
                payload: videoDetailToSet,
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [id, videosDispatch]);

    const handleShowVideo = async (id: string | undefined, streamType: StreamType) => {
        handleModal();
        try {
            setVideoPlayerLoading(true);

            if (!id) throw new Error('incorrect id given');
            const videoPlayerToSet = await fetchVideoPlayer(+id, streamType);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEO_PLAYER,
                payload: videoPlayerToSet,
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            setVideoPlayerLoading(false);
        }
    };

    const handleModal = () => setShowVideo(!showVideo);

    useEffect(() => {
        handleFetchVideoDetail();
    }, [handleFetchVideoDetail]);

    const peopleList = videoDetail?.People.map(person => (
        <Person key={person.PersonId} person={person} />
    ));

    console.log(videoPlayer?.ContentUrl);

    return (
        <div>
            {loading && <Loader margin="250px 0 0 0" />}
            {!loading && (
                <S.GameDetailContainer elevation={3}>
                    <S.Title>{videoDetail?.Title}</S.Title>
                    <S.Wrapper>
                        <S.Image
                            component="img"
                            image={setCoverImg(videoDetail)}
                            alt={videoDetail?.Title}
                        />
                    </S.Wrapper>
                    <S.Wrapper>
                        <S.ButtonsBox>
                            <Button
                                onClick={() => handleShowVideo(id, StreamType.TRIAL)}
                                variant="contained"
                                color="primary">
                                show trailer
                            </Button>
                        </S.ButtonsBox>
                    </S.Wrapper>
                    {videoDetail?.Description && (
                        <MoreInfo
                            title="Description"
                            shortDesc={videoDetail?.Description.slice(0, 28)}
                            description={videoDetail?.Description}
                            inner={true}
                        />
                    )}
                    <S.Wrapper>
                        <S.PegiBox>
                            <S.PegiImage
                                component="img"
                                image={videoDetail?.MediaAgeRestrictionImageUrl}
                                alt="PEGI"
                            />
                        </S.PegiBox>
                    </S.Wrapper>
                    <S.Wrapper>{peopleList}</S.Wrapper>
                    <Backdrop open={showVideo} click={handleModal}>
                        {!videoPlayerLoading && showVideo && (
                            <S.TrailerBox>
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    controls
                                    playing
                                    url={videoPlayer?.ContentUrl}
                                />
                            </S.TrailerBox>
                        )}
                        {videoPlayerLoading && <Loader />}
                    </Backdrop>
                </S.GameDetailContainer>
            )}
        </div>
    );
};

export default VideoDetail;
