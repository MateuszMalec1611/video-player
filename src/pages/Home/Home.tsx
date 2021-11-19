import { useCallback, useEffect, useState } from 'react';
import { fetchVideos } from 'src/store/Viedos/Videos.services';
import { useVideos } from 'src/hooks/useVideos';
import { ITEMS_PER_PAGE } from 'src/utils/constants';
import { VideosActionTypes, VideosListId } from 'src/store/Viedos/Videos.types';
import { Alert, Grid } from '@mui/material';
import Loader from 'src/Components/Loader/Loader';
import VideoCover from 'src/Components/VideoCover/VideoCover';
import Title from 'src/Components/Title/Title';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as S from './styles';

interface HomeProps {
    listId: VideosListId;
}

const Home: React.FC<HomeProps> = ({ listId }) => {
    const [error, setError] = useState('');
    const [loadMore, setLoadMore] = useState(true);
    const {
        videosState: { videos, loading },
        videosDispatch,
    } = useVideos();

    const videoList = videos?.videosList?.[listId];
    const totalItems = videos?.videoListTotalItems?.[listId];

    const handleFetchVideos = useCallback(
        async (page = 1) => {
            try {
                setError('');
                videosDispatch({ type: VideosActionTypes.SET_LOADING, payload: true });

                const { videoList: videosToSet, totalCount } = await fetchVideos(listId, page);

                videosDispatch({
                    type: VideosActionTypes.SET_VIDEOS,
                    payload: { videosToSet, videosListId: listId, totalCount },
                });
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError(err.response?.data.Message);
                } else {
                    setError(err.message);
                }
            } finally {
                videosDispatch({ type: VideosActionTypes.SET_LOADING });
            }
        },
        [listId, videosDispatch]
    );

    const fetchMoreData = () => {
        if (!videoList) return;
        let page = Math.ceil(videoList!.length / ITEMS_PER_PAGE) + 1;

        handleFetchVideos(page);
    };

    useEffect(() => {
        setLoadMore(true);
        if (!videoList || !totalItems) return;

        if (videoList!.length >= totalItems) {
            setLoadMore(false);
            return;
        }
    }, [totalItems, videoList]);

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
            <InfiniteScroll
                dataLength={videoList?.length ?? 0}
                next={fetchMoreData}
                hasMore={loadMore}
                loader={loading && <Loader margin="50px 0 " />}>
                <S.CardsWrapper container>
                    {!error && videosListRenderer}

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
                </S.CardsWrapper>
            </InfiniteScroll>
        </>
    );
};

export default Home;
