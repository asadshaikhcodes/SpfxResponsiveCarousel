import * as React from 'react';
import styles from './SpfxResponsiveCarousel.module.scss';
import { ISpfxResponsiveCarouselProps } from './ISpfxResponsiveCarouselProps';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { escape } from '@microsoft/sp-lodash-subset';
import Carousel from './Carousel';

export default class SpfxResponsiveCarousel extends React.Component<ISpfxResponsiveCarouselProps, {}> {
  public render(): React.ReactElement<ISpfxResponsiveCarouselProps> {
    return (
      <div className={styles.spfxResponsiveCarousel}>
        <Carousel url={this.props.url} />
      </div>
    );
  }
}
