import React from 'react';
import headerBand from '../../Assets/Images/headerBand.png';
import img5 from '../../Assets/Images/img5.png';
import footer from '../../Assets/Images/footer.png';

const Homepage = ({ searchVisible }) => {
    return (
        <div className="homepage-wrapper">
            <div>
                <img src={headerBand} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={footer} />
            </div>
        </div>
    );
};

export default Homepage;
