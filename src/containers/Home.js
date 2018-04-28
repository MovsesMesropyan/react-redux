import React, { Component } from 'react';

class Home extends Component {

    componentDidMount () {
        document.title = 'Home';
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>React Redux Example</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;