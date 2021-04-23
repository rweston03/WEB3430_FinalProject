import React from 'react'
import { Link } from 'react-router-dom';

export default function Index() {
    return(
        <>
            <section className="hero is-primary">
                <div className="hero-body">
                    <h1 className="title">
                        Corner Restaurant and Takeout
                    </h1>
                    <p className="subtitle">
                        Good food, better prices.
                    </p>
                    <button className="button is-info">
                        Order Takeout
                    </button>
                </div>
            </section>
            <section className="section is-medium has-text-centered">
                <h2>Corner Restaurant and Takeout</h2>
                <p>
                    123 25th Street<br/>
                    Ogden, UT 84401
                </p>
                <p>
                    801-333-2222
                </p>
                <h3>HOURS:</h3>
                <p>
                    M-F: 11:30 am - 10:00 pm<br/>
                    Sa &amp; Su: 10:30 am - 11:00 pm
                </p>
            </section>
        </>
    );
}