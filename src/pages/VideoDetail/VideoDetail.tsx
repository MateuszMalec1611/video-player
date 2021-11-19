import { Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Backdrop from 'src/Components/Backdrop/Backdrop';
import Loader from 'src/Components/Loader/Loader';
import MoreInfo from 'src/Components/MoreInfo/MoreInfo';
import Person from 'src/Components/Person/Person';
import { useUser } from 'src/hooks/useUser';
import { useVideos } from 'src/hooks/useVideos';
import { fetchVideoDetail, fetchVideoPlayer } from 'src/store/Viedos/Videos.services';
import { StreamType, VideosActionTypes } from 'src/store/Viedos/Videos.types';
import { setCoverImg } from 'src/utils/helpers';
import List from 'src/Components/List/List';
import * as S from './styles';

const VideoDetail = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [videoPlayerLoading, setVideoPlayerLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoPlayerError, setVideoPlayerError] = useState('');
    const {
        videosState: { videoDetail, videoPlayer },
        videosDispatch,
    } = useVideos();
    const { userIsAnonymous } = useUser();

    const videoDetailToDisplay = videoDetail?.[id!];
    const videoPlayerToDisplay = videoPlayer?.[id!];

    const handleFetchVideoDetail = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const videoDetailToSet = await fetchVideoDetail(+id!);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEO_DETAIL,
                payload: videoDetailToSet,
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id, videosDispatch]);

    const handleShowVideo = async (id: string | undefined, streamType: StreamType) => {
        handleModal();
        setVideoPlayerError('');
        if (streamType === StreamType.MAIN && userIsAnonymous)
            navigate('/auth', { replace: false });
        if (videoPlayerToDisplay?.video && videoPlayerToDisplay.streamType === streamType) return;

        try {
            setVideoPlayerLoading(true);

            const videoPlayerToSet = await fetchVideoPlayer(+id!, streamType);
            if (!videoPlayerToSet?.ContentUrl)
                throw new Error('There is no such a movie in the database');

            videosDispatch({
                type: VideosActionTypes.SET_VIDEO_PLAYER,
                payload: { videoPlayer: videoPlayerToSet, streamType },
            });
        } catch (err: any) {
            if (err.response?.status === 403) {
                setVideoPlayerError(err.response?.data.Message);
            } else {
                setVideoPlayerError(err.message);
            }
        } finally {
            setVideoPlayerLoading(false);
        }
    };

    const handleModal = () => setShowVideo(!showVideo);

    useEffect(() => {
        if (id) {
            setError('');
            if (!videoDetailToDisplay) handleFetchVideoDetail();
        } else {
            setError('no id, could not get detail');
        }
    }, [handleFetchVideoDetail, id, videoDetailToDisplay]);

    const directorList = videoDetailToDisplay?.People.filter(
        person => person.PersonRoleCode === 'DIRECTOR'
    ).map(person => <Person key={person.PersonId} personFullName={person.PersonFullName} />);

    const writerList = videoDetailToDisplay?.People.filter(
        person => person.PersonRoleCode === 'WRITER'
    ).map(person => <Person key={person.PersonId} personFullName={person.PersonFullName} />);

    const castList = videoDetailToDisplay?.People.filter(
        person => person.PersonRoleCode === 'CAST'
    ).map(person => <Person key={person.PersonId} personFullName={person.PersonFullName} />);

    return (
        <div>
            {loading && <Loader margin="250px 0 0 0" />}
            {!loading && !error && (
                <S.GameDetailContainer elevation={3}>
                    <S.Title>{videoDetail?.Title}</S.Title>
                    <S.Wrapper>
                        <S.Image
                            component="img"
                            image={setCoverImg(videoDetailToDisplay)}
                            alt={videoDetailToDisplay?.Title}
                        />
                    </S.Wrapper>
                    <S.Wrapper>
                        <S.ButtonsBox>
                            <Button
                                onClick={() => handleShowVideo(id, StreamType.TRIAL)}
                                variant="contained"
                                color="primary">
                                trailer
                            </Button>
                            <Button
                                onClick={() =>
                                    userIsAnonymous
                                        ? navigate('/auth', { replace: false })
                                        : handleShowVideo(id, StreamType.MAIN)
                                }
                                variant="contained"
                                color="primary">
                                {userIsAnonymous ? 'Sign in to watch' : 'watch'}
                            </Button>
                        </S.ButtonsBox>
                    </S.Wrapper>
                    {videoDetailToDisplay?.Description && (
                        <MoreInfo
                            title="Description"
                            shortDesc={videoDetailToDisplay?.Description.slice(0, 28)}
                            description={videoDetailToDisplay?.Description}
                        />
                    )}
                    <S.Wrapper>
                        <S.PegiBox>
                            <S.PegiImage
                                component="img"
                                image={videoDetailToDisplay?.MediaAgeRestrictionImageUrl}
                                alt="PEGI"
                            />
                        </S.PegiBox>
                    </S.Wrapper>
                    <S.Wrapper>
                        <div>
                            {!!directorList?.length && (
                                <List role={directorList?.length === 1 ? 'Director' : 'Directors'}>
                                    {directorList}
                                </List>
                            )}
                            {!!writerList?.length && (
                                <List role={writerList?.length === 1 ? 'Writer' : 'Writers'}>
                                    {writerList}
                                </List>
                            )}
                            {!!castList?.length && (
                                <List role={castList?.length === 1 ? 'Cast' : 'Casts'}>
                                    {castList}
                                </List>
                            )}
                        </div>
                    </S.Wrapper>
                    <Backdrop open={showVideo} click={handleModal}>
                        {!videoPlayerLoading && showVideo && !videoPlayerError && (
                            <S.TrailerBox>
                                <ReactPlayer
                                    onError={() => setVideoPlayerError('Failed to load video')}
                                    width="100%"
                                    height="100%"
                                    controls
                                    playing
                                    url={videoPlayerToDisplay?.video?.ContentUrl}
                                />
                            </S.TrailerBox>
                        )}
                        {videoPlayerLoading && <Loader />}
                        {!videoPlayerLoading && !!videoPlayerError && (
                            <S.AlertBox>
                                <Alert severity="error">{videoPlayerError}</Alert>
                            </S.AlertBox>
                        )}
                    </Backdrop>
                </S.GameDetailContainer>
            )}
            {!loading && !!error && (
                <S.ErrorWrapper>
                    <Alert severity="error">{error}</Alert>
                </S.ErrorWrapper>
            )}
        </div>
    );
};

export default VideoDetail;
