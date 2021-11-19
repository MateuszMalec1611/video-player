import { useCallback, useEffect, useState } from 'react';
import { fetchVideos } from 'src/store/Viedos/Videos.services';
import { useVideos } from 'src/hooks/useVideos';
import { VideosActionTypes, VideosListId } from 'src/store/Viedos/Videos.types';
import { Alert, Grid } from '@mui/material';
import Loader from 'src/Components/Loader/Loader';
import VideoCover from 'src/Components/VideoCover/VideoCover';
import Title from 'src/Components/Title/Title';
import * as S from './styles';

interface HomeProps {
    listId: VideosListId;
}

const Home: React.FC<HomeProps> = ({ listId }) => {
    const [error, setError] = useState('');
    const {
        videosState: { videos, loading },
        videosDispatch,
    } = useVideos();

    const videoList = videos?.[listId];

    const handleFetchVideos = useCallback(async () => {
        try {
            setError('');
            videosDispatch({ type: VideosActionTypes.SET_LOADING, payload: true });

            const videosToSet = await fetchVideos(listId);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEOS,
                payload: { videosToSet, videosListId: listId },
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            videosDispatch({ type: VideosActionTypes.SET_LOADING });
        }
    }, [listId, videosDispatch]);

    useEffect(() => {
        if (!videoList) handleFetchVideos();
    }, [handleFetchVideos, videoList]);

    const videosListRenderer = videoList?.map(video => (
        <Grid key={video.Id} item xs={12} sm={6} lg={4} xl={2}>
            <VideoCover video={video} />
        </Grid>
    ));

    return (
        <>
            <Title>{listId === VideosListId.HOME ? 'List 1' : 'List 2'}</Title>
            <S.CardsWrapper container>
                {!loading && !error && videosListRenderer}
                {!!error && !loading && (
                    <S.AlertBox>
                        <Alert severity="error">{error}</Alert>
                    </S.AlertBox>
                )}
                {!error && !loading && !videosListRenderer?.length && (
                    <S.AlertBox>
                        <Alert severity="info">No videos found</Alert>
                    </S.AlertBox>
                )}
                {loading && <Loader margin="250px 0 0 0" />}
            </S.CardsWrapper>
        </>
    );
};

export default Home;
