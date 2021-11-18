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
    const [error, setError] = useState('');
    const [videoPlayerLoading, setVideoPlayerLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoPlayerError, setVideoPlayerError] = useState('');
    const {
        videosState: { videoDetail, videoPlayer, prevVideoDetailId, prevVideoId },
        videosDispatch,
    } = useVideos();

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
        if (prevVideoId === +id!) return;
        try {
            setVideoPlayerError('');
            setVideoPlayerLoading(true);

            const videoPlayerToSet = await fetchVideoPlayer(+id!, streamType);
            if (!videoPlayerToSet?.ContentUrl)
                throw new Error('There is no such a movie in the database');

            videosDispatch({
                type: VideosActionTypes.SET_VIDEO_PLAYER,
                payload: videoPlayerToSet,
            });
        } catch (err: any) {
            setVideoPlayerError(err.message);
        } finally {
            setVideoPlayerLoading(false);
        }
    };

    const handleModal = () => setShowVideo(!showVideo);

    useEffect(() => {
        if (id) {
            setError('');
            if (prevVideoDetailId !== +id) handleFetchVideoDetail();
        } else {
            setError('no id, could not get detail');
        }
    }, [handleFetchVideoDetail, id, prevVideoDetailId]);

    const peopleList = videoDetail?.People.map(person => (
        <Person key={person.PersonId} person={person} />
    ));

    return (
        <div>
            {loading && <Loader margin="250px 0 0 0" />}
            {!loading && !error && (
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
                        {!videoPlayerLoading && showVideo && !videoPlayerError && (
                            <S.TrailerBox>
                                <ReactPlayer
                                    onError={() => setVideoPlayerError('Failed to load video')}
                                    width="100%"
                                    height="100%"
                                    controls
                                    playing
                                    url={videoPlayer?.ContentUrl}
                                />
                            </S.TrailerBox>
                        )}
                        {videoPlayerLoading && <Loader />}
                        {!videoPlayerLoading && !!videoPlayerError && (
                            <S.ErrorAlert>{videoPlayerError}</S.ErrorAlert>
                        )}
                    </Backdrop>
                </S.GameDetailContainer>
            )}
            {!loading && !!error && <S.ErrorAlert>{error}</S.ErrorAlert>}
        </div>
    );
};

export default VideoDetail;
