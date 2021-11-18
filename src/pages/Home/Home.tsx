import { useCallback, useEffect } from 'react';
import { fetchVideos } from 'src/store/Viedos/Videos.services';
import { useVideos } from 'src/hooks/useVideos';
import { VideosActionTypes, VideosListId } from 'src/store/Viedos/Videos.types';
import { Grid } from '@mui/material';
import Loader from 'src/Components/Loader/Loader';
import VideoCover from 'src/Components/VideoCover/VideoCover';

interface HomeProps {
    listId: VideosListId;
}

const Home: React.FC<HomeProps> = ({ listId }) => {
    const {
        videosState: { videos, prevVideosListId, loading },
        videosDispatch,
    } = useVideos();

    const handleFetchVideos = useCallback(async () => {
        try {
            videosDispatch({ type: VideosActionTypes.SET_LOADING, payload: true });

            const videosToSet = await fetchVideos(listId);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEOS,
                payload: { videosToSet, videosListId: listId },
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            videosDispatch({ type: VideosActionTypes.SET_LOADING });
        }
    }, [listId, videosDispatch]);

    useEffect(() => {
        if (prevVideosListId !== listId) handleFetchVideos();
    }, [handleFetchVideos, listId, prevVideosListId]);

    const videosList = videos.map(video => (
        <Grid key={video.Id} item xs={12} sm={6} lg={4} xl={2}>
            <VideoCover video={video} />
        </Grid>
    ));

    return (
        <Grid container style={{ marginTop: 20 }}>
            {!loading && videosList}
            {loading && <Loader margin="250px 0 0 0" />}
        </Grid>
    );
};

export default Home;
