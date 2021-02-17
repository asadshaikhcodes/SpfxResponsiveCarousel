import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SPOperations from '../../../common/SPCRUDOperations';
import { sp } from '@pnp/sp';
import { ICarouselItems } from './ICarouselItem';
import styles from './SpfxResponsiveCarousel.module.scss';
import CarouselItemsCard from './CarouselItemsCard';
import { Item } from '@pnp/sp/items';

const listSelectFields = "Id,Title,SpotlightDescription,EmployeeName/Id,EmployeeName/Title,EmployeeName/EMail";
const listExpandFields = "EmployeeName";
let itemPromiseResultConsumer: ICarouselItems[] = [];


export default function Carousel({ url }) {

    function getCarouselData(): Promise<ICarouselItems[]> {
        return new Promise<ICarouselItems[]>((resolve, reject) => {
            SPOperations.getAllItemsInListWithFilter(sp, "EmployeeSpotlight", listSelectFields, '', listExpandFields, "Id", true)
                .then((promiseResult) => {
                    console.log(promiseResult);
                    promiseResult.forEach((result) => {
                        itemPromiseResultConsumer.push({
                            id: result.Id,
                            name: result.EmployeeName.Title,
                            email: result.EmployeeName.EMail,
                            description: result.SpotlightDescription,
                            pictureUrl: `${url}/_layouts/15/userphoto.aspx?size=L&accountname=${result.EmployeeName.EMail}`,
                            title: result.Title
                        });
                    });
                    console.log(itemPromiseResultConsumer);
                    resolve(itemPromiseResultConsumer);
                });
        });
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        autoplay: true,
        arrows: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [carouselItems, setCarouselItem] = React.useState([]);
    React.useEffect(() => {
        getCarouselData()
            .then((carouselDataPromiseResult) => {
                setCarouselItem(carouselDataPromiseResult);
            })
    })

    return (
        <div>
            <Slider {...settings}>
                {carouselItems.map((item) => {
                    return (
                        <div className={styles.carouselItemsCard}>
                            <CarouselItemsCard item={item} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    )
}
