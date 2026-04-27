import React from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HeroText() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <div className="overlay-text">
            <Heading as="h1" className="hero__title">
                {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
                <Link className="button button--secondary button--lg" to="/join-us">
                    Join Us
                </Link>
            </div>
        </div>
    );
}

export default function HeroCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        waitForAnimate: false,
        arrows: false,
    };
    return (
        <Slider {...settings} className={clsx('hero hero--primary', styles.heroBanner)}>
            <div>
                <HeroText />
                <img src="img\carousel\hero1.jpg" />
            </div>
            <div>
                <HeroText />
                <img src="img\carousel\hero2.jpg" />
            </div>
            <div>
                <HeroText />
                <img src="img\carousel\hero3.jpg" />
            </div>
        </Slider>
    );
}
