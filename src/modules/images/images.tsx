import React, { FC, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { server } from '../../utils/server/server';
import { noOfImages, serverDomain } from '../../const/const';
import { Button } from '../../components/button/button';
import { Image } from '../../components/image/image';
import { Image as ImageT, ImagesProps as Props, StyledProps } from '../../../types';
import { useBreakpoints } from '../../hooks/use-breakpoints/use-breakpoints';

const Grid = styled.div<{ columns: number }>`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(${({ columns }): number => columns}, 1fr);
    margin: auto;
    max-width: 1300px;
    padding: 20px;
`;

const User = styled.div<StyledProps>`
    align-items: center;
    background-color: ${({ theme }) => theme?.colors?.yellow};
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    opacity: 0;
    padding: 20px;
    position: absolute;
    right: 0;
    transition: opacity 0.5s ease;
`;

const GridItem = styled.div`
    margin-bottom: 20px;
    position: relative;

    :hover,
    :focus {
        > picture img {
            filter: grayscale(100%);
        }

        > ${User} {
            opacity: 1;
        }
    }
`;

const Name = styled.h2`
    margin: 0;
`;

const Likes = styled.p`
    margin: 0;
`;

export const Images: FC<Props> = ({ desktop, mobile, tablet }: Props): ReactElement => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ImageT[]>([]);
    const columns = useBreakpoints({ desktop, mobile, tablet }) as number;

    useEffect(() => {
        (async () => {
            setImages(await server('images', noOfImages, 0));
        })();
    }, []);

    const onClick = async () => {
        setLoading(true);
        setImages([...images, ...(await server('images', noOfImages, images.length))]);
        setLoading(false);
    };

    return (
        <Grid columns={columns}>
            {images
                .reduce(
                    (acc, img, i) => acc[i % columns].push(img) && acc,
                    [...new Array(columns)].map(() => []),
                )
                .map((column: ImageT[], i) => {
                    return (
                        <div key={i}>
                            {column.map(({ alt_description, id, likes, url: endpoint, user }) => (
                                <GridItem data-test-id="grid-item" key={id} tabIndex={0}>
                                    <Image alt={alt_description} src={`${serverDomain}${endpoint}`} />
                                    <User>
                                        <Image
                                            alt={user.name}
                                            round
                                            src={`${serverDomain}${user.profile_image}`}
                                            width="75px"
                                        />
                                        <Name>{user.name}</Name>
                                        <Likes>Likes: {likes}</Likes>
                                    </User>
                                </GridItem>
                            ))}
                        </div>
                    );
                })}
            {images.length < 30 && (
                <Button disabled={loading} onClick={onClick} type="button">
                    Load more
                </Button>
            )}
        </Grid>
    );
};
