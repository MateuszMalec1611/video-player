import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/Components/Loader/Loader';
import { useVideos } from 'src/hooks/useVideos';
import { fetchVideoDetail } from 'src/store/Viedos/Videos.services';
import { VideosActionTypes } from 'src/store/Viedos/Videos.types';

const VideoDetail = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const {
        videosState: { videoDetail },
        videosDispatch,
    } = useVideos();

    const handleFetchVideoDetail = useCallback(async () => {
        try {
            setLoading(true);

            if (!id) throw new Error('incorrect id given');

            const videosDetailToSet = await fetchVideoDetail(+id);

            videosDispatch({
                type: VideosActionTypes.SET_VIDEO_DETAIL,
                payload: videosDetailToSet,
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [id, videosDispatch]);

    useEffect(() => {
        handleFetchVideoDetail();
    }, [handleFetchVideoDetail]);

    return <div>{loading && <Loader margin="200px 0 0 0" />}</div>;
};

export default VideoDetail;
