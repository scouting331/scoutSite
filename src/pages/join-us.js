import React from 'react';
import Layout from '@theme/Layout';
import Map from '@site/src/components/Map'

export default function JoinUs() {
  return (
    <Layout title="Join Us" description='Information on joining our organization'>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <header>
            <h1>Join Us</h1>
            <p>Join Our Units</p>
        </header>

        <section>
            <h2>Join Our Troop</h2>
            <ul>
                <li>
                    Join <a href="https://beascout.scouting.org/list/?gad_source=1&gad_campaignid=23532089962&zip=46112&program%5B%5D=scoutsBSA&unitID=84066" target="_blank" rel="noopener noreferrer">Troop 303</a>, our boys troop
                </li>
                <li>
                    Join <a href="https://beascout.scouting.org/list/?gad_source=1&gad_campaignid=23532089962&zip=46112&program%5B%5D=scoutsBSA&unitID=358986" target="_blank" rel="noopener noreferrer">Troop 331</a>, our girls troop
                </li>
                <li>
                    Join <a href="https://beascout.scouting.org/list/?zip=46112&program[]=pack&miles=20&unitID=284097" target="_blank" rel="noopener noreferrer">Pack 303</a>, our group for elementary students grades K-5th.
                </li>
            </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
            <h2>Weekly Meetings</h2>
            <p>
            Our weekly meetings are where the youth work on advancement, merit badges,
            communicate upcoming plans and events, and build friendships with their fellow
            scouts. All of this under the guidance of our volunteer leaders.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h3>Meeting Days</h3>
                    <p>Every Tuesday (except school holidays)</p>

                    <h3>Meeting Time</h3>
                    <p>6:30pm - 8:00pm</p>

                    <h3>Location</h3>
                    <address style={{ fontStyle: 'normal' }}>
                    American Legion Post 331<br />
                    636 E Main St<br />
                    Brownsburg, IN 46112
                    </address>
                </div>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <Map />
                </div>
            </div>
        </section>
        </div>
    </Layout>
  );
};