/* eslint-disable */
import React from 'react'

function Home() {
    const style = {
        width: "inherit",
        maxWidth: "100%",
        height: "auto",
    }
    return (
        <div className="mt-3">
            <img style={style} src={require("../covid19-information-and-updates-serbia-banner.jpg").default}></img>
        </div>
    );
}

export default Home;