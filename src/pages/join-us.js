import React from 'react';
import Layout from '@theme/Layout';
import MapWrapper from '@site/src/components/Map'
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

export default function JoinUs() {
  return (
    <Layout title="Join Us" description='Information on joining our organization'>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <header>
            <Heading as='h1'>Join Us</Heading>
            <p>Join Our Units</p>
        </header>

        <section>
            <Heading as='h2'>Join Our Troop</Heading>
            <ul>
                <li>
                    Join <Link to="https://beascout.scouting.org/list/?gad_source=1&gad_campaignid=23532089962&zip=46112&program%5B%5D=scoutsBSA&unitID=84066">Troop 303</Link>, our boys troop
                </li>
                <li>
                    Join <Link to="https://beascout.scouting.org/list/?gad_source=1&gad_campaignid=23532089962&zip=46112&program%5B%5D=scoutsBSA&unitID=358986">Troop 331</Link>, our girls troop
                </li>
                <li>
                    Join <Link to="https://beascout.scouting.org/list/?zip=46112&program[]=pack&miles=20&unitID=284097">Pack 303</Link>, our group for elementary students grades K-5th.
                </li>
            </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
            <Heading as='h2'>Weekly Meetings</Heading>
            <p>
            Our weekly meetings are where the youth work on advancement, merit badges,
            communicate upcoming plans and events, and build friendships with their fellow
            scouts. All of this under the guidance of our volunteer leaders.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <Heading as='h3'>Meeting Days</Heading>
                    <p>Every Tuesday (except school holidays)</p>

                    <Heading as='h3'>Meeting Time</Heading>
                    <p>6:30pm - 8:00pm</p>

                    <Heading as='h3'>Location</Heading>
                    <address style={{ fontStyle: 'normal' }}>
                        American Legion Post 331<br />
                        636 E Main St<br />
                        Brownsburg, IN 46112
                    </address>
                </div>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <MapWrapper />
                </div>
            </div>
        </section>
        </div>
    </Layout>
  );
};