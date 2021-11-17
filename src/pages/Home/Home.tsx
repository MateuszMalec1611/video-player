import { useCallback, useEffect } from 'react';
import { fetchVideos } from 'src/store/Viedos/Videos.services';
import { useUser } from 'src/hooks/useUser';
import { useVideos } from 'src/hooks/useVideos';
import { VideosActionTypes } from 'src/store/Viedos/Videos.types';
import { Grid } from '@mui/material';
import Loader from 'src/Components/Loader/Loader';
import VideoCover from 'src/Components/VideoCover/VideoCover';

const Home = () => {
    const {
        userState: {
            authorizationToken: { Token },
        },
    } = useUser();
    const {
        videosState: { videos, loading },
        videosDispatch,
    } = useVideos();

    const handleFetchVideos = useCallback(async () => {
        try {
            videosDispatch({ type: VideosActionTypes.SET_LOADING, payload: true });

            const videosToSet = await fetchVideos(Token!);
            console.log(videosToSet);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEOS,
                payload: videosToSet,
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            videosDispatch({ type: VideosActionTypes.SET_LOADING });
        }
    }, [Token, videosDispatch]);

    useEffect(() => {
        handleFetchVideos();
    }, [Token, handleFetchVideos]);

    console.log(videos);

    const videosList = videos.map(video => (
        <Grid key={video.Id} item xs={12} sm={6} lg={4} xl={2}>
            <VideoCover video={video} />
        </Grid>
    ));

    return (
        <Grid container>
            {!loading && videosList}
            {loading && <Loader />}
        </Grid>
    );
};

export default Home;
