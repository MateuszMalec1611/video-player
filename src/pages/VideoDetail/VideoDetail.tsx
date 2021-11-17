import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/Components/Loader/Loader';
import MoreInfo from 'src/Components/MoreInfo/MoreInfo';
import Person from 'src/Components/Person/Person';
import { useVideos } from 'src/hooks/useVideos';
import { fetchVideoDetail } from 'src/store/Viedos/Videos.services';
import { VideosActionTypes } from 'src/store/Viedos/Videos.types';
import * as S from './styles';

const VideoDetail = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const {
        videosState: { videoDetail },
        videosDispatch,
    } = useVideos();

    const imageUrl = videoDetail?.Images.find(img => img.ImageTypeCode === 'FRAME');

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

    const peopleList = videoDetail?.People.map(person => (
        <Person key={person.PersonId} person={person} />
    ));

    return (
        <div>
            {loading && <Loader margin="200px 0 0 0" />}
            {!loading && (
                <S.GameDetailContainer elevation={3}>
                    <S.Title>{videoDetail?.Title}</S.Title>
                    <S.Wrapper>
                        <S.Image component="img" image={imageUrl?.Url} alt={videoDetail?.Title} />
                    </S.Wrapper>
                    <S.Wrapper>
                        <S.ButtonsBox>
                            <Button variant="contained" color="primary">
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
                </S.GameDetailContainer>
            )}
        </div>
    );
};

export default VideoDetail;
