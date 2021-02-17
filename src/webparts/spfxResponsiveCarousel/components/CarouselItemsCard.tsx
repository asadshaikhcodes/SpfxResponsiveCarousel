import * as React from 'react'
import Card from 'react-bootstrap/Card';
import { ICarouselItems } from './ICarouselItem';
import { Stack, StackItem, Persona, IPersonaProps, Separator, Text, Icon } from 'office-ui-fabric-react';
import styles from './SpfxResponsiveCarousel.module.scss';

interface ICarouselItemProps {
    item: ICarouselItems;
}


export default function CarouselItemsCard(props: ICarouselItemProps) {
    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>{props.item.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                        <Persona coinSize={72} imageUrl={props.item.pictureUrl} />
                        <Stack verticalAlign="center">
                            <Text variant="medium">{props.item.name}</Text>
                            <Separator />
                            <Text variant="smallPlus" className={styles.truncate}>
                                {props.item.description}
                            </Text>
                            <Text variant="smallPlus"><a href="#">Read More</a></Text>
                        </Stack>
                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <Stack horizontal horizontalAlign="space-around">
                        <Icon iconName="LikeSolid" className={styles.themeIconColor} />
                        <Icon iconName="CommentSolid" className={styles.themeIconColor} />
                        <Icon iconName="LinkedInLogo" className={styles.themeIconColor} />
                        <Icon iconName="TeamsLogo" className={styles.themeIconColor} />
                    </Stack>
                </Card.Footer>
            </Card>
        </div>
    )
}
