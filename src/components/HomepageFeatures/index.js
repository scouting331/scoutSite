import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Troop 303',
    Jpg: require('@site/static/img/feature-cards/troop303.jpg').default,
    Link: '/troop-docs/troop-303',
    description: (
      <>
        The Legendary Troop 303 is the boys scout troop. Some more info, lorem ipsum. Lots more to be said.
      </>
    ),
  },
  {
    title: 'Troop 331',
    Jpg: require('@site/static/img/feature-cards/troop331.jpg').default,
    Link: '/troop-docs/troop-331',
    description: (
      <>
        Troop 331 is the girls scout troop. Founded the day girls troops were allowed to be formed, lorem ipsum.
      </>
    ),
  },
  {
    title: 'Crew 303',
    Jpg: require('@site/static/img/feature-cards/crew303.jpg').default,
    Link: '/troop-docs/crew-303',
    description: (
      <>
        Crew 303 is the coed high adventure group. If adventure is what your looking for, this is the group!
      </>
    ),
  },
  {
    title: 'Pack 303',
    Jpg: require('@site/static/img/feature-cards/pack303.jpg').default,
    Link: '/troop-docs/pack-303',
    description: (
      <>
        Pack 303 is the coed group for children in grades K-5. An introduction to Scouting's principles and adventure, lorem ipsum.
      </>
    ),
  },
];

function Feature({Jpg, Link, title, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <a href={Link}>
          <img src={Jpg} className={styles.featureJpg} alt="title" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Our Scouting Units</h1>
    </div>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
